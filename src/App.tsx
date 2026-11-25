import React, { useRef, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SpecialtiesSection } from './components/SpecialtiesSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { BookingSpecialtyOption } from './types';

export default function App() {
  const [selectedSpecialty, setSelectedSpecialty] =
    useState<BookingSpecialtyOption>('Quiropraxia Clínica');
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const scrollToContact = () => {
    const contactEl = document.getElementById('contato');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
      window.setTimeout(() => {
        nameInputRef.current?.focus({ preventScroll: true });
      }, 450);
    }
  };

  const handleSelectSpecialtyForBooking = (
    specialty: BookingSpecialtyOption
  ) => {
    setSelectedSpecialty(specialty);
    scrollToContact();
  };

  return (
    <div className="clinical-grain relative min-h-screen bg-background text-foreground">
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-primary-deep focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Pular para o conteúdo principal
      </a>

      <Navbar onContactClick={scrollToContact} />

      <main id="conteudo-principal">
        <HeroSection onContactClick={scrollToContact} />
        <SpecialtiesSection
          onSelectSpecialtyForBooking={handleSelectSpecialtyForBooking}
        />
        <AboutSection onContactClick={scrollToContact} />
        <ContactSection
          selectedSpecialty={selectedSpecialty}
          onSpecialtyChange={setSelectedSpecialty}
          nameInputRef={nameInputRef}
        />
      </main>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
