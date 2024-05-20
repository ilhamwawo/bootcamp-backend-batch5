import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Form from "@/app/category/_components/form";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
export default async function CreateCategoryPage({ params }) {
  console.log(params);

  const category = await db.category.findFirst({
    where: {
      id: params.categoryId,
    },
  });

  if (!category) {
    redirect("/category");
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Category" />
      <Form category={category} />
    </DefaultLayout>
  );
}
