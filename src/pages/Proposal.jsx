import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckIcon, 
  StarIcon, 
  CalendarIcon, 
  DollarSignIcon,
  TrendingUpIcon,
  ShieldCheckIcon,
  ZapIcon,
  UsersIcon
} from 'lucide-react';
import MainHeader from '../components/MainHeader';
import './Proposal.css';

const Proposal = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const proposalOptions = [
    {
      id: 1,
      number: "Option 1",
      title: "Traditional Development",
      price: "$115,000",
      priceNote: "One-time payment",
      timeline: "6-8 Months",
      timelineDetail: "March - May 2025",
      recommended: false,
      deliverables: [
        "Complete MERN stack platform",
        "Physician verification system",
        "State compliance engine",
        "Payment processing integration",
        "Admin dashboard & analytics",
        "30 days post-launch support"
      ]
    },
    {
      id: 2,
      number: "Option 2",
      title: "AI-Accelerated Development",
      price: "$75,000",
      priceNote: "One-time payment",
      timeline: "3-4 Months",
      timelineDetail: "December 2025 - January 2025",
      recommended: false,
      deliverables: [
        "Complete MERN stack platform",
        "Physician verification system",
        "State compliance engine",
        "Payment processing integration",
        "Admin dashboard & analytics",
        "30 days post-launch support"
      ]
    },
    {
      id: 3,
      number: "Option 3",
      title: "Partnership Model",
      price: "$10,000",
      priceNote: "Plus $5,000/month ongoing",
      timeline: "3 Months",
      timelineDetail: "December 2025 (MVP)",
      recommended: true,
      deliverables: [
        "MVP e-commerce platform",
        "Basic physician verification",
        "Payment processing",
        "Product catalog & ordering"
      ],
      monthlyServices: [
        "Continuous feature development",
        "Performance optimization",
        "Security updates & monitoring",
        "Analytics & reporting",
        "Technical strategy & planning",
        "Priority support"
      ]
    }
  ];

  const timelineData = [
    {
      option: "Option 1 - Traditional",
      start: "Upon contract signing",
      launch: "March - May 2025",
      duration: "6-8 months"
    },
    {
      option: "Option 2 - AI-Accelerated",
      start: "Upon contract signing",
      launch: "December 2025 - January 2025",
      duration: "3-4 months"
    },
    {
      option: "Option 3 - Partnership",
      start: "Upon contract signing",
      launch: "December 2025 (MVP)",
      duration: "3 months + ongoing"
    }
  ];

  const featureSchedule = [
    {
      feature: "Core E-commerce",
      option1: "Month 3",
      option2: "Month 1",
      option3: "Month 1"
    },
    {
      feature: "Physician Verification",
      option1: "Month 4",
      option2: "Month 2",
      option3: "Month 2"
    },
    {
      feature: "Payment Processing",
      option1: "Month 5",
      option2: "Month 2",
      option3: "Month 2"
    },
    {
      feature: "State Compliance",
      option1: "Month 6",
      option2: "Month 3",
      option3: "Month 4-5"
    },
    {
      feature: "Advanced Analytics",
      option1: "Month 7",
      option2: "Month 3",
      option3: "Month 5-6"
    },
    {
      feature: "Full Launch Ready",
      option1: "Month 8",
      option2: "Month 4",
      option3: "Month 3 (MVP), Month 6 (Full)"
    }
  ];

  const paymentTerms = [
    {
      option: "Option 1 - Traditional",
      initial: "$28,750 (25% deposit)",
      ongoing: "$86,250 (milestone payments)",
      totalYear1: "$115,000"
    },
    {
      option: "Option 2 - AI-Accelerated",
      initial: "$18,750 (25% deposit)",
      ongoing: "$56,250 (milestone payments)",
      totalYear1: "$75,000"
    },
    {
      option: "Option 3 - Partnership",
      initial: "$10,000 (upon signing)",
      ongoing: "$5,000/month (starting month 4)",
      totalYear1: "$55,000"
    }
  ];

  return (
    <div className="proposal-page">
      <MainHeader />
      
      <div className="proposal-container" style={{ marginTop: '150px' }}>
        {/* Header Section */}
        <motion.header 
          className="proposal-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="proposal-logo">
            Vista<span>Peptides</span>
          </div>
          <h1 className="proposal-title">Development Proposal</h1>
          <p className="proposal-subtitle">Custom MERN Stack E-Commerce Platform</p>
          <p className="proposal-date">September 2025</p>
        </motion.header>

        {/* Options Grid */}
        <div className="proposal-options-grid">
          {proposalOptions.map((option, index) => (
            <motion.div
              key={option.id}
              className={`proposal-option-card ${option.recommended ? 'recommended' : ''} ${selectedOption === option.id ? 'selected' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(79, 183, 244, 0.15)' }}
              onClick={() => setSelectedOption(selectedOption === option.id ? null : option.id)}
            >
              {option.recommended && (
                <span className="proposal-recommended-badge">
                  <StarIcon className="badge-icon" />
                  Recommended
                </span>
              )}
              
              <div className="proposal-option-number">{option.number}</div>
              <h2 className="proposal-option-title">{option.title}</h2>
              
              <div className="proposal-price-section">
                <div className="proposal-price-label">Total Investment</div>
                <div className="proposal-price">{option.price}</div>
                <div className="proposal-price-note">{option.priceNote}</div>
              </div>
              
              <div className="proposal-timeline">
                <div className="proposal-timeline-icon">
                  <CalendarIcon className="icon" />
                </div>
                <div className="proposal-timeline-content">
                  <div className="proposal-timeline-label">Development Timeline</div>
                  <div className="proposal-timeline-value">{option.timeline}</div>
                </div>
              </div>
              
              <div className="proposal-deliverables">
                <div className="proposal-deliverables-title">
                  {option.id === 3 ? "Initial Deliverables" : "Deliverables"}
                </div>
                {option.deliverables.map((deliverable, idx) => (
                  <motion.div
                    key={idx}
                    className="proposal-deliverable-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (index * 0.1) + (idx * 0.05) }}
                  >
                    <CheckIcon className="proposal-check-icon" />
                    <span className="proposal-deliverable-text">{deliverable}</span>
                  </motion.div>
                ))}
              </div>

              {option.monthlyServices && (
                <div className="proposal-deliverables">
                  <div className="proposal-deliverables-title">
                    Monthly Services ($5,000/month)
                  </div>
                  {option.monthlyServices.map((service, idx) => (
                    <motion.div
                      key={idx}
                      className="proposal-deliverable-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: (index * 0.1) + (idx * 0.05) }}
                    >
                      <CheckIcon className="proposal-check-icon" />
                      <span className="proposal-deliverable-text">{service}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bonus Section */}
        <motion.div 
          className="proposal-bonus-section"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ZapIcon className="bonus-icon" />
          <div className="proposal-bonus-title">✨ BONUS INCLUDED</div>
          <div className="proposal-bonus-description">
            Current Shopify website fixes and optimization included at no additional charge with any option
          </div>
        </motion.div>

        {/* Timeline Comparison Table */}
        <motion.div 
          className="proposal-comparison-table"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="proposal-table-title">
            <TrendingUpIcon className="table-icon" />
            Timeline Comparison
          </h3>
          <div className="proposal-table-wrapper">
            <table className="proposal-table">
              <thead>
                <tr>
                  <th>Option</th>
                  <th>Start Date</th>
                  <th>Launch Date</th>
                  <th>Total Duration</th>
                </tr>
              </thead>
              <tbody>
                {timelineData.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <td><strong>{row.option}</strong></td>
                    <td>{row.start}</td>
                    <td>{row.launch}</td>
                    <td>{row.duration}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Feature Delivery Schedule */}
        <motion.div 
          className="proposal-comparison-table"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="proposal-table-title">
            <ShieldCheckIcon className="table-icon" />
            Feature Delivery Schedule
          </h3>
          <div className="proposal-table-wrapper">
            <table className="proposal-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Option 1</th>
                  <th>Option 2</th>
                  <th>Option 3</th>
                </tr>
              </thead>
              <tbody>
                {featureSchedule.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <td><strong>{row.feature}</strong></td>
                    <td>{row.option1}</td>
                    <td>{row.option2}</td>
                    <td>{row.option3}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Payment Terms */}
        <motion.div 
          className="proposal-comparison-table"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="proposal-table-title">
            <DollarSignIcon className="table-icon" />
            Payment Terms
          </h3>
          <div className="proposal-table-wrapper">
            <table className="proposal-table">
              <thead>
                <tr>
                  <th>Option</th>
                  <th>Initial Payment</th>
                  <th>Ongoing</th>
                  <th>Total Year 1</th>
                </tr>
              </thead>
              <tbody>
                {paymentTerms.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <td><strong>{row.option}</strong></td>
                    <td>{row.initial}</td>
                    <td>{row.ongoing}</td>
                    <td><strong>{row.totalYear1}</strong></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          className="proposal-contact-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <UsersIcon className="contact-icon" />
          <h3 className="proposal-contact-title">Ready to Get Started</h3>
          <div className="proposal-contact-info">
            <p className="contact-name">James McEwen</p>
            <p className="contact-role">Full Stack Developer</p>
            <p className="contact-specialty">MERN Stack Specialist</p>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="proposal-footer">
          <p>This proposal is valid for 30 days from the date shown above.</p>
          <p>© 2025 - Confidential Proposal for Vista Peptides</p>
        </footer>
      </div>
    </div>
  );
};

export default Proposal;