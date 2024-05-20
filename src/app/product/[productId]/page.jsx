import Form from "@/app/product/_components/form";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function CreateProductPage({ params }) {
  const categories = await db.category.findMany();
  const product = await db.product.findFirst({
    where: {
      id: params.productId,
    },
    orderBy: {
      created_at: "asc",
    },
  });

  if (!product) {
    redirect("/product");
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Update Product" />
      <Form categories={categories} product={product} />
    </DefaultLayout>
  );
}
