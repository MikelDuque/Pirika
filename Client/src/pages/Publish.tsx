import { useFieldArray, useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input } from "../components/ui/Form";
import { collectionSchema } from "../utils/formValidators/musicValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CollectionType, Crud } from "../utils/enums";
import { Calendar } from "../components/ui/Calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select";
import { Button } from "../components/ui/Button";
import { useAuth, useWebsocket } from "../contexts";
import { NewRelease, WSMessage } from "../utils/types";
import useFetchEvent from "../utils/endpoints/useFetchEvent";
import { PUBLISH_URL } from "../utils/endpoints/endpoints";

export default function Publish() {
  const {authData} = useAuth();
  const {sendMessage} = useWebsocket();
  const {fetchingData} = useFetchEvent();

  const form = useForm<z.infer<typeof collectionSchema>>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      title: "",
      type: CollectionType.Album,
      releaseDate: new Date(),
      songs: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "songs"
  });

  async function onSubmit(data: z.infer<typeof collectionSchema>) {
    const formData = new FormData();

    console.log("title", data.title);
    console.log("cover", data.cover);
    console.log("song", data.songs);
    

    formData.append("Title", data.title);
    formData.append("ReleaseDate", data.releaseDate?.toISOString() || new Date().toISOString());
    formData.append("Type", data.type?.toString() || CollectionType.Album.toString());
    formData.append("Cover", data.cover);
    if(authData) formData.append("AuthorId", authData?.token.toString());

    data.songs.forEach((song, i) => {
      formData.append(`Songs[${i}].Title`, song.title);
      if(song.song) formData.append(`Songs[${i}].Song`, song.song);
      if(authData) formData.append(`Songs[${i}].AuthorId`, authData?.token.toString());
      formData.append(`Songs[${i}].PublicationDate`, data.releaseDate?.toISOString() || new Date().toISOString()); // misma fecha
      formData.append(`Songs[${i}].Cover`, data.cover); // misma portada

      song.collaboratorsIds?.forEach((id, j) =>
        formData.append(`Songs[${i}].CollaboratorsIds[${j}]`, id.toString())
      );
      song.genres?.forEach((g, j) =>
        formData.append(`Songs[${i}].Genres[${j}]`, g.toString())
      );
    });

    // collectionSchema.parse(formData);

    const publishedCollection = await fetchingData({url: PUBLISH_URL, type: Crud.POST, params: formData});

    console.log("publishedCollection", publishedCollection);
    
    /* Send the formData and receive the db collection item back to add it to the websocket message*/

    const releaseMessage: WSMessage<NewRelease> = {
      header: "MusicRelease",
      body: {
        title: data.title,
        author: authData?.decodedToken.displayName || "unknown",
        path: "unknown"
      }
    }

    sendMessage(releaseMessage);
  };

  function handleAddSong(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    
    append({
    title: "",
    song: null,
    genres: [],
    collaboratorsIds: []
  });
  }

  function handleDelete(e: React.MouseEvent<HTMLButtonElement>, i: number) {
    e.preventDefault();
    remove(i)
  }


  return (
    <section className="size-full flex flex-col gap-5 items-center">
      <h1 className="super-title">Publish your new music!</h1>
      <Form {...form}>
        <form className="flex flex-col gap-10" onSubmit={form.handleSubmit(onSubmit)}>

          <fieldset className="p-5 flex gap-10 bg-card dark:bg-dark-card rounded-md">
            <div className="flex-1 flex flex-col gap-5">
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
                        {Object.keys(CollectionType).filter(key => isNaN(Number(key)) && key !== "Playlist").map(key => (
                          <SelectItem key={key} value={CollectionType[key as keyof typeof CollectionType].toString()}>
                            {key}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage>{form.formState.errors.type?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="releaseDate"
              render={({field}) => (
                <FormItem className="row-span-full col-start-2">
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
          </fieldset>

          <fieldset className="p-5 flex flex-col gap-5 bg-card dark:bg-dark-card rounded-md">
            <h2 className="title">Añade las canciones que desees:</h2>

            {fields.map((field, i) => (
              <div key={field.id} className="flex flex-col gap-2">
                <Button icon="trash" variant="destructive" size="icon" className="self-end" onClick={(e) => handleDelete(e, i)}/>
                <FormField
                  name={`songs.${i}.title`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Type the song title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>{form.formState.errors.songs?.[i]?.title?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name={`songs.${i}.genres`}
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Genres</FormLabel>
                      <Select onValueChange={value => field.onChange(Number(value))} defaultValue={field.value?.toString()}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a music genre"/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.keys(CollectionType).filter(key => isNaN(Number(key)) && key !== "Playlist").map(key => (
                            <SelectItem key={key} value={CollectionType[key as keyof typeof CollectionType].toString()}>
                              {key}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage>{form.formState.errors.songs?.[i]?.genres?.message}</FormMessage>
                    </FormItem>
                  )}
                /> */}
                {/* <FormField
                  control={form.control}
                  name={`songs.${i}.collaboratorsIds`}
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Genres</FormLabel>
                      <Select onValueChange={value => field.onChange(Number(value))} defaultValue={field.value?.toString()}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a music genre"/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.keys(CollectionType).filter(key => isNaN(Number(key)) && key !== "Playlist").map(key => (
                            <SelectItem key={key} value={CollectionType[key as keyof typeof CollectionType].toString()}>
                              {key}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage>{form.formState.errors.songs?.[i]?.collaboratorsIds?.message}</FormMessage>
                    </FormItem>
                  )}
                /> */}
                <FormField
                  name={`songs.${i}.song`}
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
                            const file = e.target.files?.[0];
                            field.onChange(file);
                          }}
                        />
                      </FormControl>
                      <FormMessage>{form.formState.errors.songs?.[i]?.song?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </fieldset>
          <div className="w-full flex justify-end gap-3">
            <Button icon="plus" variant="outline" onClick={handleAddSong}>Add Song</Button>
            <Button icon="upload" type="submit">Publish</Button>
          </div>
        </form>
      </Form>
    </section>
  )
}