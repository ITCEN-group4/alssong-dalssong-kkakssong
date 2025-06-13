//API 응답(post) 객체를 프론트에서 사용하는 카드 형태로 변환
import getAbvTag from "./getAbvTag.js";

export function mapApiToFrontData(post) {
    return {
        id: post.post_id,
        userId: post.user_id,
        name: post.title,
        writerNickname: post.user_nickname,
        image: post.image_url,
        abv: post.difficulty,
        level: getAbvTag(post.difficulty).label,
        baseLiquors: post.base_liquors,
        ingredients: post.ingredients,
        likes: post.like_count,
        createdAt: post.created_at,
        shaking: post.is_shaken,
        isLiked: post.is_liked,
        description: post.content,
        recipe: post.recipe
    };
}