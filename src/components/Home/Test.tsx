"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReusableForm from "../ui/Form/ReuseForm";
import ReuseInput from "../ui/Form/ReuseInput";
import ReuseSelect from "../ui/Form/ReuseSelect";
import ReuseUpload from "../ui/Form/ReuseUpload";
import Container from "../ui/Container";
import ReuseButton from "../ui/Button/ReuseButton";

const AntdFormDemo = () => {
  const handleSubmit = (values: Record<string, any>) => {
    console.log("Form Submitted:", values);
  };

  return (
    <div className="bg-[#202020] py-20">
      <Container>
        <ReusableForm onSubmit={handleSubmit}>
          <ReuseUpload
            label="Profile Image"
            name="profileImage"
            buttonText="Upload Profile Image"
            accept="image/png, image/jpeg"
            maxCount={1}
            rules={[
              { required: true, message: "Please upload a profile image" },
            ]}
            wrapperClassName="mb-4"
          />
          <ReuseInput
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            rules={[{ required: true, message: "Email is required" }]}
            wrapperClassName="mb-4"
          />

          <ReuseInput
            label="Password"
            name="password"
            placeholder="Enter your password"
            inputType="password"
            rules={[{ required: true, message: "Password is required" }]}
            wrapperClassName="mb-4"
          />

          <ReuseSelect
            label="Role"
            name="role"
            placeholder="Select your role"
            options={[
              { label: "Admin", value: "admin" },
              { label: "Editor", value: "editor" },
              { label: "Viewer", value: "viewer" },
            ]}
            rules={[{ required: true, message: "Please select your role" }]}
            wrapperClassName="mb-4"
          />
          <ReuseInput
            label="Description"
            name="description"
            placeholder="Enter your description"
            inputType="textarea"
            rules={[{ required: true, message: "Description is required" }]}
            wrapperClassName="mb-4"
          />
          <ReuseButton variant="primary" htmlType="submit" className="w-1/2">
            Submit
          </ReuseButton>
        </ReusableForm>
      </Container>
    </div>
  );
};

export default AntdFormDemo;
