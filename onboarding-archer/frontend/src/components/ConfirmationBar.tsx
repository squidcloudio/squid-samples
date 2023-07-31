import { useArcherContext } from '@/utils/ArcherContextProvider.tsx';

export default function ConfirmationBar() {
  const { confirmationMessage } = useArcherContext();
  return confirmationMessage ? (
    <div className="py-5 bg-primary1 text-text1">
      <div className="container text-[16px] leading-[20px] font-semibold  text-center">
        {confirmationMessage}
      </div>
    </div>
  ) : (
    <></>
  );
}
