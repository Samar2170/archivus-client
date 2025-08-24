'use client';
import Image from "next/image";
import { useAuth } from "./hooks/useAuth";

export default function Home() {
  useAuth();
  return (
    <></>
  );
}
