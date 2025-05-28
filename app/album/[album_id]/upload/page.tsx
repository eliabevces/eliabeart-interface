"use client";
import { post_album_photos } from "@lib/api";
import React, { useState } from "react";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const album_id = window.location.pathname.split("/")[2];

    post_album_photos(album_id, selectedFile)
      .then((response) => {
        console.log("Upload successful:", response);
        setSelectedFile(null);
        setPreview(null);
      })
      .catch((error) => {
        console.error("Upload failed:", error);
      });
  };

  return (
    <div className="upload-page">
      <h1>Upload JPG Image</h1>
      <input type="file" accept="image/jpeg" onChange={handleFileChange} />
      {preview && (
        <div className="photo-container">
          <img src={preview} alt="Preview" className="photo-preview" />
        </div>
      )}
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button>
      <style jsx>{`
        .upload-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;
        }
        .photo-container {
          margin-top: 10px;
          border: 2px dashed #ccc;
          padding: 10px;
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          max-width: 320px;
        }
        .photo-preview {
          max-width: 100%;
          max-height: 300px;
          border-radius: 4px;
        }
        button {
          margin-top: 10px;
          padding: 8px 16px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default UploadPage;
