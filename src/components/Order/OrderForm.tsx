/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Checkbox, Form } from "antd";
import Link from "next/link";
import { toast } from "sonner";

import ReusableForm from "@/components/ui/Form/ReuseForm";
import ReuseInput from "@/components/ui/Form/ReuseInput";
import ReuseButton from "@/components/ui/Button/ReuseButton";
import ReuseSelect from "@/components/ui/Form/ReuseSelect";
import { useRouter } from "next/navigation";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { createOrder, validateCoupon } from "@/services/Order/OrderApi";
import { FiMinus, FiPlus, FiTruck, FiPackage, FiCheckCircle, FiTag, FiX } from "react-icons/fi";

const BANGLADESH_DISTRICTS = [
    "বাগেরহাট", "বান্দরবান", "বরগুনা", "বরিশাল", "ভোলা", "বগুড়া",
    "ব্রাহ্মণবাড়িয়া", "চাঁদপুর", "চাঁপাইনবাবগঞ্জ", "চট্টগ্রাম", "চুয়াডাঙ্গা",
    "কক্সবাজার", "কুমিল্লা", "ঢাকা", "দিনাজপুর", "ফরিদপুর", "ফেনী",
    "গাইবান্ধা", "গাজীপুর", "গোপালগঞ্জ", "হবিগঞ্জ", "জামালপুর", "যশোর",
    "ঝালকাঠি", "ঝিনাইদহ", "জয়পুরহাট", "খাগড়াছড়ি", "খুলনা",
    "কিশোরগঞ্জ", "কুড়িগ্রাম", "কুষ্টিয়া", "লক্ষ্মীপুর", "লালমনিরহাট",
    "মাদারীপুর", "মাগুরা", "মানিকগঞ্জ", "মেহেরপুর", "মৌলভীবাজার", "মুন্সীগঞ্জ",
    "ময়মনসিংহ", "নওগাঁ", "নড়াইল", "নারায়ণগঞ্জ", "নরসিংদী", "নাটোর",
    "নেত্রকোণা", "নীলফামারী", "নোয়াখালী", "পাবনা", "পঞ্চগড়", "পটুয়াখালী",
    "পিরোজপুর", "রাজবাড়ী", "রাজশাহী", "রাঙ্গামাটি", "রংপুর", "সাতক্ষীরা",
    "শরীয়তপুর", "শেরপুর", "সিরাজগঞ্জ", "সুনামগঞ্জ", "সিলেট", "টাঙ্গাইল",
    "ঠাকুরগাঁও",
].map((d) => ({ label: d, value: d }));

export interface ProductConfig {
    pricePerKit: number;
    deliveryFeeInsideDhaka: number;
    deliveryFeeOutsideDhaka: number;
    deliveryFeeThreshold: number;
}

const OrderForm = ({ product }: { product: ProductConfig }) => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // Coupon state
    const [couponInput, setCouponInput] = useState("");
    const [couponLoading, setCouponLoading] = useState(false);
    const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number; discountType: string; discountValue: number } | null>(null);
    const [couponError, setCouponError] = useState("");

    const insideDhakaVal = Form.useWatch("insideDhaka", form);
    const isInside = insideDhakaVal === "yes";

    const { pricePerKit, deliveryFeeInsideDhaka, deliveryFeeOutsideDhaka, deliveryFeeThreshold } = product;
    const baseFee = isInside ? deliveryFeeInsideDhaka : deliveryFeeOutsideDhaka;
    const deliveryMultiplier = Math.ceil(quantity / deliveryFeeThreshold);
    const deliveryFee = insideDhakaVal ? deliveryMultiplier * baseFee : null;
    const subtotal = pricePerKit * quantity;
    const subtotalWithDelivery = subtotal + (deliveryFee ?? 0);
    const discountAmount = appliedCoupon?.discountAmount ?? 0;
    const totalPrice = subtotalWithDelivery - discountAmount;

    const changeQuantity = (delta: number) => {
        setQuantity((prev) => Math.max(1, prev + delta));
        // Revalidate coupon when quantity changes (subtotal changes)
        if (appliedCoupon) setAppliedCoupon(null);
    };

    const handleApplyCoupon = async () => {
        if (!couponInput.trim()) return;
        setCouponError("");
        setCouponLoading(true);
        try {
            const res = await validateCoupon(couponInput.trim(), subtotalWithDelivery);
            if (res?.success) {
                setAppliedCoupon(res.data);
                setCouponError("");
            } else {
                setCouponError(res?.message ?? "কুপন কোডটি বৈধ নয়");
                setAppliedCoupon(null);
            }
        } finally {
            setCouponLoading(false);
        }
    };

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        setCouponInput("");
        setCouponError("");
    };

    const handleSubmit = async (values: any) => {
        const payload = {
            ...values,
            insideDhaka: values.insideDhaka === "yes",
            quantity,
            ...(appliedCoupon ? { couponCode: appliedCoupon.code } : {}),
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
                const secure = location.protocol === "https:" ? "; Secure" : "";
                document.cookie = `maggot_order_token=${trackingToken}; path=/; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}${secure}`;
            }

            form.resetFields();
            setQuantity(1);
            setAppliedCoupon(null);
            setCouponInput("");
            router.push(`/track?id=${orderId}`);
        }
    };

    return (
        <div>
            {/* ── Header ───────────────────────────────────────────── */}
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

                {/* Price info */}
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1">
                    <span className="text-white font-bold text-lg">
                        প্রতি কিট: ৳{pricePerKit.toLocaleString("bn-BD")}
                    </span>
                    <span className="text-gray-400 text-xs">
                        ডেলিভারি: ঢাকার ভেতরে ৳{deliveryFeeInsideDhaka} / বাইরে ৳{deliveryFeeOutsideDhaka}
                        {" "}(প্রতি {deliveryFeeThreshold} কিটে)
                    </span>
                </div>
            </div>

            {/* ── Form Body ────────────────────────────────────────── */}
            <div className="px-8 py-6">
                <ReusableForm
                    form={form}
                    handleFinish={handleSubmit}
                    onFinishFailed={() => toast.error("সকল আবশ্যক তথ্য পূরণ করুন")}
                >
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

                    {/* ── Order Summary ────────────────────────────────── */}
                    <div
                        className="mt-6 rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
                        style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}
                    >
                        {/* Summary Header */}
                        <div className="px-6 pt-5 pb-4 border-b border-white/10">
                            <p className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-0.5">
                                অর্ডার সারাংশ
                            </p>
                            <p className="text-white/60 text-xs">পরিমাণ নির্বাচন করুন ও মূল্য যাচাই করুন</p>
                        </div>

                        <div className="px-6 py-5 space-y-4">
                            {/* Quantity Row */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/50 text-xs uppercase tracking-wide mb-1.5">পরিমাণ</p>
                                    <div className="flex items-center rounded-xl overflow-hidden border border-white/20 bg-white/10 w-fit">
                                        <button
                                            type="button"
                                            onClick={() => changeQuantity(-1)}
                                            disabled={quantity <= 1}
                                            className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <FiMinus size={14} />
                                        </button>
                                        <div className="w-12 h-10 flex items-center justify-center font-bold text-lg text-white border-x border-white/20">
                                            {quantity}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => changeQuantity(1)}
                                            className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                                        >
                                            <FiPlus size={14} />
                                        </button>
                                    </div>
                                </div>

                                {/* Kit price tag */}
                                <div className="text-right">
                                    <p className="text-white/50 text-xs uppercase tracking-wide mb-1">প্রতি কিট</p>
                                    <p className="text-white font-bold text-lg">৳{pricePerKit.toLocaleString()}</p>
                                </div>
                            </div>

                            {/* Line Items */}
                            <div className="rounded-xl bg-white/5 border border-white/10 divide-y divide-white/10">
                                {/* Subtotal */}
                                <div className="flex items-center justify-between px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <FiPackage size={14} className="text-white/40" />
                                        <span className="text-white/70 text-sm">
                                            {quantity} কিট × ৳{pricePerKit.toLocaleString()}
                                        </span>
                                    </div>
                                    <span className="text-white font-semibold text-sm">৳{subtotal.toLocaleString()}</span>
                                </div>

                                {/* Delivery */}
                                <div className="flex items-center justify-between px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <FiTruck size={14} className="text-white/40" />
                                        <div>
                                            <span className="text-white/70 text-sm">ডেলিভারি চার্জ</span>
                                            {deliveryFee !== null && (
                                                <span className="ml-1.5 text-xs text-white/40">
                                                    ({deliveryMultiplier}×৳{baseFee})
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {deliveryFee !== null ? (
                                        <span className="text-white font-semibold text-sm">৳{deliveryFee.toLocaleString()}</span>
                                    ) : (
                                        <span className="text-white/40 text-xs italic">
                                            ঢাকায় ৳{(deliveryMultiplier * deliveryFeeInsideDhaka).toLocaleString()} / বাইরে ৳{(deliveryMultiplier * deliveryFeeOutsideDhaka).toLocaleString()}
                                        </span>
                                    )}
                                </div>

                                {/* Coupon Row */}
                                {appliedCoupon && (
                                    <div className="flex items-center justify-between px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <FiTag size={14} className="text-green-400" />
                                            <span className="text-green-300 text-sm font-mono font-semibold">{appliedCoupon.code}</span>
                                            <button type="button" onClick={handleRemoveCoupon} className="text-white/40 hover:text-white/70">
                                                <FiX size={12} />
                                            </button>
                                        </div>
                                        <span className="text-green-400 font-semibold text-sm">-৳{discountAmount.toLocaleString()}</span>
                                    </div>
                                )}

                                {/* Total */}
                                <div className="flex items-center justify-between px-4 py-3.5 bg-white/5 rounded-b-xl">
                                    <span className="text-white font-bold text-sm uppercase tracking-wide">মোট পরিশোধ</span>
                                    <div className="text-right">
                                        <p className="text-yellow-400 font-bold text-2xl leading-none">
                                            ৳{totalPrice.toLocaleString()}
                                        </p>
                                        {deliveryFee === null && (
                                            <p className="text-white/40 text-xs mt-0.5">+ ডেলিভারি চার্জ</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Coupon Input */}
                            <div className="space-y-1.5">
                                {!appliedCoupon ? (
                                    <div className="flex gap-2">
                                        <div className="flex-1 flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-3 py-2">
                                            <FiTag size={14} className="text-white/40 flex-shrink-0" />
                                            <input
                                                type="text"
                                                value={couponInput}
                                                onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError(""); }}
                                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleApplyCoupon())}
                                                placeholder="কুপন কোড লিখুন"
                                                className="flex-1 bg-transparent text-white text-sm placeholder-white/30 outline-none"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleApplyCoupon}
                                            disabled={couponLoading || !couponInput.trim()}
                                            className="px-4 py-2 bg-yellow-400 text-black text-sm font-bold rounded-xl hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                                        >
                                            {couponLoading ? "..." : "প্রয়োগ"}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between bg-green-500/15 border border-green-500/30 rounded-xl px-4 py-2.5">
                                        <div className="flex items-center gap-2">
                                            <FiTag size={14} className="text-green-400" />
                                            <span className="text-green-300 text-sm font-semibold">
                                                {appliedCoupon.discountType === "percent"
                                                    ? `${appliedCoupon.discountValue}% ছাড় প্রয়োগ হয়েছে`
                                                    : `৳${appliedCoupon.discountValue} ছাড় প্রয়োগ হয়েছে`}
                                            </span>
                                        </div>
                                        <button type="button" onClick={handleRemoveCoupon} className="text-white/50 hover:text-white text-xs underline">
                                            সরান
                                        </button>
                                    </div>
                                )}
                                {couponError && (
                                    <p className="text-red-400 text-xs px-1">{couponError}</p>
                                )}
                            </div>

                            {/* COD note */}
                            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-2.5">
                                <FiCheckCircle className="text-green-400 flex-shrink-0" size={15} />
                                <p className="text-green-300 text-xs font-medium">
                                    ক্যাশ অন ডেলিভারি — পণ্য হাতে পেয়ে পরিশোধ করুন
                                </p>
                            </div>

                            {/* Terms Checkbox */}
                            <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-3.5">
                                <Form.Item
                                    name="termsAgreed"
                                    valuePropName="checked"
                                    rules={[
                                        {
                                            validator: (_, value) =>
                                                value
                                                    ? Promise.resolve()
                                                    : Promise.reject("অর্ডার দিতে শর্তাবলীতে সম্মত হওয়া আবশ্যক"),
                                        },
                                    ]}
                                    className="!mb-0"
                                >
                                    <Checkbox>
                                        <span className="text-white/80 text-[13px] leading-relaxed select-none">
                                            আমি{" "}
                                            <Link
                                                href="/terms"
                                                target="_blank"
                                                className="text-yellow-400 font-semibold hover:text-yellow-300 underline underline-offset-2 decoration-yellow-400/50"
                                            >
                                                শর্তাবলী
                                            </Link>
                                            ,{" "}
                                            <Link
                                                href="/privacy"
                                                target="_blank"
                                                className="text-yellow-400 font-semibold hover:text-yellow-300 underline underline-offset-2 decoration-yellow-400/50"
                                            >
                                                গোপনীয়তা নীতি
                                            </Link>{" "}
                                            এবং{" "}
                                            <Link
                                                href="/return-policy"
                                                target="_blank"
                                                className="text-yellow-400 font-semibold hover:text-yellow-300 underline underline-offset-2 decoration-yellow-400/50"
                                            >
                                                রিটার্ন নীতি
                                            </Link>{" "}
                                            পড়েছি এবং সম্মত আছি
                                        </span>
                                    </Checkbox>
                                </Form.Item>
                            </div>

                            {/* Submit */}
                            <ReuseButton
                                htmlType="submit"
                                variant="secondary"
                                loading={loading}
                                className="!text-base !font-bold !rounded-xl !py-6"
                            >
                                {loading
                                    ? "অর্ডার প্রক্রিয়া হচ্ছে..."
                                    : deliveryFee !== null
                                        ? `অর্ডার নিশ্চিত করুন — ৳${totalPrice.toLocaleString()}`
                                        : `অর্ডার নিশ্চিত করুন — ৳${(subtotal - discountAmount).toLocaleString()} + ডেলিভারি`}
                            </ReuseButton>
                        </div>
                    </div>

                </ReusableForm>
            </div>
        </div>
    );
};

export default OrderForm;
