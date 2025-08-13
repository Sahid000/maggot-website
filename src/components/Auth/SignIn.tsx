"use client";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import Link from "next/link";
import Container from "../ui/Container";
import { allIcons, AllImages } from "../../../public/assets/AllImages";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SignInValues {
  email: string;
  password: string;
}

const SignIn = () => {
  const router = useRouter();
  const onFinish = (values: SignInValues) => {
    console.log("Received values of login form:", values);
    router.push("/");
  };
  return (
    <div className="text-base-color">
      <Container>
        <div className=" min-h-screen flex justify-center items-center">
          <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto">
            <Image
              src={AllImages.logo}
              width={500}
              height={500}
              className="w-64 mx-auto"
              alt="logo"
            />
            {/* -------- Sign In Page Header ------------ */}
            <div className="flex flex-col justify-center items-center">
              <div className="text-center mt-5 mb-8">
                <h1 className="text-3xl sm:text-4xl font-semibold mb-4 text-secondary-color">
                  Sign In
                </h1>
                <p className="text-lg sm:text-xl mb-2 text-[#667085]">
                  Welcome back! Please enter your details.
                </p>
              </div>
            </div>
            {/* -------- Form Start ------------ */}

            <Form
              layout="vertical"
              className="bg-transparent w-full"
              onFinish={onFinish}
            >
              <Typography.Title level={5} style={{ color: "#344054" }}>
                Email
              </Typography.Title>
              <Form.Item
                name="email"
                className="text-base-color"
                rules={[
                  {
                    required: true,
                    message: "Email is Required",
                  },
                ]}
              >
                <Input
                  placeholder="Enter your email"
                  className="py-1.5 px-3 text-lg !bg-primary-color border !border-[#D0D5DD] text-base-color"
                />
              </Form.Item>
              <Typography.Title level={5} style={{ color: "#344054" }}>
                Password
              </Typography.Title>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Password is Required",
                  },
                ]}
                name="password"
                className="text-base-color"
              >
                <Input.Password
                  placeholder="Enter your password"
                  className="py-1.5 px-3 text-lg !bg-primary-color border !border-[#D0D5DD] text-base-color"
                />
              </Form.Item>

              <div className="flex justify-between items-center mt-10">
                <Checkbox className="">Remember me</Checkbox>
                <Link
                  href="/forgot-password"
                  className="!text-secondary-color !underline font-bold"
                >
                  Forgot Password?
                </Link>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  className="w-full py-5 border border-secondary-color hover:border-secondary-color text-xl text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-5"
                  htmlType="submit"
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
            <Button
              className="w-full flex items-center justify-center gap-2 py-4 px-4 text-lg !border !border-[#D0D5DD] !text-base-color !bg-transparent  rounded-lg"
              icon={
                <Image
                  src={allIcons.google}
                  alt="Google Icon"
                  width={16}
                  height={16}
                />
              }
            >
              Sign in with Google
            </Button>
            <p className="text-center text-ellipsis mt-10">
              Don’t have an account?
              <span>
                <Link
                  href="/sign-up"
                  className="text-secondary-color font-semibold underline ml-2"
                >
                  Sign Up
                </Link>
              </span>{" "}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default SignIn;
