"use client";
import React from "react";
import Photo from "@components/Photo";
import { random_photo } from "@lib/api";
import { Foto } from "../types/Foto";

const Random: React.FC = () => {
  const [foto, setFoto] = React.useState<Omit<Foto, "id">>(
    {} as Omit<Foto, "id">
  );
  const fetchedRef = React.useRef(false);

  React.useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchRandomPhoto = async () => {
      const randomPhoto = await random_photo();
      console.log("Random photo fetched:", randomPhoto);
      if (randomPhoto) {
        setFoto(randomPhoto);
      }
    };

    fetchRandomPhoto();
  }, []);

  return (
    <div
      className="flex items-center justify-center m-4"
      style={{ height: "80vh" }}
    >
      {foto && foto.nome && foto.width && foto.height ? (
        <Photo
          imageName={foto.nome}
          descricao={foto.descricao || ""}
          hash={foto.hash}
          album_id={foto.album_id}
          width={foto.width || 700}
          height={foto.height || 700}
          className="max-w-[80vw] max-h-full object-contain max-h-[100vh]"
        />
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

export default Random;
