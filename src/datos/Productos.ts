export interface Producto {
    id: number
    nombre: string
    descripcion: string
    precio: string
    imagen: string
}

// lista de productos
export const PRODUCTOS: Producto[] = [
    {
    id: 1,
    nombre: "Filtro de Aceite Bosch Premium",
    descripcion: "Para motores bencineros 1.6 y 2.0",
    precio: "$8.990",
    imagen: "/img/FiltroAceiteBoschPremium.jpg",
    },
    {  
    id: 2,
    nombre: "Juego Pastillas de Freno Brembo",
    descripcion: "Alta durabilidad, cero ruidos.",
    precio: "$35.000",
    imagen: "/img/JuegoDePastillasBrembo.jpg",
    },
    {
    id: 3,
    nombre: "Batería Hankook 55AMP",
    descripcion: "Libre de mantención, partida rápida.",
    precio: "$55.990",
    imagen: "/img/BateriaHankook55MP.jpg",
    },
    {
    id: 4,
    nombre: "Aceite Mobil 1 Sintético 5W-30 (4L)",
    descripcion: "Máximo rendimiento y protección.",
    precio: "$42.500",
    imagen: "/img/AcaiteMobil5W-30.jpg",
    },
]
export default PRODUCTOS