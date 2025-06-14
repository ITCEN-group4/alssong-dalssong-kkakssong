import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "/api/v1",  // 실제 주소로 변경
    headers: {
        "Content-Type": "application/json",
    },
});

// 요청 시 토큰 추가
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    // 회원가입 또는 로그인 요청일 경우 Authorization 헤더 생략
    const isAuthRequest =
        config.url.includes("/users") && config.method === "post";

    if (token && !isAuthRequest) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// // 응답 에러 처리 (401, 403일 경우 토큰 제거 및 리디렉션)
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         const status = error?.response?.status;
//         if (status === 401 || status === 403) {
//             localStorage.removeItem("token");
//             alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
//             window.location.href = "/auth/login";
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;
