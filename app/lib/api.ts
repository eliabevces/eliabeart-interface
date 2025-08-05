import { Foto } from "@/app/types/Foto";



export const get_album_photos = async (album_id: string) => {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.warn("NEXT_PUBLIC_API_URL is not set. Cannot fetch album photos.");
    return [];
  }

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/images/${album_id}`, {
      next: { revalidate: 60 }, 
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
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.warn("NEXT_PUBLIC_API_URL is not set. Cannot fetch album photos.");
    return [];
  }

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/albuns", {
      next: { revalidate: 60 },
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


export const random_photo = async (): Promise<Omit<Foto, "id"> | null> => {
  try {
    const response = await fetch("/api/random-photo", {
      next: { revalidate: 60 },
    });
    
    if (!response.ok) {
      console.warn(`Failed to fetch random photo: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

