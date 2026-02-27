import { z } from 'zod';

export const CreatePetSchema = z.object({
  name: z.string().min(1, 'Name is required').max(20, 'Name must be 20 characters or less'),
  species: z.enum(['cat', 'dragon', 'blob', 'plant', 'rock']),
});

export type CreatePetBody = z.infer<typeof CreatePetSchema>;

export const ValidateSearchSchema = z.object({
  species: z.enum(['cat', 'dragon', 'blob', 'plant', 'rock']),
  minHappiness: z.coerce.number().int().positive(),
});

export const ValidateIdSchema = z.object({
  id: z.string().transform(Number),
});

export const ValidateName = z.object({
  name: z.string(),
});

export const ValidHabitSchema = z.object({
  id: z.string().transform(Number),
  petId: z.string().transform(Number),
  name: z.string().min(1, 'Name is required').max(50, 'Name must be 50 characters or less'),
  category: z.enum(['health', 'fitness', 'social', 'mindfulness', 'learning']),
  targetFrequency: z.int().min(1, 'Frequency is required.').max(7, 'Maximum frequency is 7'),
  statBoost: z.enum(['happiness', 'hunger', 'energy']),
});
