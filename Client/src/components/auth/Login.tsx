import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "../../components/ui/Form";
import { loginSchema } from "../../utils/formValidators/authValidator";
import useFetch from "../../utils/endpoints/useFetchEvent";
import { API_BASE_URL, LOGIN_URL } from "../../utils/endpoints/endpoints";
import { Crud } from "../../utils/enums";
import { Checkbox } from "../ui/Form/Checkbox";
import { Button } from "../ui/Button/Button";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const {fetchingData} = useFetch();
  const {logIn} = useAuth();

  console.log("base url", API_BASE_URL);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
      rememberMe: false
    }
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    type dataReceived = {
      accessToken: string
    }
    const data = await fetchingData<dataReceived>({url:LOGIN_URL, type:Crud.POST, params:values});

    logIn(data?.accessToken || "", values.rememberMe);
  };

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>eMail or Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Type your identifier..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
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
                  placeholder="Type your password..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex-row">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange}/>
              </FormControl>
              <FormLabel>Remember me</FormLabel>
            </FormItem>
          )}
        />
        
        <Button type="submit">Log in</Button>
      </form>
    </Form>
    </>
  )
}