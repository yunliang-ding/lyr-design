import ReactDOM from 'react-dom';
import ModalForm from '@/form-submit/modal-form';
import { useEffect } from 'react';
import { ModalFormProps } from '../index';
import { uuid } from '@/util';
import store from './store';

const $: any = document.querySelector.bind(document);

const close = (containId: string) => {
  store.visible = false;
  setTimeout(() => {
    $(`#${containId}`)?.parentNode?.remove();
  }, 500);
};

const ModalFormWapper = ({ containId, tag, modalProps, ...props }) => {
  const { visible } = store.use();
  useEffect(() => {
    store.visible = true;
  }, []);
  return (
    <ModalForm
      {...props}
      visible={visible}
      onClose={() => {
        props.onClose?.();
        close(containId);
      }}
      modalProps={{
        ...modalProps,
        id: containId,
      }}
    />
  );
};

const CreateModalForm = (props) => {
  const tag = document.createElement('div');
  $('body').appendChild(tag);
  ReactDOM.render(<ModalFormWapper {...props} tag={tag} />, tag);
};

export default (options: ModalFormProps) => {
  const containId = `modalId_${uuid(6)}`;
  return {
    open: async (config?: ModalFormProps) => {
      const props: any = {
        ...options,
        ...config,
      };
      CreateModalForm({
        ...props,
        containId,
        onSubmit: async (data) => {
          await props.onSubmit?.(data);
          close(containId); // 关闭
        },
      });
    },
    close() {
      close(containId);
    },
  };
};
