"use client";

import { useRef, useState } from "react";
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import config from "@/lib/config";
import Image from "next/image";
import { toast } from "sonner";
import { FileUploadProps } from "@/types";
import { cn } from "@/lib/utils";

const { publicKey, urlEndpoint } = config.env.imagekit;

console.log("ImageKit URL Endpoint:", urlEndpoint);

const authenticator = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/imagekit`
    );

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();

    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

export default function FileUpload({
  type,
  placeholder,
  variant,
  folder,
  accept,
  onFileChange,
  value,
}: FileUploadProps) {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });
  const [progress, setProgress] = useState(0);

  const style = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast.success(`${type} uploaded successfully`, {
      description: `${res.filePath} has been uploaded successfully`,
      style: { backgroundColor: "rgb(34 197 94)", color: "#fff" },
    });
  };

  const onError = (error: any) => {
    console.log("error", error);
    toast.error(`${type} upload failed`, {
      description: `Your ${type} could not be uploaded. Please try again`,
      style: { backgroundColor: "rgb(239 68 68)", color: "#fff" },
    });
  };

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 1024 * 1024 * 20) {
        toast.error("File size too large", {
          description: "File size should be less than 20MB",
          style: { backgroundColor: "rgb(239 68 68)", color: "#fff" },
        });

        return false;
      }
    } else if (type === "video") {
      if (file.size > 1024 * 1024 * 50) {
        toast.error("File size too large", {
          description: "File size should be less than 50MB",
          style: { backgroundColor: "rgb(239 68 68)", color: "#fff" },
        });

        return false;
      }
    }

    return true;
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
      />

      <button
        className={cn("upload-btn", style.button)}
        onClick={(e) => {
          e.preventDefault();
          // @ts-ignore
          ikUploadRef.current?.click();
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className={cn("text-base", style.placeholder)}>{placeholder}</p>

        {file && (
          <p className={cn("upload-filename", style.text)}>{file.filePath}</p>
        )}
      </button>

      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {file &&
        (type === "image" ? (
          <IKImage
            alt={file.filePath ?? "Uploaded file"}
            path={file.filePath ?? undefined}
            width={500}
            height={300}
          />
        ) : type === "video" ? (
          <IKVideo
            path={file.filePath ?? undefined}
            controls={true}
            width={500}
            height={300}
            className="h-96 w-full rounded-xl"
          />
        ) : null)}
    </ImageKitProvider>
  );
}
