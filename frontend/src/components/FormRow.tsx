import React from "react";
import { Input } from "./ui/input";

type formRowProps = {
  name: string;
  value: string | number;
  type: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const FormRow = ({
  name,
  value,
  label,
  placeholder,
  type,
  disabled,
  handleChange,
}: formRowProps) => {
  return (
    <div className="grid gap-y-2.5">
      <label htmlFor={name} className="capitalize">
        {label || name}
      </label>
      <Input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormRow;
