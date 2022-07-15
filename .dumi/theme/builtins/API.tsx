import React, { useContext } from 'react';
import type { IApiComponentProps } from 'dumi/theme';
import { context, useApiData } from 'dumi/theme';
import './API.less';

const LOCALE_TEXTS = {
  'zh-CN': {
    name: '属性名',
    description: '描述',
    type: '类型',
    default: '默认值',
    required: '(必选)',
  },
  'en-US': {
    name: 'Name',
    description: 'Description',
    type: 'Type',
    default: 'Default',
    required: '(required)',
  },
};

export default ({ identifier, export: expt }: IApiComponentProps) => {
  const data = useApiData(identifier);
  const { locale } = useContext(context);
  const texts = /^zh|cn$/i.test(locale)
    ? LOCALE_TEXTS['zh-CN']
    : LOCALE_TEXTS['en-US'];

  return (
    <>
      {data && (
        <div className="dumi-form-api-table">
          <table>
            <thead>
              <tr>
                <th align="left">{texts.name}</th>
                <th align="left">{texts.description}</th>
                <th align="left">{texts.type}</th>
                <th align="left">{texts.default}</th>
              </tr>
            </thead>
            <tbody>
              {data[expt]?.map((row) => (
                <tr key={row.identifier}>
                  <td>{row.identifier}</td>
                  <td>{row.description || '--'}</td>
                  <td>
                    <code>{row.type}</code>
                  </td>
                  <td>
                    <code>{row.default || '--'}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
