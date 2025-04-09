import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "../../components/ui/Form";
import { loginSchema } from "../../utils/formValidator";
import useFetch from "../../utils/endpoints/useFetchEvent";
import { LOGIN_URL } from "../../utils/endpoints/endpoints";
import { Crud } from "../../utils/enums";
import { Checkbox } from "../ui/Form/Checkbox";
import { Button } from "../ui/Button/Button";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const {fetchingData} = useFetch();
  const {logIn} = useAuth();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
      rememberMe: false
    }
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const data = await fetchingData({url:LOGIN_URL, type:Crud.POST, params:values});

    logIn(data.accessToken, values.rememberMe);
  };

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  type="text"
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
            <FormItem>
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