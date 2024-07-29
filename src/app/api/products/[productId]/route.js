import { db } from "@/lib/db"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import jwt , { JsonWebTokenError } from "jsonwebtoken"
import { NextResponse } from "next/server"

// Get product by id
export async function GET(req, { params }) {
    try {
        const product = await db.product.findFirst({
            where: {
                id: params.productId,
            },
            include: {
                category: true,
            }
        })

        if (!product) {
            return new NextResponse('Product not found', {status: 404})
        }

        return NextResponse.json({
            data: product,
            success: true,
            message: 'Get Product succesfully'
        })
        
    } catch (error) {
        console.log(error)
        if(error instanceof JsonWebTokenError) {
            return new NextResponse('Unauthorized', {status: 401} )
        } else {
            return new NextResponse('Internal Server Error', {status: 500}) 
        }
    }
}

//  Update product by id
export async function PATCH(req, { params }) {
    try {
        const token = await req.headers.get('authorization')

        if (!token) {
            return new NextResponse('Unauthorized', {status: 401})
        }

        const decoded = await jwt.verify(token, process.env.JWT_ACCESS_KEY)

        const { productId } = params

        const product = await db.product.findFirst({
            where: {
                id: productId,
            }
        })

        if (!product) {
            return new NextResponse('Product Not Found', {status: 404})
        }

        const { title, price, description, category_id,  company, shipping, stock, colors, images } = await req.json()

        const category = await db.category.findFirst({
            where: {
                id: category_id
            }
        })

        if (!category) {
            return new NextResponse('Category not found', {status: 404})
        }

        const updatedProduct = await db.product.update({
            where: {
                id: productId
            },
            data: {
                title,
                price,
                description,
                category_id,
                company,
                shipping,
                stock,
                colors,
                images,
            }
        })
            
    return NextResponse.json({
        data: updatedProduct,
        success: true,
        message: 'Update product succesfully'
    })   
    } catch (error) {
        console.log(error)
        if(error instanceof JsonWebTokenError) {
            return new NextResponse('Unauthorized', {status: 401})
        } else {
            return new NextResponse('Internal Server Error', {status: 500})
        }
    }
}

// Delete product by id
export async function DELETE(req, { params }) {
    try {

        const token = await req.headers.get('authorization')

        if (!token) {
            return new NextResponse('Unauthorized', {status: 401})
        }

        const decoded = await jwt.verify(token, process.env.JWT_ACCESS_KEY)

        const {productId} = params

        const product = await db.product.findFirst({
            where: {
                id: productId
            }
        })

        if(!product) {
            return new NextResponse('Product not found', {status: 404})
        }

        await db.product.delete({
            where: {
                id: productId
            }
        })

        return NextResponse.json({
            data: null,
            success: true,
            message: 'Product was deleted succesfully'
        })
                 
    } catch (error) {
        console.log(error)
        if (error instanceof JsonWebTokenError) {
            return new NextResponse('Unauthorized', {status: 401})
        } else if (error instanceof PrismaClientKnownRequestError) {
            return new NextResponse('This product cannot be deleted because there are order associated with it. Please delete the associated order first before deleting the product.', {status: 400})
        } else {
            return new NextResponse('Internal Server Error', {status: 500})
        }
    }
}
