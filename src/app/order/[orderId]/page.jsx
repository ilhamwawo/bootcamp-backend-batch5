import TableOrderItem from "@/app/order/_components/table-order-item";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
export default async function OrderIdPage({ params }) {
  const order = await db.order.findFirst({
    where: {
      id: params.orderId,
    },
    include: {
      order_items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    redirect("/order");
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Order Item" />
      <TableOrderItem orderItems={order.order_items} />
    </DefaultLayout>
  );
}
