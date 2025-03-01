import { z } from "zod";
import { Category, Size } from ".prisma/client";

export const createProductForm = z.object({
  title: z.string().min(8, "Title must be at least 8 characters long."),
  description: z.string().min(1, "Description is required"),
  imageFiles: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) => file.type.match(/^image\//),
          "Only images are allowed."
        )
    )
    .nonempty({ message: "At least one image is required." }),
  category: z.nativeEnum(Category),
  priceInCents: z.coerce
    .number({ message: "Invalid price" })
    .int({ message: "Invalid price" })
    .min(1, { message: "Price is required" }),
  sizes: z.array(
    z.object({
      size: z.nativeEnum(Size),
      quantity: z.coerce
        .number({ message: "Invalid quantity" })
        .int({ message: "Invalid quantity" })
        .min(1, { message: "Quantity is required" }),
    })
  ),
});

export const signInForm = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const signUpForm = z.object({
  fullName: z
    .string()
    .refine(
      (value) => value.split(" ").every((word) => /^[A-Z][a-z]*$/.test(word)),
      {
        message:
          "Name must start with a capital letter and contain only letters.",
      }
    ),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(32, { message: "Password must not exceed 32 characters." })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter.",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "Password must contain at least one number.",
    })
    .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
      message: "Password must contain at least one special character.",
    }),
});
