import NextAuth from "next-auth";
import { authOption } from "../options";
import { corsOptionsResponse } from "@/lib/utils";

const handler = NextAuth(authOption);

export async function OPTIONS(request) {
  return corsOptionsResponse();
}

export { handler as GET, handler as POST };
