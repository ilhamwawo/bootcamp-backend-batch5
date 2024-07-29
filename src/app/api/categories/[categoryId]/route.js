import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt, {JsonWebTokenError} from "jsonwebtoken";

export async function GET(req, { params }) {
    try {

        const { id } = params.categoryId;
        const data = await db.category.findFirst({
            where: {
                id: id,
            }
        })

        // cek jika tidak ada ditemukan
        if (!data) {
            return new NextResponse("Category not found", {
                status: 404,
            })
        }

        return NextResponse.json({
            data: data,
            success: true,
            message: 'Get one Category'
        }, 
        {
            status: 200
        })
         
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', {
            status: 500
        })
    }
}

export async function PATCH(req, {params}) {
    try {
        const token = req.headers.get("authorization")

        if (!token) {
            return new NextResponse('Unauthorized', {
                status: 401        
        })
        }

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY)

        // const { id } = params.categoryId;
        const category = await db.category.findFirst({
            where: {
                id: params.categoryId,
            }
        })

        // jika data tidak ditemukan
        if (!category) {
            return new NextResponse('Category not found', {
                status: 404,
            })
        }
        // get name from body
        const {name} = await req.json()

        // update category
        const updateCategory = await db.category.update({
            where: {
                id: params.categoryId
            },
            data: {
                name: name
            }
        })
        // return category to client
        return NextResponse.json({
            data: updateCategory,
            success: true,
            message: 'Updated category',
        },
        {
            status: 200,
        })
    } catch (error) {
        console.log(error)
        if (error instanceof JsonWebTokenError ) {
            return new NextResponse('Unauthorized',  {
                status: 401,
            })
        } else {
            return new NextResponse('Internal Server Error', {
                status: 500,
            })
        }
    }
}

export async function DELETE(req, {params}) {
    try {

        const token = req.headers.get("authorization");

        if (!token) {
            return new NextResponse('Unauthorized', {
                status: 401,
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY)


        const category = await db.category.findFirst({
            where: {
                id: params.categoryId
            }
        })

        // jika data tidak ada

        if(!category) {
            return new NextResponse('Category not found', {
                status: 404,
            })
        }

        await db.category.delete({
            where: {
                id: params.categoryId,
            }
        })      
        return NextResponse.json({
            message: 'Deleted Category'
        },
        {
            status: 200,
        })
    } catch (error) {
        console.log(error)
        if (error instanceof JsonWebTokenError) {
            return new NextResponse("Unauthorized", {status: 401})
        } else {
            return new NextResponse('Internal Server Error', {
                status: 500,
            })
        }      
    }
}