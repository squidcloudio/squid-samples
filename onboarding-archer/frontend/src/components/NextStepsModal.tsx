import * as Modal from 'react-modal';
import {useArcherContext} from '@/utils/ArcherContextProvider';
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
    description: 'Update me',
    mdFilePath: 'docs/next_steps/scheduler.md',
  },
  {
    title: 'Add a Trigger',
    description: 'Update me',
    mdFilePath: 'docs/next_steps/trigger.md',
  },
  {
    title: 'Add an Executable',
    description: 'Update me',
    mdFilePath: 'docs/next_steps/executable.md',
  },
]

export default function NextStepsModal() {
  const {nextStepsModalOpen, setNextStepsModalOpen} = useArcherContext();

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
        <div className="relative">
          <div
            className="absolute top-[24px] right-[24px] cursor-pointer hover:opacity-80 active:opacity-60"
            onClick={closeModal}
          >
            <Icon icon={'modal_x_icon'}></Icon>
          </div>

          <div className="">Go deeper...</div>
          <div>Now that you have completed onboarding with the Archer lite demo app take it further and explore adding
            backend functions:
          </div>
          <div>
            {nextSteps.map((step, index) => {
              return (
                <div key={index}>
                  <div>{step.title}</div>
                  <div>{step.description}</div>
                </div>
              )
            })}
            <div></div>
          </div>

        </div>
      </Modal>
    </>
  );
}
