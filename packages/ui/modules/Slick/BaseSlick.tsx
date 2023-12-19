import Slider, { type Settings } from 'react-slick';

type Props = {
  sliderConfig: Settings;
  children: React.ReactNode;
};
export default function BaseSlick(props: Props) {
  const { sliderConfig, children } = props;
  return <Slider {...sliderConfig}>{children}</Slider>;
}
