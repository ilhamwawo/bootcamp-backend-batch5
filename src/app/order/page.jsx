import Table from "@/app/order/_components/table";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { db } from "@/lib/db";

export default async function OrderPage() {
  const orders = await db.order.findMany({
    orderBy: {
      created_at: "asc",
    },
    include: {
      user: true,
      order_items: true,
    },
  });

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Order" />

      <Table orders={orders} />
    </DefaultLayout>
  );
}
