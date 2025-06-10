import { useLocation } from "react-router-dom";
import MyPageSidebar from "../components/layout/MyPageSidebar";
import MyInfoPage from "./MyInfoPage";
import MyPostViewPage from "./MyPostViewPage";
import styles from "./MyPage.module.css";
import NavBar from "../components/layout/NavBar.jsx";

export default function MyPage() {
    const location = useLocation();
    const currentPath = location.pathname;

    // 탭에 따라 보여줄 컴포넌트 결정
    const renderContent = () => {
        if (currentPath === "/mypage/posts") return <MyPostViewPage />;
        return <MyInfoPage />;
    };

    const handleLogout = () => {
        // 로그아웃 로직 필요(localStorage 제거, navigate 메인화면 등)
        console.log("로그아웃");
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