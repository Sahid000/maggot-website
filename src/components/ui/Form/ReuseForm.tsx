"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { ReactNode } from "react";

type ReusableFormProps = {
  onSubmit: (values: Record<string, any>) => void;
  children: ReactNode;
  defaultValues?: Record<string, any>;
};

const ReusableForm = ({
  onSubmit,
  children,
  defaultValues,
}: ReusableFormProps) => {
  const [form] = Form.useForm();

  const handleFinish = (values: Record<string, any>) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={defaultValues}
      onFinish={handleFinish}
    >
      {children}
    </Form>
  );
};

export default ReusableForm;
