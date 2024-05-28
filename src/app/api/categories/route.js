import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Get name on the body
    const { name } = await req.json();

    // Create category with prisma
    const category = await db.category.create({
      data: {
        name: name,
      },
    });

    // Return category to the client
    return NextResponse.json(category, { status: 201 });
  } catch (err) {
    console.log(err);
    // Return error response
    return new NextResponse("Internal server error", { status: err.status });
  }
}

export async function GET(req) {
  try {
    // Get all categories
    const categories = await db.category.findMany();

    // Return category to the client
    return NextResponse.json(categories, { status: 200 });
  } catch (err) {
    // Return error response
    return new NextResponse("Internal server error", { status: err.status });
  }
}
