import { NextAuthOptions } from "next-auth";
import { encrypt } from "lib/utils/encryption";
import Keycloak from "next-auth/providers/keycloak";
import * as jwt_decode from "jwt-decode";

export const authOptions : NextAuthOptions = {
    providers: [
        Keycloak({
            clientId: `${process.env.CLIENT_ID ?? ""}`,
            clientSecret: `${process.env.CLIENT_SECRET ?? ""}`,
            issuer: `${process.env.AUTH_ISSUER ?? ""}`,
        })
    ],
    callbacks: {
        async jwt({ token, account } : any) {
            //informações encryptadas no browser
            const nowTimeStamp = Math.floor(Date.now()/1000);
            if (account) {
                //aqui só é chamado no 1º acesso de uma sessão

                token.decoded = jwt_decode.jwtDecode(account.access_token);
                token.access_token = account.access_token
                token.id_token = account.id_token;
                token.expires_at = account.expires_at;
                token.refresh_token = account.refresh_roken;

                return token;
            } else if(nowTimeStamp < token.expires_at){
                //token não expirou -- apenas retornar
                return token
            } else {
                //token expirou -- recarregar
                console.log("TOKEN EXPIRADO - WILL REFRESH...")
                //TO DO
                return token
            }
        },
        async session({ session, token }:any) {
            //informações abertas ao usuário --- tem acesso apenas nas informações adicionadas ao token no callback anterior
            
            session.access_token = encrypt(token.access_token as string)
            session.id_token = encrypt(token.id_token as string)
            session.given_name = token.decoded.given_name
            session.roles = token.decoded.resource_access.wtpc.roles
            return session
        }
    }
}