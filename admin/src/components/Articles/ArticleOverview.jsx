import React from "react";
import TopElement from "../TopElement";
import ArticleManager from "./ArticleManager";

export default function FileOverview() {

  return (
    <div className="mt-[11vh] flex-1">
      <TopElement type="article"/> 
      <ArticleManager />
    </div>
  );
}
