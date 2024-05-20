import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { db } from "@/lib/db";
import Link from "next/link";
import Table from "@/app/order/_components/table";

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
