import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BreadCrumb from "@/components/Breadcrumbs/Breadcrumb";
import { db } from "@/lib/db";
import Form from "../_components/form";
import DetailTable from "../_components/detailproduct";

export default async function ViewOrderPage({ params }) {
  // console.log(params)
  // const order = await db.order.findFirst({
  //     where: {
  //         id: params.orderId
  //     }
  // })

  // const orderItems = await db.order.findMany({
  //     where: {
  //         order_id: params.orderId
  //     },
  //     include: {
  //         product: true
  //     }
  // })
  // console.log(orderItems)
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
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
  console.log(order);

  return (
    <DefaultLayout>
      <BreadCrumb pageName="View Order" />
      <h1>View Order Page</h1>
      {/* <Form dataorder={orderItems} /> */}
      <DetailTable />
    </DefaultLayout>
  );
}
