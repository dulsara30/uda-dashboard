import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon, UsersIcon } from "@heroicons/react/24/solid";

const DesignationList = ({ designations }) => {
    return (
        <div className="ml-6 space-y-2">
            {Object.entries(designations).map(([title, data]) => {
                const [open, setOpen] = useState(false);
                return (
                    <div
                        key={title}
                        className="bg-white border border-gray-200 rounded-lg p-3"
                    >
                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center justify-between w-full font-medium text-[#0d2a47]"
                        >
                            <div className="flex items-center gap-2">
                                {open ? (
                                    <ChevronDownIcon className="h-5 w-5" />
                                ) : (
                                    <ChevronRightIcon className="h-5 w-5" />
                                )}
                                {title}
                            </div>
                            <div className="flex items-center bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                                <UsersIcon className="h-4 w-4 mr-1" />
                                {data.count}
                            </div>
                        </button>

                        {open && (
                            <ul className="mt-2 pl-5 list-disc text-sm text-gray-700">
                                {data.names.map((name, idx) => (
                                    <li key={idx}>{name}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default DesignationList;
