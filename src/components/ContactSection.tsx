import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  MessageSquare,
  Phone,
  RotateCcw,
} from 'lucide-react';
import {
  CONTACT_INFO,
  PAIN_REGIONS,
  PERIOD_OPTIONS,
} from '../data/clinicData';
import { BookingSpecialtyOption } from '../types';
import { Reveal } from './MotionPrimitives';

interface ContactSectionProps {
  selectedSpecialty: BookingSpecialtyOption;
  onSpecialtyChange: (specialty: BookingSpecialtyOption) => void;
  nameInputRef: React.RefObject<HTMLInputElement | null>;
}

const SPECIALTY_OPTIONS: BookingSpecialtyOption[] = [
  'Quiropraxia Clínica',
  'Acupuntura Terapêutica',
  'Ventosaterapia Miofascial',
  'Avaliação Integrada',
];

function formatBrazilPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11);
  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function getTodayIsoDate(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60_000);
  return local.toISOString().split('T')[0];
}

export function ContactSection({
  selectedSpecialty,
  onSpecialtyChange,
  nameInputRef,
}: ContactSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [painRegion, setPainRegion] = useState<string>(PAIN_REGIONS[0]);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredPeriod, setPreferredPeriod] = useState<string>(
    PERIOD_OPTIONS[0]
  );
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedProtocol, setSubmittedProtocol] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!preferredDate) {
      setPreferredDate(getTodayIsoDate());
    }
  }, [preferredDate]);

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};

    if (name.trim().length < 3) {
      nextErrors.name = 'Informe seu nome completo para o agendamento.';
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      nextErrors.phone = 'Informe um telefone ou WhatsApp válido com DDD.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      nextErrors.email = 'Informe um endereço de e-mail válido.';
    }

    if (!preferredDate) {
      nextErrors.preferredDate = 'Selecione uma data de preferência.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    const code = `OLR-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedProtocol(code);
  };

  const handleReset = () => {
    setSubmittedProtocol(null);
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
    setErrors({});
  };

  const buildWhatsAppHref = () => {
    const formattedDate = preferredDate
      ? preferredDate.split('-').reverse().join('/')
      : 'A combinar';

    const message = [
      `Olá, gostaria de agendar uma avaliação na clínica ${CONTACT_INFO.businessName}.`,
      `Nome: ${name || 'Não informado'}`,
      `Especialidade: ${selectedSpecialty}`,
      `Região principal: ${painRegion}`,
      `Preferência: ${formattedDate} (${preferredPeriod})`,
      notes.trim() ? `Observações: ${notes.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${CONTACT_INFO.whatsappDigits}?text=${encodeURIComponent(
      message
    )}`;
  };

  return (
    <section
      id="contato"
      aria-labelledby="contato-heading"
      className="py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Coluna Esquerda: Informações Institucionais & Fluxo da Consulta */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <Reveal>
                <p className="text-xs font-medium tracking-wide text-primary-deep sm:text-sm">
                  Agendamento Online & Atendimento
                </p>
                <h2
                  id="contato-heading"
                  className="mt-3 font-display text-[clamp(2rem,3.6vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-foreground"
                >
                  Inicie sua avaliação com precisão clínica.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Solicite seu horário pelo formulário ao lado ou fale diretamente com nossa equipe pelo telefone para definir a melhor conduta para sua coluna.
                </p>
              </Reveal>

              {/* Dados de Contato Diretos */}
              <Reveal
                delay={0.08}
                className="mt-8 divide-y divide-border rounded-xl border border-border bg-surface-elevated shadow-[var(--shadow-hairline)]"
              >
                <div className="flex items-start gap-4 p-5">
                  <MapPin
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary-deep"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-medium text-subtle-foreground">
                      Endereço do Consultório
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      {CONTACT_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5">
                  <Phone
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary-deep"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-medium text-subtle-foreground">
                      Telefone / WhatsApp
                    </p>
                    <a
                      href={`tel:${CONTACT_INFO.whatsappDigits}`}
                      className="mt-1 inline-block text-sm font-medium text-foreground tabular-nums transition-colors hover:text-primary-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5">
                  <Clock
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary-deep"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-medium text-subtle-foreground">
                      Horário de Funcionamento
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      {CONTACT_INFO.hours}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Etapas da Primeira Avaliação */}
            <Reveal delay={0.14} className="mt-8 rounded-xl border border-border bg-surface p-6">
              <p className="font-display text-sm font-semibold text-foreground">
                Como funciona a primeira consulta
              </p>
              <ol className="mt-4 space-y-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                <li className="flex gap-3">
                  <span className="font-display font-semibold text-primary-deep tabular-nums">
                    01.
                  </span>
                  <span>
                    Anamnese detalhada do histórico de dor, exames prévios e rotina postural.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-display font-semibold text-primary-deep tabular-nums">
                    02.
                  </span>
                  <span>
                    Testes neurológicos, ortopédicos e palpação segmentar da coluna.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-display font-semibold text-primary-deep tabular-nums">
                    03.
                  </span>
                  <span>
                    Aplicação da conduta inicial indicada (Quiropraxia, Acupuntura ou Ventosaterapia).
                  </span>
                </li>
              </ol>
            </Reveal>
          </div>

          {/* Coluna Direita: Formulário de Agendamento Online */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="rounded-xl border border-border bg-surface-elevated p-6 shadow-[var(--shadow-card)] sm:p-8 lg:p-10">
              {submittedProtocol ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="space-y-6 py-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-deep">
                      <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-primary-deep tabular-nums">
                        Solicitação registrada · Protocolo {submittedProtocol}
                      </p>
                      <h3 className="mt-1 font-display text-2xl font-semibold text-foreground">
                        Pré-agendamento recebido com sucesso.
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        Obrigado, <strong className="font-medium text-foreground">{name}</strong>. Nossa recepção confirmará a disponibilidade para{' '}
                        <strong className="font-medium text-foreground">
                          {selectedSpecialty}
                        </strong>{' '}
                        no período da <strong className="font-medium text-foreground">{preferredPeriod.toLowerCase()}</strong> pelo telefone{' '}
                        <span className="tabular-nums">{phone}</span>.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 rounded-lg border border-border bg-surface p-5 text-xs sm:grid-cols-2 sm:text-sm">
                    <div>
                      <span className="text-subtle-foreground">Especialidade</span>
                      <p className="mt-0.5 font-medium text-foreground">
                        {selectedSpecialty}
                      </p>
                    </div>
                    <div>
                      <span className="text-subtle-foreground">Região de foco</span>
                      <p className="mt-0.5 font-medium text-foreground">
                        {painRegion}
                      </p>
                    </div>
                    <div>
                      <span className="text-subtle-foreground">Data preferencial</span>
                      <p className="mt-0.5 font-medium text-foreground tabular-nums">
                        {preferredDate.split('-').reverse().join('/')} · {preferredPeriod}
                      </p>
                    </div>
                    <div>
                      <span className="text-subtle-foreground">Contato informado</span>
                      <p className="mt-0.5 font-medium text-foreground">
                        {email}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <a
                      href={buildWhatsAppHref()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary-deep px-5 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-accent)] transition-colors hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary whitespace-nowrap shrink-0"
                    >
                      <MessageSquare className="h-4 w-4" aria-hidden="true" />
                      <span>Enviar resumo no WhatsApp</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <RotateCcw className="h-4 w-4" aria-hidden="true" />
                      <span>Novo agendamento</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="border-b border-border pb-5">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      Agendamento Online
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                      Selecione a especialidade desejada e informe seus dados para retorno prioritário.
                    </p>
                  </div>

                  {/* Seleção de Especialidade */}
                  <div>
                    <label className="block text-xs font-medium text-foreground sm:text-sm">
                      Especialidade pretendida
                    </label>
                    <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {SPECIALTY_OPTIONS.map((option) => {
                        const active = selectedSpecialty === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => onSpecialtyChange(option)}
                            aria-pressed={active}
                            className={`flex min-h-11 items-center justify-between rounded-lg border px-3.5 py-2.5 text-left text-xs font-medium transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-sm ${
                              active
                                ? 'border-primary bg-primary-soft text-primary-deep'
                                : 'border-border bg-background text-muted-foreground hover:border-border-strong hover:text-foreground'
                            }`}
                          >
                            <span className="truncate">{option}</span>
                            <span
                              aria-hidden="true"
                              className={`h-2 w-2 shrink-0 rounded-full ${
                                active ? 'bg-primary-deep' : 'bg-border-strong'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dados do Paciente */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="booking-name"
                        className="block text-xs font-medium text-foreground sm:text-sm"
                      >
                        Nome completo
                      </label>
                      <input
                        ref={nameInputRef}
                        id="booking-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) {
                            setErrors((prev) => ({ ...prev, name: '' }));
                          }
                        }}
                        placeholder="Ex.: Mariana Albuquerque"
                        className="mt-1.5 min-h-11 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-subtle-foreground transition-colors focus:border-primary focus:outline-none"
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-danger" role="alert">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="booking-phone"
                        className="block text-xs font-medium text-foreground sm:text-sm"
                      >
                        Telefone ou WhatsApp
                      </label>
                      <input
                        id="booking-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        value={phone}
                        onChange={(e) => {
                          setPhone(formatBrazilPhone(e.target.value));
                          if (errors.phone) {
                            setErrors((prev) => ({ ...prev, phone: '' }));
                          }
                        }}
                        placeholder="(00) 00000-0000"
                        className="mt-1.5 min-h-11 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground tabular-nums placeholder:text-subtle-foreground transition-colors focus:border-primary focus:outline-none"
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-xs text-danger" role="alert">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="booking-email"
                        className="block text-xs font-medium text-foreground sm:text-sm"
                      >
                        E-mail
                      </label>
                      <input
                        id="booking-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) {
                            setErrors((prev) => ({ ...prev, email: '' }));
                          }
                        }}
                        placeholder="paciente@exemplo.com.br"
                        className="mt-1.5 min-h-11 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-subtle-foreground transition-colors focus:border-primary focus:outline-none"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-danger" role="alert">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Queixa, Data e Período */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-12">
                    <div className="sm:col-span-5">
                      <label
                        htmlFor="booking-region"
                        className="block text-xs font-medium text-foreground sm:text-sm"
                      >
                        Região principal da dor
                      </label>
                      <select
                        id="booking-region"
                        value={painRegion}
                        onChange={(e) => setPainRegion(e.target.value)}
                        className="mt-1.5 min-h-11 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground transition-colors focus:border-primary focus:outline-none"
                      >
                        {PAIN_REGIONS.map((region) => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="booking-date"
                        className="block text-xs font-medium text-foreground sm:text-sm"
                      >
                        Data preferencial
                      </label>
                      <div className="relative mt-1.5">
                        <input
                          id="booking-date"
                          type="date"
                          min={getTodayIsoDate()}
                          value={preferredDate}
                          onChange={(e) => {
                            setPreferredDate(e.target.value);
                            if (errors.preferredDate) {
                              setErrors((prev) => ({
                                ...prev,
                                preferredDate: '',
                              }));
                            }
                          }}
                          className="min-h-11 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground tabular-nums transition-colors focus:border-primary focus:outline-none"
                        />
                      </div>
                      {errors.preferredDate && (
                        <p className="mt-1.5 text-xs text-danger" role="alert">
                          {errors.preferredDate}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-3">
                      <span className="block text-xs font-medium text-foreground sm:text-sm">
                        Período
                      </span>
                      <div className="mt-1.5 grid grid-cols-3 gap-1 rounded-lg border border-border bg-surface p-1">
                        {PERIOD_OPTIONS.map((period) => {
                          const active = preferredPeriod === period;
                          return (
                            <button
                              key={period}
                              type="button"
                              onClick={() => setPreferredPeriod(period)}
                              aria-pressed={active}
                              className={`min-h-9 rounded-md px-1.5 py-1.5 text-xs font-medium transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-primary ${
                                active
                                  ? 'bg-surface-elevated text-foreground shadow-[var(--shadow-hairline)]'
                                  : 'text-muted-foreground hover:text-foreground'
                              }`}
                            >
                              {period}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Sintomas Adicionais */}
                  <div>
                    <label
                      htmlFor="booking-notes"
                      className="block text-xs font-medium text-foreground sm:text-sm"
                    >
                      Breve descrição dos sintomas{' '}
                      <span className="font-normal text-subtle-foreground">
                        (opcional)
                      </span>
                    </label>
                    <textarea
                      id="booking-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Informe há quanto tempo sente desconforto, se há formigamento ou exames recentes."
                      className="mt-1.5 w-full resize-none rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-subtle-foreground transition-colors focus:border-primary focus:outline-none"
                    />
                  </div>

                  {/* Ação Primária Única */}
                  <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-xs text-subtle-foreground">
                      <Calendar className="h-4 w-4 shrink-0 text-primary-deep" aria-hidden="true" />
                      <span>Confirmação direta com a equipe clínica</span>
                    </div>

                    <button
                      type="submit"
                      className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-lg bg-primary-deep px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-accent)] transition-all duration-150 hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Entrar em contato</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
