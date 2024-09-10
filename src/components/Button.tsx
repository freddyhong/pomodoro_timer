import { motion } from "framer-motion";
import {
  BsPlayFill,
  BsFillPauseFill,
  BsFillPlayBtnFill,
  BsPlay,
} from "react-icons/bs";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimerButton = styled(motion.button)`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  font-size: 4rem;
  opacity: 0.9;
  color: #e3f5ff;
`;
interface IBtn {
  isRunning: boolean;
  Start: () => void;
  Pause: () => void;
}

function Button({ isRunning, Start, Pause }: IBtn) {
  return (
    <Container>
      <TimerButton
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.8 }}
        onClick={isRunning ? Pause : Start}
      >
        {isRunning ? <BsFillPauseFill /> : <BsPlayFill />}
      </TimerButton>
    </Container>
  );
}
export default Button;
