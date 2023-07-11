import React from 'react';
import { FiCopy } from 'react-icons/fi';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula as style } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
interface MarkdownProps {
  children: string;
  className?: string;
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

function flatten(text: any, child: any): any {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function HeadingRenderer(props: any) {
  var children = React.Children.toArray(props.children);
  var text = children.reduce(flatten, '');
  var slug = text.toLowerCase().replace(/\W/g, '-');
  return React.createElement('h' + props.level, { id: slug }, props.children);
}

function DokuNextMarkdown({ children, className }: MarkdownProps) {
  return (
    <ReactMarkdown
      className={className}
      remarkPlugins={[remarkGfm]}
      components={{
        h1: HeadingRenderer,
        hr: ({ node, ...props }) => (
          <hr className="my-6 border-slate-400/40" {...props} />
        ),
        table: ({ children }) => (
          <table className="border border-slate-700">{children}</table>
        ),
        th: ({ children }) => (
          <th className="p-2 font-bold border border-slate-700">{children}</th>
        ),
        td: ({ children }) => (
          <td className="p-2 border border-slate-700">{children}</td>
        ),
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <div className="relative">
              <code className="absolute px-1 rounded-br-lg bg-slate-500 text-slate-200">
                {match[1]}
              </code>
              <button
                className="absolute top-2 right-2"
                title="Copy to clipboard"
                onClick={() => {
                  copyToClipboard(String(children).replace(/\n$/, ''));
                }}
              >
                <FiCopy className="text-slate-50" size={18} />
              </button>
              <SyntaxHighlighter
                {...props}
                customStyle={{ paddingTop: 40, marginBottom: 24 }}
                style={style}
                language={match[1]}
                PreTag="div"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code
              {...props}
              className={`${className} text-indigo-700 break-words`}
            >
              {children}
            </code>
          );
        }
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

export { DokuNextMarkdown };
