import { DokuNextMarkdown } from '@/components/DokuNextMarkdown/DokuNextMarkdown';
import { isArrayEmpty } from '@/helpers/functions';
import { useTocDropdownStore } from '@/store/store';
import {
  FaChevronDown as DownIcon,
  FaChevronUp as UpIcon
} from 'react-icons/fa';
import { shallow } from 'zustand/shallow';
import { Item } from '../PostmanInterpreter.types';
import { TableItemParser } from './TableItemParser';
interface FolderParserProps {
  index: number;
  level: number;
  item: Item;
  renderItems(items: Item[], level?: number): any[];
}

function FolderParser({ item, index, level, renderItems }: FolderParserProps) {
  const { dropdown, toggleDropdown } = useTocDropdownStore(
    (state) => ({
      dropdown: state.folders,
      toggleDropdown: state.toggleVerbose
    }),
    shallow
  );
  const id = `${level}_${index}_${encodeURIComponent(
    item.name.replaceAll('/', '_').replaceAll(/\s/gm, '_')
  )}`;
  return (
    <div className="pl-2 border-l">
      <button
        className={`flex items-center justify-between gap-2 w-full rounded hover:bg-slate-200/70 px-1 ${
          !dropdown[`#${id}`]?.verbose && 'text-neutral-500'
        }`}
        onClick={() => toggleDropdown(`#${id}`)}
      >
        <h3
          className={`text-left text-base ${
            !dropdown[`#${id}`]?.verbose && 'text-neutral-500'
          }`}
          id={id}
        >
          📁 {item.name}
        </h3>
        {dropdown[`#${id}`]?.verbose ? <UpIcon /> : <DownIcon />}
      </button>

      {dropdown[`#${id}`]?.verbose && (
        <>
          <DokuNextMarkdown>{item.description ?? ''}</DokuNextMarkdown>
          {!isArrayEmpty(item.auth) && (
            <TableItemParser
              title="🔓 Authorization"
              item={item.auth}
              message="This authorization header will be used for this folder unless its overidden."
            />
          )}
          <div>{item.item && renderItems(item.item, level + 1)}</div>
        </>
      )}
    </div>
  );
}

export { FolderParser };
