import * as Modal from 'react-modal';
import { useArcherContext } from '@/utils/ArcherContextProvider';
import Icon from '@/components/lib/Icon';

Modal.setAppElement('body');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '8px',
    boxShadow: 'var(--elevation4)',
    border: 'none',
    maxWidth: '543px',
    width: '100%',
    padding: '0',
  },
  overlay: {
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
};

interface NextStep {
  title: string;
  description: string;
  mdFilePath: string;
}

const nextSteps: Array<NextStep> = [
  {
    title: 'Add a Scheduler',
    description:
      'In the seconds it took to launch this app, Squid spun up a new mid-tier for you that’s secure, scalable, and.',
    mdFilePath: 'docs/next_steps/scheduler.md',
  },
  {
    title: 'Add a Trigger',
    description:
      'In the seconds it took to launch this app, Squid spun up a new mid-tier for you that’s secure, scalable, and.',
    mdFilePath: 'docs/next_steps/trigger.md',
  },
  {
    title: 'Add an Executable',
    description:
      'In the seconds it took to launch this app, Squid spun up a new mid-tier for you that’s secure, scalable, and.',
    mdFilePath: 'docs/next_steps/executable.md',
  },
];

export default function NextStepsModal() {
  const { nextStepsModalOpen, setNextStepsModalOpen } = useArcherContext();

  function closeModal() {
    setNextStepsModalOpen(false);
  }

  return (
    <>
      <Modal
        isOpen={nextStepsModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="relative px-[40px] pb-[40px] pt-[52px] overflow-hidden">
          <div className="w-[544px] h-[144px] bg-next-steps-modal-footer absolute bottom-0 left-[-1px] z-[-1] bg-cover"></div>
          <div
            className="absolute top-[24px] right-[24px] cursor-pointer hover:opacity-80 active:opacity-60"
            onClick={closeModal}
          >
            <Icon icon={'modal_x_icon'}></Icon>
          </div>

          <div className="text-[32px] font-extrabold mb-[8px]">
            Go deeper...
          </div>
          <div
            className={'text-[16px] font-semibold text-text2 leading-[20px]'}
          >
            Now that you have completed onboarding with the Archer lite demo app
            take it further and explore adding backend functions:
          </div>
          {nextSteps.map((step, index) => {
            return (
              <div
                className="flex justify-between items-center mt-[16px] border border-1 border-line1 p-[16px] rounded-[8px] bg-bg4 hover:bg-bg2 cursor-pointer"
                key={index}
              >
                <div>
                  <div
                    className={
                      'text-[20px] font-extrabold text-text2 mb-[8px] leading-[100%]'
                    }
                  >
                    {step.title}
                  </div>
                  <div
                    className={
                      'text-[16px] font-semibold text-text2 leading-[100%] max-w-[393px]'
                    }
                  >
                    {step.description}
                  </div>
                </div>
                <div>
                  <Icon icon={'caret_right'}></Icon>
                </div>
              </div>
            );
          })}

          <a
            href="https://docs.squid.cloud"
            target="_blank"
            className="text-primary1 text-[16px] font-bold underline leading-[100%] mt-[16px] block"
          >
            Explore our documentation at any time.
          </a>
        </div>
      </Modal>
    </>
  );
}
