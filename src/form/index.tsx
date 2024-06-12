/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Form from './form';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CoreFormProps, FormRefInstance } from './form.type';
import { SchemaProps } from './item.type';
import { AsyncOptionsCache, uuid } from '@/util';

/** 组件入口 */
const CoreForm = (props: CoreFormProps) => {
  const { form = CoreForm.useForm()[0], onMount = () => {}, ...rest } = props;
  const [reload, setReload] = useState(Math.random());
  const [initialValues, setInitialValues] = useState(rest.initialValues);
  const forceRender = (values) => {
    setInitialValues(values);
    setReload(Math.random()); // 重新构建下
  };
  // 判断是否是初次加载
  const firstRender: any = useRef(true);
  const name: string = useMemo(() => {
    return `form_${uuid(10)}`;
  }, []);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      onMount(form); // 第一次渲染完毕将Form实例吐出
    }
    return () => {
      // 卸载清除缓存
      Object.keys(AsyncOptionsCache).forEach((key) => {
        if (key.startsWith(name)) {
          delete AsyncOptionsCache[key];
        }
      });
    };
  }, []);
  return (
    <Form
      {...rest}
      key={reload}
      form={form}
      name={name}
      initialValues={initialValues}
      forceRender={forceRender}
    />
  );
};
CoreForm.useForm = () => {
  const ref: FormRefInstance = React.useRef({
    clearValues: () => {},
    setInitialValues: (data) => {},
    setSchemaByName: (name, newField: SchemaProps, customizer?) => {},
    getSchemaByName: (name) => {},
    touchSchemaRender: (names: string[]) => {},
    getFieldOption: async (fieldName: string) => {},
    setFieldOption: async (fieldName: string, options: any) => {},
    submit: () => {},
    setFieldsValue: (value: any) => {},
    getFieldValue: (name: string) => {},
    validateFields: async (nameList?: []) => {},
    getFieldsValue: (
      nameList?: string[] | true,
      filterFunc?: (meta: any) => boolean,
    ) => {},
    search: (params?) => {},
    reset: () => {},
    refresh: () => {},
    resetFields: (fields?: string[]) => {},
    setFormLoading: () => {},
    setFooterDisabled: () => {},
    setFooterActions: () => {},
  });
  return [ref.current];
};

export default CoreForm;
