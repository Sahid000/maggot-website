import React from "react";
import { cookies } from "next/headers";
import { getOrderByTrackingToken } from "@/services/Order/OrderApi";
import Link from "next/link";

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL!;
const CONTACT_PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE!;

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; step: number }> = {
  pending: { label: "অপেক্ষমান", color: "#d97706", bg: "#fffbeb", border: "#fcd34d", step: 1 },
  approved: { label: "অনুমোদিত", color: "#2563eb", bg: "#eff6ff", border: "#93c5fd", step: 2 },
  completed: { label: "সম্পন্ন", color: "#16a34a", bg: "#f0fdf4", border: "#86efac", step: 3 },
  declined: { label: "বাতিল", color: "#dc2626", bg: "#fef2f2", border: "#fca5a5", step: -1 },
  cancelled: { label: "বাতিল করা হয়েছে", color: "#6b7280", bg: "#f9fafb", border: "#d1d5db", step: -1 },
};

const STEPS = [
  { label: "অর্ডার দেওয়া হয়েছে", icon: "📦" },
  { label: "অনুমোদিত হয়েছে", icon: "✅" },
  { label: "ডেলিভারি সম্পন্ন", icon: "🚚" },
];

const TrackPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const id = (params?.id as string) || null;
  const urlToken = (params?.t as string) || null;

  const cookieStore = await cookies();
  const t = urlToken || cookieStore.get("maggot_order_token")?.value || null;

  if (!id || !t) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
          <div className="w-20 h-20 rounded-full bg-yellow-50 border-2 border-yellow-200 flex items-center justify-center text-4xl mx-auto mb-5">
            🔍
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">ট্র্যাকিং তথ্য পাওয়া যায়নি</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            আপনার ট্র্যাকিং লিংক মেয়াদোত্তীর্ণ হয়ে গেছে অথবা সেশন পরিষ্কার হয়ে গেছে।
            নিশ্চিতকরণ ইমেইলে ট্র্যাকিং লিংক খুঁজে দেখুন।
          </p>
          <ContactBox />
        </div>
      </div>
    );
  }

  const result = await getOrderByTrackingToken(id, t);

  if (!result?.success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="text-center max-w-fit bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
          <div className="w-20 h-20 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center text-4xl mx-auto mb-5">
            ❌
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">অর্ডার লোড করা সম্ভব হয়নি</h1>
          <p className="text-gray-500 text-sm mb-6">{result?.message || "ট্র্যাকিং টোকেন অবৈধ বা মেয়াদোত্তীর্ণ।"}</p>
          <ContactBox />
        </div>
      </div>
    );
  }

  const order = result.data;
  const status = order.status as string;
  const statusCfg = STATUS_CONFIG[status] ?? { label: status, color: "#6b7280", bg: "#f9fafb", border: "#d1d5db", step: 0 };
  const isFailed = status === "declined" || status === "cancelled";

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-14 px-4">
      <div className="max-w-2xl mx-auto">

        {/* ── Page Header ─────────────────────────────────────── */}
        <div
          className="rounded-2xl px-8 py-6 mb-6"
          style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}
        >
          <p className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-1">
            ম্যাগট-ফ্রি রেসকিউ কিট
          </p>
          <h1 className="text-2xl font-bold text-white">অর্ডার ট্র্যাক করুন</h1>
          <p className="text-gray-400 text-xs mt-1">অর্ডার আইডি: {order.orderId}</p>

          {/* Status badge */}
          <div
            className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full text-sm font-semibold border"
            style={{ color: statusCfg.color, backgroundColor: statusCfg.bg, borderColor: statusCfg.border }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusCfg.color }} />
            {statusCfg.label}
          </div>
        </div>

        {/* ── Progress Timeline ────────────────────────────────── */}
        {!isFailed && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="font-semibold text-gray-700 mb-6 text-sm uppercase tracking-wide">অর্ডারের অগ্রগতি</h2>
            <div className="flex items-center">
              {STEPS.map((step, i) => {
                const stepNum = i + 1;
                const done = statusCfg.step >= stepNum;
                const active = statusCfg.step === stepNum;
                return (
                  <React.Fragment key={step.label}>
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all"
                        style={{
                          backgroundColor: done ? "#1a1a2e" : "#f3f4f6",
                          boxShadow: active ? "0 0 0 5px rgba(26,26,46,0.12)" : "none",
                        }}
                      >
                        {done ? (
                          <span className="text-white text-base">✓</span>
                        ) : (
                          <span className="text-gray-400 text-base">{step.icon}</span>
                        )}
                      </div>
                      <span
                        className="text-xs mt-2 text-center w-20 leading-tight"
                        style={{ color: done ? "#1a1a2e" : "#9ca3af", fontWeight: done ? 600 : 400 }}
                      >
                        {step.label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        className="flex-1 h-0.5 mx-2 mb-5 rounded-full"
                        style={{ backgroundColor: statusCfg.step > stepNum ? "#1a1a2e" : "#e5e7eb" }}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Order Details ───────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold text-gray-700 mb-5 text-sm uppercase tracking-wide">অর্ডারের বিবরণ</h2>
          <div className="grid grid-cols-2 gap-5 text-sm">
            <Detail label="নাম" value={order.name} />
            <Detail label="ফোন নম্বর" value={order.phone} />
            {order.email && <Detail label="ইমেইল" value={order.email} />}
            <Detail label="জেলা" value={order.district} />
            <Detail label="ডেলিভারি এলাকা" value={order.insideDhaka ? "ঢাকার ভেতরে" : "ঢাকার বাইরে"} />
            <Detail label="পরিমাণ" value={`${order.quantity} টি কিট`} />
            <Detail label="প্রতি কিটের মূল্য" value={`৳${order.pricePerKit?.toLocaleString()}`} />
            <div className="col-span-2">
              <div className="rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 flex items-center justify-between">
                <span className="text-gray-500 text-sm">মোট পরিশোধযোগ্য</span>
                <span className="text-xl font-bold text-gray-900">৳{order.totalPrice?.toLocaleString()}</span>
              </div>
            </div>
            <div className="col-span-2">
              <Detail label="ডেলিভারি ঠিকানা" value={order.address} />
            </div>
            <div className="col-span-2">
              <Detail
                label="অর্ডারের তারিখ"
                value={new Date(order.orderDate).toLocaleDateString("bn-BD", {
                  year: "numeric", month: "long", day: "numeric",
                })}
              />
            </div>
          </div>
        </div>

        {/* ── Contact Box ─────────────────────────────────────── */}
        <ContactBox />

        {/* ── Footer note ─────────────────────────────────────── */}
        <p className="text-xs text-gray-400 text-center mt-6">
          আপনার নিশ্চিতকরণ ইমেইলটি সংরক্ষণ করুন — এতে ৩০ দিনের জন্য বৈধ একটি স্থায়ী ট্র্যাকিং লিংক রয়েছে।
        </p>

      </div>
    </div>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-gray-400 text-xs mb-0.5">{label}</p>
    <p className="text-gray-800 font-medium">{value}</p>
  </div>
);

const ContactBox = () => (
  <div
    className="rounded-2xl p-5 border"
    style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", borderColor: "#2d2d4e" }}
  >
    <p className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-1">সাহায্য দরকার?</p>
    <p className="text-white font-semibold text-base mb-3">আমাদের সাথে যোগাযোগ করুন</p>
    <div className="flex flex-col lg:flex-row items-center gap-3">
      <Link
        href={`mailto:${CONTACT_EMAIL}`}
        className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-4 py-3 w-full"
      >
        <span className="text-xl flex-shrink-0">📧</span>
        <div className="min-w-0">
          <p className="text-gray-400 text-xs">ইমেইল</p>
          <p className="text-white text-sm font-medium truncate">{CONTACT_EMAIL}</p>
        </div>
      </Link>
      <Link
        href={`tel:${CONTACT_PHONE}`}
        className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-4 py-3 w-full"
      >
        <span className="text-xl flex-shrink-0">📞</span>
        <div className="min-w-0">
          <p className="text-gray-400 text-xs">ফোন</p>
          <p className="text-white text-sm font-medium truncate">{CONTACT_PHONE}</p>
        </div>
      </Link>
    </div>
  </div>
);

export default TrackPage;
