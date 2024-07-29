import { NextResponse } from "next/server";
import { db } from '@/lib/db';
import jwt , {JsonWebTokenError} from "jsonwebtoken"; 

// Get order by id and include order_items in order and include product in order_items
export async function GET(req, { params }) {
    try {
        // pengecekan userId
        const token = req.headers.get('authorization')

        if(!token) {
            return new NextResponse('Unauthorized', {status: 401})
        }

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY)

        const user = await db.user.findFirst({
            where: {
                id: decoded.id
            }
        })

// tangkap params orderId
        const { orderId} = params

        const order = await db.order.findFirst({
            where: 
                user.role === "ADMIN" 
                 ? {
                    id: orderId
                   } 
                : {
                    id: orderId, 
                    user_id: decoded.id
                },
                include: {
                    order_items: {
                        include: {
                            product: true
                        }              
                }
                 }
        })

        if(!order) {
            return new NextResponse('Order not found', {status: 404})
        }

        return NextResponse.json({
            data: order,
            success: true,
            message: 'get order'
        })
        
    } catch (error) {
        console.log(error)
        if (error instanceof JsonWebTokenError) {
            return new NextResponse('Unauthorized', {status: 401})
        } else {
            return new NextResponse('Internal Server Error', {status: 500})
        }
    }
}

// Delete order by id
export async function DELETE(req, { params }) {}
