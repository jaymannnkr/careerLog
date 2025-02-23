"use client";

import { Slider } from "rsuite";

export default function CustomSlider({
  value,
  onChange,
  max,
}: {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}) {
  return (
    <Slider
      className="w-full"
      step={10}
      max={max || 100}
      value={value}
      graduated
      progress
      onChange={(value) => {
        const newValue = value;
        onChange(newValue);
      }}
      renderTooltip={(value) => {
        if (!value) {
          return <span>0</span>;
        }
        return <span>{value}</span>;
      }}
    />
  );
}
