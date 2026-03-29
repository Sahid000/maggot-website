import type { Metadata } from "next";
import PolicyPage from "@/components/shared/PolicyPage";
import { privacyContent } from "@/content/policies";

export const metadata: Metadata = {
  title: "গোপনীয়তা নীতি",
  description: "ম্যাগট-ফ্রি রেসকিউ কিট আপনার ব্যক্তিগত তথ্য কীভাবে সংগ্রহ ও ব্যবহার করে।",
};

const PrivacyPage = () => <PolicyPage content={privacyContent} />;

export default PrivacyPage;
