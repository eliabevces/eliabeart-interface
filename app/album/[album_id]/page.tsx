"use client";
import React from 'react';
import Image from 'next/image';

interface AlbumProps {
  params: {
    album_id: string;
  };
}


const Album: React.FC<AlbumProps> = async ({ params }) => {
  if (!params.album_id) {
    return <div>Loading...</div>;
  }

  try {
    const response =  await fetch(`http://127.0.0.1:8000/publicos/${params.album_id}`, { cache: 'no-store' });
    const responseData = await (response as Response).json();
    const images_names = responseData.fotos;

    return (
      <div className="grid grid-cols-5 grid-rows-N items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {images_names.map((image_name: string, index: React.Key | null | undefined) => (
          <Image
            key={index}
            src={`http://127.0.0.1:8000/publicos/${params.album_id}/${image_name}`}
            width={300}
            height={300}
            alt="Picture of the author"
            loading="lazy"
          />
        ))}
      </div>
    );
  } catch (error) {
    console.error('Fetch error:', error);
    return <div>Error loading album. Please try again later.</div>;
  }
};


export default Album;