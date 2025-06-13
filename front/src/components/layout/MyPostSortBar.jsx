import React from "react";

export default function MyPostSortBar({ sortOption, setSortOption }) {
    return (
        <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "0.9rem",
            }}
        >
            <option value="latest">최신순</option>
            <option value="like">좋아요순</option>
        </select>
    );
}
