"use client"

import { zodResolver } from "@hookform/resolvers/zod"
// import { useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "lib/utils"
// import { toast } from "ui/toast"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const validationSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

type ValidationSchema = z.infer<typeof validationSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  })

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  //   const searchParams = useSearchParams()

  const onSubmit = async (data: ValidationSchema) => {
    setIsLoading(true)

    const result = await signIn("credentials", {
      username: data.username.toLowerCase(),
      password: data.password,
      redirect: true,
      callbackUrl: "/home",
    })

    console.log("🚀 ~ file: LoginForm.tsx:50 ~ onSubmit ~ signInResult:", result)

    setIsLoading(false)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label className="sr-only" htmlFor="email">
              Username
            </label>
            <input
              id="username"
              autoCorrect="off"
              autoCapitalize="none"
              disabled={isLoading}
              placeholder="Username"
              autoComplete="username"
              {...register("username")}
              className={`${
                errors?.username && "border-[red]"
              } my-0 mb-2 block h-9 w-full border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1`}
            />
            {errors?.username && <p className="px-1 text-xs text-red-600">{errors.username.message}</p>}
          </div>

          <div className="grid gap-1">
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoCorrect="off"
              autoCapitalize="none"
              placeholder="Password"
              autoComplete="password"
              disabled={isLoading}
              {...register("password")}
              className={`${
                errors?.password && "border-[red]"
              } my-0 mb-2 block h-9 w-full border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1`}
            />
            {errors?.password && <p className="px-1 text-xs text-red-600">{errors.password.message}</p>}
          </div>
          <button
            className="inline-flex w-full items-center justify-center rounded-[40px] bg-[#5F3B86] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#5F3B86]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 disabled:opacity-50 dark:hover:bg-[#050708]/30 dark:focus:ring-slate-500"
            disabled={isLoading}
          >
            Sign In
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-300"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-600">or</span>
        </div>
      </div>
    </div>
  )
}
