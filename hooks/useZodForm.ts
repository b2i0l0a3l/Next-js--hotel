import z from "zod";
import { useForm, DefaultValues, FieldValues } from "react-hook-form";

export const safeZodResolver = <TSchema extends z.ZodType<any, any>>(schema: TSchema) => {
  return async (values: any) => {
    try {
      const result = await schema.safeParseAsync(values);
      if (!result.success) {
        return {
          values: {},
          errors: result.error.issues.reduce((acc: any, issue) => {
            const path = issue.path.join(".");
            acc[path] = {
              type: issue.code,
              message: issue.message,
            };
            return acc;
          }, {}),
        };
      }
      return {
        values: result.data,
        errors: {},
      };
    } catch (error: any) {
      console.error("Zod custom resolver validation error:", error);
      return {
        values: {},
        errors: {
          root: {
            type: "manual",
            message: "Validation failed",
          },
        },
      };
    }
  };
};

export function useZodForm<TSchema extends z.ZodType<FieldValues, any, any>>(
    schema: TSchema,
    defaultValues?: DefaultValues<z.infer<TSchema>>
) {
    return useForm<z.infer<TSchema>>({
        resolver: safeZodResolver(schema),
        defaultValues, 
    });
}