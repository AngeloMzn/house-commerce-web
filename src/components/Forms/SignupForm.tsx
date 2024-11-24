"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import "../../app/styles/globals.css"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"

const SignupSchema = z.object({
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }).max(100, {
        message: "Password must be at most 100 characters.",
    })
})

export function SignupForm() {
    const LoginForm = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
    })

    function onSubmit(data: z.infer<typeof SignupSchema>) {
        console.log(data);
    }

    return (
        <section>
            <div className="flex items-center justify-center min-h-screen">
                <div className="rounded bg-white p-10 shadow-2xl w-full max-w-lg">
                    <h1 className="text-3xl font-light"><strong>Insira suas credenciais para registrar-se</strong></h1>
                    <hr />
                    <Form {...LoginForm}>
                        <form onSubmit={LoginForm.handleSubmit(onSubmit)} className="space-y-8 pt-5">
                            <FormField
                                control={LoginForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email:</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="Digite seu email." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={LoginForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha:</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Digite sua senha." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center justify-center">
                                <Button className="w-full" type="submit">Cadastrar</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    )

}
