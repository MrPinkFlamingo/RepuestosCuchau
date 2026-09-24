const validarRUT = r => {
    let v = r.trim().toUpperCase(), s = 0, m = 2;
    if (!/^[0-9]+[0-9K]$/.test(v) || v.length < 7 || v.length > 9) return false;
    for (let i = v.length - 2; i >= 0; i--) { s += v[i] * m; m = m < 7 ? m + 1 : 2; }
    let dv = 11 - (s % 11);
    return v.slice(-1) === (dv === 11 ? '0' : dv === 10 ? 'K' : dv.toString());
};

const validarCorreo = c => ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'].some(d => c.endsWith(d));

document.addEventListener('DOMContentLoaded', () => {
    // 1. Validar RUT
    document.querySelectorAll('input[id*="rut"]').forEach(i => i.addEventListener('input', e => 
        e.target.setCustomValidity(validarRUT(e.target.value) ? '' : 'RUT inválido. Debe ser sin puntos ni guion')
    ));

    // 2. Validar Correo y Coincidencia
    document.querySelectorAll('input[type="email"]').forEach(i => i.addEventListener('input', e => {
        e.target.setCustomValidity(validarCorreo(e.target.value) ? '' : 'Solo correos @duoc.cl, @profesor.duoc.cl o @gmail.com');
        let c = document.getElementById('confirmarCorreo'), o = document.getElementById('correo');
        if (c && o) c.setCustomValidity(o.value === c.value ? '' : 'Los correos no coinciden.');
    }));

    // 3. Validar Contraseñas
    document.querySelectorAll('input[type="password"]').forEach(i => i.addEventListener('input', () => {
        let c = document.getElementById('confirmarContrasena'), o = document.getElementById('contrasena');
        if (c && o) c.setCustomValidity(o.value === c.value ? '' : 'Las contraseñas no coinciden.');
    }));

    // 4. Validar Fecha de Nacimiento
    document.querySelectorAll('#fechaNacimiento').forEach(i => i.addEventListener('input', e => {
        let v = e.target.value;
        if (/^\d{2}$|^\d{2}-\d{2}$/.test(v)) e.target.value = v + '-';
        e.target.setCustomValidity(/^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[012])-(19|20)\d{2}$/.test(e.target.value) ? '' : 'Formato: DD-MM-AAAA');
    }));

    // 5. Alertas formulario
    document.querySelectorAll('.needs-validation').forEach(f => f.addEventListener('submit', e => {
        e.preventDefault(); f.classList.add('was-validated');
        let a = document.getElementById('alerta-formulario');
        if (!a) return;
        if (!f.checkValidity()) a.innerHTML = '<div class="alert alert-danger">Error: Revisa campos en rojo.</div>';
        else {
            a.innerHTML = `<div class="alert alert-success">${f.id==='form-login'?'¡Inicio exitoso!':(f.id==='form-contacto'?'¡Enviado!':'¡Registrado!')}</div>`;
            f.reset(); f.classList.remove('was-validated');
        }
    }));
});
