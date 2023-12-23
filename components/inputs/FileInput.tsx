"use client"
import React, { useEffect, useState } from "react";
import {
  FileInput,
  FileInputProps as MantineFileInputProps,
} from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import Image from "next/image";

type FileInputProps = {
  fileType: "image/*" | "application/*" | "audio/*" | "video/*";
  file?: string;
  onFileChange?: (file: File) => void;
} & MantineFileInputProps;

export default function FileUpload({ error, ...props }: FileInputProps) {
  const [file, setFile] = useState<File | undefined>();
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(props.file as string | undefined);

  console.log(file);
  function handleFileChange(file: File | null) {
    if (file) {
      setFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    } else {
      setPreviewUrl(undefined);
    }
  }

  const fetchImageAsFile = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], "preview_img", { type: blob.type });
      setFile(file);
      if (props.onFileChange) {
        props.onFileChange(file); // Call the callback with the new file
      }

    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    if (props.file && typeof props.file === "string") {
      fetchImageAsFile(props.file as string);
    }

  },[]);


  const icon = <IconPhoto style={{ width: 16, height: 16 }} stroke={1.5} />;
  return (
    <div className="flex flex-col items-start justify-center w-full gap-6">
      <FileInput
        leftSection={icon}
        placeholder="Upload image"
        value={file}
        label="Project Cover Photo"
        onChange={(file)=>handleFileChange(file)}
        accept="image/*"
        radius="md"
        className="w-full"
        withAsterisk
        error={error} 
      
      />

      {previewUrl && props.fileType == "image/*" && (
        <div className="w-1/2 h-auto">
          <Image
            alt="Preview image"
            src={previewUrl}
            // layout="fill"
            // objectFit="contain"
            width={300}
            height={300}
            className="w-24 border-2 rounded-xl h-100 border-zinc-200"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
