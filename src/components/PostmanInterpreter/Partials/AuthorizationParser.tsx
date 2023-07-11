import React from 'react';

interface AuthParserProps {
  auth: any;
  message: string;
}

function AuthorizationParser({ auth, message }: AuthParserProps) {
  return (
    <>
      <h4>
        🔓 Authorization{' '}
        <span className="ml-2 font-mono text-sm font-normal text-neutral-500">
          {auth.type}
        </span>
      </h4>
      <p className="mb-2">{message}</p>
      <table className="table mt-0 text-sm border border-slate-700">
        <tbody>
          {(
            auth[auth.type] as {
              key: string;
              value: string;
            }[]
          ).map((authItem, index) => (
            <tr key={index}>
              <td className="p-2 font-semibold border border-slate-700">
                {authItem.key}
              </td>
              <td className="p-2 border border-slate-700">{authItem.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export { AuthorizationParser };
