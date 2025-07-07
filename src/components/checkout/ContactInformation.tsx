
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from './types';

interface ContactInformationProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContactInformation = ({ formData, onInputChange }: ContactInformationProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="fullName" className="mb-3 block text-sm font-medium text-gray-700 uppercase tracking-wide">First Name*</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="First name"
              value={formData.fullName}
              onChange={onInputChange}
              required
              className="text-base py-4 px-4 border-2 border-gray-200 rounded-xl focus:border-[#2a9d8f] focus:ring-0 bg-gray-50"
              autoComplete="given-name"
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="mb-3 block text-sm font-medium text-gray-700 uppercase tracking-wide">Last Name*</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Last name"
              value=""
              onChange={onInputChange}
              required
              className="text-base py-4 px-4 border-2 border-gray-200 rounded-xl focus:border-[#2a9d8f] focus:ring-0 bg-gray-50"
              autoComplete="family-name"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="email" className="mb-3 block text-sm font-medium text-gray-700 uppercase tracking-wide">Email*</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="email@parsley.com"
            value={formData.email}
            onChange={onInputChange}
            required
            className="text-base py-4 px-4 border-2 border-gray-200 rounded-xl focus:border-[#2a9d8f] focus:ring-0 bg-gray-50"
            autoComplete="email"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="mb-3 block text-sm font-medium text-gray-700 uppercase tracking-wide">Phone Number*</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1"
            value=""
            onChange={onInputChange}
            required
            className="text-base py-4 px-4 border-2 border-gray-200 rounded-xl focus:border-[#2a9d8f] focus:ring-0 bg-gray-50"
            autoComplete="tel"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
