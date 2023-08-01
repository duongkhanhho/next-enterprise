import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import React from "react"

type Props = {}

const AppBar = (props: Props) => {
  const { data: session } = useSession()

  return (
    <div className="flex h-[57px] w-full items-center">
      <Link href="/home" className="flex w-[50%] justify-start">
        <span>[LOGO]</span>
        <span>Viechomnay</span>
      </Link>

      {session?.user ? (
        <div className="flex w-[50%] justify-end">
          <button className="p-4" onClick={() => signOut()}>
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex w-[50%] justify-end">
          <Link href="/auth/login" className="p-4">
            Login
          </Link>
          <Link href="/auth/login" className="p-4">
            Sign up
          </Link>
        </div>
      )}
    </div>
  )
}

export default AppBar
