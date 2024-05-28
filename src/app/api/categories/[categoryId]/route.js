import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    // Get category by id
    const category = await db.category.findFirst({
      where: {
        id: params.categoryId,
      },
    });

    // Check if category is found
    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    // Return category to the client
    return NextResponse.json(category, { status: 200 });
  } catch (err) {
    // Return error response
    return new NextResponse("Internal server error", { status: err.status });
  }
}

export async function PATCH(req, { params }) {
  try {
    // Get category by id
    const category = await db.category.findFirst({
      where: {
        id: params.categoryId,
      },
    });

    // Check if category is found
    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    // Get name category from body
    const { name } = await req.json();

    // Update category
    const updateCategory = await db.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name: name,
      },
    });

    // Return category to the client
    return NextResponse.json(updateCategory, { status: 200 });
  } catch (err) {
    // Return error response
    return new NextResponse("Internal server error", { status: err.status });
  }
}

export async function DELETE(req, { params }) {
  try {
    // Get category by id
    const category = await db.category.findFirst({
      where: {
        id: params.categoryId,
      },
    });

    // Check if category is found
    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    // Delete category
    await db.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    // Return category to the client
    return new NextResponse("Category deleted", { status: 200 });
  } catch (err) {
    console.log(err);
    // Return error response
    return new NextResponse("Internal server error", { status: err.status });
  }
}
