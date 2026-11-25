import heroSpineImg from '../assets/images/hero_spine_relief_1795607550468.jpg';
import chiropracticImg from '../assets/images/specialty_chiropractic_1795607552257.jpg';
import acupunctureImg from '../assets/images/specialty_acupuncture_1795607551907.jpg';
import cuppingImg from '../assets/images/specialty_cupping_1795607551189.jpg';
import aboutSpineImg from '../assets/images/about_nerve_spine_1795607555137.jpg';
import {
  ClinicMetric,
  ClinicalPillar,
  ContactInfo,
  ReliefTestimonial,
  SpecialtyItem,
} from '../types';

export const HERO_IMAGE = {
  src: heroSpineImg,
  alt: 'Consultório de fisioterapia e quiropraxia com modelo anatômico de coluna vertebral sobre bancada em madeira natural e iluminação suave',
};

export const ABOUT_IMAGE = {
  src: aboutSpineImg,
  alt: 'Ambiente clínico de avaliação neurológica e biomecânica da coluna vertebral com diagrama anatômico e exame de imagem',
};

export const CONTACT_INFO: ContactInfo = {
  businessName: 'Orleane Leitão Reis - Fisioterapia / Quiropraxia',
  address: 'SEU ENDEREÇO AQUI',
  phone: '(00) 00000-0000',
  whatsappDigits: '5500000000000',
  hours: 'Não informado',
};

export const CLINIC_METRICS: ClinicMetric[] = [
  {
    id: 'atendimentos',
    value: 2800,
    prefix: '+',
    label: 'Sessões clínicas conduzidas',
    detail: 'Protocolos individuais para coluna vertebral e articulações periféricas.',
  },
  {
    id: 'alivio',
    value: 94,
    suffix: '%',
    label: 'Melhora funcional relatada',
    detail: 'Redução significativa da escala de dor após as primeiras 4 sessões.',
  },
  {
    id: 'tempo',
    value: 50,
    suffix: ' min',
    label: 'Dedicação por consulta',
    detail: 'Avaliação neurológica, ajuste preciso e reeducação sem pressa.',
  },
  {
    id: 'especialidades',
    value: 3,
    label: 'Pilares terapêuticos integrados',
    detail: 'Sinergia entre quiropraxia estrutural, acupuntura e liberação miofascial.',
  },
];

export const SPECIALTIES: SpecialtyItem[] = [
  {
    id: 'quiropraxia',
    index: '01',
    title: 'Quiropraxia Clínica',
    subtitle: 'Alinhamento vertebral e descompressão radicular',
    category: 'Biomecânica & Coluna',
    summary:
      'Ajustes articulares de alta precisão para restaurar a mobilidade segmentar da coluna, reduzir a sobrecarga discal e aliviar irritações em raízes nervosas.',
    clinicalMechanism:
      'Após testes ortopédicos e palpação dinâmica, aplicam-se manipulações controladas de baixa amplitude que devolvem o eixo fisiológico às vértebras e normalizam o tônus paravertebral.',
    indications: [
      'Lombalgia aguda e ciatalgia irradiada',
      'Cervicalgia tensional e cefaleia cervicogênica',
      'Protusões discais e bloqueios facetários',
      'Desalinhamentos pélvicos e escapulares',
    ],
    sessionDuration: '45 a 50 minutos',
    image: chiropracticImg,
    imageAlt: 'Fisioterapeuta realizando ajuste quiroprático preciso na região torácica e lombar do paciente',
    bookingValue: 'Quiropraxia Clínica',
    featured: true,
  },
  {
    id: 'acupuntura',
    index: '02',
    title: 'Acupuntura Terapêutica',
    subtitle: 'Modulação neurofisiológica da dor e inflamação',
    category: 'Neuroregulação Somática',
    summary:
      'Estimulação de pontos específicos com agulhas filiformes estéreis para inibir vias nociceptivas, equilibrar o sistema nervoso autônomo e acelerar o reparo tecidual.',
    clinicalMechanism:
      'A inserção precisa promove a liberação endógena de endorfinas e serotonina, reduzindo citocinas inflamatórias locais e relaxando fibras musculares em espasmo persistente.',
    indications: [
      'Neuralgias e dores crônicas refratárias',
      'Distúrbios do sono associados à dor contínua',
      'Tendinopatias, bursites e pontos-gatilho ativos',
      'Sobrecarga neurovegetativa e rigidez cervical',
    ],
    sessionDuration: '45 minutos',
    image: acupunctureImg,
    imageAlt: 'Aplicação cuidadosa de agulhas estéreis de acupuntura ao longo da coluna vertebral em ambiente clínico',
    bookingValue: 'Acupuntura Terapêutica',
  },
  {
    id: 'ventosaterapia',
    index: '03',
    title: 'Ventosaterapia Miofascial',
    subtitle: 'Descompressão tecidual e oxigenação profunda',
    category: 'Liberação & Recuperação',
    summary:
      'Terapia por pressão negativa controlada que eleva planos fasciais aderidos, amplia a microcirculação local e remove metabólitos acumulados por esforço ou postura.',
    clinicalMechanism:
      'A sucção mecânica gera estiramento suave das fáscias superficiais e profundas, preparando a musculatura paravertebral antes do ajuste quiroprático ou acelerando a recuperação pós-treino.',
    indications: [
      'Contraturas dorsais e nódulos miofasciais',
      'Rigidez torácica por longas jornadas sentadas',
      'Restrição de amplitude em ombros e quadris',
      'Fadiga muscular em praticantes de atividade física',
    ],
    sessionDuration: '35 a 40 minutos',
    image: cuppingImg,
    imageAlt: 'Sessão de ventosaterapia com cúpulas posicionadas sobre a musculatura dorsal em estúdio iluminado',
    bookingValue: 'Ventosaterapia Miofascial',
  },
];

export const CLINICAL_PILLARS: ClinicalPillar[] = [
  {
    index: '01',
    title: 'Diagnóstico Funcional da Coluna',
    description:
      'Cada consulta inicia com exame físico ortopédico, análise postural e mapeamento de dermátomos para identificar a origem mecânica ou neural da dor — nunca apenas o sintoma.',
  },
  {
    index: '02',
    title: 'Descompressão Segura dos Nervos',
    description:
      'Quando uma vértebra perde mobilidade, raízes nervosas sofrem compressão inflamatória. O ajuste calibrado restaura o espaço intervertebral e devolve a condução neural limpa.',
  },
  {
    index: '03',
    title: 'Integração Fisioterapêutica',
    description:
      'Unimos a precisão estrutural da quiropraxia à modulação neural da acupuntura e à descompressão miofascial da ventosaterapia para consolidar o alívio em menor tempo.',
  },
  {
    index: '04',
    title: 'Autonomia e Manutenção do Movimento',
    description:
      'O paciente recebe orientações ergonômicas objetivas e exercícios de estabilização segmentar para sustentar os ganhos fora do consultório.',
  },
];

export const TESTIMONIALS: ReliefTestimonial[] = [
  {
    id: 'henrique',
    patientName: 'Henrique Vasconcelos',
    patientContext: 'Engenheiro Civil, 42 anos',
    condition: 'Ciatalgia aguda e travamento lombar',
    intervention: 'Quiropraxia Clínica + Ventosaterapia',
    quote:
      'Cheguei ao consultório com dor irradiada até a panturrilha e dificuldade para permanecer sentado por vinte minutos. Após a avaliação detalhada e três sessões integradas, recuperei a extensão completa da lombar e retornei às vistorias de obra sem analgésicos.',
    outcomeMetric: 'Alívio da irradiação em 3 sessões',
  },
  {
    id: 'marina',
    patientName: 'Marina Alencar',
    patientContext: 'Arquiteta, 35 anos',
    condition: 'Cervicalgia crônica e cefaleia tensional',
    intervention: 'Acupuntura Terapêutica + Ajustes Cervicais',
    quote:
      'Convivia com rigidez no pescoço e dores de cabeça semanais após longas horas diante de projetos. A combinação de acupuntura com manipulação cervical precisa dissolveu os pontos de tensão e devolveu a qualidade do meu sono.',
    outcomeMetric: 'Redução de 90% nas crises mensais',
  },
  {
    id: 'roberto',
    patientName: 'Roberto Siqueira',
    patientContext: 'Cirurgião-Dentista, 51 anos',
    condition: 'Sobrecarga torácica e limitação escapular',
    intervention: 'Protocolo Integrado de Coluna',
    quote:
      'A postura de atendimento odontológico havia comprometido minha mobilidade torácica. O acompanhamento com a Dra. Orleane trouxe clareza técnica sobre a origem do problema e estabilidade real para trabalhar jornadas inteiras com conforto.',
    outcomeMetric: 'Mobilidade restaurada em 4 semanas',
  },
];

export const PAIN_REGIONS = [
  'Coluna Lombar / Nervo Ciático',
  'Coluna Cervical / Pescoço',
  'Região Torácica e Escápulas',
  'Dores Musculares / Tensão Miofascial',
  'Avaliação Postural Preventiva',
] as const;

export const PERIOD_OPTIONS = ['Manhã', 'Tarde', 'Noite'] as const;
