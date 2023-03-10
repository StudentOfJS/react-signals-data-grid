export function Cols({ columnDefs }: { columnDefs: Array<{ field: string }> }) {
  return (
    <thead className="bg-white border-b">
      <tr>
        {columnDefs.map(({ field }) => (
          <th
            className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
            scope="col"
            key={field}
          >
            {field}
          </th>
        ))}
      </tr>
    </thead>
  );
}
