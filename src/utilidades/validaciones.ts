// Algoritmo Módulo 11 oficial para RUT Chileno
// Acepta formatos con o sin puntos y con o sin guion (ej: 12.345.678-5, 12345678-5, 123456785)
export const validarRUT = (rut: string): boolean => {
  if (!rut) return false;

  // Limpiar puntos, guiones y espacios
  const limpio = rut.replace(/\./g, "").replace(/-/g, "").trim().toUpperCase();

  // Debe tener entre 7 y 8 dígitos numéricos más el dígito verificador (total 8 o 9 caracteres)
  if (!/^[0-9]{7,8}[0-9K]$/.test(limpio)) return false;

  const cuerpo = limpio.slice(0, -1);
  const dvIngresado = limpio.slice(-1);

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * multiplicador;
    multiplicador = multiplicador < 7 ? multiplicador + 1 : 2;
  }

  const dvEsperado = 11 - (suma % 11);
  const dvCalculado = dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();

  return dvIngresado === dvCalculado;
};

// Formatea un RUT a estándar chileno: 12.345.678-5
export const formatearRUT = (rut: string): string => {
  const limpio = rut.replace(/\./g, "").replace(/-/g, "").trim().toUpperCase();
  if (limpio.length <= 1) return limpio;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  // Formatear cuerpo con puntos cada 3 dígitos de derecha a izquierda
  let cuerpoFormateado = "";
  let cont = 0;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    cuerpoFormateado = cuerpo[i] + cuerpoFormateado;
    cont++;
    if (cont === 3 && i !== 0) {
      cuerpoFormateado = "." + cuerpoFormateado;
      cont = 0;
    }
  }

  return `${cuerpoFormateado}-${dv}`;
};

// Validar dominios permitidos (@duoc.cl, @profesor.duoc.cl, @gmail.com)
export const validarCorreo = (correo: string): boolean => {
  const dominios = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
  const limpio = correo.trim().toLowerCase();
  return dominios.some((d) => limpio.endsWith(d));
};

// Formato de fecha chileno DD-MM-AAAA
export const validarFechaNacimiento = (fecha: string): boolean => {
  return /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[012])-(19|20)\d{2}$/.test(fecha);
};
