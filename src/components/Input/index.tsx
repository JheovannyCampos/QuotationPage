import React, { useRef, useEffect } from "react";
import { useField } from "@unform/core";
import { InputForm } from "./styles";
import InputMask from "react-input-mask";

interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  placeholder: string;
  select?: boolean;
  options?: Array<string>;
}

const Input = (Props: inputProps) => {
  const { name, label, placeholder, select, options, ...rest } = Props;
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <label htmlFor={fieldName}>{label}</label>
      <InputMask
        className="input"
        id={fieldName}
        name={name}
        mask="9.99"
        ref={inputRef}
        type="tel"
        defaultValue={defaultValue}
        placeholder={placeholder}
        style={{ height: "40px", width: "100%" }}
        required
        {...rest}
      />
      {error && <span className="error">{error}</span>}
    </>
  );
};
export default Input;
