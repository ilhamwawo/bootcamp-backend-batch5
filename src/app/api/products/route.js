import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

// Get all products
export async function GET(req) {
    try {

      
        const product = await db.product.findMany({
            include: {
                category: true,
            }
        })
        return NextResponse.json({
            data: product,
            success: true,
            message: 'Get Product successfully '
        })
    } catch (error) {
        console.log(error)
        return new NextResponse.json({
            status: 404,
            message: 'Internal  Server Error'
        })
    }
}

// Create a new product
export async function POST(req) {
    try {
        const token = await req.headers.get('authorization')

        if(!token) {
            return new NextResponse('Unauthorized', {status: 401 })
        }

        const decoded =  await jwt.verify(token, process.env.JWT_ACCESS_KEY)

        // tangkap req body 

        const body = await req.json();
        const category = await db.category.findFirst({
            where: {
                id: body.categoryId,
            }
        })
        if (!category) {
            return new NextResponse.json('Category not found', {status: 404})
        }

        const product = await db.product.create({
            data: {
                category_id: body.category_id,
                title: body.title,
                price: body.price,
                description: body.description,
                company: body.company,
                stock: body.stock,
                colors: body.colors,
                images: body.images,
            }
        })

        return  NextResponse.json({
            data: product,
            success: true,
            message: 'Create product succesfully'
        })
        
    } catch (error) {
        console.log(error)
        return new NextResponse.json('Internal Server Error', 
        {
            status: 500
        })
    }
}
