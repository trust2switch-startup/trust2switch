'use client';

import React, { useState, useEffect } from 'react';
import { User, Calendar, Clock, CheckCircle, Video } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { trackModalOpen, trackFormSubmit } from '@/lib/analytics';

interface BookOneOnOneModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle?: string;
}

const sessionTypes = [
  { id: 'technical', label: 'Technical Guidance', duration: '60 min', price: '₹8,299' },
  { id: 'career', label: 'Career Counseling', duration: '45 min', price: '₹6,599' },
  { id: 'project', label: 'Project Review', duration: '90 min', price: '₹12,499' },
  { id: 'interview', label: 'Interview Prep', duration: '60 min', price: '₹8,299' },
];

export const BookOneOnOneModal: React.FC<BookOneOnOneModalProps> = ({
  isOpen,
  onClose,
  courseTitle,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sessionType: '',
    preferredDate: '',
    preferredTime: '',
    topics: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      trackModalOpen('book_one_on_one_modal');
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.sessionType) newErrors.sessionType = 'Session type is required';
    if (!formData.preferredDate) newErrors.preferredDate = 'Preferred date is required';
    if (!formData.preferredTime) newErrors.preferredTime = 'Preferred time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Track form submission
      const selectedSession = sessionTypes.find(s => s.id === formData.sessionType);
      trackFormSubmit('one_on_one_session_booking', {
        course_title: courseTitle,
        session_type: formData.sessionType,
        session_label: selectedSession?.label,
        session_price: selectedSession?.price,
        preferred_date: formData.preferredDate,
        preferred_time: formData.preferredTime,
        has_topics: !!formData.topics,
      });
      
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          sessionType: '',
          preferredDate: '',
          preferredTime: '',
          topics: '',
        });
        onClose();
      }, 2000);
    }
  };

  const selectedSession = sessionTypes.find(s => s.id === formData.sessionType);

  if (submitted) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Session Booked">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 mb-2">
            1-on-1 Session Booked!
          </h3>
          <p className="text-neutral-600 mb-6">
            We've received your booking. Our instructor will contact you shortly to confirm the session details.
          </p>
          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book 1-on-1 Session" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {courseTitle && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <p className="text-sm text-neutral-600 mb-1">Course:</p>
            <p className="font-semibold text-neutral-900">{courseTitle}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">
            <Video className="w-4 h-4 inline mr-1" />
            Session Type
          </label>
          <div className="grid md:grid-cols-2 gap-3">
            {sessionTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => handleChange({ target: { name: 'sessionType', value: type.id } } as any)}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  formData.sessionType === type.id
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-neutral-200 hover:border-primary-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="font-semibold text-neutral-900 text-sm">{type.label}</span>
                  <Badge variant="primary" className="text-xs">{type.price}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Clock className="w-4 h-4" />
                  <span>{type.duration}</span>
                </div>
              </button>
            ))}
          </div>
          {errors.sessionType && (
            <p className="mt-1 text-sm text-error">{errors.sessionType}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
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
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            placeholder="john@example.com"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
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
          <div className="w-full">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Preferred Date
            </label>
            <Input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              error={errors.preferredDate}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            <Clock className="w-4 h-4 inline mr-1" />
            Preferred Time
          </label>
          <select
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.preferredTime ? 'border-error' : 'border-neutral-300'
            }`}
            required
          >
            <option value="">Select a time</option>
            <option value="09:00">9:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="12:00">12:00 PM</option>
            <option value="13:00">1:00 PM</option>
            <option value="14:00">2:00 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="16:00">4:00 PM</option>
            <option value="17:00">5:00 PM</option>
          </select>
          {errors.preferredTime && (
            <p className="mt-1 text-sm text-error">{errors.preferredTime}</p>
          )}
        </div>

        <Textarea
          label="Topics You'd Like to Cover"
          name="topics"
          value={formData.topics}
          onChange={handleChange}
          rows={4}
          placeholder="What specific topics or questions would you like to discuss?"
        />

        {selectedSession && (
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Session Fee</p>
                <p className="text-2xl font-bold text-primary-600">{selectedSession.price}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-600">Duration</p>
                <p className="text-lg font-semibold text-neutral-900">{selectedSession.duration}</p>
              </div>
            </div>
          </div>
        )}

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
            <Calendar className="w-4 h-4 mr-2" />
            Book 1-on-1 Session
          </Button>
        </div>
      </form>
    </Modal>
  );
};

