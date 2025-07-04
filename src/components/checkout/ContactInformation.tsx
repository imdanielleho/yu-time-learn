
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
    <div className="bg-white rounded-2xl shadow-soft p-6 border border-yutime-sand">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-yutime-sage/10 rounded-full flex items-center justify-center">
          <span className="text-yutime-sage font-semibold">1</span>
        </div>
        <h2 className="text-xl font-semibold text-yutime-sage">Contact Information</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName" className="mb-2 block text-base text-yutime-sage">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={onInputChange}
            required
            className="text-base py-3 border-yutime-sand focus:border-yutime-sage"
            autoComplete="name"
          />
        </div>
        <div>
          <Label htmlFor="email" className="mb-2 block text-base text-yutime-sage">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onInputChange}
            required
            className="text-base py-3 border-yutime-sand focus:border-yutime-sage"
            autoComplete="email"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
