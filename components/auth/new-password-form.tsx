"use client";

import * as z from "zod"
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { CardWrapper } from '@/components/auth/card-wrapper';
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { NewPasswordSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../ui/form"
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { newPassword } from "@/actions/new-password";

export const NewPasswordForm = () => {



    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [error,setError] = useState<string | undefined>();
    const [success , setSuccess] = useState<string | undefined>();
    const [isPending,startTransition] = useTransition();

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
            passwordConfirmation: "",
        }
    })
    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError("");
        setSuccess("");

        startTransition(()=>{
            newPassword(values,token)
                .then((data)=>{
                    setError(data?.error)
                    setSuccess(data?.success)
                })
        })
    }

    return (
        <CardWrapper

            headerLabel="Enter your new password"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
            showSocial = {false}
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="********"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="passwordConfirmation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="********"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                    </div>
                    <FormSuccess message={success}/>
                    {!success && (
                        <FormError message={error} />
                     )}
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        reset your password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
