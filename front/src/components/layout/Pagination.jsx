import React from "react";
import styles from "./Pagination.module.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className={styles.pagination}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ marginRight: "8px" }}
            >
                이전
            </button>

            <span>{currentPage} / {totalPages}</span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{ marginLeft: "8px" }}
            >
                다음
            </button>
        </div>
    );
}
