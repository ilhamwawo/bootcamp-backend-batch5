import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { db } from "@/lib/db";
import Table from "@/app/product/_components/table";
export default async function ProductPage() {
  const products = await db.product.findMany({
    include: {
      category: true,
    },
  });

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Product" />
      <Table products={products} />
    </DefaultLayout>
  );
}
