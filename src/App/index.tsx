import { useEffect } from 'react';
import socket from './socket';

const App = () => {
  useEffect(() => {
    socket();
  }, []);

  return <div>Hello Socket</div>;
};

export default App;
