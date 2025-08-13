"use client";
import { useRouter } from "next/navigation";
import Container from "../ui/Container";
import Image from "next/image";
import { Button, Form, Input, Typography } from "antd";
import Link from "next/link";
import { allIcons, AllImages } from "../../../public/assets/AllImages";

interface SignUpValues {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
}

const SignUp = () => {
  const router = useRouter();
  const onFinish = (values: SignUpValues) => {
    console.log("Received values of login form:", values);
    router.push("/sign-up/otp-verify");
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
              <div className="text-center mt-5">
                <h1 className="text-2xl sm:text-3xl font-semibold mb-4 text-secondary-color">
                  Sign Up
                </h1>
              </div>
            </div>
            {/* -------- Form Start ------------ */}

            <Form
              layout="vertical"
              className="bg-transparent w-full"
              onFinish={onFinish}
            >
              <Typography.Title level={5} style={{ color: "#344054" }}>
                Name
              </Typography.Title>
              <Form.Item
                name="name"
                className="text-base-color"
                rules={[
                  {
                    required: true,
                    message: "Name is Required",
                  },
                ]}
              >
                <Input
                  placeholder="Enter your name"
                  className="py-1.5 px-3 text-lg !bg-primary-color border !border-[#D0D5DD] text-base-color"
                />
              </Form.Item>
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
              <Typography.Title
                level={5}
                className="text-start"
                style={{ color: "#344054" }}
              >
                New Password
              </Typography.Title>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "New Password is Required",
                  },
                ]}
                name="password"
                className="text-base-color"
              >
                <Input.Password
                  placeholder="Enter new password"
                  className="py-1.5 px-3 text-lg !bg-primary-color border !border-[#D0D5DD] text-base-color"
                />
              </Form.Item>
              <Typography.Title
                level={5}
                className="text-start"
                style={{ color: "#344054" }}
              >
                Confirm Password
              </Typography.Title>
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
                className="text-base-color"
              >
                <Input.Password
                  placeholder="Enter your password"
                  className="py-1.5 px-3 text-lg !bg-primary border !border-[#D0D5DD] text-base-color"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="w-full py-5 border border-secondary-color hover:border-secondary-color text-xl text-primary bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-4"
                  htmlType="submit"
                >
                  Sign Up
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
            <p className="text-center text-ellipsis mt-5">
              Already have an account?
              <span>
                <Link
                  href="/sign-in"
                  className="text-secondary-color font-semibold underline ml-2"
                >
                  Sign In
                </Link>
              </span>{" "}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default SignUp;
