import { ReactNode } from 'react';
import { TableContext } from './TableContext';

export function TableProvider({ children }: { children: ReactNode }) {
  return (
    <TableContext.Provider value={{ cellMap: new Map() }}>
      {children}
    </TableContext.Provider>
  );
}
