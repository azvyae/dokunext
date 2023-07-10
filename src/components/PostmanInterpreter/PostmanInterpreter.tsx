'use client';
import React, { useState } from 'react';

interface Request {
  method: string;
  header: Header[];
  body?: Body;
  url: Url;
  description?: string;
}

interface Response {
  name: string;
  originalRequest: Request;
  status: string;
  code: number;
  header: Header[];
  cookie: any[];
  body: string;
}

interface Item {
  name: string;
  item?: Item[];
  request?: Request;
  response?: Response[];
  description?: string;
}

interface Header {
  key: string;
  value: string;
  type: string;
  description?: string;
}

interface Body {
  mode: string;
  raw: string;
  options?: any;
}

interface Url {
  raw: string;
  host?: string[];
  path?: string[];
  protocol?: string;
  variable?: Variable[];
  query?: QueryParameter[];
}

interface Variable {
  key: string;
  value: string | null;
  description?: string;
}

interface QueryParameter {
  key: string;
  value: string;
  description?: string;
}

interface Example {
  name: string;
  request: Request;
}

const PostmanInterpreter: React.FC<{ items: Item[] }> = ({ items }) => {
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

  const renderItems = (items: Item[]) => {
    return items.map((item, index) => {
      if (item.request) {
        return (
          <div key={item.name}>
            <h3 id={`item-${index}`}>{item.name}</h3>
            <p>{item.description}</p>
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
      } else {
        return (
          <div key={item.name}>
            <h3 id={`item-${index}`}>{item.name}</h3>
            <p>{item.description}</p>
            {item.item && renderItems(item.item)}
          </div>
        );
      }
    });
  };

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

  const renderTableOfContents = (items: Item[]) => {
    return (
      <ul>
        {items.map((item, index) => (
          <li key={item.name}>
            <a href={`#item-${index}`}>{item.name}</a>
            {item.item && renderTableOfContents(item.item)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <div>{renderTableOfContents(items)}</div>
      <div>{renderItems(items)}</div>
    </div>
  );
};

export { PostmanInterpreter };
