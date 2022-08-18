---
title: 更新日志
order: 3
toc: menu
nav:
  title: 更新日志
  order: 6
---

### 0.0.7 (2022-08-18)

- Table 的 tools 类型为 Dropdown、只有当 menu 属性 长度 大于 0 才展示
- Table 的 toolsClick 和 rowOperationsClick 最后一个参数扩展为 tableInstance。
- Table 的 tools 和 menus 的 visible 属性 支持 function。
- Table 的 tools 和 menus 设置 onClick 属性 优先执行自己配置的 onClick
- TableProps 添加 autoNo 属性 开启分页序号展示
- tableColumnProps 新增 dateFormat 属性，支持配置日期格式化
- RangeInput 扩展 nameAlise 属性
- schema 在深拷贝中过滤 ReactElement 对象
