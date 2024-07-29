import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Table from "@/app/image/_components/table";
import Form from "@/app/image/_components/form";


export default async function ImagePage() {

    return (
        <DefaultLayout>
            <Breadcrumb pagename="Image" />
            <Form/>

        </DefaultLayout>
    )
}