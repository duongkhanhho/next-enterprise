"use client"

import * as Tabs from "@radix-ui/react-tabs"
import Link from "next/link"
import { UserAuthForm } from "components/LoginForm"

export default function Login() {
  return (
    <div className="container relative mx-auto mt-16 flex h-[500px] w-[520px] flex-col items-center justify-center rounded-[10px] bg-white shadow-md">
      <Link
        href="/home"
        className="absolute left-2 top-2 inline-flex items-center justify-center rounded-lg border border-transparent bg-transparent px-3 py-2 text-center text-sm font-medium text-slate-900 hover:border-slate-200 hover:bg-slate-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-slate-200 md:left-8 md:top-8"
      >
        Back
      </Link>

      <div className="mx-auto flex w-fit flex-col justify-center space-y-6 sm:w-[350px] ">
        <span className="flex flex-col space-y-2 text-center">
          <h1 className="m-auto mb-4 w-fit text-2xl font-medium text-[#5F3B86]">Sign In</h1>
        </span>

        <Tabs.Root defaultValue="tab1" className="flex w-full flex-col">
          <Tabs.List className="mb-4 flex shrink-0">
            <Tabs.Trigger
              value="tab1"
              className="flex h-[45px] items-center justify-center border-b border-[#C4C4C4] px-[20px] py-0 data-[state=active]:border-b-2 data-[state=active]:border-[#5F3B86]"
            >
              I&apos;m a job seeker
            </Tabs.Trigger>
            <Tabs.Trigger
              value="tab2"
              className="flex h-[45px] items-center justify-center border-b border-[#C4C4C4] px-[20px] py-0 data-[state=active]:border-b-2 data-[state=active]:border-[#5F3B86]"
            >
              I&apos;m a recruiter
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">
            <UserAuthForm />
          </Tabs.Content>

          <Tabs.Content value="tab2">This&apos;ll be available soon</Tabs.Content>
        </Tabs.Root>

        <p className="px-8 text-center text-sm text-slate-600">
          Don&apos;t have an account yet?{" "}
          <Link href="/register" className="font-medium underline hover:text-[#5F3B86]">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
