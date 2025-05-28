import { get_album_photos } from "@lib/api";
import AlbumClient from "./AlbumClient";

export default async function AlbumPage({
  params,
}: {
  params: { album_id: string };
}) {
  const images = await get_album_photos(params.album_id);

  return <AlbumClient images={images} album_id={params.album_id} />;
}
