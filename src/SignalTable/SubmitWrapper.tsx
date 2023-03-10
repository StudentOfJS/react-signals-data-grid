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
    let values: Array<Record<string, string | number | boolean | null>> = [
      ...cellMap.entries(),
    ]
      .map(([key, value]) => {
        let [rowId, name] = key.split('|');
        let row = rowData.find((r) => String(r[foreignKey]) === rowId);
        if (row) {
          row[name] = value;
        }
        return row;
      })
      .filter((r) => r !== undefined);
    handleSubmit && handleSubmit(values);
  };
  if (!handleSubmit) return <>{children}</>;
  return (
    <form className="flex flex-col" onSubmit={submitHandler}>
      {children}
    </form>
  );
}
