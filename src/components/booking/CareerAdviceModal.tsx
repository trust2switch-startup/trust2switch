'use client';

import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Mail, Phone, User } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { trackModalOpen, trackFormSubmit } from '@/lib/analytics';

interface CareerAdviceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CareerAdviceModal: React.FC<CareerAdviceModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            trackModalOpen('career_advice_modal');
        }
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        // Email is optional, but if provided, validate format
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            // Track form submission
            trackFormSubmit('career_advice_request', {
                has_email: !!formData.email,
            });
            
            setIsSubmitting(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            setSubmitted(true);
            setIsSubmitting(false);

            setTimeout(() => {
                setSubmitted(false);
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                });
                onClose();
            }, 3000);
        }
    };

    if (submitted) {
        return (
            <Modal isOpen={isOpen} onClose={onClose} title="Success!">
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                        Details Received!
                    </h3>
                    <p className="text-slate-600 mb-6">
                        Our expert career counselors will review your profile and contact you shortly with personalized advice.
                    </p>
                    <Button variant="primary" onClick={onClose} className="w-full">
                        Close
                    </Button>
                </div>
            </Modal>
        );
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Get Free Career Advice" size="md">
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-2">
                    <p className="text-sm text-indigo-800 leading-relaxed">
                        Fill in your details below to get a <strong>FREE</strong> consultation call customized to your tech career goals.
                    </p>
                </div>

                <Input
                    label="Full Name"
                    name="name"
                    icon={<User className="w-4 h-4 text-slate-400" />}
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    required
                    placeholder="Enter your full name"
                />

                <Input
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    icon={<Phone className="w-4 h-4 text-slate-400" />}
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    required
                    placeholder="Enter your phone number"
                />

                <Input
                    label="Email Address (Optional)"
                    type="email"
                    name="email"
                    icon={<Mail className="w-4 h-4 text-slate-400" />}
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="For those who prefer email contact"
                />

                <div className="pt-2">
                    <Button
                        type="submit"
                        className="w-full py-3 text-base flex items-center justify-center gap-2 bg-[#84994F] hover:bg-green-900"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : (
                            <>
                                <span>Get My Free Advice</span>
                                <Send className="w-4 h-4" />
                            </>
                        )}
                    </Button>
                    <p className="text-xs text-center text-slate-400 mt-3">
                        Your information is safe with us. We don't spam.
                    </p>
                </div>
            </form>
        </Modal>
    );
};
