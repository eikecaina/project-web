// import { saveAs } from 'file-saver';
import {saveAs} from 'file-saver'

export type Data = (string | number)[][];

export const exportToExcel = (filename: string) => {
  const data: Data = [
    ['Nome', 'Idade'],
    ['João', 30],
    ['Maria', 25],
    ['Pedro', 35]
  ];

  const blob = new Blob([formatToExcel(data)], { type: 'application/vnd.ms-excel' });
  saveAs(blob, filename);
};

const formatToExcel = (data: Data): string => {
  let content = '';
  data.forEach(row => {
    content += row.join('\t') + '\n';
  });
  return content;
};