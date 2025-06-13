import { useNavigate } from "react-router-dom";
import styles from "./OfficialCard.module.css";
import useLikeAnimation from "../../utils/useLikeAnimation.js";
import {useEffect, useState} from "react";
import {getMyInfo} from "../../api/userApi.js";
import {deleteLike, getPostById, postLike} from "../../api/postApi.js";

export default function OfficialCard({ cocktail }) {
    const navigate = useNavigate();
    const [postData, setPostData] = useState(cocktail);
    const [animate, triggerAnimate] = useLikeAnimation();
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleClick = () => {
        navigate(`/post/${cocktail.id}`);
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
                <div className={styles.cardWrapper}>
                    <img src={cocktail.image} alt={cocktail.name} className={styles.cardImage} />
                </div>
                <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{cocktail.name}</h3>
                    <p className={styles.cardDescription}>
                        {cocktail.baseLiquors[0]} · {cocktail.ingredients[0]} · {cocktail.abv}도
                    </p>

                    <div className={styles.cardBottom}>
                        <button className={styles.likeButton} onClick={handleLike}>
                            <span className={`${styles.heartIcon} ${animate ? styles.bump : ""}`}>
                                {postData.isLiked ? "❤️" : "🤍"}
                            </span>
                            <span className={`${styles.likeCount} ${animate ? styles.bump : ""}`}>
                                {postData.likes}
                            </span>
                        </button>
                        <span className={styles.shakingTag}>
                            {cocktail.shaking ? "쉐이킹 ON" : "쉐이킹 OFF"}
                        </span>
                    </div>
                </div>
            </div>

            {errorMessage && (
                <div className={styles.errorOverlay}>
                    <div className={styles.errorMessage}>{errorMessage}</div>
                </div>
            )}
        </>
    );
}