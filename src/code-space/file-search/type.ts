import { FileExplorerProps } from '../file-explorer/types';

export interface FileSearchProps extends FileExplorerProps {
  onSearch?: (keyword) => any;
  exclude?: string[];
  include?: string[];
}
