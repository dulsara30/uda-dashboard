import { useState } from "react";
import AuthorityList from "./AuthorityList";
import { ChevronDownIcon, ChevronRightIcon, UsersIcon } from "@heroicons/react/24/solid";

const DistrictCard = ({ districtName, data }) => {
    const [open, setOpen] = useState(true);

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full text-left"
            >
                <div className="flex items-center gap-2 font-bold text-lg text-[#0d2a47]">
                    {open ? (
                        <ChevronDownIcon className="h-5 w-5" />
                    ) : (
                        <ChevronRightIcon className="h-5 w-5" />
                    )}
                    {districtName}
                </div>
                <div className="flex items-center bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    <UsersIcon className="h-4 w-4 mr-1" />
                    {data.count}
                </div>
            </button>

            {open && (
                <div className="mt-4">
                    <AuthorityList authorities={data.authorities} />
                </div>
            )}
        </div>
    );
};

export default DistrictCard;
