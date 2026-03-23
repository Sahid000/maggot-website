const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export const sendContactMessage = async (body: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const res = await fetch(`${BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
};
