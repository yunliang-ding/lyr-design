/* eslint-disable no-nested-ternary */
import React from 'react';
import cloneDeepWith from 'lodash.clonedeepwith';
/**
 * 简易uuid
 */
export const uuid = (size: number) => {
  return Math.random()
    .toString(16)
    .substring(2, size + 2);
};

/** 判断空 */
export const isEmpty = (param: any) => {
  if (param === null || param === undefined) {
    return true;
  }
  if (Array.isArray(param)) {
    return param.length === 0;
  }
  if (typeof param === 'string') {
    return param.trim() === '';
  }
  if (typeof param === 'object') {
    return Object.keys(param).length === 0;
  }
  return false;
};
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
/** 获取类型 */
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
