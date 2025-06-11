import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input } from "../components/ui/Form";
import { collectionSchema } from "../utils/formValidators/musicValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CollectionType } from "../utils/enums";
import { Calendar } from "../components/ui/Calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select";

export default function Publish() {
  const form = useForm<z.infer<typeof collectionSchema>>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      title: "",
      releaseDate: new Date(),
      type: CollectionType.Single,
      songs: []
    }
  });

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem>
              <FormLabel>Collection Title</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Type the collection title"
                  {...field}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.title?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          name="cover"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormDescription>Select the collection cover, if you want</FormDescription>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Select a picture file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                  }}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.cover?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="releaseDate"
          render={({field}) => (
            <FormItem>
              <FormLabel>Release date</FormLabel>
              <FormControl>
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                />
              </FormControl>
              <FormMessage>{form.formState.errors.releaseDate?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({field}) => (
            <FormItem>
              <FormLabel>Collection type</FormLabel>
              <Select onValueChange={value => field.onChange(Number(value))} defaultValue={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a collection type"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(CollectionType).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage>{form.formState.errors.title?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          name="songs"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Song</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="audio/*"
                  placeholder="Select one or many audio files"
                  onChange={(e) => {
                    const files = e.target.files;
                    field.onChange(files);
                  }}
                  multiple
                />
              </FormControl>
              <FormDescription>Select your profile picture, if you want</FormDescription>
              <FormMessage>{form.formState.errors.songs?.message}</FormMessage>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}