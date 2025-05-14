import Confetti from "react-confetti-boom";
const ConfettiSuccess = () => {
  return <Confetti spreadDeg={90}  x={0.5} y={0.5} launchSpeed={1} particleCount={500} deg={25} mode='boom' shapeSize={14} colors={['#b2d8d8', '#b2d8d8']} effectCount={Infinity}/>;
};

export default ConfettiSuccess;
