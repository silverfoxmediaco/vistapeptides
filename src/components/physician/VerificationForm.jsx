import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  UploadIcon, 
  CheckIcon, 
  AlertCircleIcon,
  FileTextIcon,
  XIcon
} from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { stateOptions } from '../../utils/constants';

const VerificationForm = ({ 
  onSubmit, 
  loading = false, 
  className = '' 
}) => {
  const [formData, setFormData] = useState({
    npi: '',
    dea: '',
    licenses: [
      {
        state: '',
        number: '',
        expiresAt: '',
        document: null
      }
    ],
    medicalDegree: null,
    boardCertification: null,
    insuranceDocument: null
  });

  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleLicenseChange = (index, field, value) => {
    const newLicenses = [...formData.licenses];
    newLicenses[index] = {
      ...newLicenses[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      licenses: newLicenses
    }));

    // Clear license-specific errors
    const errorKey = `license_${index}_${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: null
      }));
    }
  };

  const addLicense = () => {
    setFormData(prev => ({
      ...prev,
      licenses: [
        ...prev.licenses,
        {
          state: '',
          number: '',
          expiresAt: '',
          document: null
        }
      ]
    }));
  };

  const removeLicense = (index) => {
    if (formData.licenses.length > 1) {
      const newLicenses = formData.licenses.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        licenses: newLicenses
      }));
    }
  };

  const handleFileUpload = async (field, file, licenseIndex = null) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      const errorKey = licenseIndex !== null ? `license_${licenseIndex}_document` : field;
      setErrors(prev => ({
        ...prev,
        [errorKey]: 'Please upload a PDF, JPEG, or PNG file'
      }));
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      const errorKey = licenseIndex !== null ? `license_${licenseIndex}_document` : field;
      setErrors(prev => ({
        ...prev,
        [errorKey]: 'File size must be less than 5MB'
      }));
      return;
    }

    const progressKey = licenseIndex !== null ? `license_${licenseIndex}_document` : field;
    setUploadProgress(prev => ({ ...prev, [progressKey]: 0 }));

    try {
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        setUploadProgress(prev => ({ ...prev, [progressKey]: progress }));
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      if (licenseIndex !== null) {
        handleLicenseChange(licenseIndex, 'document', file);
      } else {
        handleInputChange(field, file);
      }

      setUploadProgress(prev => ({ ...prev, [progressKey]: null }));
    } catch (error) {
      const errorKey = licenseIndex !== null ? `license_${licenseIndex}_document` : field;
      setErrors(prev => ({
        ...prev,
        [errorKey]: 'Upload failed. Please try again.'
      }));
      setUploadProgress(prev => ({ ...prev, [progressKey]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate NPI
    if (!formData.npi || formData.npi.length !== 10) {
      newErrors.npi = 'NPI must be exactly 10 digits';
    }

    // Validate DEA (optional but if provided, must be valid)
    if (formData.dea && (formData.dea.length !== 9 || !formData.dea.match(/^[A-Z]{2}\d{7}$/))) {
      newErrors.dea = 'DEA must be 2 letters followed by 7 digits';
    }

    // Validate licenses
    formData.licenses.forEach((license, index) => {
      if (!license.state) {
        newErrors[`license_${index}_state`] = 'State is required';
      }
      if (!license.number) {
        newErrors[`license_${index}_number`] = 'License number is required';
      }
      if (!license.expiresAt) {
        newErrors[`license_${index}_expiresAt`] = 'Expiration date is required';
      } else {
        const expirationDate = new Date(license.expiresAt);
        if (expirationDate <= new Date()) {
          newErrors[`license_${index}_expiresAt`] = 'License cannot be expired';
        }
      }
      if (!license.document) {
        newErrors[`license_${index}_document`] = 'License document is required';
      }
    });

    // Validate required documents
    if (!formData.medicalDegree) {
      newErrors.medicalDegree = 'Medical degree document is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const FileUploadArea = ({ 
    field, 
    label, 
    file, 
    error, 
    progress, 
    licenseIndex = null,
    required = false 
  }) => {
    const inputId = licenseIndex !== null 
      ? `${field}_${licenseIndex}` 
      : field;
    
    const progressValue = progress;
    const hasFile = file;
    const hasError = error;

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-dark-700">
          {label} {required && <span className="text-medical-red">*</span>}
        </label>
        
        <div className={`relative border-2 border-dashed rounded-xl p-4 transition-colors duration-200 ${
          hasError 
            ? 'border-red-300 bg-red-50' 
            : hasFile 
            ? 'border-emerald-300 bg-emerald-50' 
            : 'border-dark-300 bg-dark-50 hover:border-primary-400 hover:bg-primary-50'
        }`}>
          <input
            id={inputId}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload(field, e.target.files[0], licenseIndex)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={progressValue !== null}
          />
          
          <div className="text-center">
            {progressValue !== null ? (
              <div className="space-y-2">
                <div className="w-8 h-8 mx-auto animate-spin">
                  <UploadIcon className="w-full h-full text-primary-600" />
                </div>
                <div className="w-full bg-dark-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${progressValue}%` }}
                  />
                </div>
                <p className="text-sm text-primary-600">Uploading... {progressValue}%</p>
              </div>
            ) : hasFile ? (
              <div className="space-y-2">
                <CheckIcon className="w-8 h-8 mx-auto text-emerald-600" />
                <p className="text-sm text-emerald-700 font-medium">{file.name}</p>
                <p className="text-xs text-emerald-600">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <UploadIcon className="w-8 h-8 mx-auto text-dark-400" />
                <p className="text-sm text-dark-600">
                  Drop your file here or <span className="text-primary-600 font-medium">browse</span>
                </p>
                <p className="text-xs text-dark-500">
                  PDF, JPEG, or PNG (max 5MB)
                </p>
              </div>
            )}
          </div>
        </div>
        
        {hasError && (
          <div className="flex items-center space-x-2 text-red-600">
            <AlertCircleIcon className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className={`bg-white ${className}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <ShieldCheckIcon className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-dark-900">
              Physician Verification
            </h2>
            <p className="text-sm text-dark-600">
              Please provide your professional credentials for verification
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NPI Number */}
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              NPI Number <span className="text-medical-red">*</span>
            </label>
            <input
              type="text"
              maxLength="10"
              value={formData.npi}
              onChange={(e) => handleInputChange('npi', e.target.value.replace(/\D/g, ''))}
              placeholder="1234567890"
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.npi ? 'border-red-300 bg-red-50' : 'border-dark-200'
              }`}
            />
            {errors.npi && (
              <div className="flex items-center space-x-2 text-red-600 mt-2">
                <AlertCircleIcon className="w-4 h-4" />
                <span className="text-sm">{errors.npi}</span>
              </div>
            )}
          </div>

          {/* DEA Number */}
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              DEA Number <span className="text-sm text-dark-500">(Optional)</span>
            </label>
            <input
              type="text"
              maxLength="9"
              value={formData.dea}
              onChange={(e) => handleInputChange('dea', e.target.value.toUpperCase())}
              placeholder="AB1234567"
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.dea ? 'border-red-300 bg-red-50' : 'border-dark-200'
              }`}
            />
            {errors.dea && (
              <div className="flex items-center space-x-2 text-red-600 mt-2">
                <AlertCircleIcon className="w-4 h-4" />
                <span className="text-sm">{errors.dea}</span>
              </div>
            )}
          </div>

          {/* Medical Licenses */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-dark-900">
                Medical Licenses <span className="text-medical-red">*</span>
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addLicense}
              >
                Add License
              </Button>
            </div>

            <div className="space-y-6">
              {formData.licenses.map((license, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border border-dark-200 rounded-xl bg-dark-25 relative"
                >
                  {formData.licenses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLicense(index)}
                      className="absolute top-4 right-4 p-1 text-dark-400 hover:text-red-500 transition-colors duration-200"
                    >
                      <XIcon className="w-4 h-4" />
                    </button>
                  )}

                  <h4 className="font-medium text-dark-900 mb-4">
                    License {index + 1}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* State */}
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">
                        State <span className="text-medical-red">*</span>
                      </label>
                      <select
                        value={license.state}
                        onChange={(e) => handleLicenseChange(index, 'state', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors[`license_${index}_state`] ? 'border-red-300 bg-red-50' : 'border-dark-200'
                        }`}
                      >
                        <option value="">Select State</option>
                        {stateOptions.map(state => (
                          <option key={state.value} value={state.value}>
                            {state.label}
                          </option>
                        ))}
                      </select>
                      {errors[`license_${index}_state`] && (
                        <div className="flex items-center space-x-2 text-red-600 mt-2">
                          <AlertCircleIcon className="w-4 h-4" />
                          <span className="text-sm">{errors[`license_${index}_state`]}</span>
                        </div>
                      )}
                    </div>

                    {/* License Number */}
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">
                        License Number <span className="text-medical-red">*</span>
                      </label>
                      <input
                        type="text"
                        value={license.number}
                        onChange={(e) => handleLicenseChange(index, 'number', e.target.value)}
                        placeholder="License number"
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors[`license_${index}_number`] ? 'border-red-300 bg-red-50' : 'border-dark-200'
                        }`}
                      />
                      {errors[`license_${index}_number`] && (
                        <div className="flex items-center space-x-2 text-red-600 mt-2">
                          <AlertCircleIcon className="w-4 h-4" />
                          <span className="text-sm">{errors[`license_${index}_number`]}</span>
                        </div>
                      )}
                    </div>

                    {/* Expiration Date */}
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">
                        Expiration Date <span className="text-medical-red">*</span>
                      </label>
                      <input
                        type="date"
                        value={license.expiresAt}
                        onChange={(e) => handleLicenseChange(index, 'expiresAt', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors[`license_${index}_expiresAt`] ? 'border-red-300 bg-red-50' : 'border-dark-200'
                        }`}
                      />
                      {errors[`license_${index}_expiresAt`] && (
                        <div className="flex items-center space-x-2 text-red-600 mt-2">
                          <AlertCircleIcon className="w-4 h-4" />
                          <span className="text-sm">{errors[`license_${index}_expiresAt`]}</span>
                        </div>
                      )}
                    </div>

                    {/* License Document */}
                    <div>
                      <FileUploadArea
                        field="document"
                        label="License Document"
                        file={license.document}
                        error={errors[`license_${index}_document`]}
                        progress={uploadProgress[`license_${index}_document`]}
                        licenseIndex={index}
                        required={true}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Medical Degree */}
          <FileUploadArea
            field="medicalDegree"
            label="Medical Degree"
            file={formData.medicalDegree}
            error={errors.medicalDegree}
            progress={uploadProgress.medicalDegree}
            required={true}
          />

          {/* Board Certification (Optional) */}
          <FileUploadArea
            field="boardCertification"
            label="Board Certification"
            file={formData.boardCertification}
            error={errors.boardCertification}
            progress={uploadProgress.boardCertification}
            required={false}
          />

          {/* Malpractice Insurance (Optional) */}
          <FileUploadArea
            field="insuranceDocument"
            label="Malpractice Insurance"
            file={formData.insuranceDocument}
            error={errors.insuranceDocument}
            progress={uploadProgress.insuranceDocument}
            required={false}
          />

          {/* Submit Button */}
          <div className="pt-6 border-t border-dark-100">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              <FileTextIcon className="w-5 h-5 mr-2" />
              Submit for Verification
            </Button>
            
            <p className="text-xs text-dark-600 mt-3 text-center">
              Your information will be securely processed and verified within 1-3 business days.
              All documents are encrypted and stored in compliance with HIPAA regulations.
            </p>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default VerificationForm;