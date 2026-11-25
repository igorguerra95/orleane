import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { CONTACT_INFO } from '../data/clinicData';

interface NavbarProps {
  onContactClick: () => void;
}

const NAV_LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#especialidades', label: 'Especialidades' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' },
] as const;

export function Navbar({ onContactClick }: NavbarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDrawerOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [drawerOpen]);

  const handleMobileNav = (href: string) => {
    setDrawerOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  const handleMobileContact = () => {
    setDrawerOpen(false);
    onContactClick();
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
          scrolled
            ? 'border-b border-border bg-background/90 backdrop-blur-md'
            : 'border-b border-transparent bg-background/75 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between gap-8 px-4 sm:px-6 lg:px-10">
          {/* Zona 1: Marca em linha única */}
          <a
            href="#inicio"
            className="font-display text-base font-semibold tracking-tight text-foreground whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:text-lg"
          >
            Orleane Leitão Reis
          </a>

          {/* Zona 2: Links de navegação concisos em linha única */}
          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-8 md:flex"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative py-1 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-200 group-hover:scale-x-100"
                />
              </a>
            ))}
          </nav>

          {/* Zona 3: Ação primária única + gatilho do drawer mobile */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onContactClick}
              className="hidden min-h-10 items-center gap-2 rounded-lg bg-primary-deep px-4 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-hairline)] transition-all duration-150 hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary whitespace-nowrap shrink-0 cursor-pointer md:inline-flex"
            >
              <span>Entrar em contato</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Abrir menu de navegação"
              aria-expanded={drawerOpen}
              aria-controls="mobile-navigation-sheet"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface-elevated text-foreground transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:hidden cursor-pointer"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Sheet / Drawer Mobile */}
      <AnimatePresence>
        {drawerOpen && (
          <div
            id="mobile-navigation-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Menu principal"
            className="fixed inset-0 z-50 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-foreground/35 backdrop-blur-xs"
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.28,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="fixed inset-y-0 right-0 flex w-full max-w-xs flex-col justify-between border-l border-border bg-background p-6 shadow-[var(--shadow-elevated)]"
            >
              <div>
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <span className="font-display text-base font-semibold tracking-tight text-foreground">
                    Orleane Leitão Reis
                  </span>
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    aria-label="Fechar menu de navegação"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface-elevated text-foreground transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <nav aria-label="Links do menu mobile" className="mt-6 flex flex-col gap-1">
                  {NAV_LINKS.map((link, idx) => (
                    <button
                      key={link.href}
                      type="button"
                      onClick={() => handleMobileNav(link.href)}
                      className="flex min-h-12 w-full items-center justify-between rounded-lg px-3 py-3 text-left font-display text-lg font-medium text-foreground transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer"
                    >
                      <span>{link.label}</span>
                      <span className="text-xs font-sans text-subtle-foreground tabular-nums">
                        0{idx + 1}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="space-y-4 border-t border-border pt-6">
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p className="font-medium text-foreground">Atendimento Clínico</p>
                  <p>{CONTACT_INFO.phone}</p>
                  <p>{CONTACT_INFO.address}</p>
                </div>

                <button
                  type="button"
                  onClick={handleMobileContact}
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary-deep px-5 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-accent)] transition-colors hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer"
                >
                  <span>Entrar em contato</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
