"use client";

import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type AlertProps = {
  children: React.ReactNode;
  type: "success" | "error";
  title?: string;
  onClose?: () => void;
  open: boolean;
};

export default function Alert({
  children,
  type,
  title,
  onClose,
  open,
}: AlertProps) {
  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } w-full my-4 p-3 relative  rounded-md ${
        type == "error"
          ? "bg-rose-600/30 text-rose-700"
          : "bg-sky-600/30 text-sky-700"
      }`}
    >
      {title != "undefined" && (
        <h5 className="text-lg font-extrabold">{title}</h5>
      )}
      <div>{children}</div>
      <button
        type="button"
        onClick={onClose}
        className="text-lg absolute top-1 right-2"
      >
        <FontAwesomeIcon icon={faX} />
      </button>
    </div>
  );
}
