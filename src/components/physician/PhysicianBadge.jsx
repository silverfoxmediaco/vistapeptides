import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ShieldCheckIcon, AlertCircleIcon, ClockIcon } from 'lucide-react';

const PhysicianBadge = ({ 
  physician, 
  size = 'md', 
  showDetails = false, 
  className = '' 
}) => {
  const { verification, profile } = physician;
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const getVerificationStatus = () => {
    if (!verification) {
      return {
        status: 'unverified',
        text: 'Unverified',
        icon: AlertCircleIcon,
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-700',
        borderColor: 'border-gray-300'
      };
    }

    if (verification.status === 'verified') {
      return {
        status: 'verified',
        text: 'Verified Physician',
        icon: CheckCircleIcon,
        bgColor: 'bg-emerald-100',
        textColor: 'text-emerald-700',
        borderColor: 'border-emerald-300'
      };
    }

    if (verification.status === 'pending') {
      return {
        status: 'pending',
        text: 'Verification Pending',
        icon: ClockIcon,
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-700',
        borderColor: 'border-yellow-300'
      };
    }

    return {
      status: 'failed',
      text: 'Verification Failed',
      icon: AlertCircleIcon,
      bgColor: 'bg-red-100',
      textColor: 'text-red-700',
      borderColor: 'border-red-300'
    };
  };

  const verificationStatus = getVerificationStatus();
  const Icon = verificationStatus.icon;

  const getLicenseInfo = () => {
    if (!verification?.licenses?.length) return null;
    
    const activeLicenses = verification.licenses.filter(license => 
      license.status === 'active' && new Date(license.expiresAt) > new Date()
    );
    
    return activeLicenses.length > 0 ? activeLicenses : null;
  };

  const activeLicenses = getLicenseInfo();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`inline-flex items-center rounded-full border ${verificationStatus.bgColor} ${verificationStatus.textColor} ${verificationStatus.borderColor} ${sizeClasses[size]} ${className}`}
    >
      <Icon className={`${iconSizes[size]} mr-1.5`} />
      <span className="font-medium">{verificationStatus.text}</span>
      
      {showDetails && verification?.status === 'verified' && (
        <div className="ml-2 flex items-center space-x-1">
          {verification.npi && (
            <span className="text-xs bg-white bg-opacity-50 px-2 py-0.5 rounded-full">
              NPI
            </span>
          )}
          {verification.dea && (
            <span className="text-xs bg-white bg-opacity-50 px-2 py-0.5 rounded-full">
              DEA
            </span>
          )}
          {activeLicenses && (
            <span className="text-xs bg-white bg-opacity-50 px-2 py-0.5 rounded-full">
              {activeLicenses.length} License{activeLicenses.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
};

export const PhysicianVerificationCard = ({ physician, className = '' }) => {
  const { verification, profile } = physician;

  if (!verification) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white border border-dark-200 rounded-xl p-6 ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <ShieldCheckIcon className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-dark-900">
              Dr. {profile.firstName} {profile.lastName}
            </h3>
            <p className="text-sm text-dark-600">{profile.specialty}</p>
          </div>
        </div>
        
        <PhysicianBadge physician={physician} size="lg" />
      </div>

      {verification.status === 'verified' && (
        <div className="space-y-4">
          {/* NPI Information */}
          {verification.npi && (
            <div className="flex justify-between items-center py-2 border-b border-dark-100">
              <span className="text-sm font-medium text-dark-700">NPI Number</span>
              <span className="text-sm text-dark-900">{verification.npi}</span>
            </div>
          )}

          {/* DEA Information */}
          {verification.dea && (
            <div className="flex justify-between items-center py-2 border-b border-dark-100">
              <span className="text-sm font-medium text-dark-700">DEA Number</span>
              <span className="text-sm text-dark-900">{verification.dea}</span>
            </div>
          )}

          {/* License Information */}
          {verification.licenses && verification.licenses.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-dark-700 mb-3">Medical Licenses</h4>
              <div className="space-y-2">
                {verification.licenses.map((license, index) => {
                  const isExpired = new Date(license.expiresAt) <= new Date();
                  const isActive = license.status === 'active';
                  
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-dark-50 rounded-lg"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-dark-900">
                            {license.state}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            isActive && !isExpired
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {isExpired ? 'Expired' : license.status}
                          </span>
                        </div>
                        <p className="text-xs text-dark-600">
                          License #{license.number}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-dark-600">Expires</p>
                        <p className="text-sm font-medium text-dark-900">
                          {new Date(license.expiresAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Verification Date */}
          {verification.verifiedAt && (
            <div className="pt-4 border-t border-dark-100">
              <p className="text-xs text-dark-600">
                Verified on {new Date(verification.verifiedAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      )}

      {verification.status === 'pending' && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            Your physician verification is currently being processed. This typically takes 1-3 business days.
          </p>
          {verification.submittedAt && (
            <p className="text-xs text-yellow-700 mt-2">
              Submitted on {new Date(verification.submittedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      )}

      {verification.status === 'failed' && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">
            Verification failed. Please contact support for assistance.
          </p>
          {verification.failureReason && (
            <p className="text-xs text-red-700 mt-2">
              Reason: {verification.failureReason}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default PhysicianBadge;