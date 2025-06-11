import { z } from "zod";
import { CollectionType } from "../enums";
import fileSchema from "./fileValidator";

const emptyMessage = "This field is required.";

export const collectionSchema = z.object({
  title: z.string().min(1, {message: emptyMessage}),
  releaseDate: z.date(),
  type: z.nativeEnum(CollectionType),
  cover: fileSchema("image"),
  songs: z.array(fileSchema("audio"))
});