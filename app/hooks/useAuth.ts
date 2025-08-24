'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export function useAuth() {
    const router = useRouter();

    useEffect(() => {
        if (typeof window === "undefined") return;
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }
    },[])
}