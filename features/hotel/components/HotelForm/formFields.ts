import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

export interface Field<
  TFieldValues extends FieldValues = any,
  TName extends Path<TFieldValues> = any
> {
  name: TName;
  label: string;
  description?: string;
  type: (field: ControllerRenderProps<TFieldValues, TName>) => React.ReactNode;
}

