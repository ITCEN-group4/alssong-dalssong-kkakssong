import React from "react";

export default function SortBar({ sortOption, setSortOption }) {
    function getButtonStyle(active) {
        return {
            margin: '4px',
            padding: '8px 12px',
            borderRadius: '20px',
            border: '1px solid #ccc',
            backgroundColor: active ? '#ffa8b1' : '#fff',
            cursor: 'pointer',
        };
    }

    return (
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <span style={{ fontWeight: 'bold' }}>정렬 :</span>
            <button
                onClick={() => setSortOption("likes")}
                style={getButtonStyle(sortOption === "likes")}
            >
                좋아요 순
            </button>
            <button
                onClick={() => setSortOption("latest")}
                style={getButtonStyle(sortOption === "latest")}
            >
                최신 순
            </button>
        </div>
    );

}
