import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext"
import { GET_COLLECTIONS, GET_FILE } from "../utils/endpoints/endpoints"
import { useFetch } from "../utils/endpoints/useFetch"
import { CollectionType, Crud } from "../utils/enums";
import { Collection, Song, TaskResult } from "../utils/types";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input } from "./ui/Form";
import { collectionSchema } from "../utils/formValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar } from "./ui/Calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/Select";

export default function Testing() {
  const {authData} = useAuth();
  const {fetchData: collectionList } = useFetch<TaskResult<Collection[]>>({url: GET_COLLECTIONS, type: Crud.GET, token: authData?.token, needAuth: true, condition: !!authData});

  const form = useForm<z.infer<typeof collectionSchema>>({
      resolver: zodResolver(collectionSchema),
      defaultValues: {
        title: "",
        releaseDate: new Date(),
        type: CollectionType.Single
      }
    });

  return (
    <>
      <section>
        <h1>Lista Colecciones</h1>
        <ul>{printCollections(collectionList?.result || [])}</ul>
      </section>
      <section>
        <h1>Añadir canción</h1>
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
          </form>
        </Form>
      </section>
    </>
  )
}

function printCollections(list: Collection[]) {
  return (
    list.length > 0 ?
      list.map(collection => (
        <li key={collection.id}>
          <img src={GET_FILE(collection.cover)} alt="cover" className="max-w-20 aspect-square"/>
          <p>Title: {collection.title}</p>
          <p>Type: {collection.type}</p>
          <p className="body">Release Date: {collection.releaseDate}</p>
          <p>Publi Date: {collection.publicationDate}</p>
          <h1>Lista canciones</h1>
          <ul>
            {printSongs(collection.songs)}
          </ul>
        </li>
      ))
      :
      <p>La colección que tratas de imprimir está vacía</p>
  )
}

function printSongs(list: Song[]) {
  console.log("lista coleccion", list);
  
  return (
    list.length > 0 ? 
      list.map(song => (
        <li key={song.id} className="flex gap-2">
          <img src={GET_FILE(song.cover)} alt="cover" className="max-w-20 aspect-square"/>
          <p>Title: {song.title}</p>
          <p className="body">Release Date: {song.releaseDate}</p>
          <p>Publi Date: {song.publicationDate}</p>
          <audio src={GET_FILE(song.path)} controls/>
        </li>
      ))
      :
      <p>La lista de canciones que tratas de imprimir está vacía</p>
  )
}