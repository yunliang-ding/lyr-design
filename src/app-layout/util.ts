export const getBreadcrumbByMenus = (
  menus: any[] = [],
  path: string[] = [],
) => {
  let target = '';
  let children: any = menus;
  const breadcrumb: string[] = [];
  path.forEach((p) => {
    target += `/${p}`;
    const item = children.find((i) => i.path === target);
    if (item) {
      breadcrumb.push(item.label);
      children = item.children;
    }
  });
  return {
    title: breadcrumb[breadcrumb.length - 1],
    breadcrumb,
  };
};
