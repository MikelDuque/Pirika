import { z } from "zod";
import { CollectionType, Genre } from "../enums";
import fileSchema from "./fileValidator";

const emptyMessage = "This field is required.";

export const songSchema = z.object({
  title: z.string().min(1, {message: emptyMessage}),
  genres: z.array(z.nativeEnum(Genre)).optional(),
  collaboratorsIds: z.array(z.number()).optional(),
  song: fileSchema("audio").nullable()
});

export const collectionSchema = z.object({
  title: z.string().min(1, {message: emptyMessage}),
  releaseDate: z.date().optional(),
  type: z.nativeEnum(CollectionType).optional(),
  cover: fileSchema("image"),
  songs: z.array(songSchema).min(1, {message: emptyMessage})
});