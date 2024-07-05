import Papa from 'papaparse';

export const loadCSV = async (url) => {
  const response = await fetch(url);
  const reader = response.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder('utf-8');
  const csv = decoder.decode(result.value);
  const results = Papa.parse(csv, { header: true });
  return results.data;
};
