import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="text-center my-10">
    <h1 className='py-20 whitespace-nowrap text-5xl font-bold text-purple-600 font-sans' >404 - Not Found</h1>
    <Link className='py-20 whitespace-nowrap text-xl font-medium text-gray-900' to="/">Go Home</Link>
  </div>
);

export default NotFound;