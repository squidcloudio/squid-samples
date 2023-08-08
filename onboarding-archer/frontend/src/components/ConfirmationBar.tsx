import { useArcherContext } from '@/utils/ArcherContextProvider';

export default function ConfirmationBar() {
  const { confirmationMessage } = useArcherContext();
  return confirmationMessage ? (
    <div className="gray_out_in_inspection_mode py-5 bg-primary1 text-text1">
      <div className="container text leading-[20px] font-semibold  text-center">
        {confirmationMessage}
      </div>
    </div>
  ) : (
    <></>
  );
}
