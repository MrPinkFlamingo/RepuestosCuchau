export interface Producto {
  id: string | number;
  nombre: string;
  descripcion: string;
  precio: number;
  precioFormateado: string;
  imagen: string;
  categoria: "Filtros" | "Frenos" | "Baterías" | "Lubricantes" | "Motor" | "Suspensión" | string;
  enOferta?: boolean;
  descuento?: number; // porcentaje (ej: 20 para 20%)
  stock: number;
  especificaciones?: { [key: string]: string };
}

export const PRODUCTOS: Producto[] = [
  {
    id: "1",
    nombre: "Filtro de Aceite Bosch Premium",
    descripcion: "Para motores bencineros 1.6 y 2.0. Máxima filtración de impurezas.",
    precio: 8990,
    precioFormateado: "$8.990",
    imagen: "/img/FiltroAceiteBoschPremium.jpg",
    categoria: "Filtros",
    enOferta: true,
    descuento: 15,
    stock: 100,
    especificaciones: {
      "Marca": "Bosch",
      "Tipo": "Filtro blindado de aceite",
      "Compatibilidad": "Motores 1.6 - 2.0 Bencina",
      "Garantía": "6 meses"
    }
  },
  {
    id: "2",
    nombre: "Juego Pastillas de Freno Brembo",
    descripcion: "Compuesto cerámico de alta durabilidad, cero ruidos y frenado seguro.",
    precio: 35000,
    precioFormateado: "$35.000",
    imagen: "/img/JuegoDePastillasBrembo.jpg",
    categoria: "Frenos",
    enOferta: true,
    descuento: 20,
    stock: 100,
    especificaciones: {
      "Marca": "Brembo",
      "Posición": "Delanteras",
      "Material": "Compuesto Cerámico",
      "Garantía": "1 año"
    }
  },
  {
    id: "3",
    nombre: "Batería Hankook 55AMP",
    descripcion: "Libre de mantención, excelente potencia de partida en frío.",
    precio: 55990,
    precioFormateado: "$55.990",
    imagen: "/img/BateriaHankook55MP.jpg",
    categoria: "Baterías",
    enOferta: false,
    stock: 100,
    especificaciones: {
      "Marca": "Hankook",
      "Amperaje": "55 Ah",
      "Borne": "Positivo Derecho (+)",
      "Garantía": "18 meses"
    }
  },
  {
    id: "4",
    nombre: "Aceite Mobil 1 Sintético 5W-30 (4L)",
    descripcion: "Protección avanzada contra el desgaste y formación de lodos.",
    precio: 42500,
    precioFormateado: "$42.500",
    imagen: "/img/AcaiteMobil5W-30.jpg",
    categoria: "Lubricantes",
    enOferta: true,
    descuento: 10,
    stock: 100,
    especificaciones: {
      "Marca": "Mobil 1",
      "Viscosidad": "5W-30",
      "Tipo": "100% Sintético",
      "Volumen": "4 Litros"
    }
  },
  {
    id: "5",
    nombre: "Disco de Freno Brembo 280mm",
    descripcion: "Ventilado con tratamiento anticorrosión para máxima respuesta.",
    precio: 49990,
    precioFormateado: "$49.990",
    imagen: "/img/DiscoFreno.png",
    categoria: "Frenos",
    enOferta: false,
    stock: 100,
    especificaciones: {
      "Marca": "Brembo",
      "Diámetro": "280 mm",
      "Tipo": "Ventilado",
      "Garantía": "1 año"
    }
  },
  {
    id: "6",
    nombre: "Amortiguador Trasero Monroe",
    descripcion: "Gas presurizado para un control superior y confort de marcha.",
    precio: 38500,
    precioFormateado: "$38.500",
    imagen: "/img/AmortiguadorMonroe.jpg",
    categoria: "Suspensión",
    enOferta: false,
    stock: 100,
    especificaciones: {
      "Marca": "Monroe",
      "Tipo": "Gas presurizado",
      "Posición": "Trasero",
      "Garantía": "1 año"
    }
  },
  {
    id: "7",
    nombre: "Correa de Distribución Gates",
    descripcion: "Compuesto HNBR resistente a altas temperaturas y tensión extrema.",
    precio: 22900,
    precioFormateado: "$22.900",
    imagen: "/img/CorreaDistribucionGates.jpg",
    categoria: "Motor",
    enOferta: true,
    descuento: 25,
    stock: 100,
    especificaciones: {
      "Marca": "Gates",
      "Material": "HNBR de alta resistencia",
      "Dientes": "124 dientes",
      "Garantía": "60.000 km"
    }
  },
  {
    id: "8",
    nombre: "Bujía NGK Iridium IX (Pack x4)",
    descripcion: "Electrodo fino de iridio para una combustión óptima y ahorro de bencina.",
    precio: 18990,
    precioFormateado: "$18.990",
    imagen: "/img/BujiaNGK.jpg",
    categoria: "Motor",
    enOferta: false,
    stock: 100,
    especificaciones: {
      "Marca": "NGK",
      "Material": "Iridio IX",
      "Cantidad": "Pack de 4 bujías",
      "Garantía": "40.000 km"
    }
  },
  {
    id: "9",
    nombre: "Filtro de Aire K&N",
    descripcion: "Filtro de alto flujo de algodón lavable y reutilizable.",
    precio: 29990,
    precioFormateado: "$29.990",
    imagen: "/img/FitroAireKN.jpg",
    categoria: "Filtros",
    enOferta: false,
    stock: 100,
    especificaciones: {
      "Marca": "K&N",
      "Material": "Algodón aceitado",
      "Reutilizable": "Sí (Lavable)",
      "Garantía": "1.000.000 km"
    }
  },
  {
    id: "10",
    nombre: "Líquido de Frenos DOT 4 Bosch (500ml)",
    descripcion: "Punto de ebullición húmedo elevado para evitar el fading del pedal.",
    precio: 7490,
    precioFormateado: "$7.490",
    imagen: "/img/LiquidoFrenosDOT4.jpg",
    categoria: "Frenos",
    enOferta: false,
    stock: 100,
    especificaciones: {
      "Marca": "Bosch",
      "Norma": "DOT 4",
      "Contenido": "500 ml",
      "Punto Ebullición": "260°C"
    }
  },
  {
    id: "11",
    nombre: "Termostato Motorad",
    descripcion: "Apertura exacta a 88°C para mantener la temperatura de régimen.",
    precio: 14990,
    precioFormateado: "$14.990",
    imagen: "/img/TernostatoMotorad.jpg",
    categoria: "Motor",
    enOferta: false,
    stock: 100,
    especificaciones: {
      "Marca": "Motorad",
      "Apertura": "88°C",
      "Incluye empaquetadura": "Sí",
      "Garantía": "1 año"
    }
  },
  {
    id: "12",
    nombre: "Bomba de Agua Dolz",
    descripcion: "Turbina metálica con sello cerámico de máxima durabilidad.",
    precio: 31500,
    precioFormateado: "$31.500",
    imagen: "/img/BombaAguaDolz.jpg",
    categoria: "Motor",
    enOferta: true,
    descuento: 15,
    stock: 100,
    especificaciones: {
      "Marca": "Dolz",
      "Turbina": "Metálica",
      "Garantía": "1 año"
    }
  },
  {
    id: "13",
    nombre: "Radiador de Aluminio Soldado",
    descripcion: "Panal de aluminio de alta transferencia térmica.",
    precio: 89900,
    precioFormateado: "$89.900",
    imagen: "/img/RadiadorAluminio.jpg",
    categoria: "Motor",
    enOferta: false,
    stock: 100,
    especificaciones: {
      "Marca": "Nissens / Cuchau",
      "Material": "Aluminio soldado",
      "Transmisión": "Manual y Automática",
      "Garantía": "1 año"
    }
  },
  {
    id: "14",
    nombre: "Kit de Embrague LUK RepSet",
    descripcion: "Prensa, disco orgánico y rodamiento de empuje para autos 1.6.",
    precio: 145000,
    precioFormateado: "$145.000",
    imagen: "/img/KitEmbrage.jpg",
    categoria: "Motor",
    enOferta: true,
    descuento: 10,
    stock: 100,
    especificaciones: {
      "Marca": "LUK",
      "Contenido": "Prensa + Disco + Rodamiento",
      "Diámetro": "200 mm",
      "Garantía": "1 año"
    }
  }
];

export default PRODUCTOS;
