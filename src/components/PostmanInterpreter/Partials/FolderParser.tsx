import { DokuNextMarkdown } from '@/components/Markdown/Markdown';
import { Item } from '../PostmanInterpreter.types';
import { TableItemParser } from './TableItemParser';

interface FolderParserProps {
  index: number;
  level: number;
  item: Item;
  renderItems(items: Item[], level?: number): any[];
}

function FolderParser({ item, index, level, renderItems }: FolderParserProps) {
  return (
    <>
      <div>
        <h3
          id={`${level}_${index}_${encodeURIComponent(
            item.name.replaceAll('/', '_').replaceAll(/\s/gm, '_')
          )}`}
        >
          📁 {item.name}
        </h3>
        <DokuNextMarkdown>{item.description ?? ''}</DokuNextMarkdown>
        {item.auth && (
          <TableItemParser
            title="🔓 Authorization"
            item={item.auth}
            message="This authorization header will be used for this folder unless its overidden."
          />
        )}
        {item.item && renderItems(item.item, level + 1)}
      </div>
    </>
  );
}

export { FolderParser };
