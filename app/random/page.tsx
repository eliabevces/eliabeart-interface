"use client";
import React from "react";
import Photo from "@components/Photo";
import { random_photo } from "@lib/api";

interface Foto {
  id: number;
  descricao: string;
  album_id: number;
  nome: string;
  hash: string;
}

const Random: React.FC = () => {
  const [foto, setFoto] = React.useState<Foto>({} as Foto);

  React.useEffect(() => {
    const fetchRandomPhoto = async () => {
      console.log("Fetching random photo...");
      const randomPhoto = await random_photo();
      console.log(randomPhoto);
      setFoto(randomPhoto);
    };

    fetchRandomPhoto();
  }, []);

  return (
    <div
      className="flex items-center justify-center m-4"
      style={{ height: "80vh" }}
    >
      <Photo
        imageName={foto?.nome}
        descricao={foto?.descricao || ""}
        hash={foto?.hash}
        album_id={Number(foto.album_id)}
        width={1000}
        height={1000}
        className="max-w-full max-h-full object-contain max-h-[100vh]"
      />
    </div>
  );
};

export default Random;
