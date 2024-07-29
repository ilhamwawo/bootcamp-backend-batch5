import {db} from "@/lib/db";
import { redirect } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Form from "@/app/product/_components/form";

export default async function EditProductId({ params }) {

    const { productId } = params
    const product = await db.product.findFirst({
        where: {
            id: productId
        }
    })

    const category = await db.category.findMany()
    

    if (!product) {
        return redirect('/product')
    }


    
    // console.log(product)
    // console.log(category)
    
    return (

        <DefaultLayout>
            <Form product={product } categories={category}/>
        </DefaultLayout>

    )

}