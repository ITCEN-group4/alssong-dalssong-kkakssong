import { postLike, deleteLike, getPostById } from "../api/postApi";

export async function handleLikeToggle(post, setPostData) {
    try {
        const postId = post.id;
        if (post.isLiked) {
            await deleteLike(postId);
        } else {
            await postLike(postId);
        }

        // 최신 값 fetch
        const res = await getPostById(postId);
        const updated = {
            ...post,
            isLiked: res.data.data.is_liked,
            likes: res.data.data.like_count,
        };
        setPostData(updated);
    } catch (err) {
        console.error("좋아요 토글 실패:", err);
    }
}