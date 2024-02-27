"use client";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

type Props = {
  src: string | StaticImageData;
  alt: string;
};

export default function ImageLoaderProfile({ src, alt }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="relative">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={800}
        className="w-[200px] h-[200px] rounded-full mb-2"
        onLoad={() => setIsLoading(true)}
      />
      <div
        className={`absolute top-0 left-0 right-0 bottom-0 bg-white dark:bg-gray-900 ${
          isLoading ? "opacity-0 invisible" : "opacity-100 visible"
        } transition-all ease-in-out duration-200`}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <FontAwesomeIcon
            icon={faSpinner}
            size="2x"
            className="text-sky-600 animate-spin"
          />
        </div>
      </div>
    </div>
  );
}
