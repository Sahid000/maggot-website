/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Form } from "antd";

import ReusableForm from "@/components/ui/Form/ReuseForm";
import ReuseInput from "@/components/ui/Form/ReuseInput";
import ReuseButton from "@/components/ui/Button/ReuseButton";
import ReuseSelect from "@/components/ui/Form/ReuseSelect";
import { useRouter } from "next/navigation";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { createOrder } from "@/services/Order/OrderApi";
import { FiMinus, FiPlus, FiTruck, FiPackage, FiCheckCircle } from "react-icons/fi";
import Container from "@/components/ui/Container";

// ── Update this when price changes ──────────────────────────
const PRICE_PER_KIT = 230; // BDT
// ────────────────────────────────────────────────────────────

const BANGLADESH_DISTRICTS = [
    "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura",
    "Brahmanbaria", "Chandpur", "Chapai Nawabganj", "Chattogram", "Chuadanga",
    "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur", "Faridpur", "Feni",
    "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore",
    "Jhalokathi", "Jhenaidah", "Joypurhat", "Khagrachhari", "Khulna",
    "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat",
    "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj",
    "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore",
    "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali",
    "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira",
    "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail",
    "Thakurgaon",
].map((d) => ({ label: d, value: d }));

const OrderPage = () => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const totalPrice = PRICE_PER_KIT * quantity;

    const changeQuantity = (delta: number) => {
        setQuantity((prev) => Math.max(1, prev + delta));
    };

    const handleSubmit = async (values: any) => {
        const payload = {
            ...values,
            insideDhaka: values.insideDhaka === "yes",
            quantity,
        };

        const res = await tryCatchWrapper(createOrder, { body: payload }, {
            setLoading,
            toastLoadingMessage: "অর্ডার প্রক্রিয়া করা হচ্ছে...",
            toastSuccessMessage: "অর্ডার সফলভাবে দেওয়া হয়েছে!",
        });

        if (res?.success) {
            const orderId = res.data?.orderId;
            const trackingToken = res.data?.trackingToken;

            if (trackingToken) {
                document.cookie = `maggot_order_token=${trackingToken}; path=/; SameSite=Lax`;
            }

            form.resetFields();
            setQuantity(1);
            router.push(`/track?id=${orderId}`);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4">
            <Container>

                {/* ── Header ───────────────────────────────────────────── */}
                <div
                    className="rounded-t-2xl px-8 pt-7 pb-6"
                    style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}
                >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <FiPackage className="text-yellow-400" size={20} />
                                <span className="text-yellow-400 text-sm font-semibold tracking-wide uppercase">
                                    ম্যাগট-ফ্রি রেসকিউ কিট
                                </span>
                            </div>
                            <h2 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                                অর্ডার দিন
                            </h2>
                            <p className="text-gray-400 text-sm mt-1">
                                নিচের তথ্যগুলো সঠিকভাবে পূরণ করুন
                            </p>
                        </div>

                        {/* COD Badge */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/40 rounded-xl px-4 py-2">
                                <FiTruck className="text-green-400" size={18} />
                                <div>
                                    <p className="text-green-400 font-bold text-sm leading-none">ক্যাশ অন ডেলিভারি</p>
                                    <p className="text-green-300/70 text-xs mt-0.5">পণ্য পেয়ে টাকা দিন</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                <FiCheckCircle className="text-green-400 flex-shrink-0" size={13} />
                                <span>আগে পেমেন্টের দরকার নেই</span>
                            </div>
                        </div>
                    </div>

                    {/* Price tag in header */}
                    <div className="mt-5 flex items-center gap-2">
                        <span className="text-gray-400 text-sm">প্রতি কিট:</span>
                        <span className="text-white font-bold text-lg">৳{PRICE_PER_KIT.toLocaleString("bn-BD")}</span>
                    </div>
                </div>

                {/* ── Form Body ────────────────────────────────────────── */}
                <div className="px-8 py-6 ">
                    <ReusableForm form={form} handleFinish={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">

                            <ReuseInput
                                name="name"
                                label="পুরো নাম *"
                                placeholder="আপনার পুরো নাম লিখুন"
                                rules={[{ required: true, message: "পুরো নাম আবশ্যক" }]}
                                Typolevel={5}
                                labelClassName="!font-semibold !text-gray-700"
                                inputClassName="!py-2.5"
                            />

                            <ReuseInput
                                name="email"
                                label="ইমেইল ঠিকানা *"
                                placeholder="আপনার ইমেইল লিখুন"
                                type="email"
                                rules={[
                                    { required: true, message: "ইমেইল আবশ্যক" },
                                    { type: "email", message: "সঠিক ইমেইল লিখুন" },
                                ]}
                                Typolevel={5}
                                labelClassName="!font-semibold !text-gray-700"
                                inputClassName="!py-2.5"
                            />

                            <ReuseInput
                                name="phone"
                                label="ফোন নম্বর *"
                                placeholder="আপনার ফোন নম্বর লিখুন"
                                rules={[{ required: true, message: "ফোন নম্বর আবশ্যক" }]}
                                Typolevel={5}
                                labelClassName="!font-semibold !text-gray-700"
                                inputClassName="!py-2.5"
                            />

                            <ReuseSelect

                                name="district"
                                label="জেলা *"
                                placeholder="আপনার জেলা বেছে নিন"
                                options={BANGLADESH_DISTRICTS}
                                rules={[{ required: true, message: "জেলা বেছে নেওয়া আবশ্যক" }]}
                                Typolevel={5}
                                labelClassName="!font-semibold !text-gray-700"
                            />

                            <ReuseSelect
                                name="insideDhaka"
                                label="ডেলিভারি এলাকা *"
                                placeholder="ডেলিভারি এলাকা বেছে নিন"
                                options={[
                                    { label: "ঢাকার ভেতরে", value: "yes" },
                                    { label: "ঢাকার বাইরে", value: "no" },
                                ]}
                                rules={[{ required: true, message: "ডেলিভারি এলাকা বেছে নেওয়া আবশ্যক" }]}
                                Typolevel={5}
                                labelClassName="!font-semibold !text-gray-700"
                            />

                            <div className="hidden md:block" />

                            <div className="md:col-span-2">
                                <ReuseInput
                                    name="address"
                                    label="সম্পূর্ণ ডেলিভারি ঠিকানা *"
                                    placeholder="বাড়ি নম্বর, রাস্তা, এলাকা সহ পুরো ঠিকানা লিখুন"
                                    inputType="textarea"
                                    rows={2}
                                    rules={[{ required: true, message: "ডেলিভারি ঠিকানা আবশ্যক" }]}
                                    Typolevel={5}
                                    labelClassName="!font-semibold !text-gray-700"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <ReuseInput
                                    name="note"
                                    label="বিশেষ নির্দেশনা (ঐচ্ছিক)"
                                    placeholder="ডেলিভারি সম্পর্কে কোনো বিশেষ নির্দেশনা থাকলে লিখুন..."
                                    inputType="textarea"
                                    rows={2}
                                    Typolevel={5}
                                    labelClassName="!font-semibold !text-gray-700"
                                />
                            </div>

                        </div>

                        {/* ── Quantity + Price + Submit ─────────────────────── */}
                        <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-5">
                            <div className="flex flex-wrap items-center justify-between gap-4">

                                {/* Quantity Selector */}
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                        পরিমাণ
                                    </p>
                                    <div className="flex items-center gap-0 rounded-xl overflow-hidden border border-gray-200 bg-white w-fit shadow-sm">
                                        <button
                                            type="button"
                                            onClick={() => changeQuantity(-1)}
                                            disabled={quantity <= 1}
                                            className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <FiMinus size={16} />
                                        </button>
                                        <div className="w-12 h-11 flex items-center justify-center font-bold text-lg text-gray-900 border-x border-gray-200">
                                            {quantity}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => changeQuantity(1)}
                                            className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                                        >
                                            <FiPlus size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Price Breakdown */}
                                <div className="text-right">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                        মূল্য হিসাব
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        ৳{PRICE_PER_KIT.toLocaleString()} × {quantity} কিট
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900 mt-0.5">
                                        ৳{totalPrice.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-green-600 font-medium mt-0.5 flex items-center justify-end gap-1">
                                        <FiTruck size={11} />
                                        ডেলিভারি পেয়ে পরিশোধ
                                    </p>
                                </div>

                            </div>

                            {/* Submit */}
                            <div className="mt-5">
                                <ReuseButton
                                    htmlType="submit"
                                    variant="secondary"
                                    loading={loading}
                                    className="!text-base !font-bold !rounded-xl !py-6"
                                >
                                    {loading ? "অর্ডার প্রক্রিয়া হচ্ছে..." : `অর্ডার নিশ্চিত করুন — ৳${totalPrice.toLocaleString()}`}
                                </ReuseButton>
                            </div>
                        </div>

                    </ReusableForm>
                </div>

            </Container>
        </div>
    );
};

export default OrderPage;
