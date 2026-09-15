"use client";
import axios from "axios";
import Url from "@/app/api/Url";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import Cookies from "universal-cookie";

export default function SigninButton() {
    const router = useRouter();
    const { data: session } = useSession();
    const mainUrl = Url();
    const cookie = new Cookies();

    async function GetToken() {
        let res = await axios.get(`${mainUrl}SocialAuth/GoogleAuth/${session?.user?.email}`);

        const token = res.data.token;

        cookie.set("ShortBearer", token, { path: "/", expires: new Date(Date.now()+86400000) });
        cookie.remove("Bearer", { path: "/" });
        window.location.pathname = "/Dashboard";
    }

    useEffect(() => {
        if(session && session.user){
            GetToken();
        }
    }, [session]);

    return (
        <button onClick={ () => signIn()}>Sign in with Facebook or Google</button>
    );
}