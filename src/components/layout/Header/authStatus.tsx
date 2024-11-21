"use client";

import { Button, Spin } from "antd";
import {useSession, signIn, signOut} from "next-auth/react"
import { UserCard } from "./UserCard";
import { GetStaticProps } from "next";
import Loader from "../loader/Loader";

export async function keycloakSessionLogOut(){
    try{
        await fetch(`/api/auth/logout`, {method: "GET"});
    } catch (err){
        console.log(err)
    }
}

export default function AuthStatus(){
    const {data: session, status} = useSession();
    // {data: {}, status: "loading"}

    if(status == "loading"){
        return <Spin />
    } else if (session) {
        return (
            <div className="my-3">
                <UserCard user={session}/>
            </div>
        );
    }


    return (
        <div className="my-3">
            <Button type="primary" onClick={() => signIn("keycloak")}>
                Login
            </Button>
        </div>
    );
}