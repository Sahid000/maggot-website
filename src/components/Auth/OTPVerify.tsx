"use client";
import { Button, Form } from "antd";
import { useState } from "react";
import OTPInput from "react-otp-input";
import Container from "../ui/Container";
import { useRouter } from "next/navigation";
import { MdVerifiedUser } from "react-icons/md";

const OTPVerify = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const handleOTPSubmit = () => {
    if (otp.length === 6) {
      console.log("OTP:", otp);
      if (window?.location?.pathname === "/sign-up/otp-verify") {
        router.push("/");
      } else {
        router.push("/update-password");
      }
    }
  };

  return (
    <div className="text-base-color">
      <Container>
        <div className="min-h-screen flex justify-center items-center text-center">
          <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto">
            <div className="mb-8">
              <MdVerifiedUser className="size-10 mb-4 text-secondary-color mx-auto" />
              <h1 className="text-3xl sm:text-4xl font-semibold text-secondary-color mb-5">
                Verify Your Email
              </h1>
              <p className="text-lg sm:text-xl mb-2 text-[#667085]">
                Enter the OTP sent to your email
              </p>
            </div>

            <Form layout="vertical" className="bg-transparent w-full">
              <Form.Item className="">
                <div className="flex justify-center items-center">
                  <OTPInput
                    inputStyle="!w-[35px] h-[45px] md:!w-[76px] md:!h-[64px] text-[20px] sm:text-[30px] !bg-primary-color border !border-[#273D62]
                      rounded-lg mr-[10px] sm:mr-[20px] !text-[#273D62]"
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => <input {...props} required />}
                  />
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="w-full py-5 border !border-secondary-color text-xl !text-primary-color !bg-secondary-color font-semibold rounded-2xl "
                  onClick={handleOTPSubmit}
                >
                  Verify OTP
                </Button>
              </Form.Item>
            </Form>
            <div className="flex justify-center gap-2 py-1">
              <p>Didn’t receive code?</p>
              <p className="!text-secondary-color !underline font-semibold cursor-pointer">
                Click to resend
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default OTPVerify;
