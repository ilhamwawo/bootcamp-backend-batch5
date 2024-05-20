"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Table({ users }) {
  const router = useRouter();
  const token = Cookies.get("currentUser");

  async function handleDelete(id) {
    try {
      await axios.delete(`/api/users/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      router.refresh();
    } catch (err) {
      console.log(err);
      alert(err?.request?.response || err);
    }
  }

  return (
    <div className="overflow-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Users
        </h4>
        {/* <Link href="/category/create">
          <button className="inline-block rounded bg-primary px-10 py-3 font-medium text-white transition-all hover:bg-opacity-90">
            Add Category
          </button>
        </Link> */}
      </div>

      <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Name</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Email</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Role</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Created At</p>
        </div>
      </div>

      {users.map((user, key) => (
        <div
          className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">{user.name}</p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">{user.email}</p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">{user.role}</p>
            </div>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {user.created_at.toDateString()}
            </p>
          </div>
        </div>
      ))}
      {users.length === 0 && (
        <div className="flex h-[500px] items-center justify-center text-center">
          No Data
        </div>
      )}
    </div>
  );
}
