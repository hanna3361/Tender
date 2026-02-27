import { Request, Response } from 'express';
import { Habit, Pet } from '../entities/Pet.js';
import { habitCOunter, petIdCounter, pets } from '../models/pets.js';
import {
  CreatePetSchema,
  ValidateIdSchema,
  ValidateName,
  ValidateSearchSchema,
  ValidHabitSchema,
} from '../validators/pets.js';

export function createPet(req: Request, res: Response): void {
  const result = CreatePetSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }

  const newPet: Pet = {
    id: petIdCounter.value++,
    name: result.data.name,
    species: result.data.species,
    happiness: 50,
    hunger: 50,
    energy: 50,
    lastFedAt: new Date(),
    growth: 0,
    habits: [],
  };

  pets.push(newPet);
  res.status(201).json(newPet);
}

export function getPets(req: Request, res: Response): void {
  const result = ValidateSearchSchema.safeParse(req.query);

  let filteredPets = pets; //set filtered pets to all pets

  if (result.data.species) {
    // if the species filter exists, set filteredPets to filter of species
    filteredPets = filteredPets.filter((pet) => pet.species === result.data.species);
  }

  if (result.data.minHappiness) {
    // if the happiness filter exists, set filteredPets to filter of  greater than minhappiness
    filteredPets = filteredPets.filter((pet) => pet.happiness >= Number(result.data.minHappiness));
  }

  /*if (species && minHappiness) {
    filteredPets = filteredPets.filter((pet) => pet.happiness >= Number(minHappiness) && pet.species === species)
  }*/

  res.status(200).json(filteredPets);
}

export function getPetsId(req: Request, res: Response): void {
  const result = ValidateIdSchema.safeParse(req.params);
  if (!result.success) {
    res.status(404).json({ errors: result.error }); //if no id was given, sends error code
    return; //ends function
  }
  const petId = Number(result); //stored as a string make it a number
  //pet = pets.filter((pet) => pet.id === id); not working??
  const pet = pets[petId];

  res.status(200).json(pet);
}

export function changeNameId(req: Request, res: Response): void {
  const id = ValidateIdSchema.safeParse(req.params);
  const newName = ValidateName.safeParse(req.body);
  if (!id.success) {
    res.status(404).json({ errors: id.error }); //if no id was given, sends error code
    return; //ends function
  }
  if (!newName.success) {
    res.status(400).json({ errors: newName.error });
  }
  //the assumption numbers will always be provided (unsure how to do safe parsing properly.)
  const pet = pets[id.data.id]; //find the pet in list of pets via id
  if (!pet) {
    res.status(400); //error pet not found via id
    return; // end function
  }
  pet.name = newName.data.name;
  res.status(200).json(pet); // return found pet
}
export function releasePet(req: Request, res: Response): void {
  const id = ValidateIdSchema.safeParse(req.params);
  if (!id.success) {
    res.status(404).json({ errors: id.error }); //if no id was given, sends error code
    return; //ends function
  }
  const index = pets.findIndex((pet) => pet.id);
  const pet = pets[id.data.id]; //find the pet in list of pets via id
  if (!pet) {
    res.status(404);
    return;
  }
  const removePet = pets.splice(index, 1)[0];
  res.status(200).json(removePet);
}

export function createHabit(req: Request, res: Response): void {
  const result = ValidHabitSchema.safeParse(req.body);

  if (!result.success) {
    res.status(404).json({ errors: result.error });
    return;
  }

  const newHabit: Habit = {
    id: habitCOunter.value++,
    petId: result.data.id,
    name: result.data.name,
    category: result.data.category,
    targetFrequency: result.data.targetFrequency,
    statBoost: result.data.statBoost,
  };

  const pet = pets[result.data.id]; //find the pet in list of pets via id
  pet.habits.push(newHabit);
  res.status(201).json(newHabit);
}

export function getHabitById(req: Request, res: Response): void {
  const result = ValidHabitSchema.safeParse(req.params);
  const category = ValidHabitSchema.safeParse(req.query);
  if (!result.success) {
    res.status(404).json({ errors: result.error }); //if no id was given, sends error code
    return; //ends function
  }
  const pet = pets[result.data.id];
  if (!pet) {
    res.status(404).json({ error: result.error }); //kicks if pet doesnt exist
    return;
  }
  let filteredHabits = pet.habits;

  if (category) {
    filteredHabits = filteredHabits.filter((habit) => habit.category === result.data.category);
  }

  res.status(200).json(filteredHabits);
}
/*
export function logHabit(req: Request, res: Response) {
  const result = ValidateIdSchema.safeParse(req.params);
  if (!result.success) {
    res.status(404).json({ error: result.error });
  }
}
*/
