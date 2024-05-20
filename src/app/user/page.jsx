import Table from "@/app/user/_components/table";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { db } from "@/lib/db";

export default async function CategoryPage() {
  const users = await db.user.findMany({
    orderBy: {
      created_at: "asc",
    },
  });

  async function handleDelete() {}

  return (
    <DefaultLayout>
      <Breadcrumb pageName="User" />

      <Table users={users} />
    </DefaultLayout>
  );
}
