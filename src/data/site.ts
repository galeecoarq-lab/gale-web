/**
 * GALE — Single source of truth.
 * All copy lives here so layouts/components remain content-agnostic
 * and can be re-used for new pages.
 */

export const site = {
  name: 'GALE',
  longName: 'Gale Eco Arquitectura',
  tagline: 'Diseñamos espacios y mejores experiencias.',
  description:
    'Somos un estudio de arquitectura de interiores y ejecución de proyectos, enfocado en desarrollar espacios comerciales y residenciales que respondan a las necesidades reales de las personas, combinando funcionalidad, estética y sensibilidad en cada proyecto.',
  url: 'https://gale.pe',
  email: 'contacto@gale.pe',
  phone: '+51 942 802 551',
  address: 'Perú',
  social: {
    instagram: 'https://www.instagram.com/gale.arqui/',
    tiktok: 'https://www.tiktok.com/@gale.ecoarq',
    linkedin: 'https://www.linkedin.com/in/gale-eco-arquitectura-96266425b/',
  },
} as const;

export const heroStatement = {
  line1: 'Existimos para inspirar',
  line2: 'Diseñamos para transformar',
} as const;

export const nav = [
  { label: 'Proyectos',   href: '#proyectos'  },
  { label: 'Servicios',   href: '#servicios'  },
  { label: 'Proceso',     href: '#proceso'    },
  { label: 'Contacto',    href: '#contacto'   },
] as const;

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
  {
    image: '/images/hero/hero-interior-02.webp',
    eyebrow: 'Interiorismo',
    title: 'Espacios que respiran.',
    subtitle: 'Luz, textura y materia.',
    description:
      'Cada interior es una composición precisa de luz natural, materialidad honesta y detalles construidos a medida.',
    primaryCta:  { label: 'Ver proyectos',     href: '#proyectos' },
    secondaryCta:{ label: 'Nuestro proceso',   href: '#proceso' },
  },
  {
    image: '/images/hero/hero-interior-03.webp',
    eyebrow: 'Residencial',
    title: 'La casa, reimaginada.',
    subtitle: 'Para vivir mejor cada día.',
    description:
      'Proyectos residenciales que priorizan la calidad espacial, la eficiencia energética y la conexión con el lugar.',
    primaryCta:  { label: 'Inicia tu proyecto', href: '#contacto' },
    secondaryCta:{ label: 'Ver servicios',      href: '#servicios' },
  },
];

export const showcaseGrid = [
  { image: '/images/studio/studio-01.webp', label: 'Estudio' },
  { image: '/images/studio/studio-02.webp', label: 'Estudio' },
  { image: '/images/studio/studio-03.webp', label: 'Estudio' },
  { image: '/images/studio/studio-04.webp', label: 'Estudio' },
  { image: '/images/studio/studio-05.webp', label: 'Estudio' },
];

export const stats = [
  { value: '+12',  label: 'Años diseñando' },
  { value: '+80',  label: 'Proyectos entregados' },
  { value: '100%', label: 'Enfoque sustentable' },
  { value: '6',    label: 'Sectores de trabajo' },
];

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
      'Amé trabajar con GALE. Desde el inicio entendieron mi estilo y todo el proceso fue súper ordenado, creativo y personalizado. Lograron crear un espacio sobrio, elegante y acogedor, con detalles que generan ese efecto wow sin perder la armonía. ¡Gracias a todo el equipo!',
    author: 'Teresa Contreras',
    role: 'Clienta residencial',
    company: 'Proyecto residencial',
    image: '/images/testimonials/clinica-teresa.jpeg',
  },
] as const;

export const services = [
  {
    number: '01',
    title: 'Arquitectura integral',
    description:
      'Diseño y desarrollo de proyectos arquitectónicos desde el anteproyecto hasta la entrega final, integrando ingeniería, paisajismo e interiorismo.',
    image: '/images/projects/foto-01.webp',
  },
  {
    number: '02',
    title: 'Interiorismo a medida',
    description:
      'Espacios interiores diseñados con atención al detalle, materialidad honesta y mobiliario hecho a medida para cada cliente.',
    image: '/images/projects/foto-04.webp',
  },
  {
    number: '03',
    title: 'Consultoría sustentable',
    description:
      'Asesoría especializada en estrategias pasivas, eficiencia energética y certificaciones sustentables para tu proyecto.',
    image: '/images/highlights/highlight-02.webp',
  },
  {
    number: '04',
    title: 'Remodelaciones',
    description:
      'Intervenciones que reinterpretan lo existente, optimizan funciones y elevan la calidad espacial sin perder identidad.',
    image: '/images/projects/foto-05.webp',
  },
];

export const sectors = [
  { title: 'Comercial',   image: '/images/projects/casita-del-pan.webp' },
  { title: 'Residencial', image: '/images/projects/residencial-lambayeque.webp'   },
  { title: 'Salud',       image: '/images/projects/salud-coa-jaen.webp'        },
  { title: 'Corporativo', image: '/images/projects/corporativo-hcm-jaen.webp'        },
  { title: 'Turístico',   image: '/images/projects/turistico-colpa-sanignacio.webp'        },
  { title: 'Obras',       image: '/images/projects/obras.webp'   }
];

export const projects = [
  {
    slug: 'casita-del-pan',
    title: 'Casita del Pan',
    sector: 'Comercial',
    year: '2024',
    location: 'Lima, Perú',
    image: '/images/projects/casita-del-pan.webp',
    description:
      'Pequeña tienda de pan artesanal donde la calidez del adobe y la madera dialoga con la luz natural del patio interior.',
  },
  {
    slug: 'casa-cultivado',
    title: 'Casa Cultivado',
    sector: 'Residencial',
    year: '2024',
    location: 'Cieneguilla, Perú',
    image: '/images/hero/hero-fachada.webp',
    description:
      'Vivienda unifamiliar pensada como un refugio sereno: volúmenes simples, ventilación cruzada y patios sembrados.',
  },
  {
    slug: 'sala-cascara',
    title: 'Sala Cáscara',
    sector: 'Interiorismo',
    year: '2023',
    location: 'Miraflores, Perú',
    image: '/images/hero/hero-interior-03.webp',
    description:
      'Reinterpretación de un departamento de los años 70: tonos cálidos, mobiliario a medida y una nueva relación con la luz.',
  },
  {
    slug: 'cerulea',
    title: 'Cerúlea Studio',
    sector: 'Corporativo',
    year: '2023',
    location: 'San Isidro, Perú',
    image: '/images/projects/foto-02.webp',
    description:
      'Oficinas creativas con un eje longitudinal de luz natural, plantas operativas flexibles y áreas de bienestar.',
  },
];

export const process = [
  {
    step: '01',
    title: 'Escuchar',
    description:
      'Conversamos contigo para entender tu vida, tu uso del espacio y tus aspiraciones. El proyecto empieza por las preguntas correctas.',
  },
  {
    step: '02',
    title: 'Imaginar',
    description:
      'Traducimos lo que necesitas en estrategias de diseño: programa, partido arquitectónico, materialidad y narrativa.',
  },
  {
    step: '03',
    title: 'Diseñar',
    description:
      'Desarrollamos planos, modelos 3D y presupuestos. Iteramos hasta llegar a un proyecto que conmueve y funciona.',
  },
  {
    step: '04',
    title: 'Construir',
    description:
      'Supervisamos cada etapa de obra: seleccionamos contratistas, controlamos calidades y aseguramos que lo diseñado se construya.',
  },
];

export const values = [
  'Innovación',
  'Funcionalidad',
  'Creatividad',
  'Estética',
  'Sensibilidad',
  'Cercano'
];

export const footerColumns = [
  {
    title: 'Estudio',
    links: [
      { label: 'Nosotros',  href: '#estudio' },
      { label: 'Proceso',   href: '#proceso' },
      { label: 'Valores',   href: '#valores' },
      { label: 'Contacto',  href: '#contacto' },
    ],
  },
  {
    title: 'Servicios',
    links: [
      { label: 'Arquitectura',    href: '#servicios' },
      { label: 'Interiorismo',    href: '#servicios' },
      { label: 'Consultoría',     href: '#servicios' },
      { label: 'Remodelaciones',  href: '#servicios' },
    ],
  },
  {
    title: 'Proyectos',
    links: [
      { label: 'Residencial',  href: '#proyectos' },
      { label: 'Comercial',    href: '#proyectos' },
      { label: 'Turístico',    href: '#proyectos' },
      { label: 'Corporativo',  href: '#proyectos' },
    ],
  },
];
