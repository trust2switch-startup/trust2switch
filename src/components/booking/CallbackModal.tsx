'use client';

import React, { useState } from 'react';
import { Phone, CheckCircle, Clock } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallbackModal: React.FC<CallbackModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    preferredTime: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
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
    }
  };

  if (submitted) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Callback Requested">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 mb-2">
            Request Received!
          </h3>
          <p className="text-neutral-600 mb-6">
            We'll call you back at your preferred time. Our team will contact you shortly.
          </p>
          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Request a Callback" size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 flex items-start gap-3">
          <Phone className="w-5 h-5 text-primary-600 mt-0.5" />
          <div>
            <p className="font-semibold text-neutral-900 mb-1">Get Expert Guidance</p>
            <p className="text-sm text-neutral-600">
              Our career counselors will call you back to discuss your learning goals and help you choose the right course.
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
            Preferred Callback Time
          </label>
          <select
            name="preferredTime"
            value={formData.preferredTime}
            onChange={(e) => handleChange(e as any)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.preferredTime ? 'border-error' : 'border-neutral-300'
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

        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="flex-1 flex items-center justify-center">
            <Phone className="w-4 h-4 mr-2" />
            Request Callback
          </Button>
        </div>
      </form>
    </Modal>
  );
};

