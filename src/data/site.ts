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
    'Estudio de arquitectura sustentable. Diseñamos, consultamos y ejecutamos proyectos integrales en el ámbito residencial, comercial, turístico y corporativo.',
  url: 'https://gale.pe',
  email: 'contacto@gale.pe',
  phone: '+51 999 999 999',
  address: 'Lima · Perú',
  social: {
    instagram: 'https://www.instagram.com/gale_ecoarq/',
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
  { image: '/images/events/event-01.webp', label: 'Evento' },
  { image: '/images/events/event-02.webp', label: 'Evento' },
  { image: '/images/events/event-03.webp', label: 'Evento' },
  { image: '/images/events/event-04.webp', label: 'Evento' },
  { image: '/images/events/event-05.webp', label: 'Evento' },
  { image: '/images/events/event-06.webp', label: 'Evento' },
];

export const stats = [
  { value: '+12',  label: 'Años diseñando' },
  { value: '+80',  label: 'Proyectos entregados' },
  { value: '100%', label: 'Enfoque sustentable' },
  { value: '4',    label: 'Sectores de trabajo' },
];

export const testimonials = [
  {
    id: 1,
    quote:
      'El equipo de GALE entendió desde la primera conversación cómo queríamos habitar la casa. Cada detalle, desde la luz hasta la materialidad, se pensó para nosotros.',
    author: 'Lucía Mendoza',
    role: 'Cliente residencial',
    company: 'Casa La Molina',
    image:
      'https://plus.unsplash.com/premium_photo-1689551671548-79ff30459d2a?w=900&auto=format&fit=crop&q=60',
  },
  {
    id: 2,
    quote:
      'Trabajar con GALE fue una verdadera sociedad creativa. Convirtieron un local difícil en un espacio que nuestros clientes recuerdan.',
    author: 'Marcos Villarán',
    role: 'Gerente general',
    company: 'Casita del Pan',
    image:
      'https://images.unsplash.com/photo-1649123245135-4db6ead931b5?w=900&auto=format&fit=crop&q=60',
  },
  {
    id: 3,
    quote:
      'Honestidad material, rigor técnico y una sensibilidad enorme por el lugar. El resultado supera lo que imaginamos para nuestras oficinas.',
    author: 'Elena Vargas',
    role: 'Directora corporativa',
    company: 'Grupo Andino',
    image:
      'https://images.unsplash.com/photo-1701615004837-40d8573b6652?w=900&auto=format&fit=crop&q=60',
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
  { title: 'Residencial',  image: '/images/hero/hero-interior-02.webp',  count: '32 proyectos' },
  { title: 'Comercial',    image: '/images/projects/casita-del-pan.webp', count: '18 proyectos' },
  { title: 'Turístico',    image: '/images/projects/foto-06.webp',        count: '14 proyectos' },
  { title: 'Corporativo',  image: '/images/projects/foto-03.webp',        count: '21 proyectos' },
  { title: 'Educativo',    image: '/images/projects/foto-02.webp',        count: '9 proyectos' },
  { title: 'Interiorismo', image: '/images/hero/hero-interior-05.webp',   count: '27 proyectos' },
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
  'Responsabilidad',
  'Creatividad',
  'Vocación de servicio',
  'Trabajo en equipo',
  'Mejora continua',
  'Responsabilidad social',
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
