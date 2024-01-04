import { useSpring, animated } from 'react-spring';

type AnimatedNumberProps = {
  value: number;
};

export const AnimatedNumber = ({ value }: AnimatedNumberProps) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: value,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
};
