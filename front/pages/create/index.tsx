"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../../components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select"
import { Input } from "../../components/ui/input"
import { useAccount, useWriteContract } from "wagmi";
import { contractAddress, FactoryContractAbi } from "../../constants";

const formSchema = z.object({
    name: z.string().min(4, {
        message: "name must be at least 4 characters.",
    }),
    symbol: z.string().min(3, {
        message: "Symbol must be at least 3 characters.",
    }),
    agingMethod: z.string(),
    maximumSupply: z.number().max(10000, {
        message: "The maximum supply cannot exceed 10,000",
    }),
    imageUrl: z.string().url()
})

function ProfileForm() {
    const account = useAccount();
    const { data: hash, writeContract } = useWriteContract()

    const form = useForm({
        resolver: zodResolver(formSchema)
    });

    async function onSubmit(values) {
        if (account.isConnected) {
            try {
                const result = writeContract({
                    address: contractAddress,
                    abi: FactoryContractAbi,
                    functionName: 'createCollection',
                    args: [
                        values.name,
                        values.symbol,
                        values.agingMethod,
                        values.maximumSupply,
                        values.imageUrl
                    ],
                });
                console.log('Transaction result:', result);
            } catch (error) {
                console.error('Transaction error:', error);
            }
        } else {
            console.error('Account is not connected');
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Brie" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is the Name of the collection.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="symbol"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Symbol</FormLabel>
                                <FormControl>
                                    <Input placeholder="BRI" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is the Symbol of the collection.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="agingMethod"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Aging Method</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an aging method" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="0">enum1</SelectItem>
                                        <SelectItem value="1">enum2</SelectItem>
                                        <SelectItem value="2">enum3</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="maximumSupply"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Max Supply</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="10000"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is the max supply for the collection.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image Url</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://www.image.com/url?" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is the case for setup the url image for NFT.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-center">
                        <Button className="w-1/4 bg-customYellow/80 hover:bg-customYellow" type="submit">Submit</Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}

export default ProfileForm;
