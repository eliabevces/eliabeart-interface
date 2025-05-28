export const get_album_photos = async (album_id: string) => {
  try {
    console.log(process.env.NEXT_PUBLIC_API_URL + `/publicos/${album_id}`);
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/images/publicos/${album_id}`, {
      cache: "no-store",
    });
    const data = await response.json();
    return data?.fotos;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

export const get_albums_publicos = async () => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/albums/publicos", {
      cache: "no-store",
    });
    const data = await response.json();
    return data?.albuns;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
export const post_album_photos = async (album_id: string, file: File) => {
  try {
    const formData = new FormData();
    formData.append("foto_file", file);

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/images/${album_id}/${file.name}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}

export const random_photo = async () => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/images/random", {
      cache: "no-store",
    });
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
}