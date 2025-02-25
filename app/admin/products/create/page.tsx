import ProductForm from "@/components/admin/product-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Product",
};

const CreateProductPage = () => {
  return (
    <>
      <h2 className="h2-bold">
        <div className="my-8">
          <ProductForm type="Create" />
        </div>
      </h2>
    </>
  );
};

export default CreateProductPage;
