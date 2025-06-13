import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import styles from "./OfficialCocktailDetailPage.module.css";
import NavBar from "../components/layout/NavBar.jsx";
import Footer from "../components/layout/Footer.jsx";
import tag_base from "../assets/tag_base.svg";
import tag_dosu from "../assets/tag_dosu.svg";
import tag_etc from "../assets/tag_etc.svg";
import tag_shake from "../assets/tag_shake.svg";
import useLikeAnimation from "../utils/useLikeAnimation.js";
import {getMyInfo} from "../api/userApi.js";
import {deleteLike, getPostById, postLike} from "../api/postApi.js";
import {mapApiToFrontData} from "../utils/MapApiToFrontData.js";

export default function OfficialDetailPage() {
    const { id } = useParams();
    const [cocktail, setCocktail] = useState(null);
    const [error, setError] = useState(null);
    const [animate, triggerAnimate] = useLikeAnimation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchMyInfo = async () => {
            try {
                await getMyInfo();
                setIsLoggedIn(true);  // 로그인 상태로 변경
            } catch (error) {
                console.error("유저 정보 조회 실패:", error);
                setIsLoggedIn(false); // 실패 시 비로그인 상태 유지
            }
        };
        fetchMyInfo();
    }, []);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // 게시글 먼저 요청
                const postRes = await getPostById(id);
                const mapped = mapApiToFrontData(postRes.data.data);
                setCocktail(mapped);

            } catch (err) {
                console.error("상세 조회 실패", err);
                setError("존재하지 않는 칵테일입니다.");
            }
        };

        fetchPost();
    }, [id]);


    if (error) return <div>{error}</div>;
    if (!cocktail) return <div>로딩 중...</div>;


    const handleLike = async () => {
        if (isLoggedIn === false) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            if (cocktail.isLiked) {
                await deleteLike(cocktail.id);
            } else {
                await postLike(cocktail.id);
            }

            const res = await getPostById(cocktail.id);
            const updated = mapApiToFrontData(res.data.data);
            setCocktail(updated);
            triggerAnimate();
        } catch (err) {
            console.error("좋아요 처리 실패", err);
        }
    };

    return (
        <>
            <NavBar/>
                <div className={styles.headerSection}>
                    <h2 className={styles.pageTitle}>칵테일 상세 정보</h2>
                    <p className={styles.pageSubtitle}>
                        다양한 재료와 화려한 가니쉬가 어우러진 칵테일을 한눈에 확인해보세요.
                    </p>
                </div>

                <div className={styles.pageWrapper}>

                    <div className={styles.detailGrid}>
                        <div className={styles.imageCard}>
                            <img src={cocktail.image} alt={cocktail.name} className={styles.image}/>
                        </div>

                        <div className={styles.infoCard}>
                            <h3 className={styles.title}>{cocktail.name}</h3>
                            <p className={styles.description}>{cocktail.description}</p>

                            <div className={styles.iconTagsWrapper}>
                                <div className={styles.iconTagRow}>
                                    <img src={tag_base} className={styles.iconImage} alt="베이스 술"/>
                                    <div className={styles.tagText}>
                                        <div className={styles.tagLabel}>베이스 술</div>
                                        <div className={styles.tagValue}>{cocktail.baseLiquors}</div>
                                    </div>
                                </div>

                                <div className={styles.iconTagRow}>
                                    <img src={tag_dosu} className={styles.iconImage} alt="도수"/>
                                    <div className={styles.tagText}>
                                        <div className={styles.tagLabel}>도수</div>
                                        <div className={styles.tagValue}>{cocktail.abv}도</div>
                                    </div>
                                </div>

                                <div className={styles.iconTagRow}>
                                    <img src={tag_etc} className={styles.iconImage} alt="부가재료"/>
                                    <div className={styles.tagText}>
                                        <div className={styles.tagLabel}>부가재료</div>
                                        <div className={styles.tagValue}>{cocktail.ingredients[0]}</div>
                                    </div>
                                </div>

                                <div className={styles.iconTagRow}>
                                    <img src={tag_shake} className={styles.iconImage} alt="쉐이킹"/>
                                    <div className={styles.tagText}>
                                        <div className={styles.tagLabel}>쉐이킹</div>
                                        <div className={styles.tagValue}>{cocktail.shaking ? "예" : "아니오"}</div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.recipe}>
                                <h4>레시피</h4>
                                <ul>
                                    {typeof cocktail.recipe === "string"
                                        ? cocktail.recipe.split('\n').map((step, index) => (
                                            <li key={index}>{step}</li>
                                        ))
                                        : Array.isArray(cocktail.recipe)
                                            ? cocktail.recipe.map((step, index) => (
                                                <li key={index}>{step}</li>
                                            ))
                                            : <li>레시피 정보 없음</li>
                                    }
                                </ul>
                            </div>


                            <div className={styles.likes} onClick={handleLike}>
                                <span className={`${styles.heartIcon} ${animate ? styles.bump : ""}`}>
                                    {cocktail.isLiked ? "❤️" : "🤍"}
                                </span>
                                <span className={`${styles.likeCount} ${animate ? styles.bump : ""}`}>
                                    {cocktail.likes}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer/>
        </>
    );
}
