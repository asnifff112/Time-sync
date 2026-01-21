export default function OrdersList({ user }: any) {
  const orders = user?.orders || [];

  return (
    <section>
      <h3 className="mb-4 text-lg font-semibold">Orders</h3>

      {orders.length === 0 ? (
        <p className="text-white/60">No orders yet</p>
      ) : (
        <div className="space-y-3">
          {orders.map((o: any) => (
            <div
              key={o.id}
              className="rounded-lg border border-white/10 p-4"
            >
              <p className="text-sm">
                <span className="text-white">Order ID:</span> #{o.id}
              </p>
              <p className="text-sm text-white/70">
                Total: ₹{o.total}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
