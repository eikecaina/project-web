"use server";

import {authOptions} from "app/api/auth/[...nextauth]/[...nextauth]";
import { getServerSession } from "next-auth";
import { decrypt } from "./encryption";

export async function getAccessToken(){
    const session = await getServerSession(authOptions);
    if(session){
        const accessTokenDecrypted = decrypt(session.access_token as string)
        return accessTokenDecrypted;
    }
    return null;
}

export async function getIdToken(){
    const session = await getServerSession(authOptions);
    if(session){
        const accessTokenDecrypted = decrypt(session.id_token)
        return accessTokenDecrypted;
    }
    return null;
}

export async function getSession(){
    const session = await getServerSession(authOptions);
    return session;
}
