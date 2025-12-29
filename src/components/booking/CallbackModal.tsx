'use client';

import React, { useState, useEffect } from 'react';
import { Phone, CheckCircle, Clock } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { trackModalOpen, trackFormSubmit } from '@/lib/analytics';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName?: string;
  intent?: 'callback' | 'apply' | 'brochure';
  brochureLink?: string;
}

export const CallbackModal: React.FC<CallbackModalProps> = ({
  isOpen,
  onClose,
  courseName,
  intent = 'callback',
  brochureLink,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    preferredTime: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      trackModalOpen(`${intent}_modal`);
    }
  }, [isOpen, intent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.preferredTime) newErrors.preferredTime = 'Preferred time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Track form submission
      const eventName =
        intent === 'apply' ? 'course_application' :
          intent === 'brochure' ? 'brochure_download_request' :
            'callback_request';

      trackFormSubmit(eventName, {
        preferred_time: formData.preferredTime,
        has_message: !!formData.message,
        course_name: courseName,
        intent,
      });

      // Submit to API
      const response = await fetch('/api/callback-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          preferredTime: formData.preferredTime,
          message: formData.message.trim() || '',
          courseName,
          intent,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to submit callback request');
      }

      // Success - show success message
      setSubmitted(true);

      // specific handling for brochure
      if (intent === 'brochure' && brochureLink) {
        // Trigger download
        const link = document.createElement('a');
        link.href = brochureLink;
        link.download = ''; // browser will infer filename or use header
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          phone: '',
          preferredTime: '',
          message: '',
        });
        onClose();
      }, 2000);
    } catch (error: any) {
      console.error('Error submitting callback request:', error);
      setErrors({
        submit: error.message || 'Failed to submit request. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTitle = () => {
    if (intent === 'apply' && courseName) return `Apply for ${courseName}`;
    if (intent === 'brochure' && courseName) return `Download Brochure for ${courseName}`;
    return "Request a Callback";
  };

  const getSuccessMessage = () => {
    if (intent === 'brochure') return "Brochure downloading...";
    if (intent === 'apply') return "Application Received!";
    return "Request Received!";
  };

  const getSuccessDescription = () => {
    if (intent === 'brochure') return "Your brochure download should start automatically.";
    if (intent === 'apply') return "We have received your application. Our team will contact you shortly.";
    return "We'll call you back at your preferred time. Our team will contact you shortly.";
  };

  if (submitted) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title={intent === 'apply' ? 'Application Submitted' : intent === 'brochure' ? 'Download Started' : 'Callback Requested'}>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 mb-2">
            {getSuccessMessage()}
          </h3>
          <p className="text-neutral-600 mb-6">
            {getSuccessDescription()}
          </p>
          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getTitle()} size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 flex items-start gap-3">
          <Phone className="w-5 h-5 text-primary-600 mt-0.5" />
          <div>
            <p className="font-semibold text-neutral-900 mb-1">
              {intent === 'brochure' ? 'Get Course Syllabus' : intent === 'apply' ? 'Start Your Journey' : 'Get Expert Guidance'}
            </p>
            <p className="text-sm text-neutral-600">
              {intent === 'brochure'
                ? 'Fill in your details to download the complete course brochure.'
                : intent === 'apply'
                  ? 'Submit your details to start your application process.'
                  : 'Our career counselors will call you back to discuss your learning goals and help you choose the right course.'}
            </p>
          </div>
        </div>

        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
          placeholder="John Doe"
        />

        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          required
          placeholder="+1 (555) 123-4567"
        />

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            <Clock className="w-4 h-4 inline mr-1" />
            {intent === 'brochure' ? 'Best time to reach you' : 'Preferred Callback Time'}
          </label>
          <select
            name="preferredTime"
            value={formData.preferredTime}
            onChange={(e) => handleChange(e as any)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.preferredTime ? 'border-error' : 'border-neutral-300'
              }`}
            required
          >
            <option value="">Select a time</option>
            <option value="morning">Morning (9 AM - 12 PM)</option>
            <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
            <option value="evening">Evening (4 PM - 7 PM)</option>
          </select>
          {errors.preferredTime && (
            <p className="mt-1 text-sm text-error">{errors.preferredTime}</p>
          )}
        </div>

        <Textarea
          label="What would you like to discuss? (Optional)"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us about your career goals or questions..."
        />

        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-600">{errors.submit}</p>
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1 flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {intent === 'brochure' ? 'Downloading...' : 'Submitting...'}
              </>
            ) : (
              <>
                {intent === 'brochure' ? (
                  <CheckCircle className="w-4 h-4 mr-2" />
                ) : (
                  <Phone className="w-4 h-4 mr-2" />
                )}
                {intent === 'brochure' ? 'Download Brochure' : intent === 'apply' ? 'Apply Now' : 'Request Callback'}
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

