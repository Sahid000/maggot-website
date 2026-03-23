"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Form, Input, Typography } from "antd";
import AnimatedUnderline from "../ui/AnimatedUnderline";
import Container from "../ui/Container";
import { TfiEmail } from "react-icons/tfi";
import { FiPhone } from "react-icons/fi";
import { sendContactMessage } from "@/services/Order/ContactApi";
import { toast } from "sonner";

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL!;
const CONTACT_PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE!;

const ContactUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const TextArea = Input.TextArea;

  const onFinish = async (values: any) => {
    setLoading(true);
    const toastId = toast.loading("বার্তা পাঠানো হচ্ছে...");
    try {
      const res = await sendContactMessage(values);
      if (res?.success) {
        toast.success(res.message, { id: toastId, duration: 3000 });
        form.resetFields();
      } else {
        toast.error(res?.message || "বার্তা পাঠাতে সমস্যা হয়েছে", { id: toastId, duration: 3000 });
      }
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।", { id: toastId, duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div id="contact-us" ref={ref} className="py-20 overflow-hidden">
      <Container>
        <div className="mb-10 ">
          <div>
            <h5 className="text-xs sm:text-sm lg:text-base xl:text-lg font-semibold text-secondary-color mb-0.5">
              আমাদের সাথে যোগাযোগ করুন
            </h5>
            <AnimatedUnderline className="ml-12" />
          </div>
          <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 text-secondary-color py-1 mt-4">
            আমাদের বিশেষজ্ঞ দল আপনার প্রয়োজন নিয়ে আলোচনা করতে আপনার সাথে যোগাযোগ
            করবে।
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -200, opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full"
          >
            <div>
              <h1 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-base-color mb-5">
                যোগাযোগের ঠিকানা
              </h1>

              <div className="flex items-center gap-3 mb-3">
                <TfiEmail className="text-secondary-color text-base sm:text-lg lg:text-xl" />
                <p className="text-base-color font-semibold text-xs sm:text-sm lg:text-base">
                  {CONTACT_EMAIL}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="text-secondary-color text-base sm:text-lg lg:text-xl" />
                <p className="text-base-color font-semibold text-xs sm:text-sm lg:text-base">
                  {CONTACT_PHONE}
                </p>
              </div>
              <div className="mt-5">
                <iframe
                  src="https://www.google.com/maps?q=23.8153,90.4175&hl=es;z=14&output=embed"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 200, opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <div>
                <Typography.Title level={5} style={{ color: "#222222" }}>
                  পূর্ণ নাম
                </Typography.Title>
                <Form.Item name="name" rules={[{ required: true, message: "পূর্ণ নাম লিখুন" }]}>
                  <Input
                    placeholder="আপনার পূর্ণ নাম লিখুন"
                    className="py-2 px-3 text-lg bg-[#F7F8F8] border-2 border-[#E6E7E6] text-base-color"
                  />
                </Form.Item>
              </div>
              <div>
                <Typography.Title level={5} style={{ color: "#222222" }}>
                  ইমেইল
                </Typography.Title>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "ইমেইল লিখুন" },
                    { type: "email", message: "সঠিক ইমেইল দিন" },
                  ]}
                >
                  <Input
                    placeholder="আপনার ইমেইল লিখুন"
                    className="py-2 px-3 text-lg bg-[#F7F8F8] border-2 border-[#E6E7E6] text-base-color"
                  />
                </Form.Item>
              </div>
              <div>
                <Typography.Title level={5} style={{ color: "#222222" }}>
                  বিষয়
                </Typography.Title>
                <Form.Item name="subject" rules={[{ required: true, message: "বিষয় লিখুন" }]}>
                  <Input
                    placeholder="বিষয় লিখুন"
                    className="py-2 px-3 text-lg bg-[#F7F8F8] border-2 border-[#E6E7E6] text-base-color"
                  />
                </Form.Item>
              </div>
              <div>
                <Typography.Title level={5} style={{ color: "#222222" }}>
                  বার্তা
                </Typography.Title>
                <Form.Item name="message" rules={[{ required: true, message: "বার্তা লিখুন" }]}>
                  <TextArea
                    placeholder="আপনার বার্তা লিখুন"
                    rows={4}
                    className="py-2 px-3 text-lg bg-[#F7F8F8] border-2 border-[#E6E7E6] text-base-color"
                  />
                </Form.Item>
              </div>

              <Form.Item className="lg:col-span-2">
                <motion.button
                  className="cursor-pointer w-full py-3 border border-secondary-color hover:border-secondary-color text-xl text-primary-color bg-secondary-color font-semibold rounded-lg disabled:opacity-60"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "পাঠানো হচ্ছে..." : "পাঠান"}
                </motion.button>
              </Form.Item>
            </Form>
          </motion.div>
        </div>
      </Container>
    </motion.div>
  );
};

export default ContactUs;
