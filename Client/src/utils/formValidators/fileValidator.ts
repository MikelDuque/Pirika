import { z } from "zod";

const maxFileSize = 10e6;

const fileTypes = {
  image: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  audio: ["audio/mpeg", "audio/wav", "audio/acc"]
}

const sizeMessage = `The file must not exceed ${(maxFileSize  / 1e6).toFixed(0)}MB.`

const formatMessage = (types: string[]) => (`The only supported formats are: ${types.map(type => type.split("/"))[1]}`);

export default function fileSchema(thisType: keyof typeof fileTypes) {
  return z.instanceof(File)
    .superRefine((file, ctx) => {
      if (!file || file.size <= 0) return;

      if (file.size > maxFileSize) {
        ctx.addIssue({
          message: sizeMessage,
          code: z.ZodIssueCode.custom
        })
      }

      if (!fileTypes.image.includes(file.type)) {
        ctx.addIssue({
          message: formatMessage(fileTypes[thisType]),
          code: z.ZodIssueCode.custom
        })
      }
    })
}