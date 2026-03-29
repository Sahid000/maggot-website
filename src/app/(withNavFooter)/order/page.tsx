import type { Metadata } from "next";
import { getProduct } from "@/services/Order/OrderApi";

export const metadata: Metadata = {
    title: "অর্ডার করুন",
    description:
        "এখনই ম্যাগট-ফ্রি রেসকিউ কিট অর্ডার করুন। ঢাকার ভেতরে ও বাইরে দ্রুত ডেলিভারি। অনলাইনে সহজে অর্ডার করুন এবং ঘরে বসে পান।",
    alternates: {
        canonical: "/order",
    },
};
import OrderForm from "@/components/Order/OrderForm";
import VisitTracker from "@/components/Order/VisitTracker";
import Container from "@/components/ui/Container";

const OrderPage = async () => {
    const res = await getProduct();
    const product = res?.success ? res.data : null;

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
                <div className="text-center">
                    <p className="text-gray-500">পণ্যের তথ্য লোড করা সম্ভব হয়নি। পরে আবার চেষ্টা করুন।</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50">
            <VisitTracker page="/order" />
            <Container>
                <OrderForm product={product} />
            </Container>
        </div>
    );
};

export default OrderPage;
