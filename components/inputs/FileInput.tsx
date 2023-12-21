import React, { useState } from "react";
import { FileInput, FileInputProps } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import Image from "next/image";

import fs from "fs";

import AWS from "aws-sdk"


export default function FileUpload(props: FileInputProps) {
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();

  function handleFileChange(file: File | null) {
    if (file) {
      setFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    } else {
      setPreviewUrl(undefined);
    }
  };


   async function handleUpload() {
     if (!file) {
       return;
     }

     // Initialize the AWS S3 client
     const s3 = new AWS.S3({
       endpoint: process.env.NEXT_PUBLIC_S3_ENDPOINT || "",
       credentials: {
         accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY || "",
         secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY || "",
       },
       region: "us1",
     });

     const fileKey = file.name;
     const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET || "";

     try {
       // Create the upload object
    
  
         const uploadParams =  {
           Bucket: bucketName,
           Key: fileKey,
           Body: file,
           ContentType: file.type,
           ACL: "public-read"}
     
       // Execute the upload
       const upload = await s3.upload(uploadParams).promise();
       console.log("File uploaded successfully: ", upload);

     } catch (error) {
       console.error("Error uploading file:", error);
     }
   }

  const icon = <IconPhoto style={{ width: 16, height: 16 }} stroke={1.5} />;

  return (
    <div className="flex flex-col items-start justify-center w-full gap-4">
      <FileInput
        leftSection={icon}
        placeholder="Upload image"
        label="Project Cover Photo"
        onChange={handleFileChange}
        accept="image/*"
        radius="md"
        className="w-full"
        withAsterisk
      />
      {previewUrl && (
        <div className="w-1/2 h-auto">
          <Image
            alt="preview image"
            src={previewUrl}
            width={0}
            height={0}
            className="w-full h-full rounded-xl"
          />
        </div>
      )}
      <button
        onClick={handleUpload}
        className="mt-2">
        Upload to S3
      </button>
    </div>
  );
}
