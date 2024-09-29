import React from 'react';
import {
  Link
} from "react-router-dom";
function Menu() {
  return (
    <div className="menu" aria-label="Main Navigation">
    <ul>
      
        <li><Link to="/" aria-label="Homepage">Homepage</Link></li>
        <li><Link to="about" aria-label="About us page">About</Link></li>
        <li><Link to="login" aria-label="Login page">Login</Link></li>
        
    </ul>
</div>
  );
}

export default Menu;
