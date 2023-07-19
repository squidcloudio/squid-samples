import { ButtonProps } from '@/components/buttons/ButtonTypes.ts';

export default function TertiaryButton({
  onClick,
  children,
  className,
  disabled,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`bg-primary1 border-[1px] border-bg5 text-text1 font-extrabold text-[12px] leading-[100%] rounded-[8px] py-[7px] px-[16px] flex justify-center hover:brightness-95 active:brightness-90 disabled:bg-bg8 disabled:border-bg8 disabled:text-text3 ${
        className ?? ''
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
