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
  const [images_names, setImagesNames] = React.useState<string[]>([]);

  React.useEffect(() => {
    const setar_imagens = async () => {
      const photos = await get_album_photos(params.album_id);
      if (Array.isArray(photos)) {
        setImagesNames(photos);
      }
    };

    setar_imagens();
  }, [params.album_id]);

  return (
    <div className="grid grid-cols-5 grid-rows-N items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {images_names !== undefined &&
        images_names?.map(
          (image_name: string, index: React.Key | null | undefined) => (
            <Image
              key={index}
              src={`http://127.0.0.1:8000/publicos/${params.album_id}/${image_name}`}
              width={300}
              height={300}
              alt="Picture of the author"
              loading="lazy"
            />
          )
        )}
    </div>
  );
};

export default Album;
