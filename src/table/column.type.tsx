import { TooltipProps, TableColumnProps } from '@arco-design/web-react';

interface AnyObjet {
  [key: string]: any;
}
export interface TableColumnType extends TableColumnProps<any> {
  /** 千分位展示金额 */
  useThousandth?:
    | {
        minimumFractionDigits: number;
        maximumFractionDigits: number;
      }
    | boolean;
  /** 支持复制 */
  copyable?:
    | boolean
    | {
        text: string | ((v, record, index) => string);
      };
  /** 提示 */
  tip?: React.ReactNode;
  /** 是否展示 */
  visible?: boolean;
  /** 链接标识 */
  link?: boolean;
  /** 是否可拖拽改宽度 */
  resize?: boolean;
  /** 后缀 */
  suffix?: React.ReactNode;
  /** 枚举：支持对象 ｜ 数组  */
  enums?: any[] | AnyObjet;
  /** 枚举 配置 */
  enumsConf?: {
    /** 是否是数组对象 */
    isArrObj?: boolean;
    /** 标识字段 */
    key: string;
    /** 展示字段 */
    label: string;
  };
  /** 字段类型 */
  columnType?: 'columnNo';
  /** 日期格式化 */
  dateFormat?: string;
  /** tooltipProps */
  tooltipProps?: TooltipProps;
}

export default (props: TableColumnType) => null;