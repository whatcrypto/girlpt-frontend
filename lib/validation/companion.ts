import { z } from 'zod';

export const companionFormSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be less than 50 characters'),

  personality: z.string()
    .min(50, 'Personality description must be at least 50 characters')
    .max(500, 'Personality description must be less than 500 characters')
    .refine(
      (val) => {
        // Check minimum word count for quality
        const wordCount = val.trim().split(/\s+/).length;
        return wordCount >= 10;
      },
      { message: 'Personality description needs more detail (minimum 10 words)' }
    ),

  backstory: z.string()
    .min(100, 'Backstory must be at least 100 characters')
    .max(1000, 'Backstory must be less than 1000 characters')
    .refine(
      (val) => {
        // Check minimum word count for quality
        const wordCount = val.trim().split(/\s+/).length;
        return wordCount >= 20;
      },
      { message: 'Backstory needs more detail (minimum 20 words)' }
    ),

  avatarUrl: z.string().optional(), // Auto-generated based on appearance attributes

  greetingMessage: z.string()
    .min(10, 'Greeting message must be at least 10 characters')
    .max(200, 'Greeting message must be less than 200 characters'),

  interests: z.array(z.string()
    .min(2, 'Each interest must be at least 2 characters')
    .max(30, 'Each interest must be less than 30 characters'))
    .min(1, 'At least one interest is required')
    .max(10, 'Maximum 10 interests allowed'),

  templateId: z.string().optional(), // For template-based generation

  conversationStyle: z.enum(['casual', 'formal', 'playful', 'mysterious', 'romantic']),

  // Appearance fields (optional)
  appearance: z.object({
    ethnicity: z.string().optional(),
    eyeColor: z.string().optional(),
    age: z.string().optional(),
    hairColor: z.string().optional(),
    hairLength: z.string().optional(),
    hairStyle: z.string().optional(),
    bodyType: z.string().optional(),
    breastSize: z.string().optional(),
    buttSize: z.string().optional(),
    clothing: z.string().optional(),
  }).optional(),

  occupation: z.string().optional(),

  // Arrays can be empty but must be defined
  hobbies: z.array(z.string()
    .min(2, 'Each hobby must be at least 2 characters')
    .max(30, 'Each hobby must be less than 30 characters'))
    .max(5, 'Maximum 5 hobbies allowed')
    .default([]),

  traits: z.array(z.string()
    .min(2, 'Each trait must be at least 2 characters')
    .max(30, 'Each trait must be less than 30 characters'))
    .max(8, 'Maximum 8 traits allowed')
    .default([]),
});

export type CompanionFormData = z.infer<typeof companionFormSchema>;

// Schema for filtering companions
export const companionFiltersSchema = z.object({
  search: z.string().optional(),
  conversationStyle: z.enum(['all', 'casual', 'formal', 'playful', 'mysterious', 'romantic']).optional(),
  isActive: z.boolean().optional(),
  sortBy: z.enum(['name', 'createdAt', 'updatedAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

export type CompanionFilters = z.infer<typeof companionFiltersSchema>;
