'use client'

import Link from "next/link"
import { ShoppingBasket } from "lucide-react"
import { Button } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { isLoggedIn, signOut } from "../app/activeUser"

export const Navbar = () => {
  const router = useRouter()

  const handleLogin = () => {
    if (isLoggedIn()) signOut()

    router.push('/auth')
    router.refresh()
  }

  console.log(isLoggedIn())

  return <div className="my-5 mx-5 p-5 flex items-center justify-around bg-primary text-zinc-300 rounded-full opacity-80">
    <div className="flex">
      <Link href='/'>
        єcσмм cαƒє
      </Link>
    </div>
    <div className="flex items-center justify-center gap-5 font-bold">
      {/* <Link href='/menu' className="hover:text-zinc-700 hover:opacity-80">
        Cardápio
      </Link> */}
    </div>
    <div className="flex justify-end items-center gap-10">
      <Link href='/cart'>
        <ShoppingBasket size={30} className="rounded-full hover:bg-zinc-700 hover:opacity-80" />
      </Link>
      <Button onClick={() => handleLogin()}>Autenticar</Button>
    </div>
  </div>
}