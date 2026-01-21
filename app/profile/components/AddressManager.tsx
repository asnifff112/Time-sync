export default function AddressManager({ user }: any) {
  return (
    <section>
      <h3 className="mb-4 text-lg font-semibold">Addresses</h3>
      {user.addresses.length === 0 && (
        <p className="text-white/60">No addresses added</p>
      )}
      <button className="btn-secondary mt-3">Add Address</button>
    </section>
  );
}
