import React from 'react';

interface TableItemParserProps {
  item: any;
  title: string;
  message?: string;
}

function TableItemParser({ item, title, message }: TableItemParserProps) {
  const items =
    (item[item.type] as {
      key: string;
      value: string;
    }[]) ?? item;
  return (
    <>
      <h4>
        {title}{' '}
        <span className="ml-2 font-mono text-sm font-normal text-neutral-500">
          {item.type}
        </span>
      </h4>
      {message && <p className="mb-2">{message}</p>}
      <table className="table mt-0 text-sm border border-slate-700">
        <tbody>
          {items.map((i, index) => (
            <tr key={index}>
              <td className="p-2 font-semibold border border-slate-700">
                {i.key}
              </td>
              <td className="p-2 border border-slate-700">{i.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export { TableItemParser };
