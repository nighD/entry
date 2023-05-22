'use client';

import {
  FieldErrors,
  FieldValues,
  UseFormRegister
} from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  register,
  required,
  errors,
}) => {
  return (
    <div className="w-1/2 relative h-[40px]">
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
          peer
          w-full
          h-full
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${errors[id] ? 'border-blue-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-blue-500' : 'focus:border-black'}
        `}
      />
      <label
        className={`
          absolute
          text-md
          duration-150
          transform
          -translate-y-3
          top-2
          z-10
          origin-[0]
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          left-4
          ${errors[id] ? 'text-blue-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>
    </div>
   );
}

export default Input;