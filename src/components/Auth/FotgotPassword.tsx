"use client";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { TbLockFilled } from "react-icons/tb";
import Container from "../ui/Container";
import { useRouter } from "next/navigation";

interface ForgotPasswordValues {
  email: string;
}

const ForgotPassword = () => {
  const router = useRouter();
  const onFinish = (values: ForgotPasswordValues) => {
    console.log("Received values of forgot form:", values);
    router.push("/forgot-password/otp-verify");
  };
  return (
    <div className="text-base-color">
      <Container>
        <div className="min-h-screen flex justify-center items-center ">
          <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto">
            <div className="mb-8">
              <TbLockFilled className="size-10 mb-4 text-secondary-color mx-auto" />
              <h1 className="text-3xl sm:text-4xl font-semibold text-secondary-color mb-5 text-center">
                Forgot Password
              </h1>
              <p className=" sm:text-lg mb-2 text-[#667085] text-center">
                Provide your account&apos;s phone number for which you want to
                reset your password
              </p>
            </div>

            <Form
              layout="vertical"
              className="bg-transparent w-full"
              onFinish={onFinish}
            >
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Email is Required",
                  },
                ]}
                name="email"
                className="text-base-color"
              >
                <Input
                  placeholder="Enter your email"
                  type="email"
                  className="py-1.5 px-3 text-lg !bg-primary-color border !border-[#D0D5DD] text-base-color"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="w-full py-5 border !border-secondary-color text-xl !text-primary-color !bg-secondary-color font-semibold rounded-2xl mt-4"
                  htmlType="submit"
                >
                  Send
                </Button>
              </Form.Item>
            </Form>

            <div className="text-base-color w-fit mx-auto mt-10">
              <Link
                href="/sign-in"
                className="flex justify-center items-center  gap-2 "
              >
                <FaArrowLeftLong className="size-4 " />
                <span>Back to log in</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default ForgotPassword;
