import { DokuNextMarkdown } from '@/components/DokuNextMarkdown/DokuNextMarkdown';
import { BiCodeAlt } from 'react-icons/bi';

interface BodyProps {
  body: any;
}

function RawBodyParser({ body }: BodyProps) {
  return (
    <DokuNextMarkdown>
      {`\`\`\`${body.options?.raw.language ?? 'json'}\n${
        body[body.mode]
      }\n\`\`\``}
    </DokuNextMarkdown>
  );
}

function GraphqlBodyParser({ body }: BodyProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <p className="mb-0 font-semibold">Query:</p>
        <DokuNextMarkdown>
          {`\`\`\`graphql\n${body[body.mode].query}\n\`\`\``}
        </DokuNextMarkdown>
      </div>
      <div>
        <p className="mb-0 font-semibold">Variables:</p>
        <DokuNextMarkdown>
          {`\`\`\`json\n${body[body.mode].variables}\n\`\`\``}
        </DokuNextMarkdown>
      </div>
    </div>
  );
}

function FormBodyParser({ body }: BodyProps) {
  return (
    <table className="table text-sm border border-slate-700">
      <tbody>
        {(
          body[body.mode] as {
            key: string;
            value: string;
            description?: string;
          }[]
        ).map((bodyItem, index) => (
          <tr key={index}>
            <td className="p-2 font-semibold border border-slate-700">
              {bodyItem.key}
            </td>
            <td className="p-2 border border-slate-700">
              {bodyItem.value}
              <br />
              <span className="text-xs text-neutral-400">
                {bodyItem.description}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ApiRequestParser({ body }: BodyProps) {
  return (
    <>
      <h4>
        <BiCodeAlt className="inline text-red-600" size={24} /> Body{' '}
        <span className="ml-2 font-mono text-sm font-normal text-neutral-500">
          {body.mode}
          {body.mode === 'raw'
            ? ` (${body.options?.raw.language ?? 'json'})`
            : ''}
        </span>
      </h4>
      {body.mode === 'raw' ? (
        <RawBodyParser body={body} />
      ) : body.mode === 'graphql' ? (
        <GraphqlBodyParser body={body} />
      ) : (
        <FormBodyParser body={body} />
      )}
    </>
  );
}

export { ApiRequestParser };
