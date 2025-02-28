const sampleData = {
  users: [
    {
      name: "John",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    },
    {
      name: "Jane",
      email: "user@example.com",
      password: "123456",
      role: "user",
    },
  ],
  products: [
    {
      name: "Organic Avocados (4 Pack)",
      slug: "organic-avocados-4-pack",
      category: "Fresh Produce",
      description:
        "Creamy and nutrient-rich organic avocados, perfect for salads or guacamole.",
      images: [
        "/images/sample-products/g1-1.jpg",
        "/images/sample-products/g1-2.jpg",
      ],
      price: 6.99,
      brand: "Green Farms",
      rating: 4.7,
      numReviews: 30,
      stock: 20,
      isFeatured: true,
      banner: "/images/banner-1.jpg",
    },
    {
      name: "Fresh Lemons (6 Pack)",
      slug: "fresh-lemons-6-pack",
      category: "Fresh Produce",
      description:
        "Zesty and tangy lemons for cooking, baking, or making refreshing drinks.",
      images: [
        "/images/sample-products/g2-1.jpg",
        "/images/sample-products/g2-2.jpg",
      ],
      price: 3.99,
      brand: "Citrus Grove",
      rating: 4.6,
      numReviews: 15,
      stock: 25,
      isFeatured: true,
      banner: "/images/banner-2.jpg",
    },
    {
      name: "Whole Wheat Bread (Loaf)",
      slug: "whole-wheat-bread-loaf",
      category: "Bakery",
      description:
        "Freshly baked whole wheat bread with a soft texture, perfect for sandwiches.",
      images: [
        "/images/sample-products/g3-1.jpg",
        "/images/sample-products/g3-2.jpg",
      ],
      price: 2.99,
      brand: "Baker's Delight",
      rating: 4.8,
      numReviews: 22,
      stock: 18,
      isFeatured: false,
      banner: null,
    },
    {
      name: "Extra Virgin Olive Oil (500ml)",
      slug: "extra-virgin-olive-oil-500ml",
      category: "Pantry Staples",
      description:
        "High-quality, cold-pressed extra virgin olive oil for cooking and dressing.",
      images: [
        "/images/sample-products/g4-1.jpg",
        "/images/sample-products/g4-2.jpg",
      ],
      price: 9.99,
      brand: "Oliva",
      rating: 4.9,
      numReviews: 25,
      stock: 30,
      isFeatured: false,
      banner: null,
    },
    {
      name: "Almond Milk (1L)",
      slug: "almond-milk-1l",
      category: "Dairy Alternatives",
      description:
        "Creamy and delicious almond milk, a perfect dairy-free substitute for your daily needs.",
      images: [
        "/images/sample-products/g5-1.jpg",
        "/images/sample-products/g5-2.jpg",
      ],
      price: 3.49,
      brand: "Silk",
      rating: 4.5,
      numReviews: 18,
      stock: 12,
      isFeatured: false,
      banner: null,
    },
    {
      name: "Organic Granola (500g)",
      slug: "organic-granola-500g",
      category: "Snacks & Cereals",
      description:
        "Crunchy and nutritious organic granola, perfect for breakfast or as a snack.",
      images: [
        "/images/sample-products/g6-1.jpg",
        "/images/sample-products/g6-2.jpg",
      ],
      price: 4.99,
      brand: "Healthy Harvest",
      rating: 4.8,
      numReviews: 10,
      stock: 20,
      isFeatured: false,
      banner: null,
    },
  ],
};

export default sampleData;
