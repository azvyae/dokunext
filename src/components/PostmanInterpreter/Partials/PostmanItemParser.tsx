import { DokuNextMarkdown } from '@/components/DokuNextMarkdown/DokuNextMarkdown';
import { getMethodColor } from '@/components/TocItems/RequestLink';
import { HTTP_METHOD } from 'next/dist/server/web/http';
import { useState } from 'react';
import { RequestBody, ResponseBody } from '../PostmanInterpreter.types';
import { TableItemParser } from './TableItemParser';
import { BodyRequestParser } from './BodyRequestParser';

interface PostmanItemParserProps {
  id: string;
  name: string;
  request: RequestBody;
  response: ResponseBody[];
}

function PostmanItemParser({
  id,
  name,
  request,
  response
}: PostmanItemParserProps) {
  const [selectedResponse, setSelectedResponse] = useState<
    ResponseBody | undefined
  >(undefined);

  const handleResponseChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedResponseName = event.target.value;
    //  setSelectedResponse(
    //    items
    //      .flatMap((item) => item.response || [])
    //      .find((response) => response.name === selectedResponseName)
    //  );
  };

  const renderResponseDropdown = (responses: ResponseBody[]) => {
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

  const requestUrl = `\`\`\`url\n${
    request?.url?.raw ?? '[empty value]'
  }\n\`\`\``;
  return (
    <div key={id}>
      <h3 id={id}>
        <span
          className={`${getMethodColor(
            request?.method as HTTP_METHOD,
            true
          )} mr-2 rounded p-1 text-base`}
        >
          {request?.method}
        </span>{' '}
        {name}
      </h3>
      <DokuNextMarkdown>{requestUrl}</DokuNextMarkdown>
      <DokuNextMarkdown>{request.description ?? ''}</DokuNextMarkdown>
      {request.auth && (
        <TableItemParser
          title="🔓 Authorization"
          item={request.auth}
          message="This authorization header only used for this request."
        />
      )}
      {request.header && (
        <TableItemParser title="✍🏼 Request Header" item={request.header} />
      )}

      {request.url?.variable && (
        <TableItemParser
          title="❓ Path Variables"
          item={request.url.variable}
        />
      )}

      {request.url?.query && (
        <TableItemParser title="🔍 Query Parameters" item={request.url.query} />
      )}
      {request.body && <BodyRequestParser body={request.body} />}

      {/* {response && (
        <div>
          <h4>Responses:</h4>
          {renderResponseDropdown(response)}
          {selectedResponse &&
            selectedResponse.name === response[0].name && (
              <div>
                <h5>{selectedResponse.name}</h5>
                <pre>{JSON.stringify(selectedResponse, null, 2)}</pre>
              </div>
            )}
        </div>
      )} */}
    </div>
  );
}

export { PostmanItemParser };
