'use client';
import { useState } from 'react';
import { FolderParser } from './Partials/FolderParser';
import { PostmanItemParser } from './Partials/PostmanItemParser';
import { Item, ApiRequest } from './PostmanInterpreter.types';

interface Example {
  name: string;
  request: ApiRequest;
}

interface PostmanInterpreterProps {
  items: Item[];
}

function PostmanInterpreter({ items }: PostmanInterpreterProps) {
  function renderItems(items: Item[], level: number = 0) {
    return items.map((item, index) => {
      if (item.item) {
        return (
          <div key={item.name} className={`pr-4 ${level > 0 && 'ml-2'}`}>
            <FolderParser {...{ item, index, renderItems, level }} />
            {level === 0 && <hr className="border-slate-400/40" />}
          </div>
        );
      } else if (item.request && item.response) {
        const id = `${level}_${index}_${encodeURIComponent(
          item.name.replaceAll('/', '_').replaceAll(/\s/gm, '_')
        )}`;
        return (
          <PostmanItemParser
            id={id}
            name={item.name}
            request={item.request}
            response={item.response}
            key={id}
          />
        );
      }
    });
  }

  return (
    <div>
      <div>{renderItems(items)}</div>
    </div>
  );
}

export { PostmanInterpreter };
