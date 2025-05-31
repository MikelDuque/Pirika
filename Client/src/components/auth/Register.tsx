import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Checkbox } from "../../components/ui/Form";
import { registerSchema } from "../../utils/formValidator";
import { Button } from "../ui/Button";
import useFetch from "../../utils/endpoints/useFetchEvent";
import { REGISTER_URL } from "../../utils/endpoints/endpoints";
import { Crud } from "../../utils/enums";
import { useAuth } from "../../contexts/AuthContext";

export default function Register() {
  const { fetchingData } = useFetch();
  const {logIn} = useAuth();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      displayName: "",
      username: "",
      mail: "",
      password: "",
      confirmPassword: "",
      rememberMe: false
    }
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    type dataReceived = {
      accessToken: string
    }

    const registerRequest = Object.entries(values)
      .filter(([k, _]) => !["confirmPassword", "rememberMe"]
      .includes(k)).reduce((formData,[k,v]) => {
        formData.append(k,v as string | Blob);
        return formData;
      }, new FormData())

    const data = await fetchingData<dataReceived>({ url: REGISTER_URL, type: Crud.POST, params: registerRequest });

    logIn(data?.accessToken || "", values.rememberMe);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Type your public name..."
                  {...field}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.displayName?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Type your private username..."
                  {...field}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.username?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>eMail</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Type your email..."
                  {...field}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.mail?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Type your password"
                  {...field}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.password?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password Confirmation</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Repeat your password"
                  {...field}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.confirmPassword?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          name="avatar"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
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
              <FormDescription>Select your profile picture, if you want</FormDescription>
              <FormMessage>{form.formState.errors.avatar?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex-row">
              <FormControl>
                <Checkbox checked={field.value} />
              </FormControl>
              <FormLabel>Remember me</FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit">Register</Button>
      </form>
    </Form>
  )
}