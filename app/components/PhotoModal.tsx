import React, { useState } from "react";
import Image from "next/image";
import { blurhashToBase64 } from "blurhash-base64";

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
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50"
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
      <button className="absolute top-4 right-4 text-black" onClick={onClose}>
        Close
      </button>

      {index > 0 && (
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-md hover:bg-gray-800"
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
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <Image
          width={800}
          height={800}
          alt="Current Image"
          src={
            process.env.NEXT_PUBLIC_API_URL +
              `/publicos/${album_id}/${images[index].nome}` || ""
          }
          placeholder="blur"
          blurDataURL={blurhashToBase64(images[index].hash)}
          className="object-contain max-w-full max-h-full"
          loading="lazy"
        />
      </div>
      {index < images.length - 1 && (
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-md hover:bg-gray-800"
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
