import { ComponentProps } from "react";
import NextImage from "next/image";

type Height = ComponentProps<typeof NextImage>["height"];
type Width = ComponentProps<typeof NextImage>["width"];

export default function Image({
  src,
  alt = "alt",
  width = 800,
  height = 350,
  ...props
}: ComponentProps<"img">) {
  if (!src) return null;
  // Convert Blob to URL if needed
  const resolvedSrc =
    typeof src === "string" ? src : (URL.createObjectURL(src) as string);

  return (
    <NextImage
      src={resolvedSrc}
      alt={alt}
      width={width as Width}
      height={height as Height}
      quality={40}
      {...props}
    />
  );
}
