import { useRef } from 'react';
import { Table } from './SignalTable/Table';
import { TableProvider } from './SignalTable/TableProvider';
import { useCsvUpload } from './useCsvUpload';

function TailwindTable() {
  const { rowData, columnDefs, isReady, handleUpload } = useCsvUpload({});
  const formRef = useRef<HTMLFormElement>(null);
  const formRegister = new Set<string>();
  const formValueMap = new Map();
  const register = (name: string) => {
    formRegister.add(name);
  };
  return (
    <section>
      <h2 className="text-2xl">Upload CSV for basic tailwind table</h2>
      <h3 className="text-l">
        * must include a header in this example and use any common delimiter
      </h3>
      <div className="card">
        .
        <input type="file" onChange={handleUpload} />
      </div>
      {isReady && rowData && columnDefs ? (
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <Table
                  rowData={rowData.map((d, i) => ({ ...d, foreignKey: i }))}
                  columnDefs={columnDefs}
                  foreignKey={'foreignKey'}
                  handleSubmit={(data) => {
                    console.log(data);
                  }}
                  renderButton={() => <button type="submit">Save</button>}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default TailwindTable;
