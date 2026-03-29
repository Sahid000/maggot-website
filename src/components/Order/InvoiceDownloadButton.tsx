"use client";

import { useState } from "react";
import { FiDownload } from "react-icons/fi";

interface Props {
  orderId: string;
  trackingToken: string;
}

const InvoiceDownloadButton = ({ orderId, trackingToken }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const base = process.env.NEXT_PUBLIC_BASE_API;
      const url = `${base}/orders/invoice/user?id=${encodeURIComponent(orderId)}&t=${encodeURIComponent(trackingToken)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed");
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `invoice-${orderId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch {
      alert("Invoice download করা সম্ভব হয়নি। পরে আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60"
      style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", color: "#fbbf24" }}
    >
      <FiDownload size={15} />
      {loading ? "তৈরি হচ্ছে..." : "Invoice ডাউনলোড"}
    </button>
  );
};

export default InvoiceDownloadButton;
