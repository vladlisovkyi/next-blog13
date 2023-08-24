import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";

interface ReusableInputProps {
  type: string;
  name: string;
  placeholder: string;
  register: any;
  error: any;
  pattern?: {
    value: RegExp;
    message: string;
  };
  validation?: (value: any) => boolean | string;
}

const ReusableInput: React.FC<ReusableInputProps> = ({
  type,
  name,
  placeholder,
  register,
  error,
  pattern,
  validation,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevValue) => !prevValue);
  };

  return (
    <div className="pb-6 relative">
      <input
        type={isPasswordVisible ? "text" : type}
        placeholder={placeholder}
        className={`w-full pl-3 pr-8 py-2 outline-none border-2 rounded-lg ${
          error && "border-red-500"
        } focus:border-blue-200 transition-colors duration-150`}
        {...register(name, {
          required: { value: true, message: 'Required' },
          pattern,
          validate: validation,
        })}
      />
      {type === "password" && (
        <button
          type="button"
          className="absolute top-2 right-2"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? <BiShow size={24} /> : <BiHide size={24} />}
        </button>
      )}
      {error && (
        <span className="text-xs text-red-500 absolute bottom-1 left-1">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default ReusableInput;
