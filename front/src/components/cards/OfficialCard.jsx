import { useNavigate } from "react-router-dom";
import styles from "./OfficialCard.module.css";
import { useCocktailContext} from "../../context/CocktailContext.jsx";

export default function OfficialCard({ cocktail }) {
    const navigate = useNavigate();
    const {updateLikes} = useCocktailContext()

    const handleClick = () => {
        navigate(`/post/${cocktail.id}`);
    };

    const handleLike = (e) => {
        e.stopPropagation();
        updateLikes(cocktail.id);
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
                        ❤️ {cocktail.likes}
                    </button>
                    <span className={styles.shakingTag}>
                {cocktail.shaking ? "쉐이킹 ON" : "쉐이킹 OFF"}
            </span>
                </div>
            </div>
        </div>

    );
}