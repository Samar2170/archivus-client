"use client";

import Image from "next/image";
import { FileMetaData, getFilesByFolderResponse } from "@/app/api/files";
import { Folder, File as FileIcon } from "lucide-react";
import Link from "next/link";

interface FileCardProps {
  file: getFilesByFolderResponse;
}

export default function FileCard({ file }:{file:FileMetaData}) {
    const isDir = file.IsDir;
  
    return (
      <div className="w-40 border rounded-lg shadow-sm p-3 flex flex-col items-center gap-2 hover:shadow-md transition">
        {isDir ? (
        <Link href={'/?folder='+file.Path}>
          <Folder className="w-16 h-16 text-blue-500" />
          </Link>
        ) : file.SignedUrl && file.Extension.match(/(png|jpg|jpeg|gif)$/i) ? (
            <Link href={file.SignedUrl}>
            <Image
            src={file.SignedUrl}
            alt={file.Name}
            width={64}
            height={64}
            className="rounded-md object-cover"
          /> </Link>
        ) : (
            <Link href={file.SignedUrl}>
          <FileIcon className="w-16 h-16 text-gray-500" />
          </Link>
        )}
  
        <div className="text-center">
          <p className="text-sm font-medium truncate w-32">{file.Name}</p>
          {!isDir && (
            <p className="text-xs text-gray-500">
              {(file.Size).toFixed(1)} MB
            </p>
          )}
        </div>
      </div>
    );
}