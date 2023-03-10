import { SubmitWrapper } from '../SignalTable/SubmitWrapper';
import { TableProvider } from '../SignalTable/TableProvider';
import { Cols } from './Cols';
import { Rows } from './Rows';

interface TableInterface {
  rowData: Array<Record<string, string | number | boolean | null>>;
  foreignKey: string;
  columnDefs: Array<{
    field: string;
    cellType?: 'text' | 'number' | 'date' | 'boolean' | 'email';
    isEditable?: boolean;
    validation?: {
      // zod schema???
    };
  }>;
  renderButton?: () => JSX.Element;
  handleSubmit?: (
    data: Array<Record<string, string | number | boolean | null | undefined>>
  ) => void;
}

export const Table: React.FC<TableInterface> = ({
  foreignKey,
  rowData,
  columnDefs,
  handleSubmit,
  renderButton,
}) => {
  return (
    <TableProvider>
      <SubmitWrapper
        foreignKey={foreignKey}
        rowData={rowData}
        handleSubmit={handleSubmit}
      >
        <table className="min-w-full">
          <Cols columnDefs={columnDefs} />
          <Rows rowData={rowData} foreignKey={foreignKey} />
        </table>
        {renderButton && renderButton()}
      </SubmitWrapper>
    </TableProvider>
  );
};
