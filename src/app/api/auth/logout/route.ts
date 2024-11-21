import { getServerSession } from "next-auth";
import { getIdToken } from "lib/utils/sessionTokenAccessor";
import { authOptions } from "../[...nextauth]/[...nextauth]";
// import { next_authOptions } from "lib/utils/authOptions";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (session) {
        const idToken = await getIdToken();

        const url = `${
            process.env.END_SESSION_URL
        }?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(
            process.env.NEXTAUTH_URL ?? "",
        )}`;

        try {
            await fetch(url, { method: "GET" });
        } catch (err) {
            console.error("LOGOUT_KEYCLOAK_ERROR", err);
            return new Response(null, {status: 500});
        }
    }
    return new Response(null, {status: 200});
}
