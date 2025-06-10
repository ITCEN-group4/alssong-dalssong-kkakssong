import React from "react";
import styles from "./MyPostCard.module.css";
import { useNavigate } from "react-router-dom";

export default function MyPostCard({ cocktail }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/post/${cocktail.id}`);
    };

    // 날짜 변환 (예: 2024-05-12 → 2024.05.12)
    const formattedDate = cocktail.createdAt?.slice(0, 10).replace(/-/g, ".") || "작성일 미상";

    return (
        <div className={styles.card} onClick={handleClick}>
            <img src={cocktail.image} alt={cocktail.name} className={styles.thumbnail} />
            <div className={styles.content}>
                <h3 className={styles.title}>{cocktail.name}</h3>
                <div className={styles.meta}>
                    <span className={styles.icon}>📅</span>
                    <span>{formattedDate}</span>
                </div>
                <div className={styles.meta}>
                    <span className={styles.icon}>❤️</span>
                    <span>{cocktail.likes}</span>
                </div>
            </div>
        </div>
    );
}
