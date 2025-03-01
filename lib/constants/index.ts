export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "GrocerEase";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "A modern ecommerce store built with Next.js";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

export const signInDefaultValues = {
  email: "admin@example.com",
  password: "123456",
};

export const signUpDefaultValues = {
  name: "Test User",
  email: "test_user@example.com",
  password: "123456",
  confirmPassword: "123456",
};

export const shippingAddressDefaultValues = {
  fullName: "John Doe",
  streetAddress: "1234 St Road",
  city: "Anytown",
  postalCode: "ABC123",
  country: "Zimbabwe",
};

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(", ")
  : ["PayPal", "Stripe", "CashOnDelivery"];
export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || "Stripe";

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 12;

export const productDefaultValues = {
  name: "Potato",
  slug: "potato",
  category: "Veggies",
  images: ["/images/potato1.jpg", "/images/potato2.jpg"],
  brand: "Yukon Gold",
  description: "Boil 'em, mash 'em, stick 'em in a stew!",
  price: "1",
  stock: 1,
  rating: "1",
  numReviews: "0",
  isFeatured: false,
  banner: null,
};

export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES.split(", ")
  : ["admin", "user"];

export const reviewFormDefaultValues = {
  title: "Test title for review",
  description: "Test comment for review, this is a long comment",
  rating: 3,
};

export const SENDER_EMAIL = process.env.SENDER_EMAIL || "onboarding@resend.dev";
