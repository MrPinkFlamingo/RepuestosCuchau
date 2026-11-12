export interface ProductSpec {
  [key: string]: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  category: string;
  price: number;
  formattedPrice: string;
  stock: number;
  image: string;
  featured?: boolean;
  specs: ProductSpec;
}

export const productsData: Product[] = [
  {
    id: "filtro-aceite-bosch",
    code: "P-001",
    name: "Filtro de Aceite Bosch Premium",
    shortDesc: "Para motores bencineros 1.6 y 2.0",
    fullDesc: "Filtro de aceite de alta calidad para motores bencineros 1.6 y 2.0. Garantiza la máxima protección de tu motor reteniendo impurezas y partículas para mantener un flujo limpio y constante de lubricante.",
    category: "Filtros",
    price: 8990,
    formattedPrice: "$8.990",
    stock: 45,
    image: "/img/FiltroAceiteBoschPremium.jpg",
    featured: true,
    specs: {
      "Fabricante": "Bosch",
      "Código SKU": "FIL-BOS-1620",
      "Compatibilidad": "Motores Bencineros 1.6 y 2.0",
      "Garantía": "3 Meses",
      "Tipo de Filtro": "Blindado"
    }
  },
  {
    id: "pastillas-freno-brembo",
    code: "P-002",
    name: "Juego Pastillas de Freno Brembo",
    shortDesc: "Alta durabilidad, cero ruidos.",
    fullDesc: "Juego completo de pastillas de freno delanteras Brembo Premium. Su compuesto cerámico avanzado reduce el polvo, minimiza el ruido y garantiza una frenada precisa y segura bajo cualquier condición climática.",
    category: "Frenos",
    price: 35000,
    formattedPrice: "$35.000",
    stock: 12,
    image: "/img/JuegoDePastillasBrembo.jpg",
    featured: true,
    specs: {
      "Fabricante": "Brembo S.p.A",
      "Código SKU": "FRE-BRE-P1234",
      "Compatibilidad": "Audi A3, VW Golf Mk7, Seat Leon",
      "Garantía": "6 Meses o 10.000 km",
      "Posición": "Eje Delantero"
    }
  },
  {
    id: "bateria-hankook-55amp",
    code: "P-003",
    name: "Batería Hankook 55AMP",
    shortDesc: "Libre de mantención, partida rápida.",
    fullDesc: "Batería Hankook 100% libre de mantenimiento. Ofrece una potencia de arranque superior y mayor resistencia a las altas temperaturas, ideal para vehículos con exigencias eléctricas estándar.",
    category: "Baterías",
    price: 55990,
    formattedPrice: "$55.990",
    stock: 20,
    image: "/img/BateriaHankook55MP.jpg",
    featured: true,
    specs: {
      "Fabricante": "Hankook AtlasBX",
      "Código SKU": "BAT-HAN-55MP",
      "Compatibilidad": "Hatchbacks y Sedán Compactos (12V)",
      "Garantía": "12 Meses",
      "Capacidad / CCA": "55 Ah / 450A"
    }
  },
  {
    id: "aceite-mobil-1-5w30",
    code: "P-004",
    name: "Aceite Mobil 1 Sintético 5W-30 (4L)",
    shortDesc: "Máximo rendimiento y protección.",
    fullDesc: "Aceite de motor 100% sintético avanzado diseñado para ofrecer un poder de limpieza excepcional, protección contra el desgaste y un rendimiento general superior. Ayuda a mantener tu motor funcionando como nuevo en cualquier condición de conducción.",
    category: "Aceites",
    price: 42500,
    formattedPrice: "$42.500",
    stock: 2,
    image: "/img/AcaiteMobil5W-30.jpg",
    featured: true,
    specs: {
      "Fabricante": "ExxonMobil",
      "Código SKU": "LUB-MOB-5W30-5L",
      "Compatibilidad": "Motores a Gasolina y Diésel (Sin filtro DPF)",
      "Garantía": "No aplica (Consumible)",
      "Viscosidad SAE": "5W-30"
    }
  }
];
