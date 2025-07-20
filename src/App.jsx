import { useEffect, useState } from "react";
import { fetchSheetData } from "./services/fetchSheet";
import { structureParticipants } from "./services/structureData";
import DistrictCard from "./components/DistrictCard";
import logo from "./assets/logo.png";
import { ArrowPathIcon, UsersIcon } from "@heroicons/react/24/solid";

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");
  const [search, setSearch] = useState("");


  const loadData = async () => {
    try {
      setLoading(true);
      const raw = await fetchSheetData();
      const structured = structureParticipants(raw);
      setData(structured);
      setLastUpdated(new Date().toLocaleString());
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 🔢 Total participant count across all districts
  const totalParticipants = Object.values(data).reduce(
    (sum, district) => sum + district.count,
    0
  );

  return (
    <div className="min-h-screen bg-[#f6f9fc] text-gray-800">
      {/* Header */}
      <div className="bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src={logo} alt="UDA Logo" className="h-12 w-12 object-contain" />
          <div>
            <h1 className="text-2xl font-bold text-[#0d2a47]">Urban Development Authority</h1>
            <p className="text-sm text-gray-500">Awareness Workshop on Rules & Regulations</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Total Participants</p>
            <div className="flex items-center gap-1 text-2xl font-bold text-[#0d2a47]">
              <UsersIcon className="h-6 w-6 text-blue-500" />
              {totalParticipants}
            </div>
          </div>

          <button
            onClick={loadData}
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-blue-500 text-blue-600 font-medium hover:bg-blue-100"
          >
            <ArrowPathIcon className="h-5 w-5" />
            Refresh
          </button>
        </div>
      </div>

      {/* Last updated */}
      <div className="text-sm text-gray-600 px-6 py-2">
        Last updated: {lastUpdated}
      </div>

      {/* Search bar */}
      <div className="px-6 mt-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search by Name or Local Authority..."
          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
        />
      </div>

      {/* Main Content */}
      <div className="px-6 py-4 space-y-6">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          Object.entries(data).map(([district, districtData]) => {
            // Filter authorities/designations by search
            const matchedAuthorities = Object.entries(districtData.authorities)
              .map(([authName, authData]) => {
                const matchedDesignations = Object.entries(authData.designations).filter(
                  ([_, des]) =>
                    des.names.some(name =>
                      name.toLowerCase().includes(search.toLowerCase())
                    )
                );

                // If authority name or any person matches, keep it
                const authorityMatches =
                  authName.toLowerCase().includes(search.toLowerCase()) ||
                  matchedDesignations.length > 0;

                if (!authorityMatches) return null;

                // Keep only matching designations if name matched
                const filteredDesignations = matchedDesignations.length
                  ? Object.fromEntries(matchedDesignations)
                  : authData.designations;

                return [
                  authName,
                  {
                    count: Object.values(filteredDesignations).reduce(
                      (sum, d) => sum + d.count,
                      0
                    ),
                    designations: filteredDesignations,
                  },
                ];
              })
              .filter(Boolean);

            if (!matchedAuthorities.length) return null;

            const filteredDistrictData = {
              count: matchedAuthorities.reduce((sum, a) => sum + a[1].count, 0),
              authorities: Object.fromEntries(matchedAuthorities),
            };

            return (
              <DistrictCard
                key={district}
                districtName={district}
                data={filteredDistrictData}
              />
            );
          })

        )}
      </div>
    </div>
  );
}

export default App;
