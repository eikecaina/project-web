"use client";

import initTranslations from "@/app/i18n";
import { Button } from "antd";
import {useSession, signIn, signOut} from "next-auth/react"
import { useTranslation } from "react-i18next";

async function keycloakSessionLogOut(){
    try{
        await fetch(`/api/auth/logout`, {method: "GET"});
    } catch (err){
        console.log(err)
    }
}
const i18nNamespaces = ['layout'];
export default async function AuthStatus({ params: { locale } }: { params: { locale: string } }){
    const {data: session, status} = useSession();
    // const { t, resources } = await initTranslations(locale, i18nNamespaces);
    const {t} = useTranslation();
    if(status == "loading"){
        return <div className="my-3">Loading...</div>
    } else if (session) {
        return (
            <div className="my-3">
                Logged in as <span className="text-yellow-100">{session?.user?.email}</span>{" "}
                <button className="bg-blue-900 font-bold text-white py-1 px-2 rounded border border-gray-50"
                onClick={() => {
                    keycloakSessionLogOut().then(() => signOut({callbackUrl: "/"}))
                }}>
                {t("Logout")}
                </button>
            </div>
        );
    }


    return (
        <div className="my-3">
            Not logged in.{" "}
            <Button type="primary" className="bg-blue-900 font-bold text-white py-1 px-2 rounded border border-gray-500" 
                onClick={() => signIn("keycloak")} >
                    {t("Login")}
            </Button>
            {/* // <button className="bg-blue-900 font-bold text-white py-1 px-2 rounded border border-gray-500"
            // onClick={() => signIn("keycloak")}>Log in</button> */}
        </div>
    );
}