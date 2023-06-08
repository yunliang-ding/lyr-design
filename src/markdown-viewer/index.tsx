import ReactMarkDown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './index.less';

interface MarkDownViewerProps {
  code: string;
}

export default ({ code }: MarkDownViewerProps) => {
  return (
    <ReactMarkDown
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              PreTag="div"
              style={vscDarkPlus}
              language={match[1]}
              className="markdown-code"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {code}
    </ReactMarkDown>
  );
};
