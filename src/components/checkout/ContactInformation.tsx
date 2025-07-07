
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
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
          <span className="text-teal-700 font-bold text-lg">1</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Contact Information</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="fullName" className="mb-3 block text-base font-medium text-slate-700">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={onInputChange}
            required
            className="text-base py-4 px-4 border-slate-300 focus:border-teal-500 focus:ring-teal-500 rounded-xl"
            autoComplete="name"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <Label htmlFor="email" className="mb-3 block text-base font-medium text-slate-700">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onInputChange}
            required
            className="text-base py-4 px-4 border-slate-300 focus:border-teal-500 focus:ring-teal-500 rounded-xl"
            autoComplete="email"
            placeholder="Enter your email"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
