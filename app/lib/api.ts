export const get_album_photos = async (album_id: string) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/publicos/${album_id}`, {
      cache: "no-store",
    });
    const data = await response.json();
    return data?.fotos;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}