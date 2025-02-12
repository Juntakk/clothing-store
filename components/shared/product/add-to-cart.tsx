"use client";

import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { addItemToCart } from "@/lib/actions/cart.actions";
import { CartItem } from "@/types";
import { useRouter } from "next/navigation";

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    const response = await addItemToCart(item);

    if (!response.success) {
      toast({
        variant: "destructive",
        description: response.message,
      });
      return;
    }
    //Handle success add to cart
    toast({
      description: `${item.name} added to cart`,
      action: (
        <ToastAction altText="Go To Cart" onClick={() => router.push("/cart")}>
          Go To Cart
        </ToastAction>
      ),
    });
  };
  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      Add To Cart
    </Button>
  );
};

export default AddToCart;
