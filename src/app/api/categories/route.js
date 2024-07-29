import { NextResponse} from 'next/server';
import {db} from '@/lib/db';
import jwt from "jsonwebtoken";

export async function POST(req) {
    
    try {
        const token = await req.headers.get('authorization')

        if (!token) {
            return new NextResponse('Token not prover', {status: 401})

        }

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY)
        console.log(decoded)

        const user = await db.user.findFirst({
            where: {
                id: decoded.id
            }
        })

        if (!user) {
            return new NextResponse('User Not found', {status: 404})
        }

        if (user.role !== 'ADMIN') {
            return new NextResponse('This account is not Admin', {status: 401})
        }
        // tangkap nilai di body
        const body = await req.json()
        // insert new data to categories
        const category = await db.category.create({
            data: {
                name: body.name,
            }
        })
    // return to client
    return  NextResponse.json({
        data: category,
        success: true,
        message: 'Category created',
    },
    {
        status: 201,
    })
    } catch (err) {
        console.log(err)
    return NextResponse('Internal Server Error', {
        status: 500
    })
    }
}

export async function GET() {
    try {

        const category = await db.category.findMany()

        return NextResponse.json({
            data: category,
            success: true,
        })
        
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', {status: 500})
    }
}