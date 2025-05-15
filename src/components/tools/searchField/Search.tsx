import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackIcon } from "../../../components/icons/svg/backArrowIcon.svg";
import { ReactComponent as SearchIcon } from "../../../components/icons/svg/searchIcon.svg";
import { ReactComponent as HalazoneLogo } from "../../../components/icons/svg/halazoneLogo.svg";

type SearchProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick?: () => void;
  onBackClick?: () => void;
};

function Search({ value, onChange, onSearchClick }: SearchProps) {
  return (
   
      <div className="flex justify-center items-center transition-all bg-white w-full max-w-[500px] h-[56px] rounded-[12px]">
        <button
          type="button"
          onClick={onSearchClick}
          className="w-[50px] transition-all flex items-center justify-center"
        >
          <SearchIcon />
        </button>

        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="جستجو"
          className="w-full input input-ghost transition-all text-sm pr-0 bg-transparent focus:outline-none border-none focus:ring-0 focus:bg-transparent"
        />
   


    </div>
  );
}

export default Search;
