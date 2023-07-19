import { ButtonProps } from '@/components/buttons/ButtonTypes.ts';

export default function SecondaryButton({
  onClick,
  children,
  className,
  disabled,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`bg-bg4 border-[1px] border-bg5 text-text1 rounded-[8px] py-3 px-[16px] flex justify-center font-extrabold text-[16px] leading-[100%] hover:bg-bg1 hover:border-bg6 active:bg-bg3 active:border-bg5 disabled:bg-bg8 disabled:border-bg8 disabled:text-text3 ${
        className ?? ''
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
