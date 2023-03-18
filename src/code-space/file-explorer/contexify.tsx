import { Menu, Item } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
const MENU_ID = 'justTest';

export default ({ menus }) => {
  /** 渲染 vNode */
  return (
    <Menu id={MENU_ID} theme="dark" animation={false}>
      {menus.map((item: any) => {
        return <Item {...item}>{item.label}</Item>;
      })}
    </Menu>
  );
};
