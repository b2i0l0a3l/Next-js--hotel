"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useHandleNavigation } from "@/hooks/useHandleNavigation";
import { navItems } from "./navItems";

const className:string = "cursor-pointer flex gap-2 items-center";

export function NavMenu() {
  const { handleNavigation } = useHandleNavigation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <ChevronsUpDown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {navItems.map((item) => (
          <DropdownMenuItem
            className={`${className}`}
            key={item.route}
            onClick={() => handleNavigation(item.route)}
          >
            <item.icon size={15} /> <span>{item.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
