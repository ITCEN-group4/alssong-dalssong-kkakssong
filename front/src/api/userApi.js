import axios from "./axiosInstance";

// 로그인
export const loginUser = ({ email, password }) =>
    axios.post("/login", { email, password });

// 회원가입
export const signupUser = ({ email, password, nickname }) =>
    axios.post("/users", { email, password, nickname });

// 내 정보 조회
export const getMyInfo = () => {
    return axios.get("/users/me"); }

// 닉네임 변경
export const updateNickname = (nickname) =>
    axios.put("/users/nickname", { nickname });

// 비밀번호 변경
export const updatePassword = (currentPassword, newPassword) =>
    axios.put("/users/password", { currentPassword, newPassword });

// 회원탈퇴
export const deleteUser = () =>
    axios.delete("/users");