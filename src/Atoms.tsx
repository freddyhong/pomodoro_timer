import { atom } from "recoil";

export const MILLI_SECOND = 1500;
export const ROUND = 4;
export const GOAL = 12;

interface IRoundGoal {
  round: number;
  goal: number;
}

export const intervalState = atom<string | null>({
  key: "interval",
  default: null,
});

export const timeState = atom<number>({
  key: "time",
  default: MILLI_SECOND,
});

export const roundWithGoalState = atom<IRoundGoal>({
  key: "roundWithGoal",
  default: {
    round: 0,
    goal: 0,
  },
});

export const formatTime = (seconds: number) => {
  const duration = new Date(seconds * 1000).toISOString();
  const timeString = duration.split("T")[1];
  const formattedTime = timeString.split(".")[0];

  return formattedTime;
};
