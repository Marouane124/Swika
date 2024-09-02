"use client";

import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import './MultiStepForm.css';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    country: '',
  });

  const steps = [
    <Step1 formData={formData} setFormData={setFormData} />,
    <Step2 formData={formData} setFormData={setFormData} />,
    <Step3 formData={formData} setFormData={setFormData} />,
    <Step4 formData={formData} setFormData={setFormData} />,
    <Step5 formData={formData} setFormData={setFormData} />,
  ];

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="form-container">
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${(currentStep + 1) * (100 / steps.length)}%` }}
        />
      </div>
      <form onSubmit={handleSubmit}>
        {steps[currentStep]}
        <div className="button-container">
          {currentStep > 0 && (
            <button type="button" onClick={prevStep}>
              Précédent
            </button>
          )}
          {currentStep < steps.length - 1 && (
            <button type="button" onClick={nextStep}>
              Suivant
            </button>
          )}
          {currentStep === steps.length - 1 && <button type="submit">Soumettre</button>}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
