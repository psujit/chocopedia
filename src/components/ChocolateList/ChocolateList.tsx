import React from "react";
import { Chocolate } from "../../types/chocolate.ts";
import { Header } from "../Header.tsx";
import { ChocolateSearchList } from "./ChocolateSearchList.tsx";

interface ChocolateListProps {
  chocolateList: Chocolate[]
  setChocolateList: (chocolateList: Chocolate[]) => void
}
export const ChocolateList: React.FunctionComponent<ChocolateListProps> = (
  props,
) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="flex flex-col justify-between py-3 pl-2">
          <React.Suspense>
            <Header headerText="Chocopedia Inventory" />
            <ChocolateSearchList chocolateList={props.chocolateList} setChocolateList={props.setChocolateList} />
          </React.Suspense>
        </div>
      </div>
    </div>
  )
}
