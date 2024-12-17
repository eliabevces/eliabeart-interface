// page.tsx
"use client";
import React from "react";
import Image from "next/image";
import { get_album_photos } from "@/app/lib/api";
import { blurhashToBase64 } from "blurhash-base64";

interface AlbumProps {
  params: {
    album_id: string;
  };
}

interface Photo {
  id: number;
  descricao: string;
  album_id: number;
  nome: string;
  hash: string;
}

const Album: React.FC<AlbumProps> = ({ params }) => {
  const [images, setImages] = React.useState<Photo[] | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState<
    number | null
  >(null);

  React.useEffect(() => {
    const setarImagens = async () => {
      const photos = await get_album_photos(params.album_id);
      setImages(photos);
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

  return (
    <div className="grid grid-cols-5 grid-rows-N items-center justify-items-center min-h-screen p-8 pb-20 gap-10 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {images?.map(({ nome: imageName }, index) => (
        <div key={index}>
          <div
            className="relative w-80 h-80 cursor-pointer"
            onClick={() => openModal(index)}
          >
            <Image
              width={700}
              height={700}
              alt={images[index].descricao}
              src={
                process.env.NEXT_PUBLIC_API_URL +
                `/publicos/${params.album_id}/${imageName}`
              }
              blurDataURL={blurhashToBase64(images[index].hash)}
              placeholder="blur"
              loading="lazy"
              className="object-cover w-80 h-80 absolute top-0 left-0 transition-opacity duration-500"
              onError={(e) => {
                console.error("Image failed to load:", e);
                const target = e.target as HTMLImageElement;
                target.src =
                  process.env.NEXT_PUBLIC_API_URL +
                  `/publicos/${params.album_id}/${imageName}`;
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                  src={
                    process.env.NEXT_PUBLIC_API_URL +
                    `/publicos/${params.album_id}/${images[currentImageIndex].nome}`
                  }
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
