'use client';

import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula as style } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { PostmanInterpreter } from '@/components';

interface EssentialPostmanAPIResponse {
  info: string;
  item: string;
  variable: any[];
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

async function getCollection(token: string | null, collection: string) {
  const res = await fetch(
    `/postman/api?` +
      new URLSearchParams({
        collection: collection
      }),
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return res;
}

function CollectionViewer() {
  const [collection, setCollection] = useState<EssentialPostmanAPIResponse>();
  const [collectionDisplay, setCollectionDisplay] = useState<{
    info: any;
    item: any;
  }>();

  const updateCollectionToc = useCallback((info: any, item: any) => {
    const toc: { anchor: string; name: string }[] = [];
    const regex = /^# .*/gm;
    toc.push(
      ...[...info.description.matchAll(regex)].map((item) => {
        const target = item[0];
        return {
          anchor: target.toLowerCase().replace('# ', ''),
          name: target.replace('#', '')
        };
      })
    );

    console.info(toc);
  }, []);

  const updateColletionDisplay = useCallback(
    (collection: EssentialPostmanAPIResponse) => {
      if (!collection) {
        return;
      }
      let info = collection.info;
      let item = collection.item;

      collection.variable.forEach((variable) => {
        info = JSON.parse(
          info.replaceAll(`{{${variable.key}}}`, variable.value)
        );
        item = JSON.parse(
          item.replaceAll(`{{${variable.key}}}`, variable.value)
        );
      });

      setCollectionDisplay({
        info,
        item
      });

      updateCollectionToc(info, item);
    },
    [updateCollectionToc]
  );

  useEffect(() => {
    const collectionId = window.location.pathname.replace('/postman/', '');
    const token = window.localStorage.getItem('AUTH_TOKEN');
    async function retrieveData() {
      const res = await getCollection(token, collectionId);
      if (!res.ok) {
        return console.error(`HTTP Error: ${res.status}`);
      }
      const collectionResponse = await res.json();
      setCollection(collectionResponse.data);
      updateColletionDisplay(collectionResponse.data);
    }
    retrieveData();
  }, [updateColletionDisplay]);
  return (
    <>
      <h1 className="text-3xl font-bold ">{collectionDisplay?.info.name}</h1>
      <hr className="my-6 border-slate-400" />
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: HeadingRenderer,
          h2: HeadingRenderer,
          h3: HeadingRenderer,
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                {...props}
                style={style}
                language={match[1]}
                PreTag="div"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            );
          }
        }}
        className="prose prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg"
      >
        {collectionDisplay?.info.description}
      </ReactMarkdown>
      <div className="prose prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg">
        <PostmanInterpreter items={collectionDisplay?.item ?? []} />
      </div>
    </>
  );
}

export { CollectionViewer as default };
