export default function TableOrderItem({ orderItems }) {
  return (
    <div className="overflow-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Order Items
        </h4>
      </div>

      <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Product</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Quantity</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Color</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Created At</p>
        </div>
      </div>

      {orderItems.map((item, key) => (
        <div
          className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {item.product.title}
              </p>
            </div>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {item.quantity}
            </p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">{item.color}</p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {item.created_at.toDateString()}
            </p>
          </div>
        </div>
      ))}
      {orderItems.length === 0 && (
        <div className="flex h-[500px] items-center justify-center text-center">
          No Data
        </div>
      )}
    </div>
  );
}
