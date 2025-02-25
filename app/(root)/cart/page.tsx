import { getMyCart } from "@/lib/actions/cart.actions";
import CartTable from "./cart-table";
import { auth } from "@/auth";

export const metadata = {
  title: "Cart",
};
const CartPage = async () => {
  const cart = await getMyCart();
  const session = await auth();
  const userId = session?.user?.id;

  return <CartTable cart={cart} userId={userId} />;
};

export default CartPage;
