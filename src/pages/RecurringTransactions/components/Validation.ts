import { z } from "zod";

export const validationSchema = z.object({
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/i, {
      message: "Amount must be a number with up to 2 decimal places",
    })
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Amount must be a number",
    })
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Amount must be a number",
    })
    .refine((val) => parseFloat(val) >= 1, {
      message: "Amount must be greater than or equal to 1",
    }),
  type: z.enum(["income", "expense"]).optional(),
  category: z.number().optional(),
  account: z.number().optional(),
  nextCronDate: z.date().optional(),
  frequency: z.enum(["daily", "every_15_days", "monthly"]).optional(),
});
