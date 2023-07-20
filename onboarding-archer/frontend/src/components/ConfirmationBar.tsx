import Button from '@/components/Button.tsx';

export default function ConfirmationBar() {
  return (
    <div className="py-5 bg-primary1 text-text1">
      <div className="container text-[16px] leading-[20px] font-semibold flex justify-center items-center">
        <span className="font-bold pr-1">Congrats!</span> Looks like your stock
        portfolio went up XX.X% in 30 days!
        <a
          className="mx-2 underline"
          href="https://console.squid.cloud"
          target="_blank"
        >
          Explore next steps
        </a>
        or
        <Button
          buttonType="tertiary"
          className="ml-3"
          onClick={() => console.log('hi')}
        >
          Go to Console
        </Button>
      </div>
    </div>
  );
}
