import {
  Checkbox as ChakraCheckbox,
  CheckboxProps as ChakraCheckboxProps,
} from "@chakra-ui/react";
import * as React from "react";

export interface CheckboxProps extends ChakraCheckboxProps {
  icon?: React.ReactElement | undefined; // ✅ Fixed type
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const { icon, children, inputProps, ...rest } = props;

    return (
      <ChakraCheckbox {...rest}>
        <input
          ref={ref}
          type="checkbox"
          {...inputProps}
          style={{ display: "none" }}
        />
        {icon} {/* Ensuring only ReactElement is passed */}
        {children && <span>{children}</span>}
      </ChakraCheckbox>
    );
  }
);
