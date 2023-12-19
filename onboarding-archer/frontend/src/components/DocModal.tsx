import * as Modal from 'react-modal';
import { useArcherContext } from '@/utils/ArcherContextProvider';
import Icon from '@/components/lib/Icon';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism';
import prismMaterialDarkTheme from '@/utils/prismMaterialDarkTheme';

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
    maxWidth: '776px',
    width: '100%',
    padding: '0',
  },
  overlay: {
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
};

export default function DocModal() {
  const { docModalData, setDocModalData, setNextStepsModalOpen } =
    useArcherContext();
  const [markdown, setMarkdown] = useState('');

  function closeModal() {
    setDocModalData(undefined);
  }

  function goBackToNextSteps() {
    closeModal();
    setNextStepsModalOpen(true);
  }

  useEffect(() => {
    if (!docModalData) {
      setMarkdown('');
      return;
    }
    fetch(`/${docModalData.mdFilePath}`)
      .then((response) => response.text())
      .then((text) => {
        setMarkdown(text);
      });
  }, [docModalData]);

  return (
    <>
      <Modal
        isOpen={!!docModalData}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="relative px-[40px] pb-[40px] pt-[52px] overflow-hidden">
          <div
            className="absolute top-[24px] right-[24px] cursor-pointer hover:opacity-80 active:opacity-60"
            onClick={closeModal}
          >
            <Icon icon={'modal_x_icon'}></Icon>
          </div>
          <div className="flex items-center mb-[10px]">
            <div
              className="mr-[8px] cursor-pointer hover:opacity-80"
              onClick={goBackToNextSteps}
            >
              <div className="rotate-180 w-[24px] h-[24px]">
                <Icon icon={'caret_right'}></Icon>
              </div>
            </div>
            <div className="text-[32px] font-extrabold leading-[100%]">
              {docModalData?.title}
            </div>
          </div>
          <div className="markdown doc_modal">
            <ReactMarkdown
              children={markdown}
              rehypePlugins={[rehypeRaw]}
              components={{
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      {...props}
                      children={String(children).replace(/\n$/, '')}
                      style={prismMaterialDarkTheme}
                      language={match[1]}
                      PreTag="div"
                    />
                  ) : (
                    <code {...props} className={className}>
                      {children}
                    </code>
                  );
                },
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
