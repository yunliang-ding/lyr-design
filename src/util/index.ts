/* eslint-disable no-nested-ternary */
import React from 'react';
import { cloneDeepWith } from 'lodash';
import { isEmpty as _isEmpty, uuid as _uuid } from 'react-core-form-tools';

export const isEmpty = _isEmpty;
export const uuid = _uuid;
/**
 * 简易发布订阅
 */
export const NOTICESELF: any = Symbol(''); // 唯一标识，通知自己重新渲染
export class EventEmit {
  listeners: any = [];
  // 指定某一个field更新
  publishMergeField = (fieldName: string, newField, customizer) => {
    this.listeners
      .filter((listener: any) => fieldName === listener.fieldName)
      .forEach((listener: any) => listener.fn({}, newField, customizer));
  };
  // 通知批量指定的字段重新渲染
  publishFields = (fieldNames: string[] = []) => {
    this.listeners
      .filter((listener: any) => fieldNames.includes(listener.fieldName))
      .forEach((listener: any) => listener.fn({ name: NOTICESELF }));
  };
  // 通知所有
  publish = (field: any) => {
    if (!field) return;
    this.listeners.forEach((listener: any) => listener.fn(field));
  };
  // 订阅下
  subscribe = (fieldName: string, fn: any) => {
    this.listeners.push({
      fieldName,
      fn,
    });
    // 返回取消订阅
    return () => {
      this.listeners = this.listeners.filter(
        (listener: any) => listener.fn !== fn,
      );
    };
  };
}
/**
 * 设置异步加载Select的options缓存
 */
export const AsyncOptionsCache: any = {};
/**
 * 递归查找指定name的field
 */
let _field_ = {};
export const queryFieldByName = (fields, fieldName) => {
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if (field.name === fieldName) {
      _field_ = field;
      break;
    } else if (
      field.type === 'FieldSet' &&
      Array.isArray(field.props.children)
    ) {
      // 递归子节点
      queryFieldByName(field.props.children, fieldName);
    }
  }
  return _field_;
};

export const getType = (obj: any): string => {
  const type = Object.prototype.toString.call(obj).slice(8, -1);
  return type.toLocaleLowerCase();
};

export const isObject = (obj) => getType(obj) === 'object';

export const isPromise = (obj) => getType(obj) === 'promise';

/** ReactElement 对象不参与深拷贝 */
export const cloneDeep = (source) => {
  return cloneDeepWith(source, (target) => {
    if (React.isValidElement(target)) {
      return target;
    }
  });
};
