import {useNavigate} from "react-router-dom";
import styles from "./CocktailCard.module.css";
import getAbvTag from "../../utils/getAbvTag.js";
import likeAnimation from "../../utils/likeAnimation.js";
import {useCocktailContext} from "../../context/CocktailContext.jsx";

export default function CocktailCard({cocktail}) {
    const navigate = useNavigate();
    const {label, icon} = getAbvTag(cocktail.abv);
    const {toggleLike, likedMap , localLikes} = useCocktailContext();
    const liked = likedMap[cocktail.id] || false;
    const [animate, triggerAnimate] = likeAnimation();
    const displayedLikes = cocktail.likes + (localLikes[cocktail.id] ?? 0);

    const handleClick = () => {
        navigate(`/post/${cocktail.id}`);
    };

    const handleLike = (e) => {
        e.stopPropagation();
        toggleLike(cocktail.id);
        triggerAnimate()
    };

    return (<div className={styles.card} onClick={handleClick}>
            <img src={cocktail.image} alt={cocktail.name} className={styles.cardImage}/>

            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{cocktail.name}</h3>

                <div className={styles.cardTags}>
                    <span className={styles.tagBaseLiquors}>{cocktail.baseLiquors}</span>
                    <span className={styles.tagIngredient}>{cocktail.ingredients[0]}</span>
                    <span className={styles.tagShaking}>{cocktail.shaking ? "쉐이킹 ON" : "쉐이킹 OFF"}</span>
                </div>
            </div>

            <p className={styles.description}>{cocktail.description}</p>

            <button className={styles.likeButton} onClick={handleLike}>
                <span className={`${styles.heartIcon} ${animate ? styles.bump : ""}`}>
                    {liked ? "❤️" : "🤍"}
                </span>
                <span className={`${styles.likeCount} ${animate ? styles.bump : ""}`}>
                    {displayedLikes}
                </span>
            </button>

            <img
                src={icon}
                alt={label}
                className={styles.abvBadge}
            />
        </div>);
}
