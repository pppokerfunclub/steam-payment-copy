import Image from "next/image";
import { ComponentProps } from "react";

interface OptimizedImageProps
  extends Omit<ComponentProps<typeof Image>, "src"> {
  src: string;
  alt: string;
  fallback?: string;
}

export function OptimizedImage({
  src,
  alt,
  fallback = "/assets/placeholder.png",
  ...props
}: OptimizedImageProps) {
  // Обработка различных типов источников изображений
  const getImageSrc = () => {
    // Если это локальный путь
    if (src.startsWith("/") || src.startsWith("./")) {
      return src;
    }

    // Если это внешний URL
    if (src.startsWith("http://") || src.startsWith("https://")) {
      return src;
    }

    // Если это относительный путь, добавляем /
    if (!src.startsWith("/")) {
      return `/${src}`;
    }

    return src;
  };

  return (
    <Image
      src={getImageSrc()}
      alt={alt}
      {...props}
      // Добавляем обработку ошибок
      onError={(e) => {
        if (fallback && e.currentTarget.src !== fallback) {
          e.currentTarget.src = fallback;
        }
      }}
    />
  );
}
