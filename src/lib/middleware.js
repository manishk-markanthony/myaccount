import { NextRequest } from "next/server";
import { updateSession } from "./session";

export async function middleware(request) {
  return await updateSession(request);
}
