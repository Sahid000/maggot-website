"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Form, Select, Typography } from "antd";
import React from "react";

const { Option } = Select;

type TSelectProps = {
  Typolevel?: 1 | 2 | 3 | 4 | 5;
  label?: React.ReactNode;
  name: string;
  rules?: Array<Record<string, any>>;
  placeholder?: string;
  disabled?: boolean;
  options: { label: string; value: string | number }[];
  allowClear?: boolean;
  mode?: "multiple" | undefined;
  wrapperClassName?: string;
  labelClassName?: string;
  selectClassName?: string;
};

const ReuseSelect = ({
  Typolevel = 5,
  label,
  name,
  rules = [],
  placeholder,
  disabled,
  options,
  allowClear = false,
  mode,
  wrapperClassName,
  labelClassName,
  selectClassName,
}: TSelectProps) => {
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
        <Select
          mode={mode}
          className={cn(
            "!h-10  !text-base-color !placeholder:text-[##B5B5B5] border !border-primary-color !ring-0 rounded-md ",
            selectClassName
          )}
          placeholder={placeholder}
          disabled={disabled}
          allowClear={allowClear}
        >
          {options.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
};

export default ReuseSelect;
