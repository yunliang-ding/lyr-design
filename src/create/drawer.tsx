import ReactDOM from 'react-dom';
import DrawerForm from '@/form-submit/drawer-form';
import { useEffect, useState } from 'react';
import { DrawerFormProps } from '../index';
import { uuid } from '@/util';

const $: any = document.querySelector.bind(document);

export interface CreateDrawerFormProps extends DrawerFormProps {
  getPopupContainer?: () => HTMLElement | null;
  containId?: string;
}

const close = (containId) => {
  setTimeout(() => {
    $(`#${containId}`)?.remove();
  }, 500);
};

const DrawerFormWapper = ({ containId, tag, ...props }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
    window.addEventListener('popstate', () => {
      $('.core-form-create-drawer-wapper')?.remove();
    });
  }, []);
  return (
    <DrawerForm
      {...props}
      visible={visible}
      onClose={() => {
        props.onClose?.();
        setVisible(false);
        close(containId);
      }}
      drawerProps={{
        ...(props.drawerProps || {}),
        getContainer: () => tag,
      }}
    />
  );
};

const CreateDrawerForm = (props) => {
  const tag = document.createElement('div');
  tag.setAttribute('id', props.containId);
  tag.setAttribute('class', 'core-form-create-drawer-wapper');
  const target = props.getPopupContainer?.() || $('body');
  target.appendChild(tag);
  ReactDOM.render(<DrawerFormWapper {...props} tag={tag} />, tag);
  return null;
};

const DrawerFormPopUp = (options: CreateDrawerFormProps) => {
  const containId = options.containId || `drawerId_${uuid(6)}`;
  return {
    open: (config?: CreateDrawerFormProps) => {
      const props: any = {
        ...options,
        ...config,
      };
      CreateDrawerForm({
        ...props,
        containId,
        onSubmit: async (data) => {
          await props.onSubmit?.(data);
          close(containId); // 关闭
        },
      });
    },
  };
};

DrawerFormPopUp.close = (containId: string) => {
  close(containId); // 关闭
};

export default DrawerFormPopUp;
