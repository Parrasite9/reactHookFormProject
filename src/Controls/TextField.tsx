import { forwardRef } from "react";
import type { ForwardedRef } from "react";
import type { FieldError } from "react-hook-form";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: FieldError | undefined;
};

export const TextField = forwardRef(
  (props: TextFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      type = "text",
      className = "",
      placeholder,
      error,
      ...other
    } = props;

    return (
      <div className="flex flex-col">
        <input
          type={type}
          className={className}
          placeholder={placeholder}
          ref={ref}
          {...other}
        />
        {error && <p className="text-red-500 text-sm">{error.message}</p>}
      </div>
    );
  }
);
