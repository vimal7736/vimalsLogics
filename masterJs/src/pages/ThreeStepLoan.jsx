import { useState } from 'react';

export default function LoanApplication() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    loanAmount: '',
    loanTenure: '12',
    loanPurpose: '',
    documents: null
  });
  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.loanAmount) newErrors.loanAmount = 'Loan amount is required';
    else if (isNaN(formData.loanAmount) || formData.loanAmount <= 0) 
      newErrors.loanAmount = 'Please enter a valid amount';
    if (!formData.loanTenure) newErrors.loanTenure = 'Loan tenure is required';
    if (!formData.loanPurpose.trim()) newErrors.loanPurpose = 'Loan purpose is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.documents) newErrors.documents = 'Please upload required documents';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;
    
    if (step === 1) {
      isValid = validateStep1();
    } else if (step === 2) {
      isValid = validateStep2();
    } else if (step === 3) {
      isValid = validateStep3();
      if (isValid) {
        setShowSummary(true);
        return;
      }
    }
    
    if (isValid) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (showSummary) {
      setShowSummary(false);
      return;
    }
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      documents: e.target.files[0]
    });
  };

  const handleSubmit = () => {
    // In a real application, you would submit the data to a server here
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Application Submitted!</h2>
          <p className="mb-4">Thank you for your loan application. Your application has been received and is being processed.</p>
          <p className="text-gray-600">Reference ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
          <button 
            onClick={() => {
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
                loanAmount: '',
                loanTenure: '12',
                loanPurpose: '',
                documents: null
              });
              setStep(1);
              setSubmitted(false);
              setShowSummary(false);
            }}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Loan Application</h1>
      
      {/* Progress Indicator */}
      {!showSummary && (
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className={`flex-1 text-center ${step >= 1 ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
              Personal Info
            </div>
            <div className={`flex-1 text-center ${step >= 2 ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
              Loan Details
            </div>
            <div className={`flex-1 text-center ${step >= 3 ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
              Documents
            </div>
          </div>
          <div className="relative mt-2">
            <div className="h-2 bg-gray-200 rounded">
              <div 
                className="h-2 bg-blue-600 rounded" 
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1">
              <span className={`w-6 h-6 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-gray-300'} flex items-center justify-center text-white text-sm`}>1</span>
              <span className={`w-6 h-6 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'} flex items-center justify-center text-white text-sm`}>2</span>
              <span className={`w-6 h-6 rounded-full ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'} flex items-center justify-center text-white text-sm`}>3</span>
            </div>
          </div>
        </div>
      )}
      
      {showSummary ? (
        // Summary Page
        <div>
          <h2 className="text-xl font-semibold mb-4">Application Summary</h2>
          <div className="bg-gray-50 p-4 rounded mb-6">
            <h3 className="font-medium mb-2 text-blue-600">Personal Information</h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</div>
              <div><span className="font-medium">Email:</span> {formData.email}</div>
              <div><span className="font-medium">Phone:</span> {formData.phone}</div>
              <div className="col-span-2"><span className="font-medium">Address:</span> {formData.address}</div>
            </div>
            
            <h3 className="font-medium mb-2 text-blue-600">Loan Details</h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div><span className="font-medium">Amount:</span> {formatCurrency(formData.loanAmount)}</div>
              <div><span className="font-medium">Tenure:</span> {formData.loanTenure} months</div>
              <div className="col-span-2"><span className="font-medium">Purpose:</span> {formData.loanPurpose}</div>
            </div>
            
            <h3 className="font-medium mb-2 text-blue-600">Documents</h3>
            <div><span className="font-medium">Uploaded:</span> {formData.documents?.name || 'No file name available'}</div>
          </div>
          
          <div className="flex justify-between mt-6">
            <button 
              onClick={handlePrevious} 
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Back
            </button>
            <button 
              onClick={handleSubmit} 
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit Application
            </button>
          </div>
        </div>
      ) : (
        // Form Steps
        <div>
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 1: Personal Information</h2>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-4 py-2 border rounded ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                ></textarea>
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 2: Loan Details</h2>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Loan Amount ($)</label>
                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  min="1000"
                  step="100"
                  className={`w-full px-4 py-2 border rounded ${errors.loanAmount ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.loanAmount && <p className="text-red-500 text-sm mt-1">{errors.loanAmount}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Loan Tenure (months)</label>
                <select
                  name="loanTenure"
                  value={formData.loanTenure}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded ${errors.loanTenure ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="12">12 months (1 year)</option>
                  <option value="24">24 months (2 years)</option>
                  <option value="36">36 months (3 years)</option>
                  <option value="48">48 months (4 years)</option>
                  <option value="60">60 months (5 years)</option>
                </select>
                {errors.loanTenure && <p className="text-red-500 text-sm mt-1">{errors.loanTenure}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Loan Purpose</label>
                <textarea
                  name="loanPurpose"
                  value={formData.loanPurpose}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-4 py-2 border rounded ${errors.loanPurpose ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Briefly describe why you need this loan"
                ></textarea>
                {errors.loanPurpose && <p className="text-red-500 text-sm mt-1">{errors.loanPurpose}</p>}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 3: Document Upload</h2>
              <div className="mb-6">
                <p className="text-gray-600 mb-4">Please upload a copy of your ID document (passport, driver's license, etc.)</p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="document-upload"
                    name="documents"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label 
                    htmlFor="document-upload" 
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    {formData.documents ? (
                      <div className="text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="mt-2 font-medium">File uploaded: {formData.documents.name}</p>
                      </div>
                    ) : (
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-600">Click to select file or drag and drop</p>
                        <p className="text-xs text-gray-500 mt-1">(PDF, JPG, PNG, max 5MB)</p>
                      </div>
                    )}
                  </label>
                </div>
                {errors.documents && <p className="text-red-500 text-sm mt-1">{errors.documents}</p>}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button 
                onClick={handlePrevious} 
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Previous
              </button>
            )}
            {step === 1 && <div></div>}
            <button 
              onClick={handleNext} 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {step === 3 ? 'Review Application' : 'Next'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}