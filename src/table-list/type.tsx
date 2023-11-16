import { SchemaProps } from '..';

export interface TableListProps {
  /** 数据模型 */
  schema: SchemaProps<{
    isVisible?: (record) => boolean;
  }>[];
  /** 最少一条 */
  leastOne?: boolean;
  /** 是否只读 */
  readOnly?: boolean;
  /** 最多条数 */
  maxCount?: number;
  /** 数据源 */
  value: any[];
  /** 改变的钩子 */
  onChange?: Function;
  /** 唯一标识 */
  rowKey?: string;
  /** 是否展示序号 */
  showNo?: boolean;
  /** 是否开启删除确认 */
  removeConfirm?: boolean;
  /** 每次添加的默认值配置 */
  defaultAddValue?: (() => any) | any;
  name?: string;
  actionRef?: any;
}
