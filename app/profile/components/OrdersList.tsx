export default function OrdersList({ user }: any) {
  return (
    <section>
      <h3 className="mb-4 text-lg font-semibold">Orders</h3>
      {user.orders.length === 0 ? (
        <p className="text-white/60">No orders yet</p>
      ) : (
        user.orders.map((o: any) => (
          <div key={o.id} className="border border-white/10 p-4 rounded-lg">
            #{o.id} – ₹{o.total}
          </div>
        ))
      )}
    </section>
  );
}
