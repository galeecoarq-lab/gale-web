/**
 * GALE — Single source of truth.
 * All copy lives here so layouts/components remain content-agnostic
 * and can be re-used for new pages.
 */

export const site = {
  name: 'GALE',
  longName: 'Gale Eco Arquitectura',
  tagline: 'Transformamos tus ideas en espacios.',
  /* Cierre / "apartado final" del PDF — también sirve de meta description. */
  description:
    'Somos un estudio de arquitectura de interiores y ejecución de proyectos, enfocado en desarrollar espacios comerciales y residenciales. Buscamos la funcionalidad, la estética, la identidad y la sensibilidad en cada proyecto.',
  url: 'https://galearquitectura.pe',
  email: 'contacto@galearquitectura.pe',
  phone: '+51 942 802 551',
  /* Número en formato internacional sin símbolos, para los enlaces de WhatsApp. */
  whatsapp: '51942802551',
  address: 'Norte del Perú',
  social: {
    instagram: 'https://www.instagram.com/gale.arqui/',
    tiktok: 'https://www.tiktok.com/@gale.ecoarq',
    linkedin: 'https://www.linkedin.com/in/gale-eco-arquitectura-96266425b/',
  },
} as const;

/**
 * Enlaces de acción. Hoy apuntan a WhatsApp con un mensaje precargado;
 * para cambiarlos a Calendly u otro sistema de reservas, edita SOLO aquí.
 */
const wa = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const links = {
  cotizacion: wa('Hola GALE, me gustaría solicitar una cotización para mi proyecto.'),
  asesoria: wa('Hola GALE, me gustaría agendar una asesoría.'),
  reunion: wa('Hola GALE, me gustaría agendar una reunión.'),
  correo: `mailto:${site.email}`,
  instagram: site.social.instagram,
} as const;

export const nav = [
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso',   href: '#proceso'   },
  { label: 'Nosotros',  href: '#nosotros'  },
  { label: 'Contacto',  href: '#contacto'  },
] as const;

/* ── Portada ─────────────────────────────────────────────── */

export const hero = {
  title: 'Transformamos tus ideas en espacios',
  subtitle:
    'Arquitectura, interiorismo y ejecución de proyectos comerciales, corporativos y residenciales en todo el norte del Perú.',
  ctas: [
    { label: 'Solicitar cotización', href: links.cotizacion, variant: 'solid'   },
    { label: 'Agendar asesoría',     href: links.asesoria,   variant: 'outline' },
    { label: 'Ver proyectos',        href: '#proyectos',     variant: 'link', icon: false },
  ],
} as const;

/* Indicadores rápidos de la portada. */
export const heroStats = [
  { value: '+50', label: 'Proyectos comerciales'  },
  { value: '+30', label: 'Proyectos residenciales' },
  { value: '+20', label: 'Proyectos ejecutados'    },
] as const;

export const presence = {
  label: 'Presencia en el norte del Perú',
  cities: ['Jaén', 'Chiclayo', 'Trujillo', 'Lima', 'Iquitos', 'Juliaca'],
  suffix: 'y más',
} as const;

/* ── Nosotros ────────────────────────────────────────────── */

/* Frase de marca: sale de la portada y se vuelve el ancla de "Nosotros". */
export const brandStatement = {
  line1: 'Existimos para inspirar.',
  line2: 'Diseñamos para transformar.',
} as const;

export const about = {
  intro:
    'Somos un estudio de arquitectura de interiores y ejecución de proyectos, enfocado en desarrollar espacios comerciales y residenciales que respondan a las necesidades reales de las personas, combinando funcionalidad, estética y sensibilidad en cada proyecto.',
  philosophyTitle: 'Nuestra filosofía',
  philosophy:
    'En GALE creemos en una arquitectura más humana, empática y consciente, donde la colaboración entre cliente y estudio forma parte fundamental del proceso creativo.',
  /* Foto del equipo (Diana y Luz) en el estudio; al fondo se lee la frase de marca. */
  image: '/images/studio/hero.webp',
  imageAlt: 'Diana y Luz, equipo de GALE, en el estudio',
} as const;

/* ── Proyectos destacados ────────────────────────────────── */

export const featuredProjects = [
  {
    title: 'Casita del Pan',
    subtitle: 'Panadería y restaurante',
    location: 'Jaén',
    image: '/images/projects/casita-del-pan-jaen/foto-02.webp',
  },
  {
    title: 'Maguis Chicken',
    subtitle: 'Restaurante',
    location: 'Neshuya, Pucallpa',
    image: '/images/projects/maguis-chicken-pucallpa/foto-01.webp',
  },
  {
    title: 'Casa Marieta',
    subtitle: 'Residencial',
    location: 'Jaén',
    image: '/images/projects/residencial-casa-jaen/foto-03.webp',
  },
  {
    title: 'COA Ventanilla',
    subtitle: 'Salud',
    location: 'Callao',
    image: '/images/projects/salud-coa-jaen/foto-04.webp',
  },
  {
    title: 'Finca La Colpia',
    subtitle: 'Turístico',
    location: 'San Ignacio, Cajamarca',
    image: '/images/projects/turistico-lacolpa-sanignacio/foto-06.webp',
  },
] as const;

/* ── Servicios (lista desplegable) ───────────────────────── */

export const serviceGroups = [
  {
    title: 'Proyectos integrales',
    summary: 'Del anteproyecto al expediente, con la mirada puesta en el todo.',
    items: ['Vivienda unifamiliar', 'Multifamiliares', 'Expedientes técnicos'],
  },
  {
    title: 'Arquitectura de interiores',
    summary: 'Espacios diseñados a medida para cada tipo de proyecto.',
    items: ['Comercial', 'Residencial', 'Salud', 'Corporativo', 'Retail', 'Turístico · Hotelero'],
  },
  {
    title: 'Obra',
    summary: 'Llevamos el proyecto a la realidad con control y detalle.',
    items: ['Supervisión de obra', 'Ejecución de obra'],
  },
  {
    title: 'Consultoría',
    summary: 'Acompañamiento experto para decidir con criterio.',
    items: ['Asesorías especializadas', 'Optimización de espacios comerciales'],
  },
] as const;

/* ── Rubros (carrusel visual) ────────────────────────────── */

export const sectors = [
  { title: 'Comercial',   image: '/images/projects/comercial.webp' },
  { title: 'Residencial', image: '/images/projects/residencial-lambayeque.webp'   },
  { title: 'Salud',       image: '/images/projects/salud-coa-jaen.webp'        },
  { title: 'Corporativo', image: '/images/projects/corporativo-hcm-jaen.webp'        },
  { title: 'Turístico',   image: '/images/projects/turistico-colpa-sanignacio.webp'        },
  { title: 'Obras',       image: '/images/projects/obras.webp'   }
];

/* ── Proceso ─────────────────────────────────────────────── */

export const process = [
  {
    step: '01',
    title: 'Consultoría inicial',
    description: 'Analizamos el espacio, las necesidades y los objetivos del proyecto mediante reunión inicial, visita técnica e identificación de necesidades operativas y comerciales.',
    image: '/images/highlights/consultoria-inicial.webp',
    spriteImage: '/images/team/person-1.png',
    spriteVideo: '/images/team/person-1-wave-nobg.webm',
  },
  {
    step: '02',
    title: 'Levantamiento de información',
    description: 'Recopilamos toda la información del espacio mediante levantamiento arquitectónico y registro fotográfico.',
    image: '/images/highlights/lecantamiento-informacion.webp',
    spriteImage: '/images/team/person-2.png',
    spriteVideo: '/images/team/person-2-wave-nobg.webm',
  },
  {
    step: '03',
    title: 'Diseño Conceptual',
    description: 'Definimos la identidad visual y la experiencia espacial del proyecto: concepto de diseño, paleta de materiales, colores, referencias visuales y primeras visualizaciones.',
    image: '/images/highlights/diseno-conceptual.webp',
    spriteImage: '/images/team/person-3.png',
    spriteVideo: '/images/team/person-3-wave-nobg.webm',
  },
  {
    step: '04',
    title: 'Desarrollo técnico',
    description: 'Convertimos el diseño en información técnica lista para construir: arquitectura, interiores, mobiliario, iluminación, electricidad, instalaciones sanitarias y detalles constructivos.',
    image: '/images/highlights/desarrollo-tecnico.webp',
    spriteImage: '/images/team/person-4.png',
    spriteVideo: '/images/team/person-4-wave-nobg.webm',
  },
  {
    step: '05',
    title: 'Ejecución y supervisión',
    description: 'Acompañamos la materialización del proyecto para garantizar calidad y coherencia: supervisión técnica, coordinación con proveedores, control de acabados, seguimiento de obra y proyecto construido.',
    image: '/images/highlights/ejecución-y-supervición.webp',
    spriteImage: '/images/team/person-2.png',
    spriteVideo: '/images/team/person-2-wave-nobg.webm',
  },
];

/* ── Testimonios ─────────────────────────────────────────── */

export const testimonials = [
  {
    id: 1,
    quote:
      'Porque con GALE la arquitectura no es solo cuestión de lujo, sino también paciencia, inteligencia y pasión por los detalles. Como empresa queremos espacios donde transmitimos nuestra visión a futuro hacia nuestros clientes y pacientes.',
    author: 'Mónica Arroyo',
    role: 'CEO',
    company: 'Finamedic — Finared Locales',
    image: '/images/testimonials/finamedic-monica.jpeg',
  },
  {
    id: 2,
    quote:
      'GALE, un equipo que desde el inicio de un proyecto te escucha, valora tu opinión e integra todo en una propuesta que da satisfacción a la hora de concretar el proyecto. ¡Excelente equipo!',
    author: 'Hans Cubas',
    role: 'CEO',
    company: 'LCS',
    image: '/images/testimonials/lcs-hans.jpeg',
  },
  {
    id: 3,
    quote:
      'El equipo de GALE, unos profesionales en todo el sentido de la palabra: desde el conocimiento técnico al detalle, hasta la inteligencia emocional para resolver los obstáculos que en todo proyecto se presentan, sin perder la consonancia con los sueños que tenemos como clientes. Muy agradecidos y orgullosos de que formen parte de nuestra historia.',
    author: 'Luis Jiménez',
    role: 'CEO',
    company: 'Casita del Pan',
    image: '/images/testimonials/casita-pan-luis.jpeg',
  },
  {
    id: 4,
    quote:
      'Amé trabajar con GALE. Desde el inicio entendieron mi estilo y todo el proceso fue súper ordenado, creativo y personalizado. Lograron crear un espacio sobrio, elegante y acogedor, con detalles que generan ese efecto wow sin perder la armonía. Quedé muy contenta y agradecida con todo el resultado y el cariño puesto en cada detalle. ¡Gracias a todo el equipo GALE!',
    author: 'Teresa Contreras',
    role: 'Clienta residencial',
    company: 'Proyecto residencial',
    image: '/images/testimonials/clinica-teresa.jpeg',
  },
  {
    id: 5,
    quote:
      'Estamos muy agradecidos con GALE porque logró transformar completamente nuestro taller. No solo creó un espacio mucho más funcional y cómodo para trabajar, sino que también supo entender nuestra esencia y la personalidad de nuestra marca en cada detalle. Los recomendamos muchísimo porque son profesionales que realmente escuchan, se involucran y siempre encuentran una solución.',
    author: 'Angie Montenegro',
    role: 'CEO',
    company: 'Grupo Willy Confecciones',
    /* TODO(cliente): falta la foto de Angie; mientras tanto se muestra un monograma. */
    image: '',
  },
] as const;

/* ── Valores ─────────────────────────────────────────────── */

export const values = [
  'Innovación',
  'Funcionalidad',
  'Creatividad',
  'Estética',
  'Sensibilidad',
  'Cercano'
];

/* ── Pie de página ───────────────────────────────────────── */

export const footerColumns = [
  {
    title: 'Estudio',
    links: [
      { label: 'Nosotros',  href: '#nosotros' },
      { label: 'Proceso',   href: '#proceso'  },
      { label: 'Proyectos', href: '#proyectos' },
      { label: 'Contacto',  href: '#contacto' },
    ],
  },
  {
    title: 'Servicios',
    links: [
      { label: 'Proyectos integrales',        href: '#servicios' },
      { label: 'Arquitectura de interiores',  href: '#servicios' },
      { label: 'Obra',                        href: '#servicios' },
      { label: 'Consultoría',                 href: '#servicios' },
    ],
  },
  {
    title: 'Rubros',
    links: [
      { label: 'Comercial',    href: '#rubros' },
      { label: 'Residencial',  href: '#rubros' },
      { label: 'Salud',        href: '#rubros' },
      { label: 'Corporativo',  href: '#rubros' },
    ],
  },
];

/* ── Componentes heredados (no se usan en la página actual) ─ */

export const heroStatement = {
  line1: 'Existimos para inspirar',
  line2: 'Diseñamos para transformar',
} as const;

export const heroSlides = [
  {
    image: '/images/hero/hero-fachada.webp',
    eyebrow: 'Proyecto destacado',
    title: 'Diseñado para habitar.',
    subtitle: 'Construido con propósito.',
    description:
      'Arquitectura integral con enfoque sustentable. Espacios que conversan con su entorno y con quienes los habitan.',
    primaryCta:  { label: 'Conoce el estudio',   href: '#estudio' },
    secondaryCta:{ label: 'Ver proyectos',       href: '#proyectos' },
  },
];

export const showcaseGrid = [
  { image: '/images/studio/studio-01.webp', label: 'Estudio' },
  { image: '/images/studio/studio-02.webp', label: 'Estudio' },
  { image: '/images/studio/studio-03.webp', label: 'Estudio' },
  { image: '/images/studio/studio-04.webp', label: 'Estudio' },
  { image: '/images/studio/studio-05.webp', label: 'Estudio' },
];

export const projects = [
  {
    slug: 'casita-del-pan',
    title: 'Casita del Pan',
    sector: 'Comercial',
    year: '2024',
    location: 'Jaén, Perú',
    image: '/images/projects/casita-del-pan.webp',
    description:
      'Pequeña tienda de pan artesanal donde la calidez del adobe y la madera dialoga con la luz natural del patio interior.',
  },
];
