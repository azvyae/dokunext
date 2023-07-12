import { ChangeEvent, useState } from 'react';
import { ApiResponse } from '../PostmanInterpreter.types';
import { DokuNextMarkdown } from '@/components/DokuNextMarkdown/DokuNextMarkdown';

interface ApiResponseParser {
  response: ApiResponse[];
}

function ApiResponseParser({ response }: ApiResponseParser) {
  const [selectedResponse, setSelectedResponse] = useState<
    ApiResponse | undefined
  >();

  function handleApiResponseChange(event: ChangeEvent<HTMLSelectElement>) {
    const selectedResponseVal = parseInt(event.target.value);
    setSelectedResponse(response[selectedResponseVal]);
  }
  function renderApiResponses(responses: ApiResponse[]) {
    return (
      <select
        className="border rounded border-slate-500"
        onChange={handleApiResponseChange}
      >
        <option value="">Select an example</option>
        {responses.map((response, index) => (
          <option key={index + 1} value={index + 1}>
            {response.name}
          </option>
        ))}
      </select>
    );
  }
  return (
    <div>
      <div className="grid items-center grid-cols-2">
        <h4>🟪 Example</h4>
        {renderApiResponses(response)}
      </div>
      <div className="overflow-auto border">
        {selectedResponse?.originalRequest?.url?.raw && (
          <DokuNextMarkdown>{`\`\`\`url\n${
            selectedResponse?.originalRequest?.url?.raw ?? '[no url provided]'
          }\n\`\`\``}</DokuNextMarkdown>
        )}
        {JSON.stringify(selectedResponse)}
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
