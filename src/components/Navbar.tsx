"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <h1
            className="cursor-pointer text-2xl font-bold"
            onClick={() => router.push("/")}
          >
            Blog
          </h1>

          <div className="hidden md:block">
            <div className="flex cursor-pointer items-center gap-8">
              <h3>Home</h3>
              <h3>Profile</h3>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="block md:hidden">
              <Button>
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/")}>
                Home
              </DropdownMenuItem>
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
