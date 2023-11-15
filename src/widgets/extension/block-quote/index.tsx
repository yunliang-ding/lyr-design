import './index.css';

export default ({ title, subTitle, style = {} }: any) => {
  return (
    <div className="core-form-block-quote" style={style}>
      {title}
      {subTitle && <div className="core-form-block-quote-sub">{subTitle}</div>}
    </div>
  );
};
