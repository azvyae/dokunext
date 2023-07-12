import React from 'react';
import { FiCopy } from 'react-icons/fi';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  dracula as style,
  gruvboxDark as url
} from 'react-syntax-highlighter/dist/esm/styles/prism';
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
  return React.createElement(
    'h' + props.level,
    { id: slug, className: 'my-4' },
    props.children
  );
}

function DokuNextMarkdown({ children, className }: MarkdownProps) {
  return (
    <ReactMarkdown
      className={className}
      remarkPlugins={[remarkGfm]}
      components={{
        h1: HeadingRenderer,
        h2: ({ node, ...props }) => <h2 className="my-4" {...props} />,
        h3: ({ node, ...props }) => <h3 className="my-4" {...props} />,
        h4: ({ node, ...props }) => <h4 className="my-4" {...props} />,
        h5: ({ node, ...props }) => <h5 className="my-4" {...props} />,
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
              <code className="absolute px-1 text-xs rounded-br-md bg-slate-700 text-slate-200">
                {match[1]}
              </code>
              <button
                className="absolute top-0 right-0 p-1 rounded-bl-md bg-slate-700"
                title="Copy to clipboard"
                onClick={() => {
                  copyToClipboard(String(children).replace(/\n$/, ''));
                }}
              >
                <FiCopy className=" text-slate-50" size={12} />
              </button>
              <SyntaxHighlighter
                {...props}
                customStyle={{
                  paddingTop: match[1] === 'url' ? 10 : 24,
                  paddingLeft: match[1] === 'url' ? 40 : 12,
                  paddingBottom: match[1] === 'url' ? 8 : 12,
                  paddingRight: match[1] === 'url' ? 36 : 12,
                  marginBottom: 4
                }}
                style={match[1] === 'url' ? url : style}
                language={match[1]}
                PreTag="div"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code
              {...props}
              className={`${className} text-indigo-700 break-words whitespace-pre-wrap`}
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
