"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast, ToastContainer } from "react-toastify"
import axios from "axios"
import { useRouter } from "next/navigation"

const productSchema = z.object({
    description: z.string().min(1),
    price: z.string().min(1).transform((val) => parseFloat(val)),
    type: z.string().min(1)
});

export function CadastrarProdutoForm() {
    const CadastrarProdutoForm = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
    })

    const router = useRouter();

    async function onSubmit(data: z.infer<typeof productSchema>) {
        const response = await axios.post(
            'http://localhost:3001/product/create',
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                },
            }
        );
        if (response.data) {
            alert(response.data.message);
            window.location.reload();
        } else {
            toast.error(response.data.message);
        }
    }

    return (
        <>
            <section>
                <div className="flex items-center justify-center py-9">
                    <div className="rounded bg-white p-10 w-full max-w-lg">
                        <Form {...CadastrarProdutoForm}>
                            <form onSubmit={CadastrarProdutoForm.handleSubmit(onSubmit)} className="space-y-8 pt-5">
                                <FormField
                                    control={CadastrarProdutoForm.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Descrição:</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Digite a descrição do produto" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={CadastrarProdutoForm.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Preço:</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="00,00" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={CadastrarProdutoForm.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tipo:</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="digite o tipo" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex items-center justify-center">
                                    <Button className="w-full" type="submit">Salvar</Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </section>
        </>
    )
}
