import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { getAllCategories } from "@/lib/actions/products.actions";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const CategoryDrawer = async () => {
  const categories = await getAllCategories();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <MenuIcon className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full w-min">
        <DrawerHeader>
          <DrawerTitle className="text-lg font-semibold">
            Select a category
          </DrawerTitle>
          <div className="mt-5 space-y-2">
            {categories.map((category) => (
              <Button
                key={category.category}
                className="w-full justify-start"
                variant="ghost"
                asChild
              >
                <DrawerClose asChild>
                  <Link
                    href={`/search?category=${category.category}`}
                    className="flex items-center justify-between w-full"
                  >
                    <span>{category.category}</span>
                    <span className="text-muted-foreground">
                      ({category._count})
                    </span>
                  </Link>
                </DrawerClose>
              </Button>
            ))}
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default CategoryDrawer;
