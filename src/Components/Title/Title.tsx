import './Title.scss';

export type TitleProps = {
  children: string;
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export default (props: TitleProps) => {
  const { children, type } = props;

  const className = `title-${type}`;

  return <div className={className}>{children}</div>;
};
