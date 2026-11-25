import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../data/clinicData';

export function WhatsAppFloatingButton() {
  const prefersReducedMotion = useReducedMotion();
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappDigits}?text=${encodeURIComponent(
    `Olá, gostaria de entrar em contato com a clínica ${CONTACT_INFO.businessName} para agendar uma avaliação.`
  )}`;

  return (
    <div className="fixed right-4 bottom-4 z-30 sm:right-6 sm:bottom-6">
      <div className="relative flex items-center justify-center">
        {!prefersReducedMotion && (
          <motion.span
            aria-hidden="true"
            animate={{ scale: [1, 1.24, 1], opacity: [0.42, 0, 0.42] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="pointer-events-none absolute inset-0 rounded-full bg-primary"
          />
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Entrar em contato via WhatsApp pelo telefone ${CONTACT_INFO.phone}`}
          className="relative inline-flex h-13 w-13 items-center justify-center rounded-full bg-primary-deep text-primary-foreground shadow-[var(--shadow-accent)] transition-transform duration-150 hover:scale-105 hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:h-14 sm:w-auto sm:gap-2.5 sm:px-5"
        >
          <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span className="hidden text-sm font-medium whitespace-nowrap sm:inline">
            WhatsApp
          </span>
        </a>
      </div>
    </div>
  );
}
