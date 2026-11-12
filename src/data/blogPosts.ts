export interface BlogPost {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

export const blogPostsData: BlogPost[] = [
  {
    id: "pastillas-freno-senales",
    category: "Mantenimiento",
    title: "5 señales de que debes cambiar tus pastillas de freno",
    excerpt: "¿Escuchas un chillido molesto al frenar o el pedal se siente esponjoso? Descubre cuáles son los síntomas clave que te advierten de que es momento de reemplazar tus pastillas antes de dañar los discos.",
    date: "Publicado hace 2 días",
    image: "/img/JuegoDePastillasBrembo.jpg"
  },
  {
    id: "bateria-cuando-cambiar",
    category: "Guías de Compra",
    title: "¿Cómo saber si es momento de cambiar la batería?",
    excerpt: "Quedarse botado por falta de batería es la peor pesadilla de cualquier conductor. Aprende a medir el voltaje y a reconocer si tu batería Hankook está llegando al final de su vida útil.",
    date: "Publicado la semana pasada",
    image: "/img/BateriaHankook55MP.jpg"
  }
];
