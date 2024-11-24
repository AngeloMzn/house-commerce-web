"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const productSchema = z.object({
    descricao: z.string().min(1),
    preco: z.number().min(1),
    tipo: z.string().min(1)
});



export function EditarProdutoForm() {
    const EditarProdutoForm = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
    })
    function onSubmit(data: z.infer<typeof productSchema>) {
        console.log(data);
    }

    return (
        <section>
            <div className="flex items-center justify-center py-9">
                <div className="rounded bg-white p-10 w-full max-w-lg">
                    <Form {...EditarProdutoForm}>
                        <form onSubmit={EditarProdutoForm.handleSubmit(onSubmit)} className="space-y-8 pt-5">
                            <FormField
                                control={EditarProdutoForm.control}
                                name="descricao"
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
                                control={EditarProdutoForm.control}
                                name="preco"
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
                                control={EditarProdutoForm.control}
                                name="tipo"
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
    )
}
