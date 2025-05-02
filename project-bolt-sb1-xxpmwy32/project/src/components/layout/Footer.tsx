import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start space-x-6">
            <a href="#" className="text-neutral-500 hover:text-neutral-900">
              <span className="sr-only">About</span>
              About
            </a>
            <a href="#" className="text-neutral-500 hover:text-neutral-900">
              <span className="sr-only">Privacy</span>
              Privacy
            </a>
            <a href="#" className="text-neutral-500 hover:text-neutral-900">
              <span className="sr-only">Terms</span>
              Terms
            </a>
            <a href="#" className="text-neutral-500 hover:text-neutral-900">
              <span className="sr-only">Contact</span>
              Contact
            </a>
          </div>
          <p className="mt-8 text-center md:mt-0 text-sm text-neutral-500">
            &copy; {currentYear} OrthoTrack AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;