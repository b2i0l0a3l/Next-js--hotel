"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";

export const SearchInput = () => {
  return (
    <div className="relative sm:block hidden">
      <Search className="absolute w-4 h-4 left-4 top-2.5 text-muted-foreground" />
      <Input
        className="pl-10 bg-primary/10 border border-primary/10 "
        placeholder="Search"
      />
    </div>
  );
};
