import Image from "next/image";

export default async function Home() {
  const jpg_image = await fetch('http://127.0.0.1:8000/album/4/fotoTeste');


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <Image
        src={jpg_image.url}
        alt="Picture of the author"
        width={500}
        height={500}
        loading="lazy"
      />

      <a href="/album/3" className="bg-[#f0f0f0] text-[#333] font-[family-name:var(--font-geist-sans)] text-lg px-4 py-2 rounded-lg">
        Go to album
      </a>

      </main>
      
    </div>
  );
}
