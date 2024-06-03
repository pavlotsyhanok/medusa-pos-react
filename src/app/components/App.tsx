import React from 'react';
import CustomerOnboardingPage from './CustomerOnboardingPage';
import HomePage from './HomePage';
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/cusomer-onboarding' element={<CustomerOnboardingPage />} />
    </Routes>)
}

export default App
