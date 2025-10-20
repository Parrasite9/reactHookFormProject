import { forwardRef } from "react";
import type { ForwardedRef } from "react";
import type { FieldError } from "react-hook-form";
import type { SelectOptionType } from "../Types";

type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  error?: FieldError | undefined;
  options: SelectOptionType[];
};

export const Select = forwardRef(
  (props: SelectFieldProps, ref: ForwardedRef<HTMLSelectElement>) => {
    const { className = "", options, error, ...other } = props;

    return (
      <div className="form-floating">
        <select className="form-select" ref={ref} {...other}>
          {options.map((x, index) => (
            <option key={index} value={x.value}>
              {x.text}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-sm">{error.message}</p>}
      </div>
    );
  }
);
