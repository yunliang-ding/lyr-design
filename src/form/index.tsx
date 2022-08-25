/* eslint-disable @typescript-eslint/no-unused-vars */
import Form from './form';
import React, { useState } from 'react';
import { CoreFormProps, FormRefInstance } from './type.form';
import { SchemaProps } from './type.item';
/** 组件入口 */
const CoreForm = (props: CoreFormProps) => {
  const [reload, setReload] = useState(Math.random());
  const [initialValues, setInitialValues] = useState(props.initialValues);
  const forceRender = (values) => {
    setInitialValues(values);
    // 重新构建下
    setReload(Math.random());
  };
  return (
    <Form
      {...props}
      key={reload}
      initialValues={initialValues}
      forceRender={forceRender}
    />
  );
};
CoreForm.useForm = () => {
  const ref: FormRefInstance = React.useRef({
    getValues: () => {},
    setValues: (data) => {},
    setInitialValues: (data) => {},
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
