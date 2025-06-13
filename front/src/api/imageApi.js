import axios from "./axiosInstance";

// 이미지 업로드 (Base64 전송 방식)
export const uploadImage = ({ filename, base64Data, contentType }) =>
    axios.post("/img/upload/json", { filename, base64Data, contentType });

// 이미지 삭제
export const deleteImage = (key) =>
    axios.delete(`/img/delete/${key}`);