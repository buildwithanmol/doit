import React from "react";
import MultiRangeSlider from "multi-range-slider-react";
import styled from "styled-components";

interface RangeProps {
  minValue: number;
  maxValue: number;
  set_minValue: (value: number) => void;
  set_maxValue: (value: number) => void;
}
const RangeDiv = styled.div`
  .multi-range-slider .thumb .caption * {
    background-color: #1e2029 !important;
    box-shadow: inset 0px 0px 5px transparent !important;
    border-radius: 8px !important;
  }
  .multi-range-slider .bar-left,
  .multi-range-slider .bar-right {
    box-shadow: inset 0px 0px 5px transparent !important;

    // The height of the range container
    height: 20px !important;
  }
  .multi-range-slider .bar-inner {
    box-shadow: inset 0px 0px 5px transparent !important;
    border: none !important;
  }
  .multi-range-slider .thumb {
    border: 2px solid #1e2029 !important;
    margin-top: 7px !important;
  }
  .multi-range-slider .thumb::before {
    box-shadow: inset 0px 0px 5px transparent !important;
    border: 2px solid #1e2029 !important;
    height: 20px !important;
    width: 20px !important;

    // the position of the thumb needs to be adjusted while height of the container changes
    margin-left: -9px !important;
  }
`;
function MultiRangeSliderReact({
  minValue,
  maxValue,
  set_minValue,
  set_maxValue,
}: RangeProps) {
  const handleInput = (e: { minValue: number; maxValue: number }) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  return (
    <div className=" max-w-md w-full bg-secondary/20 p-3 rounded-md">
      <RangeDiv className="w-full">
        <MultiRangeSlider
          preventWheel={false}
          baseClassName="multi-range-slider"
          minCaption={`Rs. ${minValue}`}
          maxCaption={`Rs. ${maxValue}`}
          ruler={false}
          label={false}
          barLeftColor="#E3E3E3"
          barInnerColor="#1E2029"
          barRightColor="#E3E3E3"
          thumbLeftColor="#E1FE02"
          thumbRightColor="#E1FE02"
          className="bg-transparent !border-0 !shadow-none"
          min={0}
          max={100}
          step={5}
          minValue={minValue}
          maxValue={maxValue}
          onInput={(e) => {
            handleInput(e);
          }}
        />
      </RangeDiv>
      <pre className="border-accent w-fit mx-auto  text-primary rounded-md text-sm  space-x-2 border bg-secondary/50 flex px-2">
        <p>
          Rs.
          {minValue} - Rs.{maxValue}
        </p>
      </pre>
    </div>
  );
}

export default MultiRangeSliderReact;
