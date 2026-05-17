"use client";

import { SearchInput } from "../../shared/searchInput";

export const NavBarCenter = () => {
  return (
    <div className="flex-1 flex justify-center min-w-0">
      <div className="w-full max-w-md">
        <SearchInput />
      </div>
    </div>
  );
};
