import React, { useState } from 'react';
import { ArrowUpRight, Quote } from 'lucide-react';
import { ABOUT_IMAGE, CLINICAL_PILLARS, TESTIMONIALS } from '../data/clinicData';
import { ClinicalImage, Reveal } from './MotionPrimitives';

interface AboutSectionProps {
  onContactClick: () => void;
}

export function AboutSection({ onContactClick }: AboutSectionProps) {
  const [activeTestimonialId, setActiveTestimonialId] = useState(
    TESTIMONIALS[0].id
  );

  return (
    <section
      id="sobre"
      aria-labelledby="sobre-heading"
      className="border-b border-border py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        {/* Bloco 1: Coluna Vertebral e Sistema Nervoso */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Fotografia Vertical Editorial */}
          <Reveal className="lg:col-span-5">
            <div className="relative h-full overflow-hidden rounded-xl border border-border bg-surface-elevated p-2 shadow-[var(--shadow-card)]">
              <ClinicalImage
                src={ABOUT_IMAGE.src}
                alt={ABOUT_IMAGE.alt}
                aspectClassName="aspect-[3/4] lg:aspect-auto lg:h-full lg:min-h-[540px]"
                className="rounded-lg"
              />
            </div>
          </Reveal>

          {/* Narrativa Clínica sobre Coluna e Nervos */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <Reveal>
                <p className="text-xs font-medium tracking-wide text-primary-deep sm:text-sm">
                  Neurobiomecânica da Coluna Vertebral
                </p>
                <h2
                  id="sobre-heading"
                  className="mt-3 font-display text-[clamp(2rem,3.6vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-foreground"
                >
                  A saúde dos seus nervos começa no alinhamento vertebral.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  A coluna vertebral protege a medula espinal e as raízes nervosas que coordenam força muscular, sensibilidade e equilíbrio postural. Pequenas restrições de mobilidade entre vértebras geram inflamação local, sobrecarga discal e irradiações que comprometem toda a rotina.
                </p>
              </Reveal>

              {/* 4 Pilares Numerados com Divisores Hairline */}
              <div className="mt-8 divide-y divide-border border-y border-border">
                {CLINICAL_PILLARS.map((pillar, index) => (
                  <Reveal
                    key={pillar.index}
                    delay={index * 0.06}
                    className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-12 sm:gap-6"
                  >
                    <div className="flex items-baseline gap-3 sm:col-span-5">
                      <span className="font-display text-sm font-semibold text-primary-deep tabular-nums">
                        {pillar.index}.
                      </span>
                      <h3 className="font-display text-base font-semibold tracking-tight text-foreground sm:text-lg">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:col-span-7">
                      {pillar.description}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.18} className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-subtle-foreground sm:text-sm">
                Atendimento clínico conduzido por{' '}
                <strong className="font-medium text-foreground">
                  Orleane Leitão Reis
                </strong>{' '}
                · Fisioterapia e Quiropraxia
              </p>
              <button
                type="button"
                onClick={onContactClick}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary-deep px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-hairline)] transition-all duration-150 hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Entrar em contato</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </Reveal>
          </div>
        </div>

        {/* Bloco 2: Depoimentos de Alívio (Adjacente às evidências clínicas) */}
        <div
          id="depoimentos"
          aria-labelledby="depoimentos-heading"
          className="mt-20 border-t border-border pt-16 sm:mt-24 sm:pt-20"
        >
          <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="text-xs font-medium tracking-wide text-primary-deep sm:text-sm">
                Depoimentos de Alívio Funcional
              </p>
              <h3
                id="depoimentos-heading"
                className="mt-3 font-display text-[clamp(1.75rem,3vw,2.65rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-foreground"
              >
                Recuperação documentada na rotina de quem voltou a se mover.
              </h3>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-5">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Relatos reais sobre evolução de quadros lombares, cervicais e miofasciais acompanhados com protocolo individualizado.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((item, idx) => {
              const isSelected = activeTestimonialId === item.id;
              return (
                <Reveal key={item.id} delay={idx * 0.08}>
                  <article
                    onClick={() => setActiveTestimonialId(item.id)}
                    className={`flex h-full flex-col justify-between rounded-xl border p-6 transition-all duration-200 sm:p-7 cursor-pointer ${
                      isSelected
                        ? 'border-primary/50 bg-surface-elevated shadow-[var(--shadow-card)]'
                        : 'border-border bg-surface-elevated/80 shadow-[var(--shadow-hairline)] hover:-translate-y-0.5 hover:border-border-strong'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <Quote
                          className="h-5 w-5 text-primary-deep"
                          aria-hidden="true"
                        />
                        <span className="text-xs font-medium text-primary-deep tabular-nums">
                          {item.outcomeMetric}
                        </span>
                      </div>

                      <blockquote className="mt-5 text-sm leading-relaxed text-foreground sm:text-[15px]">
                        “{item.quote}”
                      </blockquote>
                    </div>

                    <div className="mt-6 border-t border-border pt-4">
                      <p className="font-display text-base font-semibold text-foreground">
                        {item.patientName}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {item.patientContext}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-subtle-foreground">
                        <span>{item.condition}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.intervention}</span>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
