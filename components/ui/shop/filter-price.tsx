import React from "react";

const FilterPrice = () => {
  return (
    <div className="w-full border flex flex-col gap-3 px-2 pb-4">
      <h3 className="text-lg p-1  border-b">Price Filter</h3>
      <button className="p-1 px-3 bg-accent text-white ">Filter</button>
    </div>
  );
};

export default FilterPrice;
