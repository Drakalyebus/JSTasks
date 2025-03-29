import './main.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/Square.jsx';
import Square from './components/Square.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <Square color="red"/>
        <Square color="green"/>
        <Square color="blue"/>
    </>,
);