export const getElementTop = (el) => {
  let actualTop = el.offsetTop;
  let current = el.offsetParent;
  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  return actualTop;
};

export const getLinkTabs = (tabs = []) => {
  const links = [];
  tabs.forEach((item) => {
    const el = document.getElementById(item.key);
    if (el) {
      links.push({
        key: item.key,
        offsetTop: getElementTop(el),
      });
    }
  });
  return links;
};
