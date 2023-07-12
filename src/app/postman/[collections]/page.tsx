'use client';

import { PostmanInterpreter } from '@/components';
import { DokuNextMarkdown } from '@/components/DokuNextMarkdown/DokuNextMarkdown';
import { TableItemParser } from '@/components/PostmanInterpreter/Partials/TableItemParser';
import { TableItem } from '@/components/PostmanInterpreter/PostmanInterpreter.types';
import { isArrayEmpty } from '@/helpers/functions';
import {
  useEnvironmentStore,
  useSidebarStore,
  useTocStore
} from '@/store/store';
import { Toc } from '@/store/types';
import { HTTP_METHOD } from 'next/dist/server/web/http';
import { useCallback, useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

interface EssentialPostmanAPIResponse {
  info: string;
  item: string;
  auth?: any;
  variable: any[];
}

interface PostmanItemsApi {
  name: string;
  item?: PostmanItemsApi[];
  request?: {
    method: HTTP_METHOD;
  };
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
      function mapItem(items: PostmanItemsApi[], level: number = 0): any {
        return items.map((item, index) => {
          // is folder
          if (item.item) {
            return {
              name: item.name,
              url: `#${level}_${index}_${encodeURIComponent(
                item.name.replaceAll('/', '_').replaceAll(/\s/gm, '_')
              )}`,
              items: mapItem(item.item, level + 1)
            };
          }
          // is request
          return {
            name: item.name,
            url: `#${level}_${index}_${encodeURIComponent(
              item.name.replaceAll('/', '_').replaceAll(/\s/gm, '_')
            )}`,
            method: item.request?.method
          };
        });
      }

      const toc: Toc[] = [];
      const regex = /^# .*/gm;
      toc.push(
        ...[...info.description.matchAll(regex)].map((item) => {
          const target = item[0];
          return {
            name: target.replace('# ', ''),
            url: target.toLowerCase().replace('# ', '#')
          };
        }),
        ...mapItem(items)
      );
      setToc(toc);
    },
    [setToc]
  );

  const updateColletionDisplay = useCallback(
    (collection: EssentialPostmanAPIResponse) => {
      if (!collection) {
        return;
      }
      let info = collection.info;
      let item = collection.item;
      let auth = collection.auth;
      collection.variable.forEach((variable) => {
        let infoText = info.replaceAll(`{{${variable.key}}}`, variable.value);
        environments[parseInt(activeEnv) - 1]?.values.forEach((variable) => {
          infoText =
            variable.type === 'secret'
              ? infoText.replaceAll(`{{${variable.key}}}`, '***')
              : infoText.replaceAll(`{{${variable.key}}}`, variable.value);
        });
        info = JSON.parse(infoText);

        let itemText = item.replaceAll(`{{${variable.key}}}`, variable.value);
        environments[parseInt(activeEnv) - 1]?.values.forEach((variable) => {
          itemText =
            variable.type === 'secret'
              ? itemText.replaceAll(`{{${variable.key}}}`, '***')
              : itemText.replaceAll(`{{${variable.key}}}`, variable.value);
        });
        item = JSON.parse(itemText);

        if (auth) {
          let authText = auth.replaceAll(`{{${variable.key}}}`, variable.value);
          environments[parseInt(activeEnv) - 1]?.values.forEach((variable) => {
            authText =
              variable.type === 'secret'
                ? authText.replaceAll(`{{${variable.key}}}`, '***')
                : authText.replaceAll(`{{${variable.key}}}`, variable.value);
          });
          auth = JSON.parse(authText);
        }
      });

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
          <hr className="my-6 border-slate-400" />
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
