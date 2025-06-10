import React, { useRef, useState, useEffect } from "react";
import styles from "./ImageUploadBox.module.css";

export default function ImageUploadBox({ onImageSelect, selectedImage }) {
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        // selectedImage가 string이면 (edit 시 이미지 URL) 미리보기
        if (typeof selectedImage === "string") {
            setPreview(selectedImage);
        }
        // selectedImage가 File 객체면 (create 시 업로드한 이미지) 미리보기
        else if (selectedImage instanceof File) {
            setPreview(URL.createObjectURL(selectedImage));
        } else {
            setPreview(null);
        }
    }, [selectedImage]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            alert("5MB 이하 파일만 업로드 가능합니다.");
            return;
        }
        setPreview(URL.createObjectURL(file));
        onImageSelect(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            alert("5MB 이하 파일만 업로드 가능합니다.");
            return;
        }
        setPreview(URL.createObjectURL(file));
        onImageSelect(file);
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        setPreview(null);
        onImageSelect(null);
        fileInputRef.current.value = '';
    };

    return (
        <div
            className={styles.uploadBox}
            onClick={handleClick}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            {preview ? (
                <div className={styles.previewWrapper}>
                    <img src={preview} alt="preview" className={styles.previewImage} />
                    <button className={styles.deleteButton} onClick={handleDelete}>✕</button>
                </div>
            ) : (
                <>
                    <p className={styles.imagePlaceholder}>📷 <span>대표 이미지 업로드</span></p>
                    <p className={styles.imageSubtext}>정사각형 권장, 최대 5MB</p>
                    <p className={styles.uploadText}>클릭 또는 이미지를 드래그해서 업로드</p>
                </>
            )}

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
        </div>
    );
}