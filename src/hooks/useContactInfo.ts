'use client';

import { useState, useEffect } from 'react';

interface ContactInfo {
  email: string;
  phone: string;
  phoneDisplay: string;
  address: string;
}

interface ContactVisibility {
  email: boolean;
  phone: boolean;
  address: boolean;
}

interface ContactData {
  info: ContactInfo;
  visibility: ContactVisibility;
}

const defaultContactInfo: ContactInfo = {
  email: 'support@trust2switch.com',
  phone: '0000000000',
  phoneDisplay: '+1 (000) 000-0000',
  address: '123 Education Street, Learning City, LC 12345',
};

const defaultVisibility: ContactVisibility = {
  email: true,
  phone: true,
  address: true,
};

export function useContactInfo() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);
  const [visibility, setVisibility] = useState<ContactVisibility>(defaultVisibility);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch('/api/content');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data?.contact) {
            const contact = data.data.contact as ContactData;
            
            // Set contact info
            if (contact.info) {
              setContactInfo({
                email: contact.info.email || defaultContactInfo.email,
                phone: contact.info.phone || defaultContactInfo.phone,
                phoneDisplay: contact.info.phoneDisplay || defaultContactInfo.phoneDisplay,
                address: contact.info.address || defaultContactInfo.address,
              });
            }

            // Set visibility
            if (contact.visibility) {
              setVisibility({
                email: contact.visibility.email !== false,
                phone: contact.visibility.phone !== false,
                address: contact.visibility.address !== false,
              });
            }
          }
        }
      } catch (error) {
        console.error('Error fetching contact info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  // Return visible contact info based on visibility settings
  const visibleContactInfo = {
    email: visibility.email ? contactInfo.email : null,
    phone: visibility.phone ? contactInfo.phone : null,
    phoneDisplay: visibility.phone ? contactInfo.phoneDisplay : null,
    address: visibility.address ? contactInfo.address : null,
  };

  return {
    contactInfo,
    visibility,
    visibleContactInfo,
    loading,
  };
}

