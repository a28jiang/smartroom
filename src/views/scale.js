import { useState } from "react";

const Scale = ({ question, lowText, highText }) => {
  const [value, setValue] = useState(50);

  return (
    <>
      <div class="py-8 text-xl font-bold">{question}</div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        class="range"
        step="25"
        onChange={(e) => setValue(e.target.value)}
      />
      <div class="w-full flex justify-between text-xs px-2">
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
      </div>
      <div class="py-6 w-full flex justify-between text-s px-2">
        <span>{lowText}</span>
        <span></span>
        <span>Average</span>
        <span></span>
        <span>{highText}</span>
      </div>
    </>
  );
};

export { Scale };
