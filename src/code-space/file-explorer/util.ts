/** 获取已经打开的文件 */
export const getOpenFiles = (children, openFiles = []) => {
  children?.forEach((file) => {
    if (file.type === 'directory') {
      getOpenFiles(file.children, openFiles);
    } else if (file.status === 'open') {
      openFiles.push(file);
    }
  });
  return openFiles;
};
