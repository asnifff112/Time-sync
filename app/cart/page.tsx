import CartHeader from "@/app/components/cart/CartHeader";
import CartItems from "@/app/components/cart/CartItems";
import CartSummary from "@/app/components/cart/CartSummary";

export default function CartPage() {
  return (
    <main className="bg-buttercream pt-24 pb-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <CartHeader />
          <CartItems />
        </div>
        <CartSummary />
      </div>
    </main>
  );
}
