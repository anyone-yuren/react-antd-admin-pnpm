interface Props {
  direction?: 'row' | 'column';
  className?: string;
  children?: React.ReactNode;
  spacing?: number;
}

const GPaper = (props: Props) => <div className={props.className}>{props.children}</div>;

export default GPaper;
