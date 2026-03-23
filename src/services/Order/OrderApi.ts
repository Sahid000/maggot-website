"use server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export const createOrder = async (req: { body: Record<string, unknown> }) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });
  return res.json();
};

export const getProduct = async () => {
  const res = await fetch(`${BASE_URL}/product`, { cache: "no-store" });
  return res.json();
};

export const getOrderByTrackingToken = async (id: string, t: string) => {
  const res = await fetch(
    `${BASE_URL}/orders/track?id=${encodeURIComponent(id)}&t=${encodeURIComponent(t)}`,
    { cache: "no-store" }
  );
  return res.json();
};

export const validateCoupon = async (code: string, orderAmount: number) => {
  const res = await fetch(`${BASE_URL}/coupons/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, orderAmount }),
  });
  return res.json();
};
