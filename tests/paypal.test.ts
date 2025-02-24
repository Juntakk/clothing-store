import { generateAccessToken, paypal } from "../lib/paypal";

//Test to generate access token from paypal
test("generated token from paypal", async () => {
  const tokenRes = await generateAccessToken();
  console.log(tokenRes);
  expect(typeof tokenRes).toBe("string");
  expect(tokenRes.length).toBeGreaterThan(0);
});

// Test to create a paypal order
test("creates a paypal order", async () => {
  //   const token = await generateAccessToken();
  const price = 10.0;

  const orderResponse = await paypal.createOrder(price);
  console.log(orderResponse);

  expect(orderResponse).toHaveProperty("id");
  expect(orderResponse).toHaveProperty("status");
  expect(orderResponse.status).toBe("CREATED");
});

// Test to capture payment with mock order
test("capture mock order", async () => {
  const orderId = "100";

  const mockCapturePayment = jest
    .spyOn(paypal, "capturePayment")
    .mockResolvedValue({
      status: "COMPLETED",
    });

  const captureResponse = await paypal.capturePayment(orderId);
  expect(captureResponse).toHaveProperty("status", "COMPLETED");

  mockCapturePayment.mockRestore();
});
