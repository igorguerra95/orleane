import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { CLINIC_METRICS, HERO_IMAGE } from '../data/clinicData';
import { ClinicalImage, CountUpNumber } from './MotionPrimitives';

interface HeroSectionProps {
  onContactClick: () => void;
}

export function HeroSection({ onContactClick }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const fadeSlide = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-border pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-24"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        {/* Grade Assimétrica de 12 Colunas */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Coluna Editorial Principal */}
          <div className="flex flex-col justify-between lg:col-span-7 lg:py-2">
            <div className="space-y-6 sm:space-y-8">
              {/* Metadado limpo sem cápsula/pill */}
              <motion.div
                {...fadeSlide(0)}
                className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium tracking-wide text-primary-deep sm:text-sm"
              >
                <span>Fisioterapia Especializada</span>
                <span aria-hidden="true" className="text-border-strong">
                  ·
                </span>
                <span>Quiropraxia Clínica</span>
                <span aria-hidden="true" className="text-border-strong">
                  ·
                </span>
                <span>Acupuntura</span>
              </motion.div>

              <motion.h1
                id="hero-heading"
                {...fadeSlide(0.08)}
                className="font-display text-[clamp(2.85rem,5.4vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-foreground"
              >
                Alinhamento vertebral preciso para viver sem dor.
              </motion.h1>

              <motion.p
                {...fadeSlide(0.16)}
                className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                Na clínica <strong className="font-medium text-foreground">Orleane Leitão Reis - Fisioterapia / Quiropraxia</strong>, unimos avaliação biomecânica rigorosa, ajustes quiropráticos seguros e acupuntura terapêutica para descomprimir raízes nervosas e restaurar a mobilidade da sua coluna.
              </motion.p>
            </div>

            {/* Ação Principal Única + Âncora Discreta */}
            <motion.div
              {...fadeSlide(0.24)}
              className="mt-8 flex flex-wrap items-center gap-5 pt-2 sm:mt-10"
            >
              <button
                type="button"
                onClick={onContactClick}
                className="group inline-flex min-h-12 items-center gap-3 rounded-lg bg-primary-deep px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-accent)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary whitespace-nowrap shrink-0 cursor-pointer sm:text-base"
              >
                <span>Entrar em contato</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </button>

              <a
                href="#especialidades"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary whitespace-nowrap shrink-0"
              >
                <span>Explorar especialidades</span>
                <ArrowDownRight className="h-4 w-4 text-primary-deep" aria-hidden="true" />
              </a>
            </motion.div>
          </div>

          {/* Coluna Visual Dominante */}
          <motion.div
            {...fadeSlide(0.16)}
            className="lg:col-span-5"
          >
            <div className="relative h-full overflow-hidden rounded-xl border border-border bg-surface-elevated p-2 shadow-[var(--shadow-card)]">
              <ClinicalImage
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                priority
                aspectClassName="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[440px]"
                className="rounded-lg"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-2 rounded-lg bg-gradient-to-t from-foreground/30 via-transparent to-transparent"
              />
              <div className="pointer-events-none absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4 text-primary-foreground">
                <div className="rounded-md bg-foreground/75 px-3.5 py-2.5 backdrop-blur-md">
                  <p className="text-[11px] font-medium tracking-wide text-primary-foreground/80">
                    Abordagem Clínica Integrativa
                  </p>
                  <p className="mt-0.5 font-display text-sm font-medium text-primary-foreground">
                    Coluna Vertebral · Sistema Nervoso · Fáscia Muscular
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Faixa de Métricas em Largura Total abaixo do Split */}
        <motion.div
          {...fadeSlide(0.32)}
          className="mt-12 grid grid-cols-1 divide-y divide-border rounded-xl border border-border bg-surface-elevated shadow-[var(--shadow-hairline)] sm:mt-16 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4"
        >
          {CLINIC_METRICS.map((metric) => (
            <div key={metric.id} className="flex flex-col justify-between p-6 sm:p-7">
              <div className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                <CountUpNumber
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                />
              </div>
              <div className="mt-3 space-y-1">
                <p className="text-sm font-medium text-foreground">{metric.label}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {metric.detail}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
