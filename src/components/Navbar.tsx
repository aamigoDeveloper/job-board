import Image from "next/image";
import Logo from "@/assets/logo.png"
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="shadow-sm">
        <nav className="max-w-5xl m-auto flex items-center justify-between px-3 py-5">
            <Link href={"/"} className="flex items-center gap-3">
                <Image
                src={Logo}
                alt="Logo"
                width={50}
                height={50}
                />
                <span className="text-xl font-bold">Flow Jobs</span>
            </Link>
            <Button asChild>
                <Link href={"/jobs/new"}>Post a job</Link>
            </Button>
        </nav>
    </header>
  )
}