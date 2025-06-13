import {useLocation, useNavigate} from "react-router-dom";
import MyPageSidebar from "../components/layout/MyPageSidebar";
import MyInfoPage from "./MyInfoPage";
import MyPostViewPage from "./MyPostViewPage";
import styles from "./MyPage.module.css";
import NavBar from "../components/layout/NavBar.jsx";

export default function MyPage() {
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();

    // 탭에 따라 보여줄 컴포넌트 결정
    const renderContent = () => {
        if (currentPath === "/mypage/posts") return <MyPostViewPage />;
        return <MyInfoPage />;
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        console.log("로그아웃");
        navigate("/posts?reset=true");
    };

    return (
        <>
            <NavBar/>
        <div className={styles.pageWrapper}>
            <aside className={styles.sidebar}>
                <MyPageSidebar onLogout={handleLogout} />
            </aside>

            <main className={styles.contentWrapper}>
                {renderContent()}
            </main>
        </div>
        </>
    );
}