import React from 'react';
import ClientList from './components/ClientList';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <ClientList />
        </div>
    );
};

export default App;