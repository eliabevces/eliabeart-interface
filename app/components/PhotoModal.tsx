import React, { useState } from "react";
import Photo from "./Photo";
interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  index: number;
  images: { nome: string; hash: string }[];
  album_id: string;
}

const PhotoModal: React.FC<PhotoModalProps> = ({
  isOpen,
  onClose,
  index: initialIndex,
  images,
  album_id,
}) => {
  const [index, setIndex] = useState(initialIndex);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out"
      onClick={onClose}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.stopPropagation();
          if (index > 0) {
            setIndex(index - 1);
          }
        }
        if (e.key === "ArrowRight") {
          e.stopPropagation();
          if (index < images.length - 1) {
            setIndex(index + 1);
          }
        }
      }}
    >
      {index > 0 && (
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-md hover:bg-gray-800 transform transition-transform duration-300 hover:scale-150 ease-in-out"
          onClick={(e) => {
            e.stopPropagation();
            if (index > 0) {
              setIndex(index - 1);
            }
          }}
        >
          {"<"}
        </button>
      )}
      <div
        className="relative transition-transform duration-300 ease-in-out hover:text-gray-700 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <button
            className="absolute top-1 right-4 text-white text-2xl transform transition-transform duration-100 hover:scale-150"
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen((prev) => !prev);
            }}
          >
            ...
          </button>
          {dropdownOpen && (
            <div className="absolute top-1 right-0 mt-10 w-30 bg-white rounded-md shadow-lg z-10">
              <ul className="py-1">
                <li
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(false);
                    fetch(
                      process.env.NEXT_PUBLIC_API_URL +
                        `/images/publicos/${album_id}/${images[index].nome}`
                    )
                      .then((response) => response.blob())
                      .then((blob) => {
                        const imageBlob = new Blob([blob], {
                          type: "image/jpeg",
                        });
                        const url = window.URL.createObjectURL(imageBlob);
                        const link = document.createElement("a");
                        link.href = url;
                        link.download = images[index].nome;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(url);
                      })
                      .catch((error) =>
                        console.error("Download failed:", error)
                      );
                  }}
                >
                  Download
                </li>
              </ul>
            </div>
          )}
        </div>
        <button
          className="absolute top-4 left-4 text-white text-2xl hover: transform transition-transform duration-100 hover:scale-150"
          onClick={(e) => {
            e.stopPropagation();
            setDropdownOpen(false);
            const newTab = window.open(
              process.env.NEXT_PUBLIC_API_URL +
                `/images/publicos/${album_id}/${images[index].nome}`,
              "_blank"
            );
            if (newTab) {
              newTab.focus();
            } else {
              console.error("Failed to open new tab");
            }
          }}
        >
          ⤢
        </button>
        <Photo
          imageName={images[index].nome}
          descricao={""}
          hash={images[index].hash}
          album_id={Number(album_id)}
          width={800}
          height={800}
          className="object-contain max-w-xl max-h-xl"
        />
      </div>
      {index < images.length - 1 && (
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-md hover:bg-gray-800 transform transition-transform duration-300 hover:scale-150 ease-in-out"
          onClick={(e) => {
            e.stopPropagation();
            if (index < images.length - 1) {
              setIndex(index + 1);
            }
          }}
        >
          {">"}
        </button>
      )}
    </div>
  );
};

export default PhotoModal;
