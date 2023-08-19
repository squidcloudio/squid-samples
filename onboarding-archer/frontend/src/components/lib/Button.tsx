import { omit } from 'lodash';
import { ButtonHTMLAttributes } from 'react';

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'modal';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: ButtonType;
}

const buttonClasses: Record<ButtonType, Array<string>> = {
  primary: [
    'bg-bg5',
    'text-text4',
    'rounded-[8px]',
    'py-[12px]',
    'px-[16px]',
    'flex',
    'justify-center',
    'font-extrabold',
    'text',
    'leading-[100%]',
    'hover:bg-bg6',
    'active:bg-bg9',
    'disabled:bg-bg8',
    'disabled:text-text3',
  ],
  modal: [
    'bg-primary1',
    'text-text1',
    'rounded-[8px]',
    'py-[12px]',
    'px-[16px]',
    'flex',
    'justify-center',
    'font-extrabold',
    'text',
    'leading-[100%]',
    'hover:opacity-80',
    'active:opacity-60',
    'disabled:bg-bg8',
    'disabled:text-text3',
  ],
  secondary: [
    'bg-bg4',
    'border',
    'border-bg5',
    'text-text1',
    'rounded-[8px]',
    'py-[12px]',
    'px-[16px]',
    'flex',
    'justify-center',
    'font-extrabold',
    'text',
    'leading-[100%]',
    'hover:bg-bg1',
    'hover:border-bg6',
    'active:bg-bg3',
    'active:border-bg5',
    'disabled:bg-bg8',
    'disabled:border-bg8',
    'disabled:text-text3',
  ],
  tertiary: [
    'bg-primary1',
    'border',
    'border-bg5',
    'text-text1',
    'font-extrabold',
    'text-[12px]',
    'leading-[100%]',
    'rounded-[8px]',
    'py-[7px]',
    'px-[16px]',
    'flex',
    'justify-center',
    'hover:brightness-95',
    'active:brightness-90',
    'disabled:bg-bg8',
    'disabled:border-bg8',
    'disabled:text-text3',
  ],
};

export default function Button(props: ButtonProps) {
  return (
    <button
      {...omit(props, 'buttonType')}
      className={`${buttonClasses[props.buttonType].join(' ')} ${
        props.className ?? ''
      }`}
    >
      {props.children}
    </button>
  );
}
