import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./CocktailDetailPage.module.css";
import baseIcon from "../assets/baseIcon.svg";
import ingredientIcon from "../assets/ingredientIcon.svg";
import getShakingIcon from "../utils/getShakingIcon.js";
import getAbvIcon from "../utils/getAbcIcon.js";
import useLikeAnimation from "../utils/useLikeAnimation.js";
import NavBar from "../components/layout/NavBar.jsx";
import { getPostById, postLike, deleteLike, deletePost } from "../api/postApi.js";
import { mapApiToFrontData } from "../utils/MapApiToFrontData.js";
import { getMyInfo } from "../api/userApi";

export default function CocktailDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [cocktail, setCocktail] = useState(null);
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);
    const [animate, triggerAnimate] = useLikeAnimation();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorLikeMessage, setErrorLikeMessage] = useState("");
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

                // 로그인 사용자 정보는 선택적으로 시도
                getMyInfo()
                    .then(userRes => {
                        setUserId(userRes.data.userId);
                    })
                    .catch(() => {
                        // 로그인 안 한 경우, 사용자 정보 없음
                        setUserId(null);
                    });

            } catch (err) {
                console.error("상세 조회 실패", err);
                setError("존재하지 않는 칵테일입니다.");
            }
        };

        fetchPost();
    }, [id]);


    if (error) return <div>{error}</div>;
    if (!cocktail) return <div>로딩 중...</div>;

    const { label: abvLabel, icon: abvIcon } = getAbvIcon(cocktail.abv);
    const { label: shakingLabel, icon: shakingIcon } = getShakingIcon(cocktail.shaking);
    const formattedDate = cocktail.createdAt?.slice(0, 10).replace(/-/g, ".") || "작성일 미상";

    const handleLike = async () => {
        if (!isLoggedIn) {
            setErrorLikeMessage("로그인이 필요합니다.");
            setTimeout(() => setErrorLikeMessage(""), 1000);
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

    const handleWrite = () => {
        navigate(`/posts/update/${cocktail.id}`);
    };

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deletePost(cocktail.id);       // 실제 API 요청
            setShowDeleteModal(false);           // 모달 닫기
            setErrorMessage("게시글이 삭제되었습니다.");
            setTimeout(() => {
                setErrorMessage("");
                navigate("/posts");
            }, 1500);
        } catch (error) {
            console.error("삭제 실패:", error);
            setShowDeleteModal(false);
            setErrorMessage("삭제 중 오류가 발생했습니다.");
            setTimeout(() => setErrorMessage(""), 1500);
        }
    };

    return (
        <>
        <NavBar/>
        <div className={styles.detailPage}>
            {errorMessage && (
                <div className={styles.errorMessage}>{errorMessage}</div>
            )}

            {errorLikeMessage && (
                <div className={styles.errorOverlay}>
                    <div className={styles.errorLikeMessage}>{errorLikeMessage}</div>
                </div>
            )}

            {showDeleteModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalBox}>
                        <p className={styles.modalText}>
                            정말 삭제하시겠습니까?
                        </p>
                        <div className={styles.modalButtonGroup}>
                            <button className={styles.modalYes} onClick={confirmDelete}>예</button>
                            <button className={styles.modalNo} onClick={() => setShowDeleteModal(false)}>아니오</button>
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.pageHeader}>
                <div className={styles.pageHeaderLeft}>
                    <h1>칵테일 정보 공유</h1>
                    <p>칵테일 정보를 공유하는 공간..<br/>다른 유저의 황금레시피를 엿볼 수 있어요.</p>
                </div>
                {userId === cocktail.userId && (
                    <div className={styles.editButtonGroup}>
                        <button
                            className={styles.editButton}
                            onClick={handleWrite}>
                            ✏️ 수정
                        </button>
                        <button
                            className={styles.deleteButton}
                            onClick={handleDelete}>
                            🗑️ 삭제
                        </button>
                    </div>)}
            </div>

                <div className={styles.topSection}>
                    <div className={styles.leftContent}>
                        <div className={styles.titleRow}>
                            <h2 className={styles.title}>{cocktail.name}</h2>
                            <div className={styles.UserWrapper}>
                                <div className={styles.UserIcon}>👤</div>
                                <span className={styles.UserName}>{cocktail.writerNickname}</span>
                            </div>
                        </div>

                        <p className={styles.description}>{cocktail.description}</p>

                        <div className={styles.infoRow}>
                            <button className={styles.likeButton} onClick={handleLike}>
                                <span className={`${styles.heartIcon} ${animate ? styles.bump : ""}`}>
                                    {cocktail.isLiked ? "❤️" : "🤍"}
                                </span>
                                <span className={`${styles.likeCount} ${animate ? styles.bump : ""}`}>
                                    {cocktail.likes}
                                </span>
                            </button>
                            <span className={styles.date}>작성일 : {formattedDate}</span>
                        </div>
                    </div>

                    <div className={styles.imageWrapper}>
                        <img src={cocktail.image} alt={cocktail.name} />
                    </div>
                </div>

                <div className={styles.bottomSection}>
                    <div className={styles.recipeBox}>
                        <h3>레시피</h3>
                        <ul>
                            {cocktail.recipe
                                .split('\n')
                                .filter(Boolean)
                                .map((step, idx) => (
                                    <li key={idx}>{step}</li>
                                ))}
                        </ul>
                    </div>

                    <div className={styles.iconGrid}>
                        <div className={styles.iconItem}>
                            <span className={styles.iconLabel}>베이스 술</span>
                            <img src={baseIcon} alt="base" className={styles.infoIcon} />
                            <span className={styles.iconValue}>{cocktail.baseLiquors[0]}</span>
                        </div>
                        <div className={styles.iconItem}>
                            <span className={styles.iconLabel}>도수</span>
                            <img src={abvIcon} alt="abv" className={styles.infoIcon} />
                            <span className={styles.iconValue}>{abvLabel}</span>
                        </div>
                        <div className={styles.iconItem}>
                            <span className={styles.iconLabel}>부가재료</span>
                            <img src={ingredientIcon} alt="ingredient" className={styles.infoIcon} />
                            <span className={styles.iconValue}>{cocktail.ingredients[0]}</span>
                        </div>
                        <div className={styles.iconItem}>
                            <span className={styles.iconLabel}>쉐이킹</span>
                            <img src={shakingIcon} alt="shaking" className={styles.infoIcon} />
                            <span className={styles.iconValue}>{shakingLabel}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
