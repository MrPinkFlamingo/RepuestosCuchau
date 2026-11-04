// Funciones de validación tal cual el archivo validaciones.js original

export const validarRUT = (r: string): boolean => {
  const v = r.trim().toUpperCase();
  let s = 0;
  let m = 2;
  if (!/^[0-9]+[0-9K]$/.test(v) || v.length < 7 || v.length > 9) return false;
  for (let i = v.length - 2; i >= 0; i--) {
    s += parseInt(v[i], 10) * m;
    m = m < 7 ? m + 1 : 2;
  }
  const dv = 11 - (s % 11);
  const dvEsperado = dv === 11 ? "0" : dv === 10 ? "K" : dv.toString();
  return v.slice(-1) === dvEsperado;
};

export const validarCorreo = (c: string): boolean => {
  return ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"].some((d) => c.endsWith(d));
};

export const validarFechaNacimiento = (f: string): boolean => {
  return /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[012])-(19|20)\d{2}$/.test(f);
};
