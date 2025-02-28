import ProductCard from "@/components/shared/product/product-card";
import { Button } from "@/components/ui/button";
import {
  getAllProducts,
  getAllCategories,
} from "@/lib/actions/products.actions";
import Link from "next/link";

const prices = [
  { name: "$1 to $50", value: "1-50" },
  { name: "$51 to $100", value: "51-100" },
  { name: "$101 to $200", value: "101-200" },
  { name: "$201 to $500", value: "201-500" },
  { name: "$501 to $1000", value: "501-1000" },
];

const ratings = [4, 3, 2, 1];
const sortOrders = ["newest", "lowest", "highest", "rating"];

export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string;
    category: string;
    price: string;
    rating: string;
  }>;
}) {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
  } = await props.searchParams;

  const isQuerySet = q && q !== "all" && q.trim() !== "";
  const isCategorySet =
    category && category !== "all" && category.trim() !== "";
  const isPriceSet = price && price !== "all" && price.trim() !== "";
  const isRatingSet = rating && rating !== "all" && rating.trim() !== "";

  return {
    title: `
      Search ${isQuerySet ? q : ""} 
      ${isCategorySet ? `: Category ${category}` : ""}
      ${isPriceSet ? `: Price ${price}` : ""}
      ${isRatingSet ? `: Rating ${rating}` : ""}`,
  };
}

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;

  // Construct filter URL
  const getFilterUrl = ({
    c,
    p,
    s,
    r,
    pg,
  }: {
    c?: string;
    p?: string;
    s?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };

    if (c) params.category = c;
    if (p) params.price = p;
    if (s) params.sort = s;
    if (r) params.rating = r;
    if (pg) params.page = pg;

    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    sort,
    page: Number(page),
  });

  const categories = await getAllCategories();

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
        {/* Filters Sidebar */}
        <div className="md:col-span-1 space-y-6">
          {/* Category Filters */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Department</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href={getFilterUrl({ c: "all" })}
                  className={`${
                    (category === "all" || category === "") &&
                    "font-bold underline"
                  } hover:text-primary`}
                >
                  Any
                </Link>
              </li>
              {categories.map((x) => (
                <li key={x.category}>
                  <Link
                    href={getFilterUrl({ c: x.category })}
                    className={`${
                      category === x.category && "font-bold underline"
                    } hover:text-primary`}
                  >
                    {x.category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Filters */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Price</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href={getFilterUrl({ p: "all" })}
                  className={`${
                    price === "all" && "font-bold underline"
                  } hover:text-primary`}
                >
                  Any
                </Link>
              </li>
              {prices.map((p) => (
                <li key={p.value}>
                  <Link
                    href={getFilterUrl({ p: p.value })}
                    className={`${
                      price === p.value && "font-bold underline"
                    } hover:text-primary`}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rating Filters */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Customer Ratings</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href={getFilterUrl({ r: "all" })}
                  className={`${
                    rating === "all" && "font-bold underline"
                  } hover:text-primary`}
                >
                  Any
                </Link>
              </li>
              {ratings.map((r) => (
                <li key={r}>
                  <Link
                    href={getFilterUrl({ r: `${r}` })}
                    className={`${
                      rating === r.toString() && "font-bold underline"
                    } hover:text-primary`}
                  >
                    {`${r} stars & up`}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Product List */}
        <div className="md:col-span-4 space-y-6">
          {/* Filters Summary */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {q !== "all" && q !== "" && <span>Query: {q}</span>}
              {category !== "all" && category !== "" && (
                <span>Category: {category}</span>
              )}
              {price !== "all" && <span>Price: {price}</span>}
              {rating !== "all" && <span>Rating: {rating} stars & up</span>}
              {(q !== "all" && q !== "") ||
              (category !== "all" && category !== "") ||
              rating !== "all" ||
              price !== "all" ? (
                <Button variant="link" asChild>
                  <Link href="/search">Clear</Link>
                </Button>
              ) : null}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span>Sort by:</span>
              {sortOrders.map((s) => (
                <Link
                  key={s}
                  href={getFilterUrl({ s })}
                  className={`${
                    sort === s && "font-bold underline"
                  } hover:text-primary`}
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.data.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">
                No products found.
              </div>
            ) : (
              products.data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
