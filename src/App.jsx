import { useEffect, useState } from 'react';
import { fetchSheetData } from './services/fetchSheet';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSheetData()
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch sheet data', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">UDA Participant Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <pre className="bg-gray-800 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;
