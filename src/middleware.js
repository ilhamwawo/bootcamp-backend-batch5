// import { NextResponse } from "next/server";

// export function middleware(request) {
//   const currentUser = request.cookies.get("currentUser")?.value;

//   if (currentUser) {
//     return NextResponse.next();
//   } else {
//     return NextResponse.redirect(new URL("/auth/signin", request.url));
//   }
// }

// export const config = {
//   matcher: [
//     "/",
//     "/user",
//     "/category/:path*",
//     "/product/:path*",
//     "/order/:path*",
//   ],
// };

import { NextResponse } from "next/server";

export async function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/api")) {
    const res = NextResponse.next();

    res.headers.append("Access-Control-Allow-Credentials", "true");
    res.headers.append("Access-Control-Allow-Origin", "*");
    res.headers.append(
      "Access-Control-Allow-Methods",
      "GET,DELETE,PATCH,POST,PUT,OPTIONS",
    );
    res.headers.append(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Authorisation, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    );
    return res;
  }
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|login|setup).*)",
};
