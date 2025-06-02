import { useNavigate } from "react-router-dom";
import styles from "./CocktailCard.module.css";
import getAbvTag  from "../../utils/getAbvTag.js";
import { useCocktailContext} from "../../context/CocktailContext.jsx";

export default function CocktailCard({ cocktail }) {
    const navigate = useNavigate();
    const {updateLikes} = useCocktailContext()

    const handleClick = () => {
        navigate(`/${cocktail.id}`);
    };

    const handleLike = (e) => {
        e.stopPropagation();
        updateLikes(cocktail.id);
    };

    return (
        <div className={styles.card} onClick={handleClick}>
            <img src={cocktail.image} alt={cocktail.name} className={styles.cardImage} />

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
                ❤️ {cocktail.likes}
            </button>

            <img
                src={`/assets/${getAbvTag(cocktail.abv)}.png`}
                alt={getAbvTag(cocktail.abv)}
                className={styles.abvBadge}
            />
        </div>
    );
}
