import z from "zod";
import { useForm, DefaultValues, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function useZodForm<TSchema extends z.ZodType<FieldValues, any, any>>(
    schema: TSchema,
    defaultValues?: DefaultValues<z.infer<TSchema>>
) {
    return useForm<z.infer<TSchema>>({
        resolver: zodResolver(schema),
        defaultValues, 
    });
    
}