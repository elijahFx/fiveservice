import React from "react";
import TopElement from "../TopElement";
import ClaimsTable from "./ClaimsTable";
import { useGetAllClaimsQuery } from "../../apis/claimsApi";

export default function ClaimsOverview() {
  const { data, isLoading, error } = useGetAllClaimsQuery();

  return (
    <div className="mt-[11vh] flex-1">
    
      <ClaimsTable data={data} />
    </div>
  );
}
