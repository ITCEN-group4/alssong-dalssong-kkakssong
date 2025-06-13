import axios from "./axiosInstance";

// 게시글 조회 (공식/유저 통합)
export const getPosts = (params) =>
    axios.post("/posts/search", params);

// 공식 레시피용
export const getOfficialPosts = (params) =>
    getPosts({ ...params, is_official: true });

// 유저 공유용
export const getUserPosts = (params) =>
    getPosts({ ...params, is_official: false });

// 유저 칵테일 상세 조회
export const getPostById = (postId) =>
    axios.get(`/posts/${postId}`);

// 게시글 좋아요 추가
export const postLike = (postId) =>
    axios.post(`/posts/${postId}/likes`);

// 게시글 좋아요 취소
export const deleteLike = (postId) =>
    axios.delete(`/posts/${postId}/likes`);

// 게시글 생성
export const createPost = (data) =>
    axios.post("/posts/create", data);

// 게시글 수정
export const updatePost = (postId, data) =>
    axios.put(`/posts/update/${postId}`, data);

// 게시글 삭제
export const deletePost = (postId) =>
    axios.delete(`/posts/remove/${postId}`);

// 마이페이지 - 내가 쓴 글 조회
export const getMyPosts = (params) =>
    axios.post("/mypage/posts",params);