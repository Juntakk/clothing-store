"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { formatCurrency } from "@/lib/utils";
import { Cart } from "@/types";
import { ArrowRight, Loader, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const CartTable = ({ cart, userId }: { cart?: Cart; userId?: string }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-6">
      <h1 className="h2-bold py-4">Your Cart</h1>

      {!cart || cart.items.length === 0 ? (
        <div className="text-center text-gray-500">
          Your cart is empty.{" "}
          <Link href="/" className="text-primary hover:underline">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-6">
          {/* Cart Items Table - Smaller Section */}
          <div className="overflow-x-auto md:col-span-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item.slug}>
                    <TableCell>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center gap-2"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded"
                        />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          disabled={isPending}
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            startTransition(async () => {
                              const res = await removeItemFromCart(
                                item.productId
                              );
                              if (!res.success) {
                                toast({
                                  variant: "destructive",
                                  description: res.message,
                                });
                              }
                            })
                          }
                        >
                          {isPending ? (
                            <Loader className="h-4 w-4 animate-spin" />
                          ) : (
                            <Minus className="h-4 w-4" />
                          )}
                        </Button>
                        <span className="w-6 text-center">{item.qty}</span>
                        <Button
                          disabled={isPending}
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            startTransition(async () => {
                              const res = await addItemToCart(item);
                              if (!res.success) {
                                toast({
                                  variant: "destructive",
                                  description: res.message,
                                });
                              }
                            })
                          }
                        >
                          {isPending ? (
                            <Loader className="h-4 w-4 animate-spin" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(item.price)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Order Summary Card - Bigger Section */}
          <Card className="h-fit md:col-span-2">
            <CardContent className="p-6 space-y-6">
              {/* Subtotal Section */}
              <div className="text-lg font-semibold text-center md:text-left">
                Subtotal ({cart.items.reduce((a, c) => a + c.qty, 0)} items):{" "}
                <span className="font-bold text-primary">
                  {formatCurrency(cart.itemsPrice)}
                </span>
              </div>

              {/* Checkout or Sign In Button */}
              {userId ? (
                <Button
                  className="w-full"
                  disabled={isPending}
                  onClick={() =>
                    startTransition(() => {
                      router.push("/shipping-address");
                    })
                  }
                >
                  {isPending ? (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="mr-2 h-4 w-4" />
                  )}
                  Proceed to Checkout
                </Button>
              ) : (
                <Button
                  className="w-full"
                  disabled={isPending}
                  onClick={() =>
                    startTransition(() => {
                      router.push("/sign-in");
                    })
                  }
                >
                  {isPending ? (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="mr-2 h-4 w-4" />
                  )}
                  Sign In to Checkout
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CartTable;
