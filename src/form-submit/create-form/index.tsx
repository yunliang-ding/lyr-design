import { uuid } from '@/util';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  ModalForm,
  DrawerForm,
  DrawerFormProps,
  ModalFormProps,
} from '../../index';

const $: any = document.querySelector.bind(document);

export interface CreateModalFormProps extends ModalFormProps {
  getPopupContainer?: () => HTMLElement | null;
  /** 容器ID */
  containId?: string;
}
export interface CreateDrawerFormProps extends DrawerFormProps {
  getPopupContainer?: () => HTMLElement | null;
  /** 容器ID */
  containId?: string;
}

const close = (containId) => {
  setTimeout(() => {
    $(`#${containId}`)?.remove();
  }, 500);
};

const ModalFormWapper = (props) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
  }, []);
  return (
    <ModalForm
      {...props}
      visible={visible}
      onClose={() => {
        props.onClose?.();
        setVisible(false);
        close(props.containId);
      }}
      modalProps={{
        ...(props.modalProps || {}),
        getContainer: () => props.tag,
      }}
    />
  );
};

const DrawerFormWapper = (props) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
  }, []);
  return (
    <DrawerForm
      {...props}
      visible={visible}
      onClose={() => {
        props.onClose?.();
        setVisible(false);
        close(props.containId);
      }}
      drawerProps={{
        ...(props.drawerProps || {}),
        getContainer: () => props.tag,
      }}
    />
  );
};

const CreateModalForm = (props) => {
  const tag = document.createElement('div');
  tag.setAttribute('id', props.containId);
  const target = props.getPopupContainer?.() || $('body');
  target.appendChild(tag);
  ReactDOM.render(<ModalFormWapper {...props} tag={tag} />, tag);
  return null;
};

const CreateDrawerForm = (props) => {
  const tag = document.createElement('div');
  tag.setAttribute('id', props.containId);
  const target = props.getPopupContainer?.() || $('body');
  target.appendChild(tag);
  ReactDOM.render(<DrawerFormWapper {...props} tag={tag} />, tag);
  return null;
};

export default {
  Modal(options: CreateModalFormProps | Promise<CreateModalFormProps>) {
    const containId = `modalId_${uuid(6)}`;
    return {
      open: async (
        config: CreateModalFormProps | Promise<CreateModalFormProps> = {},
      ) => {
        const props: any = {
          ...(await options),
          ...(await config),
        };
        CreateModalForm({
          ...props,
          containId,
          onSubmit: async (data) => {
            await props.onSubmit?.(data);
            close(props.containId); // 关闭
          },
        });
      },
      close: () => {
        close(containId); // 关闭
      },
    };
  },
  Drawer(options: CreateDrawerFormProps | Promise<CreateDrawerFormProps>) {
    const containId = `drawerId_${uuid(6)}`;
    return {
      open: async (
        config: CreateDrawerFormProps | Promise<CreateDrawerFormProps> = {},
      ) => {
        const props: any = {
          ...(await options),
          ...(await config),
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
      close: async () => {
        close(containId); // 关闭
      },
    };
  },
};
