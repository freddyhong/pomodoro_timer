import { motion } from "framer-motion";
import styled from "styled-components";
import Button from "./Button";
import { useEffect, useState } from "react";
import Lap from "./Lap";
import {
  MILLI_SECOND,
  ROUND,
  GOAL,
  timeState,
  intervalState,
  roundWithGoalState,
  formatTime,
} from "../Atoms";
import { useRecoilState } from "recoil";

const Containter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  padding: 7vh 0px;
`;
const Header = styled.h1`
  font-size: 35px;
  color: #dcf3ff;
`;
const Timer = styled.div`
  width: 60vh;
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TimerCard = styled(motion.div)`
  background-color: #eef9ff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 7rem;
  border-radius: 7%;
  width: 46%;
  height: 100%;
  color: #0a2c3e;
`;
const Colon = styled.h1`
  font-size: 5rem;
  color: #8fc5e2;
`;
const timerBoxVariants = {
  initial: {
    scale: 0.8,
    opacity: 0.15,

    boxShadow:
      "rgba(249, 249, 249, 0.25) 0px 30px 60px -12px, rgba(255, 255, 255, 0.3) 0px 18px 36px -18px",
  },
  animate: {
    scale: 1,
    opacity: 1,
    boxShadow:
      "rgba(249, 249, 249, 0.25) 0px 30px 60px -12px, rgba(255, 255, 255, 0.3) 0px 18px 36px -18px",
    transition: {
      type: "spring",
      duration: 1,
    },
  },
};

function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useRecoilState(intervalState);
  const [roundWithGoal, setRoundWithGoal] = useRecoilState(roundWithGoalState);
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [isFirstSecond, setIsFirstSecond] = useState(false);
  const [time, setTime] = useRecoilState(timeState);
  const getTime = () => {
    setMinutes(Math.floor((Date.now() / 1000 / 60) % 60).toString());
    setSeconds(Math.floor((Date.now() / 1000) % 60).toString());
  };

  const Running = () => {
    setIsRunning(!isRunning);
  };
  const Pause = () => {
    setIsRunning(!isRunning);
    clearInterval(String(intervalId));
  };
  const Start = () => {
    setIsRunning(!isRunning);
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    setIntervalId(String(timer));
  };

  useEffect(() => {
    if (time === 0) {
      clearInterval(Number(intervalId));
      setTime(MILLI_SECOND);
      setRoundWithGoal((prev) => ({
        ...prev,
        round: roundWithGoal.round === 2 ? 0 : prev.round + 1,
      }));
      setIsRunning((prev) => !prev);
    }

    if (roundWithGoal.round >= ROUND) {
      clearInterval(Number(intervalId));
      setTime(MILLI_SECOND);
      setRoundWithGoal((prev) => ({
        round: 0,
        goal: roundWithGoal.goal === 2 ? 0 : prev.goal + 1,
      }));
      setIsRunning(false);
    }
    const timeFormatted = formatTime(time).split(":");

    setMinutes(timeFormatted[1]);
    setSeconds(timeFormatted[2]);

    seconds === "01" ? setIsFirstSecond(true) : setIsFirstSecond(false);
  }, [time]);

  return (
    <Containter>
      <Header>Pomodoro Timer</Header>
      <Timer>
        {Array.from(Array(26).keys()).map((i) =>
          i === Number(minutes) ? (
            <TimerCard
              variants={timerBoxVariants}
              initial="initial"
              animate="animate"
              key={minutes}
            >
              {minutes}
            </TimerCard>
          ) : null
        )}

        <Colon>:</Colon>
        {Array.from(Array(61).keys()).map((i) =>
          i === Number(seconds) ? (
            <TimerCard
              variants={timerBoxVariants}
              initial="initial"
              animate="animate"
              key={seconds}
            >
              {seconds}
            </TimerCard>
          ) : null
        )}
      </Timer>
      <Button isRunning={isRunning} Start={Start} Pause={Pause} />
      <Lap />
    </Containter>
  );
}
export default Home;
