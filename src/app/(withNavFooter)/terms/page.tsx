import type { Metadata } from "next";
import PolicyPage from "@/components/shared/PolicyPage";
import { termsContent } from "@/content/policies";

export const metadata: Metadata = {
  title: "শর্তাবলী",
  description: "ম্যাগট-ফ্রি রেসকিউ কিট ব্যবহার ও অর্ডার সংক্রান্ত শর্তাবলী।",
};

const TermsPage = () => <PolicyPage content={termsContent} />;

export default TermsPage;
