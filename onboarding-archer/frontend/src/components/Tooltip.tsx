import React, { useEffect, useState } from 'react';
import Icon from '@/components/lib/Icon.tsx';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism';
import prismMaterialDarkTheme from '@/utils/prismMaterialDarkTheme.ts';
import { useArcherContext } from '@/utils/ArcherContextProvider.tsx';

interface TooltipProps extends React.HTMLAttributes<HTMLElement> {
  mdFile: string;
}

export default function Tooltip({
  mdFile,
  className,
  ...otherProps
}: TooltipProps) {
  const { inspectModeEnabled } = useArcherContext();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch(`/docs/${mdFile}`)
      .then((response) => response.text())
      .then((text) => {
        setMarkdown(text);
      });
  }, []);

  function toggleTooltip(): void {
    setTooltipVisible(!tooltipVisible);
  }

  return (
    <div
      {...otherProps}
      className={`inline-block relative ${
        inspectModeEnabled ? '' : 'hidden'
      } ${className}`}
    >
      <Icon
        className={`w-[36px] h-[36px] cursor-pointer hover:opacity-80 active:opacity-60`}
        onClick={toggleTooltip}
        icon={'tooltip_icon'}
      ></Icon>
      <div
        className={`absolute top-[43px] left-[-35px] bg-line3 text-text4 p-[16px] rounded-[8px] shadow-elevation2 z-10 w-[500px] ${
          tooltipVisible ? '' : 'hidden'
        }`}
      >
        <div
          className={
            'w-[20px] h-[20px] rotate-[45deg] absolute top-[-8px] left-[40px] bg-line3 rounded-[4px]'
          }
        ></div>

        <div
          className={
            'absolute top-[16px] right-[16px] cursor-pointer hover:opacity-80 active:opacity:60'
          }
          onClick={toggleTooltip}
        >
          <Icon icon={'x_icon'} />
        </div>
        <div className="markdown">
          <ReactMarkdown
            children={markdown}
            components={{
              code({ node, inline, className, children, ...props }) {
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
    </div>
  );
}
