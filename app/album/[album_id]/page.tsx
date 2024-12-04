// page.tsx
"use client";
import React from "react";
import Image from "next/image";
import { get_album_photos } from "@/app/lib/api";

interface AlbumProps {
  params: {
    album_id: string;
  };
}

const Album: React.FC<AlbumProps> = ({ params }) => {
  const [imagesNames, setImagesNames] = React.useState<string[]>([]);
  const [loadedImages, setLoadedImages] = React.useState<{
    [key: string]: boolean;
  }>({});
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState<
    number | null
  >(null);

  React.useEffect(() => {
    const setarImagens = async () => {
      const photos = await get_album_photos(params.album_id);
      if (Array.isArray(photos)) {
        setImagesNames(photos);
      }
    };

    setarImagens();
  }, [params.album_id]);

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImageIndex(null);
  };

  const handleImageLoad = (imageName: string) => {
    setLoadedImages((prev) => ({ ...prev, [imageName]: true }));
  };

  return (
    <div className="grid grid-cols-5 grid-rows-N items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {imagesNames?.map((imageName: string, index: number) => (
        <div key={index}>
          <div className="relative w-80 h-80" onClick={() => openModal(index)}>
            <Image
              width={300}
              height={300}
              alt="Thumbnail"
              src={`http://127.0.0.1:8000/publicos/${params.album_id}/${imageName}?thumbnail=true`}
              className={`object-cover w-80 h-80 transition-opacity duration-500 ${
                loadedImages[imageName] ? "opacity-0" : "opacity-100"
              }`}
              loading="lazy"
            />
            <Image
              width={300}
              height={300}
              alt="Image"
              src={`http://127.0.0.1:8000/publicos/${params.album_id}/${imageName}`}
              className={`object-cover w-80 h-80 absolute top-0 left-0 transition-opacity duration-500 ${
                loadedImages[imageName] ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              onLoad={() => handleImageLoad(imageName)}
              onError={(e) => {
                console.log(e);
                const target = e.target as HTMLImageElement;
                target.src = `http://127.0.0.1:8000/publicos/${params.album_id}/${imageName}?w=${target.width}`;
              }}
            />
          </div>
          {isModalOpen && currentImageIndex !== null && (
            <div
              className="fixed inset-0 bg-white bg-opacity-5 flex items-center justify-center z-50"
              onClick={closeModal}
            >
              <button
                className="absolute top-4 right-4 text-white"
                onClick={closeModal}
              >
                Close
              </button>
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <Image
                  width={800}
                  height={800}
                  alt="Current Image"
                  src={`http://127.0.0.1:8000/publicos/${params.album_id}/${imagesNames[currentImageIndex]}`}
                  className="object-contain max-w-full max-h-full"
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Album;
