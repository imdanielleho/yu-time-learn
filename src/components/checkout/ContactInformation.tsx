
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
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-gray-700 font-medium">1</span>
        </div>
        <h2 className="text-xl font-light text-gray-900">Contact Information</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName" className="mb-2 block text-base text-gray-700 font-light">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={onInputChange}
            required
            className="text-base py-3 border-gray-200 focus:border-gray-400 font-light"
            autoComplete="name"
          />
        </div>
        <div>
          <Label htmlFor="email" className="mb-2 block text-base text-gray-700 font-light">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onInputChange}
            required
            className="text-base py-3 border-gray-200 focus:border-gray-400 font-light"
            autoComplete="email"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
