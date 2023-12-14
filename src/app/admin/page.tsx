import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function AdminPage() {
  return <div className="w-full p-10 flex justify-center bg-primary bg-opacity-80">
    <Link href="/admin/produtos"><Button >Cadastro de produtos</Button></Link>
  </div>
}