import React from "react";
import TopElement from "../TopElement";
import FileManager from "../Files/FileManager";

export default function FileOverview() {

  return (
    <div className="mt-[11vh] flex-1">
      <TopElement type="files"/> 
      <FileManager />
    </div>
  );
}
