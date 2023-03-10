import { ReactNode, useContext } from 'react';
import { TableContext } from '../SignalTable/TableContext';

interface SubmitProps {
  children: ReactNode;
  foreignKey: string;
  rowData: Array<Record<string, string | number | boolean | null>>;
  handleSubmit?: (
    data: Array<Record<string, string | number | boolean | null | undefined>>
  ) => void;
}

export function SubmitWrapper({
  foreignKey,
  rowData,
  children,
  handleSubmit,
}: SubmitProps) {
  const { cellMap } = useContext(TableContext);
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    rowData;
    let entries = cellMap.entries();
    if (entries) {
      let values: Array<
        Record<string, string | number | boolean | null> | undefined
      > = [...entries].map(([key, value]) => {
        let [rowId, name] = key.split('|');
        let row = rowData.find((r) => String(r[foreignKey]) === rowId);
        if (row) {
          row[name] = value;
        }
        return row;
      });
      let valuesFiltered = values.filter((r) => !!r) as Array<
        Record<string, string | number | boolean | null>
      >;
      handleSubmit && handleSubmit(valuesFiltered);
    }
  };

  if (!handleSubmit) return <>{children}</>;
  return (
    <form className="flex flex-col" onSubmit={submitHandler}>
      {children}
    </form>
  );
}
