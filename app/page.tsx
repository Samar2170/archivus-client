'use client';
import Image from "next/image";
import { useAuth } from "./hooks/useAuth";
import FileExplorer from "./ui/fileexplorer";
import { useSearchParams } from "next/navigation";

export default function Home() {
  useAuth();
  const searchParams = useSearchParams();
  const folder = searchParams.get('folder') || '';
  return (
    <>
    <FileExplorer folder={folder} />
    </>
  );
}
