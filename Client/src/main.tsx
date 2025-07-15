
import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter as Router} from "react-router-dom";

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <Router>
      <App />
    </Router>
  );
} else {
  console.error("Root element not found");
}