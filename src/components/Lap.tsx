import styled from "styled-components";
import { roundWithGoalState, ROUND, GOAL } from "../Atoms";
import { useRecoilValue } from "recoil";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const LapDiv = styled.div`
  width: 10%;
  text-align: center;
`;

const LapLeft = styled.h1`
  color: #596064;
  font-size: 28px;
`;

const LapText = styled.h1`
  color: #dcf3ff;
  font-size: 28px;
`;

function Lap() {
  const roundWithGoal = useRecoilValue(roundWithGoalState);
  return (
    <Container>
      <LapDiv>
        <LapLeft>{`${roundWithGoal.round}/${ROUND}`}</LapLeft>
        <LapText>Round</LapText>
      </LapDiv>
      <LapDiv>
        <LapLeft>{`${roundWithGoal.goal}/${GOAL}`}</LapLeft>
        <LapText>Goal</LapText>
      </LapDiv>
    </Container>
  );
}

export default Lap;
