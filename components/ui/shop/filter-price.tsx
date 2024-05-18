'use client';
import React, { useState } from "react";
import MultiRangeSliderReact from "../dev-components/multi-range-slider-react";

const FilterPrice = () => {
  const [minValue, set_minValue] = useState(25);
  const [maxValue, set_maxValue] = useState(75);
  return (
    <div className="w-full border flex flex-col gap-3 px-2 pb-4">
      <h3 className="text-lg p-1  border-b">Price Filter</h3>
      <MultiRangeSliderReact
        minValue={minValue}
        maxValue={maxValue}
        set_minValue={set_minValue}
        set_maxValue={set_maxValue}
      />
      <button className="p-1 px-3 bg-accent text-white ">Filter</button>
    </div>
  );
};

export default FilterPrice;
