import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import Breadcrumb from "@/components/Layouts/Breadcrumbs";
import Form from "@/app/category/_components/form";
import {db} from "@/lib/db"
import { redirect } from "next/navigation";


export default async function EditCategoryPage( {params }) {

    const category = await db.category.findFirst({
        where: {
            id: params.categoryId
        }
    })
    
    if(!category) {
        redirect("/category")
    }

    return (

        <DefaultLayout>
            {/* <Breadcrumb pageName="Update Category"/> */}
            <Form data={category} />    
        </DefaultLayout>
    )
}