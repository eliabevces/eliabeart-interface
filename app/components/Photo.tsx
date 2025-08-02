import Image from "next/image";
import { blurhashToBase64 } from "blurhash-base64";

const Photo = ({
  imageName,
  descricao,
  hash,
  album_id,
  width,
  height,
  className,
}: {
  imageName: string;
  descricao: string;
  hash?: string;
  album_id: number;
  width: number;
  height: number;
  className: string;
}) => (
  <Image
    width={width}
    height={height}
    src={
      process.env.NEXT_PUBLIC_API_URL +
      `/images/${album_id}/${imageName}`
    }
    alt={descricao || "Image description"}
    blurDataURL={blurhashToBase64(hash || "")}
    placeholder={hash ? "blur" : undefined}
    loading="lazy"
    className={className}
  />
);

export default Photo;
