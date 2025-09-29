import React, { useState } from "react";
import ClaimInfo from "./ClaimInfo";
import ClaimsDetails from "./ClaimDetails";
import { useParams } from "react-router";
import { useGetClaimByIdQuery } from "../../apis/claimsApi";

// позже добавишь остальные компоненты

const ClaimPage = () => {
  const { number } = useParams();
  const [activeTab, setActiveTab] = useState(0);

  const { data, isLoading, error } = useGetClaimByIdQuery(number);

  const tabs = [
    { label: "Общая информация", component: <ClaimInfo data={data} /> },
    { label: "Детали претензии", component: <ClaimsDetails data={data} /> },
  ];

  return (
    <div className="p-6 bg-white shadow rounded-md flex-1 mt-[11vh]">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Претензия № {number}
      </h2>

      <div className="flex flex-col md:flex-row gap-2 mb-6">
        <div className="flex md:flex-col gap-2 w-full md:w-1/3">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 text-left text-sm rounded-md border transition-all duration-200 ${
                activeTab === index
                  ? "bg-[#0C1B60] text-white font-semibold shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 p-4 border rounded-md bg-gray-50 shadow-inner">
          {tabs[activeTab].component}
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <button className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
          Вернуться
        </button>
      </div>
    </div>
  );
};

export default ClaimPage;
