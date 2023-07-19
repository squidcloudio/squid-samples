import { ButtonProps } from '@/components/buttons/ButtonTypes.ts';

export default function PrimaryButton({
  onClick,
  children,
  className,
  disabled,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`bg-bg5 text-text4 rounded-[8px] py-[9px] px-[16px] flex justify-center font-extrabold text-[16px] leading-[100%] hover:bg-bg6 active:bg-bg9 disabled:bg-bg8 disabled:text-text3 ${
        className ?? ''
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
