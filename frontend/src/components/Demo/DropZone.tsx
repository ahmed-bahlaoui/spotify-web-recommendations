import { Upload } from "lucide-react";
import type React from "react";
import type { RefObject } from "react";

interface FileDropZoneProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleBoxClick: () => void;
  handleDrageOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileSelect: (files: FileList | null) => void;
}

export default function FileDropzone({
  fileInputRef,
  handleBoxClick,
  handleDrageOver,
  handleDrop,
  handleFileSelect,
}: FileDropZoneProps) {
  return (
    <div className="max-w-[600]  w-full">
      {/*<div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-white/[.02]" />*/}
      <div
        className="border-2 border-white/6  border-dashed   rounded-sm px-10 py-5  md:py-15 flex flex-col gap-3 items-center justify-center text-center cursor-pointer"
        onClick={handleBoxClick}
        onDragOver={handleDrageOver}
        onDrop={handleDrop}
      >
        <div>
          <Upload className="h-8 w-8 text-white" />
        </div>
        <div>
          <p className="text-sm font-medium text-white/85">
            Upload a audio file
          </p>
          <p className="text-sm text-white/85 mt-1">
            or,{" "}
            <label
              htmlFor="fileUpload"
              className="text-white duration-300 transition-all hover:text-white/80 font-medium cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              click to browse
            </label>{" "}
          </p>
        </div>
        <input
          type="file"
          id="fileUpload"
          ref={fileInputRef}
          className="hidden"
          accept="audio/*"
          onChange={(e) => handleFileSelect(e.target.files)}
        />
      </div>
    </div>
  );
}
