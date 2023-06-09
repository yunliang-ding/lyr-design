import { useEffect, useState } from 'react';
import ReactMarkDown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import ts from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import {
  oneLight,
  oneDark,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import './index.less';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('ts', ts);
SyntaxHighlighter.registerLanguage('typescript', ts);
SyntaxHighlighter.registerLanguage('tsx', tsx);

interface MarkDownViewerProps {
  /** 文件内容 */
  content: string;
  /**
   * 代码主题色
   * @default dark
   */
  codeTheme?: string;
}

export default ({ content, codeTheme = 'dark' }: MarkDownViewerProps) => {
  const [spin, setSpin] = useState(true);
  useEffect(() => {
    // 延迟渲染，解决主题渲染问题
    setTimeout(() => {
      setSpin(false);
    }, 500);
  }, []);
  return spin ? null : (
    <div className="rcf-markdown">
      <ReactMarkDown
        components={{
          h1({ children }) {
            return <h1 className="rcf-markdown-h1">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="rcf-markdown-h2">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="rcf-markdown-h3">{children}</h3>;
          },
          ol({ children }) {
            return <ol className="rcf-markdown-ol">{children}</ol>;
          },
          ul({ children }) {
            return <ul className="rcf-markdown-ul">{children}</ul>;
          },
          li({ children }) {
            return <li className="rcf-markdown-li">{children}</li>;
          },
          strong({ children }) {
            return <div className="rcf-markdown-strong">{children}</div>;
          },
          blockquote({ children }) {
            return <div className="rcf-markdown-blockquote">{children}</div>;
          },
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                PreTag="div"
                style={codeTheme === 'dark' ? oneDark : oneLight}
                language={match[1]}
                className="rcf-markdown-code"
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
        {content}
      </ReactMarkDown>
    </div>
  );
};
