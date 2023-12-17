interface Props {
  direction?: 'row' | 'column';
  className?: string;
  children?: React.ReactNode;
  spacing?: number;
}

const GStack = (props: Props) => <div className={props.className}>{props.children}</div>;

export default GStack;
