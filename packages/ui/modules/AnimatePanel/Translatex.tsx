import { type AnimationConfig, animated, useSpring } from '@react-spring/web';
import React from 'react';

export type TranslateProps = {
  children?: React.ReactNode;
  direction?: string;
  delay?: number;
  run?: boolean;
  config?: Partial<AnimationConfig>;
  className?: string;
};
export default function Translatex(props: TranslateProps) {
  const {
    children,
    direction = 'left',
    delay = 3000,
    run = false,
    config = {
      tension: 100,
      friction: 26,
    },
  } = props;
  const [animate, setAnimate] = React.useState(false);
  React.useEffect(() => {
    setAnimate(run);
  }, [run]);
  const animateStyles = useSpring({
    opacity: animate ? 1 : 0,
    transform: animate
      ? `${direction === 'left' ? 'translateX(0px) scale(1) rotateY(0deg)' : 'translateY(0px) scale(1) rotateY(0deg)'}`
      : `${
          direction === 'left'
            ? 'translateX(80px) scale(1) rotateY(10deg)'
            : 'translateY(80px) scale(0.9) rotateY(10deg)'
        }`,
    delay,
    config: { ...config },
    onRest: () => {},
  });
  return (
    <animated.div className={props.className} style={{ ...animateStyles }}>
      {run && children}
    </animated.div>
  );
}
