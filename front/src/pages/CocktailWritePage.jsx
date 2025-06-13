import React, {useContext, useEffect, useState} from "react";
import styles from "./CocktailWritePage.module.css";
import CocktailTagBox from "../components/boxs/CocktailTagBox.jsx";
import ImageUploadBox from '../components/boxs/ImageUploadBox.jsx';
import RecipeInputBox from "../components/boxs/RecipeInputBox.jsx";
import NavBar from "../components/layout/NavBar.jsx";
import {UNSAFE_NavigationContext, useNavigate, useParams} from "react-router-dom";
import { ingredientCategoryMap } from "../utils/ingredientCategoryMap.js";
import {createPost, updatePost, getPostById} from "../api/postApi.js";
import {mapApiToFrontData} from "../utils/MapApiToFrontData.js";
import {uploadImage} from "../api/imageApi.js";

export default function CocktailWritePage({ mode = "create" }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const navigationContext = useContext(UNSAFE_NavigationContext);

    const [cocktailName, setCocktailName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);  // S3 URL
    const [recipeList, setRecipeList] = useState([]);
    const [filters, setFilters] = useState({
        baseLiquors: [],
        ingredients: [],
        abv: null,
        shaking: null,
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [showCancelModal, setShowCancelModal] = useState(false);

    const showError = (msg) => {
        setErrorMessage(msg);
        setTimeout(() => setErrorMessage(""), 2000);
    };

    //띄어쓰기 제거 함수
    function normalizeIngredientName(name) {
        return name.replace(/\s/g, "").replace(/-/g, "").trim().toLowerCase();
    }

    // 부재료들 카테고리 매핑 시켜주는 함수
    function mapIngredientsToCategories(ingredients) {
        const categorySet = new Set();
        ingredients.forEach(name => {
            const normalized = name.replace(/\s/g, "").replace(/-/g, "").trim().toLowerCase();
            const category = ingredientCategoryMap[normalized];
            if (category) categorySet.add(category);
        });
        return Array.from(categorySet);
    }

    //다른 페이지 이동 시 경고문구
    useEffect(() => {
        const navigator = navigationContext.navigator;
        const originalPush = navigator.push;

        const hasChanges =
            cocktailName || description || recipeList.length > 0 || selectedImage;

        // 페이지 내 네비게이션 감지 (Link, navigate)
        navigator.push = (...args) => {
            if (!hasChanges || window.confirm("정말 작성을 취소하시겠습니까? 작성한 내용은 저장되지 않습니다.")) {
                navigator.push = originalPush;
                originalPush(...args);
            }
        };

        // 브라우저 뒤로가기 / 새로고침 감지
        const handleBeforeUnload = (e) => {
            if (hasChanges) {
                e.preventDefault();
                e.returnValue = "";
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            navigator.push = originalPush;
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [cocktailName, description, recipeList, selectedImage]);

    //이미지 컨버팅 함수
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // 수정 모드: 기존 데이터 불러오기
    useEffect(() => {
        if (mode === "edit" && id) {
            (async () => {
                try {
                    const res = await getPostById(id);
                    const found = mapApiToFrontData(res.data.data);

                    setCocktailName(found.name);
                    setDescription(found.description);
                    setSelectedImage(found.image);

                    const parsedRecipe = found.recipe
                        .split("\n")
                        .filter(Boolean)
                        .map(line => {
                            const match = line.trim().match(/^(.+?)\s+([\d.]+[a-zA-Z가-힣%]+)$/);
                            if (!match) return null;

                            const rawName = match[1].trim();
                            const amount = match[2].trim();
                            const normalized = normalizeIngredientName(rawName);
                            const category = ingredientCategoryMap[normalized] || "기타";

                            return { name: normalized, amount, category };
                        })
                        .filter(Boolean);

                    setRecipeList(parsedRecipe);

                    setFilters({
                        baseLiquors: found.baseLiquors,
                        ingredients: found.ingredients,
                        abv: found.abv,
                        shaking: found.shaking,
                    });
                } catch (e) {
                    console.error("기존 게시글 불러오기 실패", e);
                }
            })();
        }
    }, [mode, id]);

    // 레시피에서 재료 선택시 해당 필터박스의 카테고리 자동 체크
    useEffect(() => {
        const newIngredientCategories = mapIngredientsToCategories(
            recipeList.map(item => item.name)
        );
        setFilters(prev => ({ ...prev, ingredients: newIngredientCategories }));
    }, [recipeList]);

    const handleSubmit = async () => {
        if (!cocktailName || !description || recipeList.length === 0) {
            showError("모든 필드를 채워주세요.");
            return;
        }

        // 이미지 업로드
        let imageUrl = "https://dummyimage.com/300x300/cccccc/000000&text=Cocktail";

        if (selectedImage instanceof File) {
            try {
                const base64Data = await convertToBase64(selectedImage);
                const { name: filename, type: contentType } = selectedImage;

                const response = await uploadImage({ filename, base64Data, contentType });
                imageUrl = response.data.url;
            } catch (e) {
                console.error("이미지 업로드 실패:", e);
                showError("이미지 업로드에 실패했습니다.");
                return;
            }
        } else if (typeof selectedImage === "string" && selectedImage !== "") {
            imageUrl = selectedImage; // 수정 모드에서 기존 이미지 URL
        }

        const recipeString = recipeList.map(i => `${i.name} ${i.amount}`).join('\n');

        const payload = {
            title: cocktailName,
            content: description,
            recipe: recipeString,
            difficulty: filters.abv,
            is_shaken: filters.shaking,
            is_official: false,
            image_url: imageUrl,
            base_liquors: filters.baseLiquors,
            ingredients: filters.ingredients,
        };

        console.log("payload to send:", JSON.stringify(payload, null, 2));

        try {
            if (mode === "edit" && id) {
                await updatePost(id, payload);
                alert("게시글이 수정되었습니다.");
            } else {
                await createPost(payload);
                alert("게시글이 작성되었습니다.");
            }
            navigate("/posts");
        } catch (err) {
            console.error("작성/수정 실패:", err);
            alert("요청 중 오류가 발생했습니다.");
        }

    };

    const handleImageDelete = async () => {
        if (typeof selectedImage !== "string") return; // URL이 아닐 경우 무시

        const key = selectedImage.split("/").slice(-2).join("/"); // 예: images/example.png

        try {
            await deleteImage(key);
            setSelectedImage(null);
            alert("이미지가 삭제되었습니다.");
        } catch (e) {
            console.error("이미지 삭제 실패:", e);
            alert("이미지 삭제에 실패했습니다.");
        }
    };

    const handleCancel = () => {
        const hasChanges = cocktailName || description || selectedImage || recipeList.length > 0;
        if (hasChanges) {
            setShowCancelModal(true);
        } else {
            navigate(-1);
        }
    };

    const confirmCancel = () => {
        setCocktailName("");
        setDescription("");
        setSelectedImage(null);
        setRecipeList([]);
        setFilters({
            baseLiquors: [],
            ingredients: [],
            abv: null,
            shaking: null,
        });
        setShowCancelModal(false);
        navigate(-1);
    };


    return (
        <>
            <NavBar />
            <div className={styles.pageWrapper}>
                {errorMessage && (
                    <div className={styles.errorMessage}>{errorMessage}</div>
                )}

                {showCancelModal && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalBox}>
                            <p className={styles.modalText}>정말 작성을 취소하시겠습니까?</p>
                            <div className={styles.modalButtonGroup}>
                                <button className={styles.modalYes} onClick={confirmCancel}>예</button>
                                <button className={styles.modalNo} onClick={() => setShowCancelModal(false)}>아니오</button>
                            </div>
                        </div>
                    </div>
                )}

                <section className={styles.leftSection}>
                    <div className={styles.inputBox}>
                        <label className={styles.label}>칵테일 이름</label>
                        <input
                            type="text"
                            value={cocktailName}
                            onChange={(e) => setCocktailName(e.target.value)}
                            placeholder="예: 화이트 러시안, 피나콜라다 등"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.inputBox}>
                        <label className={styles.label}>소개글</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="예: 오늘 만들어 본건 마가리타 선셋입니다~"
                            className={styles.textarea}
                        />
                    </div>

                    <div className={styles.inputBox}>
                        <label className={styles.label}>레시피</label>
                        <RecipeInputBox recipeList={recipeList} setRecipeList={setRecipeList} />
                    </div>
                </section>

                <section className={styles.rightSection}>
                    <ImageUploadBox
                        onImageSelect={setSelectedImage}
                        selectedImage={selectedImage}
                        onDeleteImage={handleImageDelete}
                    />

                    <div className={styles.propertyBox}>
                        <p className={styles.label}>칵테일 속성</p>
                        <CocktailTagBox filters={filters} setFilters={setFilters} />
                    </div>

                    <div className={styles.buttonGroup}>
                        <button className={styles.cancelButton} onClick={handleCancel}>작성 취소</button>
                        <button className={styles.submitButton} onClick={handleSubmit}>작성 완료</button>
                    </div>
                </section>
            </div>
        </>
    );
}