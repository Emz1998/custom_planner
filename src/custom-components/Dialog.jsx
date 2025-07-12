import React, { useState, useEffect } from 'react';
import { monthlyDialogItems } from '../config/dialogConfig';
import { X } from 'lucide-react';
import Button from './Button';

export const Dialog = ({ buttonlabel, dialogContent }) => {
  console.log('Dialog component loaded');
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <>
      <DialogTrigger openDialog={openDialog} label={buttonlabel} />
      <DialogContent
        isOpen={isOpen}
        onClose={closeDialog}
        dialogContent={dialogContent}
      />
    </>
  );
};

export const DialogContent = ({ isOpen, onClose }) => {
  console.log('DialogContent component loaded');
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // First show the dialog
      setShow(true);
      // Then trigger animation after a small delay
      const timer = setTimeout(() => {
        setAnimate(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      // First remove animation
      setAnimate(false);
      // Then hide after animation completes
      const timer = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle ESC key and prevent body scroll
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent scrolling on the body
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      // Restore scrolling when dialog closes
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle click outside
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center  transition-opacity duration-300 ${
        animate ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black opacity-50 z-[-9999] transition-opacity duration-300"
        onClick={handleOverlayClick}
      ></div>
      <div
        className={`bg-white p-4 transition-opacity duration-300 ${
          animate ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose}>
          <X />
        </button>
        {monthlyDialogItems.map((item) => (
          <div key={item.id}>
            <label htmlFor={item.id}>{item.label}</label>
            <input
              key={item.id}
              type={item.type}
              placeholder={item.placeholder}
              required={item.required}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const DialogTrigger = ({ openDialog, label }) => {
  console.log('DialogTrigger component loaded');
  return (
    <>
      <Button onClick={openDialog}>{label}</Button>
    </>
  );
};
