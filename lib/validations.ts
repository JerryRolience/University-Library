import { profile } from "console";
import { z } from "zod";

// Common password validation reusable across schemas
const passwordValidation = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(64, "Password cannot exceed 64 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character (e.g., !@#$%^&*)"
  )
  .refine(
    (password) => !password.includes(" "),
    "Password cannot contain spaces"
  );

export const signUpSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name cannot exceed 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  universityId: z.string().refine(
    (val) => {
      // Basic format check
      const formatValid = /^[A-Z]{3}\/\d{4}\/\d{2}$/.test(val);
      if (!formatValid) return false;

      // Extract year portion
      const yearPart = val.split("/")[2];
      const fullYear = 2000 + parseInt(yearPart);

      // Year range check (2020-2030)
      return fullYear >= 2020 && fullYear <= 2030;
    },
    {
      message:
        "University ID must be in format: ABC/1234/20-30 (where last digits represent year 2020-2030)",
    }
  ),
  universityCard: z.string().nonempty("University card image is required"),
  password: passwordValidation,
});

export const editIDDetailsSchema = z.object({
  universityId: z.string().refine(
    (val) => {
      // Basic format check
      const formatValid = /^[A-Z]{3}\/\d{4}\/\d{2}$/.test(val);
      if (!formatValid) return false;

      // Extract year portion
      const yearPart = val.split("/")[2];
      const fullYear = 2000 + parseInt(yearPart);

      // Year range check (2020-2030)
      return fullYear >= 2020 && fullYear <= 2030;
    },
    {
      message:
        "University ID must be in format: ABC/1234/20-30 (where last digits represent year 2020-2030)",
    }
  ),
  universityCard: z.string().nonempty("University card image is required"),
});

export const editProfileSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name cannot exceed 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  profilePic: z.string().nonempty("Profile picture is required"),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const bookSchema = z.object({
  title: z.string().trim().min(2).max(100),
  description: z.string().trim().min(10).max(1000),
  author: z.string().trim().min(2).max(100),
  genre: z.string().trim().min(2).max(50),
  rating: z.coerce.number().min(1).max(5),
  totalCopies: z.coerce.number().int().positive().lte(10000),
  coverUrl: z.string().nonempty(),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-F]{6}$/i),
  videoUrl: z.string().nonempty(),
  summary: z.string().trim().min(10),
});
