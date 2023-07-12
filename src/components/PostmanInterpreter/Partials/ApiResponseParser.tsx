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
            [{response.code}] {response.name}
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
      <div className="p-1 overflow-auto border">
        {selectedResponse?.originalRequest?.url?.raw && (
          <DokuNextMarkdown>
            {generateCurlCommand(selectedResponse.originalRequest)}
          </DokuNextMarkdown>
        )}
      </div>
      {/* {selectedResponse &&
            selectedResponse.name === response[0].name && (
              <div>
                <h5>{selectedResponse.name}</h5>
                <pre>{JSON.stringify(selectedResponse, null, 2)}</pre>
              </div>
            )} */}
    </div>
  );
}

export { ApiResponseParser };
