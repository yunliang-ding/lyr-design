export default (props: any) => {
  if (typeof props.render !== 'function') {
    return null;
  }
  const Jsx = props.render(props.form);
  return Jsx || null;
};
