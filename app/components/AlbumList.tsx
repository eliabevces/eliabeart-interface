"use client";

import React from "react";
import Link from "next/link";

// {
//   "albuns": [
//       {
//           "id": 1,
//           "publico": true,
//           "passcode": "",
//           "nome": "formatura",
//           "descricao": "Fotos de formatura Eliabe"
//       }
//   ]
// }
interface AlbumListProps {
  albums: { id: string; nome: string }[];
}

const AlbumList: React.FC<AlbumListProps> = ({ albums }) => {
  console.log(albums);
  if (!Array.isArray(albums)) return <></>;
  return (
    <div>
      {albums.map((album) => (
        <Link key={album.id} href={`/album/${album.id}`}>
          <p>{album.nome}</p>
          {/* <a>{album.nome}</a> */}
        </Link>
      ))}
    </div>
  );
};

export default AlbumList;
