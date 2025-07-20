import { useState } from "react";
import DesignationList from "./DesignationList";
import { ChevronDownIcon, ChevronRightIcon, UsersIcon } from "@heroicons/react/24/solid";

const AuthorityList = ({ authorities }) => {
    return (
        <div className="space-y-4">
            {Object.entries(authorities).map(([name, authority]) => {
                const [open, setOpen] = useState(false);
                return (
                    <div key={name} className="bg-gray-50 border rounded-lg p-3 ml-4">
                        <button
                            onClick={() => setOpen(!open)}
                            className="flex justify-between items-center w-full"
                        >
                            <div className="flex items-center gap-2 font-medium text-[#0d2a47]">
                                {open ? (
                                    <ChevronDownIcon className="h-5 w-5" />
                                ) : (
                                    <ChevronRightIcon className="h-5 w-5" />
                                )}
                                {name}
                            </div>
                            <div className="flex items-center bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                                <UsersIcon className="h-4 w-4 mr-1" />
                                {authority.count}
                            </div>
                        </button>

                        {open && (
                            <div className="mt-2">
                                <DesignationList designations={authority.designations} />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default AuthorityList;
