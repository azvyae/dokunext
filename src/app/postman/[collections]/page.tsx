'use client';

import { PostmanInterpreter } from '@/components';
import { DokuNextMarkdown } from '@/components/DokuNextMarkdown/DokuNextMarkdown';
import { TableItemParser } from '@/components/PostmanInterpreter/Partials/TableItemParser';
import { TableItem } from '@/components/PostmanInterpreter/PostmanInterpreter.types';
import { isArrayEmpty } from '@/helpers/functions';
import { useEnvironmentStore, useSidebarStore, useTocStore } from '@/store/store';
import { Toc } from '@/store/types';
import { useCallback, useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { EssentialPostmanAPIResponse } from '@/app/postman/[collections]/types';
import { extractData, getCollection, mapItem } from '@/app/postman/[collections]/service';

function CollectionViewer() {
  const setToc = useTocStore((state) => state.setToc);
  const [loading, setLoading] = useState(true);
  const closeSidebar = useSidebarStore((state) => state.setSidebarState);

  const [collectionDisplay, setCollectionDisplay] = useState<{
    info: any;
    item: any;
    auth?: TableItem[];
  }>();
  const { activeEnv, environments } = useEnvironmentStore(
    (state) => ({
      activeEnv: state.active,
      environments: state.environments
    }),
    shallow
  );

  const updateCollectionToc = useCallback(
    (info: any, items: any) => {
      const toc: Toc[] = [];
      const regex = /^# .*/gm;
      if (info.description) {
        toc.push(
          ...[...info.description.matchAll(regex)].map((item) => {
            const target = item[0];
            return {
              name: target.replace('# ', ''),
              url: target.toLowerCase().replace('# ', '#')
            };
          })
        );
      }
      toc.push(...mapItem(items));
      setToc(toc);
    },
    [setToc]
  );

  const updateColletionDisplay = useCallback(
    (collection: EssentialPostmanAPIResponse) => {
      if (!collection) {
        return;
      }
      const { info, item, auth } = extractData(collection, environments, activeEnv);
      setCollectionDisplay({
        info,
        item,
        auth
      });

      updateCollectionToc(info, item);
    },
    [activeEnv, environments, updateCollectionToc]
  );

  useEffect(() => {
    setLoading(true);
    setToc([]);
    closeSidebar(false);
    const collectionId = window.location.pathname.replace('/postman/', '');
    const token = window.localStorage.getItem('AUTH_TOKEN');
    async function retrieveData() {
      const res = await getCollection(token, collectionId);
      if (!res.ok) {
        return console.error(`HTTP Error: ${res.status}`);
      }
      const collectionResponse = await res.json();
      updateColletionDisplay(collectionResponse.data);
      setLoading(false);
    }
    retrieveData();
  }, [updateColletionDisplay, setToc, closeSidebar]);
  return (
    <>
      {loading && <p className="text-3xl">Loading...</p>}
      {!loading && (
        <div className="max-w-6xl prose prose-code:whitespace-pre-wrap md:prose-h3:text-xl prose-h3:text-lg prose-h4:text-base md:prose-h4:text-lg prose-headings:my-4 marker:text-orange-500 md:prose-h1:text-3xl prose-h1:text-2xl prose-h2:text-xl md:prose-h2:text-2xl">
          <h1 className="italic font-bold ">{collectionDisplay?.info.name}</h1>
          <DokuNextMarkdown>
            {collectionDisplay?.info.description}
          </DokuNextMarkdown>
          {!isArrayEmpty(collectionDisplay?.auth) && (
            <TableItemParser
              item={collectionDisplay?.auth}
              title="🔓 Authorization"
              message="This authorization header will used for this collection unless its
            overidden."
            />
          )}
          <hr className="my-6 border-slate-400/40" />

          <div>
            <PostmanInterpreter items={collectionDisplay?.item ?? []} />
          </div>
        </div>
      )}
    </>
  );
}

export { CollectionViewer as default };
