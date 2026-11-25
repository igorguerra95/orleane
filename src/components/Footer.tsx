import React from 'react';
import { CONTACT_INFO } from '../data/clinicData';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface py-12 sm:py-16">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-lg font-semibold tracking-tight text-foreground">
              {CONTACT_INFO.businessName}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Cuidado clínico especializado em coluna vertebral, descompressão neural, quiropraxia, acupuntura e liberação miofascial.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-medium tracking-wide text-subtle-foreground">
              Navegação
            </p>
            <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href="#inicio"
                  className="transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#especialidades"
                  className="transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  Especialidades
                </a>
              </li>
              <li>
                <a
                  href="#sobre"
                  className="transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  Sobre e Depoimentos
                </a>
              </li>
              <li>
                <a
                  href="#contato"
                  className="transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  Contato e Agendamento
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-medium tracking-wide text-subtle-foreground">
              Informações de Contato
            </p>
            <dl className="mt-3 space-y-2 text-sm text-muted-foreground">
              <div>
                <dt className="inline font-medium text-foreground">Endereço: </dt>
                <dd className="inline">{CONTACT_INFO.address}</dd>
              </div>
              <div>
                <dt className="inline font-medium text-foreground">Telefone: </dt>
                <dd className="inline tabular-nums">{CONTACT_INFO.phone}</dd>
              </div>
              <div>
                <dt className="inline font-medium text-foreground">Horário: </dt>
                <dd className="inline">{CONTACT_INFO.hours}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-subtle-foreground sm:flex-row sm:items-center">
          <p>
            © {currentYear} {CONTACT_INFO.businessName}. Todos os direitos reservados.
          </p>
          <p>Fisioterapia · Quiropraxia Clínica · Acupuntura Terapêutica</p>
        </div>
      </div>
    </footer>
  );
}
