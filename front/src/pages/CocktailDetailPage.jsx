import {useNavigate, useParams} from "react-router-dom";
import React from "react";
import styles from "./CocktailDetailPage.module.css";
import {useCocktailContext} from "../context/CocktailContext.jsx";
import baseIcon from "../assets/baseIcon.svg";
import ingredientIcon from "../assets/ingredientIcon.svg";
import getShakingIcon from "../utils/getShakingIcon.js";
import getAbvIcon from "../utils/getAbcIcon.js";
import likeAnimation from "../utils/likeAnimation.js";
import testData from "../data/cocktailTestData.js";

export default function CocktailDetailPage() {
    const navigate = useNavigate();
    const {id} = useParams();
    const {cocktailList, toggleLike, likedMap, deleteCocktail} = useCocktailContext();
    const cocktail = testData.find((c) => String(c.id) === id);

    if (!cocktail) return <div>존재하지 않는 칵테일입니다.</div>;

    const {label: abvLabel, icon: abvIcon} = getAbvIcon(cocktail.abv);
    const {label: shakingLabel, icon: shakingIcon} = getShakingIcon(cocktail.shaking);
    const currentCocktail = cocktailList.find(c => c.id === cocktail.id);
    const currentLikes = currentCocktail ? currentCocktail.likes : cocktail.likes;
    const liked = likedMap[cocktail.id] || false;
    const [animate, triggerAnimate] = likeAnimation();

    //더미데이터 테스트용 유저 아이디
    const currentUserId = "123";
    const cocktailUserId = cocktail.userId;

    const handleLike = () => {
        toggleLike(cocktail.id);
        triggerAnimate()
    };

    const handleWrite = () => {
        navigate(`/post/update/${cocktail.id}`)
    };

    const handelDelete = () => {
        if (window.confirm(`'${cocktail.name}' 칵테일을 정말 삭제하시겠습니까?`)) {
            deleteCocktail(cocktail.id);
            navigate('/post');
            alert('칵테일이 삭제되었습니다.');
        }
    }; // 지금은 보이는 리스트에서만 삭제되는거고(새로고침 시 살아남) 추후 CocktailContext의 deleteCocktail 함수 수정해야함

    return (
        <div className={styles.detailPage}>
            <div className={styles.pageHeader}>
                <div className={styles.pageHeaderLeft}>
                    <h1>칵테일 정보 공유</h1>
                    <p>칵테일 정보를 공유하는 공간..<br/>다른 유저의 황금레시피를 엿볼 수 있어요.</p>
                </div>
                {currentUserId === cocktailUserId && (
                    <div className={styles.editButtonGroup}>
                        <button
                            className={styles.editButton}
                            onClick={handleWrite}>
                            ✏️ 수정
                        </button>
                        <button
                            className={styles.deleteButton}
                            onClick={handelDelete}>
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
                            <span className={styles.UserName}>{cocktailUserId}</span> {/*유저아이디가 아닌 유저네임 데이터 넣어야됨*/}
                        </div>
                    </div>

                    <p className={styles.description}>{cocktail.description}</p>

                    <div className={styles.infoRow}>
                        <button className={styles.likeButton} onClick={handleLike}>
                            <span className={`${styles.heartIcon} ${animate ? styles.bump : ""}`}>
                                {liked ? "❤️" : "🤍"}
                            </span>
                            <span className={`${styles.likeCount} ${animate ? styles.bump : ""}`}>
                                {currentLikes}
                            </span>
                        </button>
                        <span className={styles.date}>작성일 : {cocktail.date}</span>
                    </div>
                </div>

                <div className={styles.imageWrapper}>
                    <img src={cocktail.image} alt={cocktail.name}/>
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
                        <img src={baseIcon} alt="base" className={styles.infoIcon}/>
                        <span className={styles.iconValue}>{cocktail.baseLiquors}</span>
                    </div>
                    <div className={styles.iconItem}>
                        <span className={styles.iconLabel}>도수</span>
                        <img src={abvIcon} alt="abv" className={styles.infoIcon}/>
                        <span className={styles.iconValue}>{abvLabel}</span>
                    </div>
                    <div className={styles.iconItem}>
                        <span className={styles.iconLabel}>부가재료</span>
                        <img src={ingredientIcon} alt="ingredient" className={styles.infoIcon}/>
                        <span className={styles.iconValue}>{cocktail.ingredients[0]}</span>
                    </div>
                    <div className={styles.iconItem}>
                        <span className={styles.iconLabel}>쉐이킹</span>
                        <img src={shakingIcon} alt="shaking" className={styles.infoIcon}/>
                        <span className={styles.iconValue}>{shakingLabel}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
