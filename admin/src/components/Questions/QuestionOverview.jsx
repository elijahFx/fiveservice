import React from "react";
import TopElement from "../TopElement";
import QuestionManager from "./QuestionManager";

export default function FileOverview() {

  return (
    <div className="mt-[11vh] flex-1">
      <TopElement type="questions"/> 
      <QuestionManager />
    </div>
  );
}
