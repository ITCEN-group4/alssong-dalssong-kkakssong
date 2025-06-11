import React, { useState } from "react";

export default function SortBar({ sortOption, setSortOption }) {
    const [hovered, setHovered] = useState(null);
    const [active, setActive] = useState(null);

    function getButtonStyle(type) {
        const isSelected = sortOption === type;
        const isHovered = hovered === type;
        const isPressed = active === type;

        const yellow = '#FBBF24';    // 노란색
        const grayBorder = '#E5E7EB';
        const grayText = '#6B7280';

        return {
            fontSize: '14px',
            fontWeight: 500,
            marginTop: '15px',
            margin: '4px',
            padding: '6px 14px',
            borderRadius: '20px',
            border: `2px solid ${
                isSelected ? yellow : isHovered ? '#D1D5DB' : grayBorder
            }`,
            borderWidth: '2px',
            color: isSelected ? yellow : grayText,
            backgroundColor: '#fff',
            cursor: 'pointer',
            outline: 'none',
            boxShadow: isPressed ? 'inset 0 2px 4px rgba(0,0,0,0.1)' : 'none',
            transition: 'all 0.2s ease-in-out',
        };
    }

    return (
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <span style={{ fontWeight: 'bold', fontSize: '14px', marginRight: '8px' }}>정렬 :</span>
            <button
                onClick={() => setSortOption("likes")}
                style={getButtonStyle("likes")}
                onMouseEnter={() => setHovered("likes")}
                onMouseLeave={() => setHovered(null)}
                onMouseDown={() => setActive("likes")}
                onMouseUp={() => setActive(null)}
            >
                좋아요 순
            </button>
            <button
                onClick={() => setSortOption("latest")}
                style={getButtonStyle("latest")}
                onMouseEnter={() => setHovered("latest")}
                onMouseLeave={() => setHovered(null)}
                onMouseDown={() => setActive("latest")}
                onMouseUp={() => setActive(null)}
            >
                최신 순
            </button>
        </div>
    );
}