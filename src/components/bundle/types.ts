
export interface BundleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialSelectedCourseId?: number;
  isLoggedIn: boolean;
  onLoginRequired?: (
    action: "proceedBundle" | "fiveCourseBundle",
    selections: number[]
  ) => void;
}

export interface BundleType {
  id: string;
  name: string;
  count: number;
  price: number;
  savings: number;
}

export interface BundleHandlers {
  onProceedToCheckout: () => void;
  onFiveCourseBundle: () => void;
  onCancel: () => void;
  onClearSelection: () => void;
  onToggleCourse: (courseId: number) => void;
}

export const BUNDLE_TYPE: BundleType = { 
  id: "3-course", 
  name: "3-Course Bundle", 
  count: 3, 
  price: 350, 
  savings: 10 
};

export const FIVE_COURSE_BUNDLE: BundleType = {
  id: "5-course", 
  name: "5-Course Bundle", 
  count: 5, 
  price: 500, 
  savings: 100
};
