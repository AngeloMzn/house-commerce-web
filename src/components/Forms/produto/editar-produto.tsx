"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Description } from "@radix-ui/react-dialog"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import { use, useEffect, useState } from "react"

const productSchema = z.object({
    description: z.string().min(1),
    price: z.string().min(1).transform((val) => parseFloat(val)),
    type: z.string().min(1)
});

interface EditarProdutoFormProps {
    id: number;
}

interface Produto {
    id: number;
    description: string;
    price: number;
    type: string;
}

export function EditarProdutoForm({id}: EditarProdutoFormProps) {
    const [produto, setProduto] = useState<Produto | null>(null);
    
    const EditarProdutoForm = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
    })

    async function fetchUser(){
        const response = await axios.get('http://localhost:3001/product/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            },
        });
        if (response.data) {
            console.log(response.data);
            setProduto(response.data.product);
        } else {
            toast.error(response.data.message);
        }
    }

    async function onSubmit(data: z.infer<typeof productSchema>) {
        const response = await axios.put(
            'http://localhost:3001/product/' + id,
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

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <section>
            <div className="flex items-center justify-center py-9">
            <div className="rounded bg-white p-10 w-full max-w-lg">
                <Form {...EditarProdutoForm}>
                <form onSubmit={EditarProdutoForm.handleSubmit(onSubmit)} className="space-y-8 pt-5">
                    <FormField
                    control={EditarProdutoForm.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Descrição:</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Digite a descrição do produto" {...field} value={produto?.description || ''} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={EditarProdutoForm.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Preço:</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="00,00" {...field} value={produto?.price || ''} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={EditarProdutoForm.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Tipo:</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="digite o tipo" {...field} value={produto?.type || ''} />
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
            <ToastContainer />
        </section>
    )
}
