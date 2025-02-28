import { Button } from "@/components/ui/button";
import { getOrderById } from "@/lib/actions/order.actions";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const SuccessPage = async (props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ payment_intent: string }>;
}) => {
  const { id } = await props.params;
  const { payment_intent: paymentIntentId } = await props.searchParams;

  // Fetch order
  const order = await getOrderById(id);
  if (!order) notFound();

  // Retrieve payment intent
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  // Check if payment intent is valid
  if (
    paymentIntent.metadata.orderId == null ||
    paymentIntent.metadata.orderId !== order.id.toString()
  ) {
    return notFound();
  }

  // Check if payment is successful
  const isSuccess = paymentIntent.status === "succeeded";

  if (!isSuccess) return redirect(`/order/${id}`);

  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      <div className="flex flex-col gap-6 items-center text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 flex items-center justify-center bg-green-50 rounded-full">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>

        {/* Success Message */}
        <h1 className="h1-bold text-3xl md:text-4xl">
          Thank You for Your Purchase!
        </h1>
        <p className="text-lg text-muted-foreground">
          Your payment was successful, and we&apos;re processing your order.
          You&apos;ll receive a confirmation email shortly.
        </p>

        {/* Order Details Button */}
        <Button asChild className="mt-4">
          <Link href={`/order/${id}`} className="flex items-center gap-2">
            View Order Details
          </Link>
        </Button>

        {/* Continue Shopping Link */}
        <Link href="/" className="text-sm text-primary hover:underline mt-2">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
