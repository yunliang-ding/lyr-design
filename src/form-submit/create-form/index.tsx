/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  ModalForm,
  DrawerForm,
  DrawerFormProps,
  ModalFormProps,
} from '../../index';

const $: any = document.querySelector.bind(document);

const uuid = 'popip_20220326';

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

const close = (containId = uuid) => {
  setTimeout(() => {
    $(`#${containId}`).remove();
  }, 500);
};

const ModalFormWapper = (props) => {
  const [visible, setvisible] = useState(false);
  useEffect(() => {
    setvisible(true);
  }, []);
  return (
    <ModalForm
      {...props}
      visible={visible}
      onClose={() => {
        props.onClose?.();
        setvisible(false);
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
  const [visible, setvisible] = useState(false);
  useEffect(() => {
    setvisible(true);
  }, []);
  return (
    <DrawerForm
      {...props}
      visible={visible}
      onClose={() => {
        props.onClose?.();
        setvisible(false);
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
  tag.setAttribute('id', props.containId || uuid);
  const target = props.getPopupContainer?.() || $('body');
  target.appendChild(tag);
  ReactDOM.render(<ModalFormWapper {...props} tag={tag} />, tag);
  return null;
};

const CreateDrawerForm = (props) => {
  const tag = document.createElement('div');
  tag.setAttribute('id', props.containId || uuid);
  const target = props.getPopupContainer?.() || $('body');
  target.appendChild(tag);
  ReactDOM.render(<DrawerFormWapper {...props} tag={tag} />, tag);
  return null;
};

export default {
  Modal(options: CreateModalFormProps) {
    return {
      open: (config: CreateModalFormProps = {}) => {
        const props: any = {
          ...options,
          ...config,
        };
        CreateModalForm({
          ...props,
          onSubmit: async (data) => {
            await props.onSubmit?.(data);
            close(props.containId); // 关闭
          },
        });
      },
      close,
    };
  },
  Drawer(options: CreateDrawerFormProps) {
    return {
      open: (config: CreateDrawerFormProps = {}) => {
        const props: any = {
          ...options,
          ...config,
        };
        CreateDrawerForm({
          ...props,
          onSubmit: async (data) => {
            await props.onSubmit?.(data);
            close(props.containId); // 关闭
          },
        });
      },
      close,
    };
  },
};
