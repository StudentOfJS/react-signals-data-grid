import { ChangeEvent, useCallback, useState } from 'react';

const reader = new FileReader();

type CommonDelimiterType = ',' | ';' | '\t' | '|' | '  ';
interface UseCSVType {
  headers?: Array<string>;
  delimiter?: CommonDelimiterType;
}

export const useCsvUpload = (props: UseCSVType | null) => {
  const [del, setDel] = useState(props?.delimiter ?? ',');
  const [columnDefs, setColumnDefs] = useState<Array<{ field: string }>>();
  const [rowData, setRowData] =
    useState<Array<Record<string, string | number | boolean | null>>>();
  const newLineRegex = /(\n|\r)+/g;
  const csvFileToArray = useCallback(
    (str: string) => {
      let splitByLine = str
        .split(newLineRegex)
        .filter((x) => !x.match(newLineRegex))
        .map((str) => replaceCommas(str));
      if (props?.headers && !props?.delimiter) {
        let d = findDelimiter(props?.headers.length, splitByLine[0]);
        d && setDel(d);
      }
      if (!props?.headers && !props?.delimiter) {
        let d = findDelimeterWithoutHeaderLength(splitByLine.slice(0, 3));
        d && setDel(d);
      }
      const csvHeader = props?.headers ?? splitByLine[0].split(del);
      setColumnDefs(csvHeader.map((field) => ({ field })));
      const csvRows = splitByLine.slice(props?.headers ? 0 : 1).map((row) => {
        let values = row.split(del).map((val, i) => [csvHeader[i], val]);
        return Object.fromEntries(values);
      });
      setRowData(csvRows);
    },
    [props?.headers, props?.delimiter]
  );
  function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    let files = e.target?.files;
    if (files?.length) {
      let file = files[0];
      reader.onload = function (event) {
        const text = event.target?.result;
        text && csvFileToArray(text.toString());
      };
      reader.readAsText(file);
    }
  }
  return { rowData, columnDefs, isReady: rowData && columnDefs, handleUpload };
};

function findDelimiter(
  headerLength: number,
  firstRow: string
): CommonDelimiterType | void {
  [',', '|', ';', '\t', '  '].forEach((delimiter) => {
    if (firstRow.split(delimiter).length === headerLength) {
      return delimiter;
    }
  });
}

function findDelimeterWithoutHeaderLength(
  firstThreeRows: Array<string>
): CommonDelimiterType | void {
  const getLength = (str: string) => (del: CommonDelimiterType) => {
    return str.split(del).length;
  };
  let common: Array<CommonDelimiterType> = [',', '|', ';', '\t', '  '];
  let [first, second, third] = firstThreeRows;
  let firstLen = getLength(first);
  let secondLen = getLength(second);
  let thirdLen = getLength(third);
  for (let i = 0; i < common.length; i++) {
    if (
      firstLen(common[i]) === secondLen(common[i]) &&
      secondLen(common[i]) === thirdLen(common[i])
    ) {
      i === common.length;
      return common[i];
    }
  }
}
function replaceCommas(str: string): string {
  const regex = /((".[^"]?)(?:,)(.*?"))/gm;
  let match = str.match(regex);
  if (match) {
    let array = [...(str.match(regex) as RegExpMatchArray)];
    return str.replace(array[0], array[0].replaceAll(/(,|")/g, ''));
  }
  return str;
}
