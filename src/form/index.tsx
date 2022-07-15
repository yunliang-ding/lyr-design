/* eslint-disable @typescript-eslint/no-unused-vars */
import Form from './form';
import React from 'react';
import { CoreFormProps, FormRefInstance } from './type.form';
import { SchemaProps } from './type.item';
/** 组件入口 */
const CoreForm = (props: CoreFormProps) => {
  return <Form {...props} />;
};
CoreForm.useForm = () => {
  const ref: FormRefInstance = React.useRef({
    getValues: () => {},
    setValues: (data) => {},
    clearValues: () => {},
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
