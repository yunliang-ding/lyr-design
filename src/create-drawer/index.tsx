import ReactDOM from 'react-dom';
import DrawerForm from '@/form-submit/drawer-form';
import { useEffect } from 'react';
import { DrawerFormProps } from '../index';
import { uuid } from '@/util';
import store from './store';

const close = (containId: string) => {
  store.visible = false;
  setTimeout(() => {
    $(`#${containId}`)?.remove();
  }, 500);
};

const $: any = document.querySelector.bind(document);

export const DrawerFormWapper = ({
  tag,
  containId,
  drawerProps = {},
  ...props
}) => {
  const { visible } = store.use();
  useEffect(() => {
    store.visible = true;
  }, []);
  return (
    <DrawerForm
      {...props}
      visible={visible}
      drawerProps={
        {
          ...drawerProps,
          id: containId,
        } as any
      }
      onClose={() => {
        props.onClose?.();
        close(containId);
      }}
    />
  );
};

export const CreateDrawerForm = (props) => {
  const tag = document.createElement('div');
  $('body').appendChild(tag);
  ReactDOM.render(<DrawerFormWapper {...props} tag={tag} />, tag);
};

export default (options: DrawerFormProps) => {
  const containId = `drawerId_${uuid(6)}`;
  return {
    open: (config?: DrawerFormProps) => {
      const props: any = {
        ...options,
        ...config,
      };
      CreateDrawerForm({
        ...props,
        containId,
        onSubmit: async (data) => {
          await props.onSubmit?.(data);
          close(containId);
        },
      });
    },
    close() {
      close(containId);
    },
  };
};
