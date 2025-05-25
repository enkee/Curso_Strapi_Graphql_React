import fs from 'fs';
import path from 'path';

/**
 * Genera el archivo menu.json con las especialidades y sus módulos relacionados.
 * No requiere que especialidad tenga relación inversa con módulo.
 */
export async function generarMenu(strapi: any) {
    // 1. Obtener todas las especialidades
    const especialidades = await strapi.entityService.findMany('api::especialidad.especialidad');

    // 2. Obtener todos los módulos con su especialidad asociada
    const modulos = await strapi.entityService.findMany('api::modulo.modulo', {
        populate: ['especialidad'],
    });

    // 3. Agrupar módulos por especialidad
    const modulosPorEspecialidad: Record<number, any[]> = {};
    for (const mod of modulos) {
        const esp = mod.especialidad;
        if (!esp?.id) continue;

        if (!modulosPorEspecialidad[esp.id]) {
            modulosPorEspecialidad[esp.id] = [];
        }

        modulosPorEspecialidad[esp.id].push({
            id: mod.id,
            nombre: mod.nombre,
            descripcion: mod.descripcion,
            duracionHoras: mod.duracionHoras,
        });
    }

    // 4. Construir estructura final del menú
    const data = especialidades.map((esp: any) => ({
        id: esp.id,
        nombre: esp.nombre,
        modulos: (modulosPorEspecialidad[esp.id] || []).sort((a, b) =>
            a.nombre.localeCompare(b.nombre)
        ),
    }));

    // 5. Guardar el JSON en la ruta del frontend
    const rutaFrontend = 'D:/_Desarrollo/curso_GraphQL-Strapi/strapi-frontend/public/data/menu.json';

    fs.mkdirSync(path.dirname(rutaFrontend), { recursive: true });
    fs.writeFileSync(rutaFrontend, JSON.stringify(data, null, 2), 'utf-8');

    console.log('📁 Menú generado correctamente.');
}
