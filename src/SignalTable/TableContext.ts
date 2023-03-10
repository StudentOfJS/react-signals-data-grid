import { createContext } from 'react';

export const TableContext = createContext<{
  cellMap: Map<string, any>;
}>({
  cellMap: new Map(),
});
