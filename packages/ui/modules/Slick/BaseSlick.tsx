import Slider, { type Settings } from 'react-slick';

type Props = {
  sliderConfig: Settings;
  children: React.ReactNode;
};
export default function BaseSlick(props: Props) {
  const { sliderConfig, children, ...rest } = props;
  return (
    <Slider {...rest} {...sliderConfig}>
      {children}
    </Slider>
  );
}
