import { ChangeEvent, useState } from 'react';
import { ApiResponse } from '../PostmanInterpreter.types';
import { DokuNextMarkdown } from '@/components/DokuNextMarkdown/DokuNextMarkdown';
import { generateCurlCommand, isArrayEmpty } from '@/helpers/functions';
import { TableItemParser } from './TableItemParser';

interface ApiResponseParser {
  response: ApiResponse[];
}

function ApiResponseParser({ response }: ApiResponseParser) {
  const [selectedResponse, setSelectedResponse] = useState<
    ApiResponse | undefined
  >();

  const [viewResponse, setViewResponse] = useState<'body' | 'headers'>('body');

  function handleApiResponseChange(event: ChangeEvent<HTMLSelectElement>) {
    const selectedResponseVal = parseInt(event.target.value) - 1;
    setSelectedResponse(response[selectedResponseVal]);
  }
  function renderApiResponses(responses: ApiResponse[]) {
    return (
      <select
        className="py-1 font-mono border rounded border-slate-500"
        onChange={handleApiResponseChange}
      >
        <option value="">Select an example</option>
        {responses.map((response, index) => (
          <option key={index + 1} value={index + 1}>
            [{response.code ?? '-'}] {response.name}
          </option>
        ))}
      </select>
    );
  }
  return (
    <div>
      <div className="flex items-center">
        <h4 className="flex-grow">🟪 Example</h4>
        {renderApiResponses(response)}
      </div>
      {selectedResponse && (
        <div className="grid gap-4 p-1 overflow-auto border">
          <div>
            <b className="block">Request</b>
            {selectedResponse.originalRequest?.url?.raw && (
              <DokuNextMarkdown>
                {generateCurlCommand(selectedResponse.originalRequest)}
              </DokuNextMarkdown>
            )}
          </div>

          <div>
            <b className="flex justify-between w-full mb-2">
              <span>Response</span>
              <span className="p-1 text-xs border">
                {selectedResponse.code ?? '-'}{' '}
                {selectedResponse.status ?? 'No Status'}
              </span>
            </b>
            <div className="flex gap-2 ml-2">
              {selectedResponse?.body && (
                <button
                  onClick={() => setViewResponse('body')}
                  className={`px-2 py-1 rounded-t text-xs ${
                    viewResponse === 'body' ? 'bg-yellow-400' : 'bg-slate-400'
                  }`}
                >
                  Body
                </button>
              )}
              {selectedResponse?.header && (
                <button
                  onClick={() => setViewResponse('headers')}
                  className={`px-2 py-1 rounded-t text-xs ${
                    viewResponse === 'headers'
                      ? 'bg-yellow-400'
                      : 'bg-slate-400'
                  }`}
                >
                  Headers ({selectedResponse.header.length})
                </button>
              )}
            </div>
            {selectedResponse?.body && viewResponse === 'body' && (
              <DokuNextMarkdown>
                {`\`\`\`${
                  selectedResponse._postman_previewlanguage ?? 'json'
                }\n${selectedResponse.body}\n\`\`\``}
              </DokuNextMarkdown>
            )}
            {selectedResponse?.header && viewResponse === 'headers' && (
              <div className="pt-2">
                <TableItemParser item={selectedResponse.header} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export { ApiResponseParser };
