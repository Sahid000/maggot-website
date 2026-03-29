import type { Metadata } from "next";
import PolicyPage from "@/components/shared/PolicyPage";
import { returnPolicyContent } from "@/content/policies";

export const metadata: Metadata = {
  title: "রিটার্ন ও রিফান্ড নীতি",
  description: "ম্যাগট-ফ্রি রেসকিউ কিটের রিটার্ন ও রিফান্ড সংক্রান্ত নীতিমালা।",
};

const ReturnPolicyPage = () => <PolicyPage content={returnPolicyContent} />;

export default ReturnPolicyPage;
