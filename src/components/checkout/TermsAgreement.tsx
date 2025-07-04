
import React from "react";
import { Checkbox } from '@/components/ui/checkbox';

interface TermsAgreementProps {
  agreed: boolean;
  onAgreedChange: (checked: boolean) => void;
}

const TermsAgreement = ({ agreed, onAgreedChange }: TermsAgreementProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-elegant p-6 border border-yutime-stoneDark">
      <div className="flex items-start gap-3">
        <Checkbox
          id="agree"
          checked={agreed}
          onCheckedChange={checked => onAgreedChange(Boolean(checked))}
          className="mt-1"
          required
        />
        <div className="flex-1">
          <label htmlFor="agree" className="text-yutime-navy text-base select-none cursor-pointer leading-relaxed">
            I agree to the <a href="#" className="text-yutime-bronze hover:underline font-medium">Terms of Service</a> and <a href="#" className="text-yutime-bronze hover:underline font-medium">Privacy Policy</a>
          </label>
        </div>
      </div>
    </div>
  );
};

export default TermsAgreement;
