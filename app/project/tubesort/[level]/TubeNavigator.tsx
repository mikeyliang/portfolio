"use client";

import React, { useState, useEffect } from "react";

import {
  Tube,
  TubeColorRelation,
  TubeLevel,
  TubeMove,
} from "../../../../types/tubes";

import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconPlayerPlayFilled,
  IconPlayerStopFilled,
} from "@tabler/icons-react";
import Tag from "@/components/Tag";

type ColorProps = {
  red: number;
  green: number;
  blue: number;
  colorIndex?: number;
};

function Color({ red, green, blue }: ColorProps) {
  const bgColor = `rgb(${red}, ${green}, ${blue})`;

  return (
    <div
      className="w-8 h-8 border border-gray-300 rounded-full"
      style={{ backgroundColor: bgColor }}></div>
  );
}

type TubeProps = {
  tubeIndex: number;
  colorIndex?: number;
  colors: number[];
  allColors: ColorProps[];
  step: number;
};

function Tubes({ step, tubeIndex, colors, allColors }: TubeProps) {
  return (
    <div className="flex flex-col items-center gap-[2px] px-1 py-1.5 rounded-t-lg rounded-b-2xl bg-zinc-200 hover:bg-zinc-300 border-zinc-300 border-2">
      {Array.from({ length: 4 - colors.length }).map((_, index) => (
        <div
          key={`layout-${step}_${tubeIndex}-empty-${index}`} // unique and stable key
          className="w-8 h-8 border border-gray-200 rounded-full"></div>
      ))}
      {[...colors].reverse().map((colorIndex, index) => {
        const color = allColors.find((c) => c.colorIndex === colorIndex);
        if (color)
          return (
            <Color
              key={`layout-${step}_tube-${tubeIndex}_color-${color.colorIndex}_idx-${index}`}
              red={color.red}
              green={color.green}
              blue={color.blue}
            />
          );
        return null;
      })}
    </div>
  );
}

type TubeLayoutProps = {
  layout: number[][];
  allColors: ColorProps[];
  step: number;
};

function TubeLayout({ step, layout, allColors }: TubeLayoutProps) {
  return (
    <div
      key={`layout-${step}`}
      className="flex flex-wrap items-center justify-center space-x-4 w-7/8 gap-y-4">
      {layout.map((tubeColors, index) => (
        <Tubes
          key={`layout-${step}_tube-${index}`}
          colors={tubeColors}
          allColors={allColors}
          tubeIndex={index}
          step={step}
        />
      ))}
    </div>
  );
}

function moveColors(fromTube: number[], toTube: number[]): number[][] {
  const newFromTube = [...fromTube];
  const newToTube = [...toTube];

  function canMoveColor() {
    if (!newFromTube.length) return false;
    if (newToTube.length >= 4) return false;
    if (!newToTube.length) return true;
    return (
      newFromTube[newFromTube.length - 1] === newToTube[newToTube.length - 1]
    );
  }

  while (canMoveColor()) {
    const color = newFromTube.pop();
    if (color !== undefined) {
      newToTube.push(color);
    }
  }

  return [newFromTube, newToTube];
}

function calculateMoves(
  tubeMoves: TubeMove[],
  initialTubes: number[][]
): number[][][] {
  const history: number[][][] = [JSON.parse(JSON.stringify(initialTubes))];

  let currentLayout = JSON.parse(JSON.stringify(initialTubes));

  for (let move of tubeMoves) {
    const [newFrom, newTo] = moveColors(
      currentLayout[move.fromTube.tubeIndex],
      currentLayout[move.toTube.tubeIndex]
    );
    currentLayout[move.fromTube.tubeIndex] = newFrom;
    currentLayout[move.toTube.tubeIndex] = newTo;
    history.push(JSON.parse(JSON.stringify(currentLayout)));
  }

  return history;
}

export default function TubeNavigator({
  tubeMoves,
  layout,
  allColors,
}: {
  tubeMoves: TubeMove[];
  layout: number[][];
  allColors: ColorProps[];
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [history, setHistory] = useState<number[][][]>([layout || []]);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const newHistory = calculateMoves(tubeMoves, layout);
    setHistory(newHistory);
  }, [tubeMoves, layout]);

  const play = () => {
    stop();
    const id = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < tubeMoves.length) {
          return prev + 1;
        } else {
          stop();
          return prev;
        }
      });
    }, 500);
    setIntervalId(id);
  };

  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-12 ">
      {history[currentStep] && (
        <TubeLayout
          layout={history[currentStep]}
          allColors={allColors}
          step={currentStep}
        />
      )}

      <div className="flex flex-col items-center justify-center gap-4 text-sm font-semibold lg:flex-row">
        <div className="flex flex-row items-center justify-center gap-4">
          <button
            className="flex flex-row items-center justify-center gap-2 px-2 py-1 rounded-md bg-zinc-200 hover:bg-zinc-300"
            disabled={currentStep === 0}
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}>
            <IconArrowNarrowLeft />
            <span>Prev</span>
          </button>

          <span className="flex-shrink-0">Move: {currentStep}</span>
          <button
            className="flex flex-row items-center justify-center gap-2 px-2 py-1 rounded-md hover:bg-zinc-300 bg-zinc-200"
            disabled={currentStep === history.length - 1}
            onClick={() =>
              setCurrentStep((prev) => Math.min(prev + 1, tubeMoves.length))
            }>
            <span>Next</span>
            <IconArrowNarrowRight />
          </button>
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          <button onClick={play}>
            <Tag
              hover_bg_color="hover:bg-green-300"
              bg_color="bg-green-100"
              txt_color="text-color-600">
              <div className="flex flex-row items-center justify-center gap-1">
                <IconPlayerPlayFilled className="p-1" />
                <span>Play</span>
              </div>
            </Tag>
          </button>

          <button onClick={stop}>
            <Tag
              hover_bg_color="hover:bg-red-300"
              bg_color="bg-red-100"
              txt_color="text-red-600">
              <div className="flex flex-row items-center justify-center gap-1">
                <IconPlayerStopFilled className="p-1" />
                <span>Stop</span>
              </div>
            </Tag>
          </button>
        </div>
      </div>
    </div>
  );
}
