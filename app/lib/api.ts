import { Foto } from "@/app/types/Foto";

// Check if we're in build mode or if API is available
const isBuilding = process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_API_URL;

export const get_album_photos = async (album_id: string) => {
  // Return empty array during build if API is not available
  if (isBuilding) {
    return [];
  }

  try {
    console.log(process.env.NEXT_PUBLIC_API_URL + `/${album_id}`);
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/images/${album_id}`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });
    
    if (!response.ok) {
      console.warn(`Failed to fetch album photos for album ${album_id}: ${response.status}`);
      return [];
    }
    
    const data = await response.json();
    return data?.images || [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export const get_albuns = async () => {
  // Return empty array during build if API is not available
  if (isBuilding) {
    return [];
  }

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/albuns", {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });
    
    if (!response.ok) {
      console.warn(`Failed to fetch albums: ${response.status}`);
      return [];
    }
    
    const data = await response.json();
    return data?.albuns || [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
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

export const random_photo = async (): Promise<Omit<Foto, "id"> | null> => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/images/random", {
      cache: "no-store", // Keep no-store for random endpoint as it should always be different
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

