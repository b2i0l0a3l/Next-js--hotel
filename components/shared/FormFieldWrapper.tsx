import { Control, FieldValues, Path, ControllerRenderProps } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormDescription, FormControl, FormMessage } from "@/components/ui/form";

interface FormInputProps<
    TFieldValues extends FieldValues,
    TName extends Path<TFieldValues> = Path<TFieldValues>
> {
    control: Control<TFieldValues>;
    name: TName;
    label: string;
    description?: string;
    className?:string;
    children: (field: ControllerRenderProps<TFieldValues, TName>) => React.ReactNode;
}

export function FormFieldWrapper<
    TFieldValues extends FieldValues,
    TName extends Path<TFieldValues> = Path<TFieldValues>
>({
    control, 
    name,
    label,
    description,
    className,
    children,
}: FormInputProps<TFieldValues, TName>) {
    return (
        <FormField
            control={control} 
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    <FormLabel>{label}</FormLabel>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormControl>
                        {children(field)}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}