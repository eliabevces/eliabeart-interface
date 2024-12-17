import React from "react";
import AlbumList from "./components/AlbumList";

export default async function Home() {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/publicos", {
    cache: "no-store",
  });
  const data = await response.json();
  const albums = data.albuns;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <AlbumList albums={albums} />
      </main>
    </div>
  );
}
