import React, { useCallback, useState } from 'react'

const Memoize = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState([]);  // Initialize as empty array
  
  const handleSearch = useCallback(() => {
    console.log(`search for ${searchTerm}`);
    const fetchResult = ['result1', 'result2'].filter((item) => 
      item.includes(searchTerm)
    );
    setResult(fetchResult);
  }, [searchTerm]);
  
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Enter search term...'
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        <ul>
          {result.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleSearch}>Refresh</button>
    </div>
  );
}

export default Memoize