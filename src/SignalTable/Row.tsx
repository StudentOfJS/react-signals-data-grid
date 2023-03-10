import { Fragment } from 'react';
import { Cell } from './Cell';

export function Row({
  row,
  rowId,
}: {
  row: [string, string][];
  rowId: string;
}) {
  return (
    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
      {row?.map(([key, value]) => {
        let name = `${key}|${rowId}`;
        return (
          <Fragment key={name}>
            <Cell cellValue={value} name={key} rowId={rowId} />
          </Fragment>
        );
      })}
    </tr>
  );
}
