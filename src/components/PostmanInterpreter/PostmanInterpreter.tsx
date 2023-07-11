'use client';
import { HTTP_METHOD } from 'next/dist/server/web/http';
import React, { useState } from 'react';
import { DokuNextMarkdown } from '../Markdown/Markdown';
import { getMethodColor } from '../TocItems/RequestLink';

interface Request {
  method: string;
  header: Header[];
  url: Url;
  body?: any;
  description?: string;
  auth?: any;
}

interface Response {
  name: string;
  originalRequest: Request;
  status: string;
  code: number;
  _postman_previewlanguage?: string | null;
  header?: Header[] | null;
  cookie: any[];
  body: string;
}

interface Header {
  key: string;
  value: string;
  name?: string;
  description?: string | { content: string; type: string };
}

interface Url {
  raw: string;
  protocol?: string;
  host?: string[];
  path?: string[];
  query?: QueryParameter[];
}

interface QueryParameter {
  key: string;
  value: string;
}

interface Item {
  name: string;
  item?: Item[];
  event?: Event[];
  request?: Request;
  response?: Response[];
  description?: string;
  auth?: any;
}

interface Example {
  name: string;
  request: Request;
}

interface PostmanInterpreterProps {
  items: Item[];
}

function PostmanInterpreter({ items }: PostmanInterpreterProps) {
  const [selectedResponse, setSelectedResponse] = useState<
    Response | undefined
  >(undefined);

  const handleResponseChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedResponseName = event.target.value;
    setSelectedResponse(
      items
        .flatMap((item) => item.response || [])
        .find((response) => response.name === selectedResponseName)
    );
  };

  function renderItems(items: Item[], level: number = 0) {
    return items.map((item, index) => {
      if (item.item) {
        return (
          <div key={item.name}>
            <h3
              id={`${level}_${index}_${encodeURIComponent(
                item.name.replaceAll('/', '_').replaceAll(/\s/gm, '_')
              )}`}
            >
              📁 {item.name}
            </h3>
            <DokuNextMarkdown>{item.description ?? ''}</DokuNextMarkdown>
            {item.auth && (
              <>
                <h4>
                  🔓 Authorization{' '}
                  <span className="ml-2 font-mono text-sm font-normal text-neutral-500">
                    {item.auth.type}
                  </span>
                </h4>
                <p>
                  This authorization header will be used for this folder unless
                  its overidden.
                </p>
                <table className="table text-sm border border-slate-700">
                  {(
                    item.auth[item.auth.type] as {
                      key: string;
                      value: string;
                    }[]
                  ).map((authItem, index) => (
                    <tr key={index}>
                      <td className="p-2 font-semibold border border-slate-700">
                        {authItem.key}
                      </td>
                      <td className="p-2 border border-slate-700">
                        {authItem.value}
                      </td>
                    </tr>
                  ))}
                </table>
              </>
            )}
            {item.item && renderItems(item.item, level + 1)}
          </div>
        );
      } else if (item.request && item.response) {
        const url = `\`\`\`url\n${
          item.request?.url?.raw ?? '[empty value]'
        }\n\`\`\``;
        return (
          <div key={item.name}>
            <h3
              id={`${level}_${index}_${encodeURIComponent(
                item.name.replaceAll('/', '_').replaceAll(/\s/gm, '_')
              )}`}
            >
              <span
                className={`${getMethodColor(
                  item.request?.method as HTTP_METHOD,
                  true
                )} mr-2 rounded p-1 text-base`}
              >
                {item.request?.method}
              </span>{' '}
              {item.name}
            </h3>
            <DokuNextMarkdown>{url}</DokuNextMarkdown>
            <DokuNextMarkdown>
              {item.request.description ?? ''}
            </DokuNextMarkdown>
            {item.request.auth && (
              <>
                <h4>
                  🔓 Authorization{' '}
                  <span className="ml-2 font-mono text-sm font-normal text-neutral-500">
                    {item.request.auth.type}
                  </span>
                </h4>
                <p>This authorization header only used for this request.</p>
                <table className="table text-sm border border-slate-700">
                  {(
                    item.request.auth[item.request.auth.type] as {
                      key: string;
                      value: string;
                    }[]
                  ).map((authItem, index) => (
                    <tr key={index}>
                      <td className="p-2 font-semibold border border-slate-700">
                        {authItem.key}
                      </td>
                      <td className="p-2 border border-slate-700">
                        {authItem.value}
                      </td>
                    </tr>
                  ))}
                </table>
              </>
            )}
            {item.request.body && typeof item.request.body === 'string' ? (
              <DokuNextMarkdown>{item.request.body}</DokuNextMarkdown>
            ) : (
              <>
                {/* <h4>
                  🔓 Authorization{' '}
                  <span className="ml-2 font-mono text-sm font-normal text-neutral-500">
                    {item.request.auth.type}
                  </span>
                </h4>
                <p>This authorization header only used for this request.</p>
                <table className="table text-sm border border-slate-700">
                  {(
                    item.request.auth[item.request.auth.type] as {
                      key: string;
                      value: string;
                    }[]
                  ).map((authItem, index) => (
                    <tr key={index}>
                      <td className="p-2 font-semibold border border-slate-700">
                        {authItem.key}
                      </td>
                      <td className="p-2 border border-slate-700">
                        {authItem.value}
                      </td>
                    </tr>
                  ))}
                </table> */}
              </>
            )}
            <pre>{JSON.stringify(item.request, null, 2)}</pre>
            {item.response && (
              <div>
                <h4>Responses:</h4>
                {renderResponseDropdown(item.response)}
                {selectedResponse &&
                  selectedResponse.name === item.response[0].name && (
                    <div>
                      <h5>{selectedResponse.name}</h5>
                      <pre>{JSON.stringify(selectedResponse, null, 2)}</pre>
                    </div>
                  )}
              </div>
            )}
          </div>
        );
      }
    });
  }

  const renderResponseDropdown = (responses: Response[]) => {
    return (
      <select onChange={handleResponseChange}>
        <option value="">Select a response</option>
        {responses.map((response) => (
          <option key={response.name} value={response.name}>
            {response.name}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div>
      <div>{renderItems(items)}</div>
    </div>
  );
}

export { PostmanInterpreter };
