import { FileProps } from './file-explorer/types';

/** 获取制定路径的文件 */
export const getFileByPath = (path: string, files: FileProps[], custom?) => {
  const currentFile = {
    file: undefined,
  };
  getCurrentFile(path, files, currentFile, custom);
  return currentFile.file;
};
/** 获取当前选中的文件 */
export const getCurrentFile = (
  path,
  files: FileProps[],
  currentFile,
  custom,
) => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.type === 'directory') {
      getCurrentFile(path, file.children, currentFile, custom);
    }
    if (typeof custom === 'function') {
      if (custom(file)) {
        currentFile.file = file;
      }
    } else if (file.path === path) {
      currentFile.file = file;
    }
  }
};
