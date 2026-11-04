export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: string;
  urlImagen: string;
  altImagen: string;
}

export const PRODUCTOS: Producto[] = [
  {
    id: "1",
    nombre: "Filtro de Aceite Bosch Premium",
    descripcion: "Para motores bencineros 1.6 y 2.0",
    precio: "8.990",
    urlImagen: "img/FiltroAceiteBoschPremium.jpg",
    altImagen: "Filtro de Aceite Bosch Premium",
  },
  {
    id: "2",
    nombre: "Juego Pastillas de Freno Brembo",
    descripcion: "Alta durabilidad, cero ruidos.",
    precio: "35.000",
    urlImagen: "img/JuegoDePastillasBrembo.jpg",
    altImagen: "Juego Pastillas de Freno Brembo",
  },
  {
    id: "3",
    nombre: "Batería Hankook 55AMP",
    descripcion: "Libre de mantención, partida rápida.",
    precio: "55.990",
    urlImagen: "img/BateriaHankook55MP.jpg",
    altImagen: "Batería Hankook 55AMP",
  },
  {
    id: "4",
    nombre: "Aceite Mobil 1 Sintético 5W-30 (4L)",
    descripcion: "Máximo rendimiento y protección.",
    precio: "42.500",
    urlImagen: "img/AcaiteMobil5W-30.jpg",
    altImagen: "Aceite Mobil 1 Sintético 5W-30",
  },
  {
    id: "5", // número siguiente
    nombre: "Disco de Freno Brembo 280mm", // nombre del producto
    descripcion: "Para vehículos compactos y SUV.", // descripción corta
    precio: "49.990", // sin $ ni puntos de miles
    urlImagen: "img/DiscoFreno.png", // imagen en public/img/
    altImagen: "Disco de Freno Brembo 280mm", // texto alternativo
  },
  {
    id: "6",
    nombre: "Amortiguador Trasero Monroe",
    descripcion: "Absorción de impactos para conducción suave.",
    precio: "38.500",
    urlImagen: "img/AmortiguadorMonroe.jpg",
    altImagen: "Amortiguador Trasero Monroe",
  },
  {
    id: "7",
    nombre: "Correa de Distribución Gates",
    descripcion: "Resistente al calor, larga duración.",
    precio: "22.900",
    urlImagen: "img/CorreaDistribucionGates.jpg",
    altImagen: "Correa de Distribución Gates",
  },
  {
    id: "8",
    nombre: "Bujía NGK Iridium IX",
    descripcion: "Pack x4. Encendido eficiente y arranque rápido.",
    precio: "18.990",
    urlImagen: "img/BujiaNGK.jpg",
    altImagen: "Bujía NGK Iridium IX",
  },
  {
    id: "9",
    nombre: "Filtro de Aire K&N",
    descripcion: "Lavable y reutilizable. Mayor rendimiento del motor.",
    precio: "29.990",
    urlImagen: "img/FiltroAireKN.jpg",
    altImagen: "Filtro de Aire K&N",
  },
  {
    id: "10",
    nombre: "Líquido de Frenos DOT 4 Bosch",
    descripcion: "500ml. Alta temperatura de ebullición.",
    precio: "7.490",
    urlImagen: "img/LiquidoFrenosDOT4.jpg",
    altImagen: "Líquido de Frenos DOT 4 Bosch",
  },
  {
    id: "11",
    nombre: "Termostato Motorad",
    descripcion: "Regula la temperatura del motor. Universal.",
    precio: "14.990",
    urlImagen: "img/TernostatoMotorad.jpg",
    altImagen: "Termostato Motorad",
  },
  {
    id: "12",
    nombre: "Bomba de Agua Dolz",
    descripcion: "Circulación del refrigerante. Alta durabilidad.",
    precio: "31.500",
    urlImagen: "img/BombaAguaDolz.jpg",
    altImagen: "Bomba de Agua Dolz",
  },
  {
    id: "13",
    nombre: "Radiador Aluminio Universal",
    descripcion: "Para vehículos de 1.4 a 2.0. Enfriamiento eficiente.",
    precio: "89.990",
    urlImagen: "img/RadiadorAluminio.jpg",
    altImagen: "Radiador Aluminio Universal",
  },
  {
    id: "14",
    nombre: "Kit Embrague LUK",
    descripcion: "Incluye plato, disco y collarín. Para autos 1.6.",
    precio: "145.000",
    urlImagen: "img/KitEmbrage.jpg",
    altImagen: "Kit Embrague LUK",
  },
];
