import React from 'react';
import './stylesheets/index.css';

import Converter from './components/converter';

function App() {
  return (
    <div className="App">
      <div className="max-w-4xl  m-auto">
        <Converter />
      </div>
    </div>
  );
}

export default App;
