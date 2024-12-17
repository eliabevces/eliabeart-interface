export const get_album_photos = async (album_id: string) => {
  try {
    console.log(process.env.NEXT_PUBLIC_API_URL + `/publicos/${album_id}`);
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/publicos/${album_id}`, {
      cache: "no-store",
    });
    const data = await response.json();
    return data?.fotos;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}