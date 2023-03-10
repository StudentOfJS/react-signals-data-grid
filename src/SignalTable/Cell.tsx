import { useSignal, useSignalEffect } from '@preact/signals-react';
import { useContext, useRef } from 'react';
import { TableContext } from './TableContext';

export function Cell({
  cellValue,
  name,
  rowId,
}: {
  cellValue: string;
  name: string;
  rowId: string;
}) {
  const cv = useSignal(cellValue);
  const ref = useRef<HTMLInputElement>(null);
  const { cellMap } = useContext(TableContext);
  useSignalEffect(() => {
    if (!ref.current) return;
    cellMap.delete(`${rowId}|${name}`);
    if (cv.value === '') {
      ref.current.style.backgroundColor = 'crimson';
      ref.current.style.color = 'white';
    } else if (cv.value !== cellValue) {
      ref.current.style.backgroundColor = 'green';
      ref.current.style.color = 'white';
      cellMap.set(`${rowId}|${name}`, cv.value);
    } else {
      ref.current.style.backgroundColor = 'white';
      ref.current.style.color = 'black';
    }
  });
  return (
    <td>
      <input
        className={`text-sm font-light px-6 py-4 whitespace-nowrap text-center`}
        type="text"
        name={name}
        defaultValue={cellValue}
        onChange={(e) => {
          cv.value = e.target.value;
        }}
        ref={ref}
      />
    </td>
  );
}
