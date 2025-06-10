import { useNavigate } from "react-router-dom";
import styles from "./OfficialCard.module.css";
import { useCocktailContext} from "../../context/CocktailContext.jsx";
import likeAnimation from "../../utils/likeAnimation.js";

export default function OfficialCard({ cocktail }) {
    const navigate = useNavigate();
    const {toggleLike, likedMap, cocktailList} = useCocktailContext();
    const liked = likedMap[cocktail.id] || false;
    const [animate, triggerAnimate] = likeAnimation();

    // 실시간 좋아요 수 가져오기 (원본 데이터에서)
    const currentCocktail = cocktailList.find(c => c.id === cocktail.id);
    const currentLikes = currentCocktail ? currentCocktail.likes : cocktail.likes;

    const handleClick = () => {
        navigate(`/posts/${cocktail.id}`);
    };

    const handleLike = (e) => {
        e.stopPropagation();
        toggleLike(cocktail.id);
        triggerAnimate();
    };


    return (
        <div className={styles.card} onClick={handleClick}>
            <div className={styles.cardWrapper}>
                <img src={cocktail.image} alt={cocktail.name} className={styles.cardImage}/>
            </div>
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{cocktail.name}</h3>
                <p className={styles.cardDescription}>
                    {cocktail.baseLiquors} · {cocktail.ingredients[0]} · {cocktail.abv}도
                </p>

                <div className={styles.cardBottom}>
                    <button className={styles.likeButton} onClick={handleLike}>
                        <span className={`${styles.heartIcon} ${animate ? styles.bump : ""}`}>
                            {liked ? "❤️" : "🤍"}
                        </span>
                                <span className={`${styles.likeCount} ${animate ? styles.bump : ""}`}>
                            {currentLikes}
                        </span>
                    </button>
                    <span className={styles.shakingTag}>
                {cocktail.shaking ? "쉐이킹 ON" : "쉐이킹 OFF"}
            </span>
                </div>
            </div>
        </div>

    );
}