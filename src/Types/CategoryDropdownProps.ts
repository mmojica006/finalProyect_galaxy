import { FieldProps } from "formik";

export interface CategoryDropdownProps extends FieldProps {
    categories: string[];
  }