const API_BASE_URL = '/api'; // Replace with your actual API base URL

export async function getDatabases(dbmsName: string) {
  const response = await fetch(`${API_BASE_URL}/show_databases?dbms_name=${dbmsName}`);
  return response.json();
}

export async function getTables(dbName: string) {
  const response = await fetch(`${API_BASE_URL}/show_table?db_name=${dbName}`);
  return response.json();
}

export async function getTableData(tableName: string) {
  const response = await fetch(`${API_BASE_URL}/get_table?table_name=${tableName}`);
  return response.json();
}

export async function searchTables(searchQuery: string, filters: Array<{col_name: string, value: string}>) {
  const response = await fetch(`${API_BASE_URL}/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      table_name: {
        value: searchQuery,
        filters: filters
      }
    }),
  });
  return response.json();
}

export async function getRelations(dbName: string) {
  const response = await fetch(`${API_BASE_URL}/relations?db_name=${dbName}`);
  return response.json();
}

