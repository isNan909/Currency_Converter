import React from 'react';
import './stylesheets/index.css';

import Converter from './components/converter';

function App() {
  return (
    <div>
      <div className="max-w-4xl  m-auto pb-6 pt-14">
        <Converter />
      </div>
    </div>
  );
}

export default App;
