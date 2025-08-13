"use client";
import { cn } from "@/lib/utils";
import { Form, Input, Typography } from "antd";
import React from "react";
import type { Rule } from "antd/es/form";

type TInputProps = {
  Typolevel?: 1 | 2 | 3 | 4 | 5;
  label?: React.ReactNode;
  name: string;
  rules?: Rule[];
  type?: string;
  placeholder: string;
  disabled?: boolean;
  inputType?: "normal" | "password" | "textarea";
  rows?: number;
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
};

const ReuseInput = ({
  Typolevel = 5,
  label,
  name,
  rules = [],
  type = "text",
  placeholder,
  disabled,
  inputType = "normal",
  rows = 4,
  wrapperClassName,
  labelClassName,
  inputClassName,
}: TInputProps) => {
  return (
    <div className={cn(wrapperClassName)}>
      {label && (
        <Typography.Title
          level={Typolevel}
          className={cn("!text-base-color", labelClassName)}
        >
          {label}
        </Typography.Title>
      )}
      <Form.Item name={name} rules={rules}>
        {inputType === "password" ? (
          <Input.Password
            className={cn(
              "!py-1.5 !px-3 !text-lg !bg-primary-color border !border-primary-color !text-base-color rounded-lg",
              inputClassName
            )}
            placeholder={placeholder}
            disabled={disabled}
          />
        ) : inputType === "textarea" ? (
          <Input.TextArea
            className={cn(
              "!py-1.5 !px-3 !text-lg !bg-primary-color border !border-primary-color !text-base-color rounded-lg",
              inputClassName
            )}
            rows={rows}
            placeholder={placeholder}
            disabled={disabled}
          />
        ) : (
          <Input
            className={cn(
              "!py-1.5 !px-3 !text-lg !bg-primary-color border !border-primary-color !text-base-color rounded-lg",
              inputClassName
            )}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
          />
        )}
      </Form.Item>
    </div>
  );
};

export default ReuseInput;
