import { Foto } from "@/app/types/Foto";
import type { User } from "@/app/types/auth";


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

export const random_photo = async (): Promise<Omit<Foto, "id"> | null> => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/images/random", {
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export const login = async (username: string, password: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Login failed");
  }

  return await response.json();
}


export async function verifyAuthAndFetchUser(): Promise<User | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const response = await fetch(`${apiUrl}/auth/status`, {
      headers: {},
      cache: 'no-store',
    });
    console.log("Response from FastAPI auth check:", response.status);
    if (response.ok) {

      const userData: User = await response.json();
      return userData;
    }
    return null;
  } catch (error) {
    console.error('Error verifying auth or fetching user:', error);
    return null;
  }
}