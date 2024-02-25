"use client";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CustomEditorNOSSR = dynamic(() => import("@/components/CustomEditor"), {
  ssr: false,
});

type Props = {
  initialData?: string;
};

export default function Editor({ initialData }: Props) {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <CustomEditorNOSSR initialData={initialData} />
      ) : (
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
          <span>Loading Editor</span>
        </div>
      )}
    </>
  );
}
