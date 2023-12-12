export const getBreadcrumbByMenus = (
  menus: any[] = [],
  path: string[] = [],
) => {
  let target = '';
  let children: any = menus;
  const breadcrumb: any[] = [];
  path.forEach((p) => {
    target += `/${p}`;
    const item = children.find((i) => i.path === target);
    if (item) {
      breadcrumb.push({
        icon: item.icon,
        path: item.path,
        breadcrumbName: item.label,
      });
      children = item.children;
    }
  });
  return {
    title: breadcrumb[breadcrumb.length - 1]?.breadcrumbName,
    breadcrumb,
  };
};
