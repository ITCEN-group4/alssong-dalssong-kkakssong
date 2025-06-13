import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CocktailCard.module.css";
import getAbvTag from "../../utils/getAbvTag.js";
import useLikeAnimation from "../../utils/useLikeAnimation.js";
import { postLike, deleteLike, getPostById } from "../../api/postApi";
import {getMyInfo} from "../../api/userApi.js";

export default function CocktailCard({ cocktail }) {
    const navigate = useNavigate();
    const { label, icon } = getAbvTag(cocktail.abv);
    const [postData, setPostData] = useState(cocktail);
    const [animate, triggerAnimate] = useLikeAnimation();
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleClick = () => {
        navigate(`/posts/${postData.id}`);
    };

    useEffect(() => {
        const fetchMyInfo = async () => {
            try {
                await getMyInfo();
                setIsLoggedIn(true);  // 로그인 상태
            } catch (error) {
                console.error("유저 정보 조회 실패:", error);
                setIsLoggedIn(false); // 실패 시 비로그인 상태
            }
        };
        fetchMyInfo();
    }, []);

    const handleLike = async (e) => {
        e.stopPropagation();

       if (!isLoggedIn) {
            setErrorMessage("로그인이 필요합니다.");
            setTimeout(() => setErrorMessage(""), 1000); // 2초 후 사라짐
            return;
        }

        try {
            if (postData.isLiked) {
                await deleteLike(postData.id);
            } else {
                await postLike(postData.id);
            }

            // 최신 데이터로 갱신
            const res = await getPostById(postData.id);
            const updated = res.data.data;
            setPostData(prev => ({
                ...prev,
                isLiked: updated.is_liked,
                likes: updated.like_count,
            }));
            triggerAnimate();
        } catch (err) {
            console.error("좋아요 토글 실패:", err);
        }
    };

    return (
        <>
        <div className={styles.card} onClick={handleClick}>
            <img src={postData.image} alt={postData.name} className={styles.cardImage} />

            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{postData.name}</h3>

                <div className={styles.cardTags}>
                    <span className={styles.tagBaseLiquors}>{postData.baseLiquors[0]}</span>
                    <span className={styles.tagIngredient}>{postData.ingredients[0]}</span>
                    <span className={styles.tagShaking}>
                        {postData.shaking ? "쉐이킹 ON" : "쉐이킹 OFF"}
                    </span>
                </div>
            </div>

            <p className={styles.description}>{postData.description}</p>

            <button className={styles.likeButton} onClick={handleLike}>
                <span className={`${styles.heartIcon} ${animate ? styles.bump : ""}`}>
                    {postData.isLiked ? "❤️" : "🤍"}
                </span>
                <span className={`${styles.likeCount} ${animate ? styles.bump : ""}`}>
                    {postData.likes}
                </span>
            </button>

            <img src={icon} alt={label} className={styles.abvBadge} />
        </div>

            {errorMessage && (
                <div className={styles.errorOverlay}>
                    <div className={styles.errorMessage}>{errorMessage}</div>
                </div>
            )}
            </>
    );
}
