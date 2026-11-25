import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Check, ChevronDown, Clock } from 'lucide-react';
import { SPECIALTIES } from '../data/clinicData';
import { BookingSpecialtyOption, SpecialtyId } from '../types';
import { ClinicalImage, Reveal } from './MotionPrimitives';

interface SpecialtiesSectionProps {
  onSelectSpecialtyForBooking: (specialty: BookingSpecialtyOption) => void;
}

type FilterOption = 'todas' | SpecialtyId;

const FILTER_TABS: { id: FilterOption; label: string }[] = [
  { id: 'todas', label: 'Todas as Especialidades' },
  { id: 'quiropraxia', label: 'Quiropraxia' },
  { id: 'acupuntura', label: 'Acupuntura' },
  { id: 'ventosaterapia', label: 'Ventosaterapia' },
];

export function SpecialtiesSection({
  onSelectSpecialtyForBooking,
}: SpecialtiesSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('todas');
  const [expandedId, setExpandedId] = useState<SpecialtyId>('quiropraxia');
  const prefersReducedMotion = useReducedMotion();

  const visibleSpecialties =
    activeFilter === 'todas'
      ? SPECIALTIES
      : SPECIALTIES.filter((item) => item.id === activeFilter);

  const handleFilterClick = (id: FilterOption) => {
    setActiveFilter(id);
    if (id !== 'todas') {
      setExpandedId(id);
    }
  };

  return (
    <section
      id="especialidades"
      aria-labelledby="especialidades-heading"
      className="border-b border-border py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        {/* Cabeçalho da Seção */}
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="text-xs font-medium tracking-wide text-primary-deep sm:text-sm">
              Protocolos Terapêuticos Baseados em Evidência
            </p>
            <h2
              id="especialidades-heading"
              className="mt-3 font-display text-[clamp(2rem,3.6vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-foreground"
            >
              Especialidades estruturadas para alívio duradouro.
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Cada técnica atua em uma camada complementar da dor — da articulação vertebral à modulação neurológica e à liberação fascial profunda.
            </p>
          </Reveal>
        </div>

        {/* Controle Segmentado Funcional de Filtro */}
        <Reveal delay={0.12} className="mt-10">
          <div
            role="tablist"
            aria-label="Filtrar especialidades clínicas"
            className="inline-flex max-w-full flex-wrap items-center gap-1 rounded-lg border border-border bg-surface p-1"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleFilterClick(tab.id)}
                  className={`min-h-10 rounded-md px-3.5 py-2 text-xs font-medium transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-sm ${
                    isActive
                      ? 'bg-surface-elevated text-foreground shadow-[var(--shadow-hairline)]'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Grade Bento Assimétrica */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {visibleSpecialties.map((specialty, index) => {
            const isFeaturedGrid = activeFilter === 'todas' && index === 0;
            const isExpanded =
              activeFilter !== 'todas' || expandedId === specialty.id;

            const colSpanClass =
              activeFilter !== 'todas'
                ? 'lg:col-span-12'
                : isFeaturedGrid
                  ? 'lg:col-span-12'
                  : 'lg:col-span-6';

            return (
              <motion.article
                key={specialty.id}
                layout={!prefersReducedMotion}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`${colSpanClass} group flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface-elevated shadow-[var(--shadow-hairline)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]`}
              >
                <div
                  className={`grid grid-cols-1 ${
                    isFeaturedGrid || activeFilter !== 'todas'
                      ? 'lg:grid-cols-12'
                      : ''
                  }`}
                >
                  {/* Imagem da Especialidade */}
                  <div
                    className={
                      isFeaturedGrid || activeFilter !== 'todas'
                        ? 'lg:col-span-5'
                        : ''
                    }
                  >
                    <ClinicalImage
                      src={specialty.image}
                      alt={specialty.imageAlt}
                      aspectClassName={
                        isFeaturedGrid || activeFilter !== 'todas'
                          ? 'aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[340px]'
                          : 'aspect-[4/3]'
                      }
                      className="h-full w-full group-hover:[&_img]:scale-[1.03]"
                    />
                  </div>

                  {/* Conteúdo Clínico */}
                  <div
                    className={`flex flex-col justify-between p-6 sm:p-8 ${
                      isFeaturedGrid || activeFilter !== 'todas'
                        ? 'lg:col-span-7'
                        : ''
                    }`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                        <span className="font-medium text-primary-deep tabular-nums">
                          {specialty.index}. {specialty.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-subtle-foreground">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                          {specialty.sessionDuration}
                        </span>
                      </div>

                      <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                        {specialty.title}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-muted-foreground">
                        {specialty.subtitle}
                      </p>

                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {specialty.summary}
                      </p>

                      {/* Dossiê Clínico Expansível */}
                      <div className="mt-5 border-t border-border pt-4">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedId(
                              isExpanded && activeFilter === 'todas'
                                ? ('' as SpecialtyId)
                                : specialty.id
                            )
                          }
                          aria-expanded={isExpanded}
                          className="flex min-h-10 w-full items-center justify-between text-left text-xs font-medium text-foreground transition-colors hover:text-primary-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer sm:text-sm"
                        >
                          <span>Indicações clínicas e mecanismo terapêutico</span>
                          <ChevronDown
                            className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-primary-deep' : ''
                            }`}
                            aria-hidden="true"
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={
                                prefersReducedMotion
                                  ? false
                                  : { opacity: 0, height: 0 }
                              }
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={
                                prefersReducedMotion
                                  ? undefined
                                  : { opacity: 0, height: 0 }
                              }
                              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-4 pt-4">
                                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                  {specialty.clinicalMechanism}
                                </p>
                                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                  {specialty.indications.map((indication) => (
                                    <li
                                      key={indication}
                                      className="flex items-start gap-2 text-xs text-foreground sm:text-sm"
                                    >
                                      <Check
                                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-deep"
                                        aria-hidden="true"
                                      />
                                      <span>{indication}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* CTA da Especialidade */}
                    <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                      <span className="text-xs text-subtle-foreground">
                        Avaliação prévia obrigatória
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          onSelectSpecialtyForBooking(specialty.bookingValue)
                        }
                        className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-xs font-medium text-foreground transition-all duration-150 hover:border-primary hover:bg-primary-deep hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary whitespace-nowrap shrink-0 cursor-pointer sm:text-sm"
                      >
                        <span>Entrar em contato</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
