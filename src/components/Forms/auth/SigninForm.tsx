"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import "../../../app/styles/globals.css"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

type SigninSchema = z.infer<typeof SigninSchema>

const SigninSchema = z.object({
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }).max(100, {
        message: "Password must be at most 100 characters.",
    })
})

export function SigninForm() {
    const LoginForm = useForm<z.infer<typeof SigninSchema>>({
        resolver: zodResolver(SigninSchema),
    })

    const router = useRouter();

    async function onSubmit(data: SigninSchema) {
        const response = await axios.post(
            'http://localhost:3001/login',
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                },
            }
        );
        if (response.data) {
            const user = {
                id: response.data.user.id,
                email: response.data.user.email,
            };
            localStorage.setItem('user', JSON.stringify(user));
            toast.success(response.data.message);
            router.push('/index');
        } else {
            toast.error(response.data.message);
        }
    }

    return (
        <section>
            <div className="flex items-center justify-center min-h-screen">
                <div className="rounded bg-white p-10 shadow-2xl w-full max-w-lg">
                    <h1 className="text-3xl font-light"><strong>Insira suas credenciais para iniciar sessão</strong></h1>
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
                                            <Input type="email" placeholder="Digite seu nome de usuário." {...field} />
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
                                <Button className="w-full" type="submit">Entrar</Button>
                            </div>
                            <div className="flex items-center justify-left">
                                <a href="http://" className="text-black underline">Esqueceu a senha ?</a>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    )

}
