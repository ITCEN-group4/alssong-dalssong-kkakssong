import React from "react";
import styles from "./Pagination.module.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const getPageNumbers = () => {
        const pages = [];

        for (let i = 1; i <= Math.min(3, totalPages); i++) {
            pages.push(i);
        }

        if (totalPages > 4 && currentPage < totalPages - 1) {
            pages.push("...");
        }

        if (totalPages > 3) {
            pages.push(totalPages);
        }

        return pages;
    };

    const pageItems = getPageNumbers();

    return (
        <div className={styles.pagination}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles.navButton}
            >
                &lt;
            </button>

            {pageItems.map((page, idx) =>
                page === "..." ? (
                    <span key={idx} className={styles.ellipsis}>...</span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`${styles.pageButton} ${page === currentPage ? styles.active : ""}`}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={styles.navButton}
            >
                &gt;
            </button>
        </div>
    );
}
