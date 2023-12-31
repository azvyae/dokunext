import { DokuNextMarkdown } from '@/components/DokuNextMarkdown/DokuNextMarkdown';
import { getMethodColor } from '@/components/TocItems/RequestLink';
import { isArrayEmpty } from '@/helpers/functions';
import { HTTP_METHOD } from 'next/dist/server/web/http';
import { useState } from 'react';
import { ApiRequest, ApiResponse } from '../PostmanInterpreter.types';
import { ApiRequestParser } from './ApiRequestParser';
import { ApiResponseParser } from './ApiResponseParser';
import { TableItemParser } from './TableItemParser';
import {
  FaChevronDown as DownIcon,
  FaChevronUp as UpIcon
} from 'react-icons/fa';

interface PostmanItemParserProps {
  id: string;
  name: string;
  request: ApiRequest;
  response: ApiResponse[];
}

function PostmanItemParser({
  id,
  name,
  request,
  response
}: PostmanItemParserProps) {
  const [verbose, setVerbose] = useState(false);

  return (
    <div key={id}>
      <button
        className={`flex items-center justify-between w-full gap-2 rounded hover:bg-slate-200/70 px-1 ${
          !verbose && 'text-neutral-500'
        }`}
        onClick={() => setVerbose((v) => !v)}
      >
        <h3 id={id} className="flex items-center text-base text-left">
          <span
            className={`${getMethodColor(
              request?.method as HTTP_METHOD,
              true
            )} mr-2 rounded p-1 text-base flex-shrink h-fit w-fit`}
          >
            {request?.method}
          </span>{' '}
          <span className={`${!verbose && 'text-neutral-500'}`}>{name}</span>
        </h3>
        {verbose ? <UpIcon /> : <DownIcon />}
      </button>
      {verbose && (
        <>
          {request?.url?.raw && (
            <DokuNextMarkdown>{`\`\`\`url\n${
              request.url.raw ?? '[no url provided]'
            }\n\`\`\``}</DokuNextMarkdown>
          )}
          <DokuNextMarkdown>{request.description ?? ''}</DokuNextMarkdown>
          {!isArrayEmpty(request.auth) && (
            <TableItemParser
              title="🔓 Authorization"
              item={request.auth}
              message="This authorization header only used for this request."
            />
          )}
          {!isArrayEmpty(request.header) && (
            <>
              <TableItemParser
                title="✍🏼 Request Header"
                item={{ type: 'header', header: request.header }}
              />
            </>
          )}

         {!isArrayEmpty(request.url?.variable) && (
            <TableItemParser
              title="❓ Path Variables"
              item={{ type: 'path_vars', path_vars: request.url.variable }}
            />
          )}

          {!isArrayEmpty(request.url?.query) && (
            <TableItemParser
              title="🔍 Query Parameters"
              item={{ type: 'query_params', query_params: request.url.query }}
            />
          )}
          {request.body && <ApiRequestParser body={request.body} />}
          {!isArrayEmpty(response) && <ApiResponseParser response={response} />}
        </>
      )}
    </div>
  );
}

export { PostmanItemParser };
