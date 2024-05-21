import { db } from "@/lib/db";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const token = req.headers.get("authorization");

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    const user = await db.user.findFirst({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    delete user.password;

    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    if (err instanceof JsonWebTokenError) {
      return new NextResponse("Unauthorized", { status: 401 });
    } else {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
}
