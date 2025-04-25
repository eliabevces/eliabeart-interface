import React from "react";
import Link from "next/link";
import Image from "next/image";

interface AlbumListProps {
  albums: { id: string; nome: string; cover: string }[];
}

const AlbumList: React.FC<AlbumListProps> = ({ albums }) => {
  if (!Array.isArray(albums)) return <></>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {albums.map((album) => (
        <>
          <Link key={album.id} href={`/album/${album.id}`} legacyBehavior>
            <a className="flex flex-col items-center text-center bg-white rounded-lg shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg">
              <Image
                className="w-48 h-48 object-cover rounded-t-lg"
                src={
                  process.env.NEXT_PUBLIC_API_URL +
                    `/publicos/${album.id}/${album.cover}` || ""
                }
                alt={album.nome || ""}
                width={300}
                height={300}
              />
              <h2 className="mt-4 mb-2 text-lg font-semibold">{album.nome}</h2>
            </a>
          </Link>
        </>
      ))}
    </div>
  );
};

export default AlbumList;
