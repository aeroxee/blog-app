"use client";

import dynamic from "next/dynamic";

const CustomEditorNOSSR = dynamic(() => import("@/components/CustomEditor"), {
  ssr: false,
});

type Props = {
  initialData?: string;
};

export default function Editor({ initialData }: Props) {
  return (
    <>
      <CustomEditorNOSSR initialData={initialData} />
    </>
  );
}
