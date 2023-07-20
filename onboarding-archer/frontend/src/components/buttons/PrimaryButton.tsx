import React from 'react';

export default function PrimaryButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
      {...props}
      className={`bg-bg5 text-text4 rounded-[8px] py-[9px] px-[16px] flex justify-center font-extrabold text-[16px] leading-[100%] hover:bg-bg6 active:bg-bg9 disabled:bg-bg8 disabled:text-text3 ${
        props.className ?? ''
      }`}
    >
      {props.children}
    </button>
  );
}
