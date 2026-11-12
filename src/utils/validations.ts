export const validarRUT = (rut: string): boolean => {
  if (!rut) return false;
  // Limpiar puntos, guiones y espacios
  const v = rut.replace(/[^0-9kK]/g, '').toUpperCase();
  if (v.length < 7 || v.length > 9) return false;

  const cuerpo = v.slice(0, -1);
  const dv = v.slice(-1);

  if (!/^\d+$/.test(cuerpo)) return false;

  let s = 0;
  let m = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    s += parseInt(cuerpo[i], 10) * m;
    m = m < 7 ? m + 1 : 2;
  }

  const expectedDvCalc = 11 - (s % 11);
  const expectedDv = expectedDvCalc === 11 ? '0' : expectedDvCalc === 10 ? 'K' : expectedDvCalc.toString();

  return dv === expectedDv;
};

export const validarCorreo = (email: string): boolean => {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  // Requiere nombre de usuario antes del @ y uno de los dominios permitidos
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
  return emailRegex.test(cleanEmail);
};

export const validarContrasena = (password: string): { isValid: boolean; message: string } => {
  if (!password) {
    return { isValid: false, message: 'La contraseña es obligatoria.' };
  }
  if (password.length < 6) {
    return { isValid: false, message: 'La contraseña debe tener al menos 6 caracteres.' };
  }
  if (!/[a-zA-Z]/.test(password)) {
    return { isValid: false, message: 'La contraseña debe contener al menos una letra.' };
  }
  if (!/\d/.test(password)) {
    return { isValid: false, message: 'La contraseña debe contener al menos un número.' };
  }
  if (/\s/.test(password)) {
    return { isValid: false, message: 'La contraseña no puede contener espacios en blanco.' };
  }
  return { isValid: true, message: 'Contraseña válida.' };
};

export const validarFechaNacimiento = (dateStr: string): boolean => {
  if (!dateStr) return false;
  const match = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (!match) return false;

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);

  if (month < 1 || month > 12) return false;
  if (year < 1900) return false;

  // Días por mes considerando años bisiestos
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const daysInMonth = [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day < 1 || day > daysInMonth[month - 1]) return false;

  const inputDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // No permitir fechas futuras
  if (inputDate > today) return false;

  // Edad mínima de 16 años para registrarse
  const minAgeDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
  if (inputDate > minAgeDate) return false;

  return true;
};

export const validarTextoSimple = (texto: string, minLength: number = 2): boolean => {
  if (!texto) return false;
  const limpio = texto.trim();
  return limpio.length >= minLength && /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(limpio);
};

export const formatCLP = (amount: number): string => {
  return '$' + amount.toLocaleString('es-CL');
};
