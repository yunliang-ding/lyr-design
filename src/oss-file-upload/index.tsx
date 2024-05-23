/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import {
  Upload,
  Message,
  Button,
  Spin,
  Progress,
} from '@arco-design/web-react';
import { OssFileUploadProps } from './type';
import { uuid } from '@/util';
import { IconPlus } from '@arco-design/web-react/icon';
import createOssInstance from './util';
import './index.less';

export default ({
  text = '点击上传',
  listType = 'text',
  accept = listType === 'picture-card'
    ? '.png,.jpg,.jpeg'
    : '.doc,.docx,.pdf,.xlsx,.xls,.txt,.png,.jpg,.jpeg',
  maxCount = 1, // 最多可以上传1份
  limitSize = 1 * 1024, // 默认最大1G
  value = [],
  readOnly = false,
  onChange,
  readOnlyEmptyValueNode = "-",
  ...rest
}: OssFileUploadProps) => {
  // 加载中
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // 重制进度条
    if (loading === false) {
      setPercent(0);
    }
  }, [loading]);
  // 进度条
  const [percent, setPercent] = useState(0);
  // 上传前: 检查格式和大小
  const beforeUpload = (file: any) => {
    try {
      // TODO 这里暂时先这样写,不严谨,后面扩展
      // 判断下后缀名
      const ext: string = file.name.substring(file.name.lastIndexOf('.'));
      // 转小写再判断
      if (
        typeof accept === 'string' &&
        !accept
          .split(',')
          .map((item: string) => item.toLowerCase())
          .includes(ext.toLowerCase())
      ) {
        Message.error(`${file.name} 文件格式不在${accept}中`);
        return false;
      }
      const { size } = file;
      const isLtSize = size / 1024 / 1024 <= limitSize;
      if (!isLtSize) {
        Message.error(`文件大小不允许超过${limitSize}M`);
        return false;
      }
      return isLtSize;
    } catch (error) {
      console.log(error);
    }
    return null;
  };
  // 删除的钩子
  const onRemove = (file: any) => {
    // 同步表单数据
    onChange(value.filter(({ uid }: any) => uid !== file.uid));
  };
  // 自定义上传
  const multiPartUpload = async (options: any) => {
    const { file } = options;
    const ossClient = createOssInstance();
    try {
      setLoading(true);
      try {
        const {
          res: { requestUrls, status },
        } = await ossClient.multipartUpload(`assets/${file.name}`, file, {
          progress: (p: number) => {
            setPercent(parseInt(String(p * 100), 10));
          },
        });
        if (status === 200) {
          const url = requestUrls?.[0];
          // 同步表单数据
          onChange([
            {
              uid: uuid(10),
              name: file.name,
              url: url.includes('?')
                ? url.substring(0, url.lastIndexOf('?'))
                : url,
            },
            ...value,
          ]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };
  // 文案
  const uploadButton =
    listType === 'picture-card' ? (
      <>
        <Spin loading={loading} className="oss-file-upload-picture">
          <IconPlus style={{ fontSize: 18, color: 'var(--color-text-2)' }} />
          <span>{text}</span>
        </Spin>
        {loading && (
          <div className="lyr-component-oss-upload-percent">
            <Progress percent={percent} size="small" />
          </div>
        )}
      </>
    ) : (
      <Button loading={loading}>{text}</Button>
    );
  return (
    <div className="lyr-component-oss-upload">
      <Upload
        imagePreview
        limit={maxCount}
        accept={accept}
        listType={listType}
        fileList={value}
        beforeUpload={beforeUpload}
        customRequest={multiPartUpload}
        onRemove={onRemove}
        {...rest}
        disabled={rest.disabled || readOnly}
      >
        {readOnly || value.length >= maxCount ? null : uploadButton}
      </Upload>
    </div>
  );
};
