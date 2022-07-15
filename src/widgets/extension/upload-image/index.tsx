/* eslint-disable no-console */
import { useState } from 'react';
import { Upload, message, Image } from 'antd';
import './index.less';

export default (props: any) => {
  const {
    text = '上传图片',
    accept = '.jpg,.jpeg,.png,.bmp',
    maxCount = 1, // 默认最多可以上传1
    limitSize = 5, // 图片大小5M
    disabled = false,
    readOnly = false,
  } = props;
  const [fileList, setFileList] = useState(props.value || []);
  // 上传前: 检查格式和大小
  const beforeUpload = (file: any) => {
    try {
      // 判断下后缀名(一般使用二进制，或者file.type的映射关系判断)这里暂时先这样写，后面扩展
      const ext: string = file.name.substring(file.name.lastIndexOf('.'));
      // 转小写再判断
      if (
        !accept
          .split(',')
          .map((item: string) => item.toLowerCase())
          .includes(ext.toLowerCase())
      ) {
        message.error(`${file.name} 文件格式不在${accept}中`);
        return Upload.LIST_IGNORE;
      }
      const { size } = file;
      const isLtSize = size / 1024 / 1024 <= limitSize;
      if (!isLtSize) message.error(`文件大小不允许超过${limitSize}M`);
      return isLtSize;
    } catch (error) {
      console.log(error);
    }
    return null;
  };
  // 删除文件
  const onRemove = (file: any) => {
    const _fileList = Array.isArray(fileList)
      ? fileList
      : JSON.parse(JSON.stringify(fileList.fileList));
    let tempFileList = JSON.parse(JSON.stringify(_fileList));
    tempFileList = tempFileList.filter(({ uid }: any) => uid !== file.uid);
    setFileList(tempFileList);
    // 同步表单数据
    props.onChange(tempFileList);
  };
  // 上传图片
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onChange = ({ file, fileList }: any) => {
    setFileList(fileList);
    // 同步表单数据
    if (file.status === 'done') {
      // 同步表单数据
      props.onChange(fileList);
    }
  };
  const _fileList = Array.isArray(fileList)
    ? fileList
    : JSON.parse(JSON.stringify(fileList.fileList || []));
  return (
    <>
      <Upload
        {...props}
        fileList={_fileList}
        beforeUpload={beforeUpload}
        onChange={onChange}
        onRemove={onRemove}
        maxCount={maxCount}
        disabled={disabled}
        listType="picture-card"
        itemRender={(_, file: any) => {
          return (
            <div className="picture-card-image">
              <Image width={100} src={file.thumbUrl || file.url} />
              {!(props.disabled || readOnly) && (
                <a
                  className="oss-file-item-render-action"
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                  }}
                  onClick={() => {
                    onRemove(file);
                  }}
                >
                  <i className="iconfont spicon-shanchu" />
                </a>
              )}
            </div>
          );
        }}
      >
        {_fileList.length < maxCount && text}
      </Upload>
    </>
  );
};
