import { Resend } from "resend";
import { SENDER_EMAIL, APP_NAME } from "@/lib/constants";
import PurchaseReceiptEmail from "./purchase-receipt";
import { Order } from "@/types";

const resend = new Resend("re_DSZw53w5_RzgkfYddNHdFCemqHSUHTtfQ");

export const sendPurchaseReceipt = async ({ order }: { order: Order }) => {
  try {
    const response = await resend.emails.send({
      from: `${APP_NAME} <${SENDER_EMAIL}>`,
      to: order.user.email,
      subject: `Order Confirmation ${order.id}`,
      react: <PurchaseReceiptEmail order={order} />,
    });

    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
