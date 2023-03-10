import { Fragment } from 'react';
import { Row } from './Row';

export function Rows({
  foreignKey,
  rowData,
}: {
  foreignKey: string;
  rowData: Array<Record<string, string | number | boolean | null>>;
}) {
  let mapped = rowData.map((row) => {
    let uniqueId = row[foreignKey] as string;
    return (
      <Fragment key={`${uniqueId}`}>
        <Row
          row={
            Object.entries(row).filter((r) => r[0] !== foreignKey) as [
              string,
              string
            ][]
          }
          rowId={`${uniqueId}`}
        />
      </Fragment>
    );
  });
  return <tbody>{mapped}</tbody>;
}
