import React, {useContext, useEffect, useState} from "react";
import styles from "./CocktailWritePage.module.css";
import CocktailTagBox from "../components/boxs/CocktailTagBox.jsx";
import ImageUploadBox from '../components/boxs/ImageUploadBox.jsx';
import RecipeInputBox from "../components/boxs/RecipeInputBox.jsx";
import {UNSAFE_NavigationContext, useNavigate, useParams} from "react-router-dom";
import cocktailTestData from "../data/cocktailTestData.js";
import { ingredientCategoryMap } from "../utils/ingredientCategoryMap.js";
import NavBar from "../components/layout/NavBar.jsx";

export default function CocktailWritePage({ mode = "create" }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const navigationContext = useContext(UNSAFE_NavigationContext)

    const [cocktailName, setCocktailName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [recipeList, setRecipeList] = useState([]);
    const [filters, setFilters] = useState({
        baseLiquors: [],
        ingredients: [],
        abv: null,
        shaking: null,
    });

    //이름 띄어쓰기 없애는 함수
    function normalizeIngredientName(name) {
        return name.replace(/\s/g, "").replace(/-/g, "").trim().toLowerCase();
    }

    //수정 시 정보 불러올때, 부재료 카테고리화 시켜주는 함수
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
                navigator.push = originalPush; // 원래대로 복구
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

    // 수정 시 기존 데이터 가져오기. 현재는 더미데이터 기반으로만 가져오고 있기 때문에 추후 수정 필요
    useEffect(() => {
        if (mode === "edit" && id) {

            //더미데이터 기반 코드라서 추후 아래 삭제 필요
            const found = cocktailTestData.find(item => item.id === Number(id));
            if (!found) return;

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
                baseLiquors: Array.isArray(found.baseLiquors) ? found.baseLiquors : [found.baseLiquors],
                ingredients: mapIngredientsToCategories(found.ingredients),
                abv: found.abv,
                shaking: found.shaking,
            });
        }
    }, [mode, id]);

    //이쪽도 콘솔에 FormData만 출력하는 코드라서 추후 수정 필요
    const handleSubmit = async () => {
        if (!cocktailName || !description || !selectedImage || recipeList.length === 0) {
            alert("모든 필드를 채워주세요.");
            return;
        }

        const formData = new FormData();

        formData.append("image", selectedImage);
        formData.append("name", cocktailName);
        formData.append("description", description);

        const recipeString = recipeList.map(i => `${i.name} ${i.amount}`).join('\n');
        formData.append("recipe", recipeString);

        formData.append("baseLiquors", JSON.stringify(filters.baseLiquors));
        formData.append("ingredients", JSON.stringify(filters.ingredients));
        formData.append("abv", filters.abv);
        formData.append("shaking", filters.shaking);

        for (let pair of formData.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }

        alert("콘솔에서 FormData 확인");
    };

    return (
        <>
            <NavBar/>
        <div className={styles.pageWrapper}>
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
                <ImageUploadBox onImageSelect={setSelectedImage} selectedImage={selectedImage} />

                <div className={styles.propertyBox}>
                    <p className={styles.label}>칵테일 속성</p>
                    <CocktailTagBox filters={filters} setFilters={setFilters} />
                </div>

                <div className={styles.buttonGroup}>
                    <button
                        className={styles.cancelButton}
                        onClick={() => {
                            if (window.confirm("정말 작성을 취소하시겠습니까? 작성한 내용은 저장되지 않습니다.")) {
                                navigate(-1);
                            }
                        }}
                    >작성 취소</button>
                    <button className={styles.submitButton} onClick={handleSubmit}>작성 완료</button>
                </div>
            </section>
        </div>
        </>
    );
}
