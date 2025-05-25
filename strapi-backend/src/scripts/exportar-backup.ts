import fs from 'fs';
import path from 'path';
import { populateAllRelations } from './populate-all-relations';

export async function exportarBackup(strapi: any) {
    const colecciones = [
        'api::especialidad.especialidad',
        'api::modulo.modulo',
        'api::estudiante.estudiante',
        'api::matricula.matricula',
    ];

    const backupDir = path.resolve('public', 'backups');
    fs.mkdirSync(backupDir, { recursive: true });

    for (const uid of colecciones) {
        const populate = populateAllRelations(strapi, uid, 3);

        const data = await strapi.entityService.findMany(uid, {
            populate,
            limit: 1000,
        });

        const filePath = path.join(backupDir, `${uid.split('.')[1]}.json`);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`✅ Backup de ${uid} exportado`);
    }

    console.log('📁 Backups completos con relaciones anidadas (hasta nivel 3).');
}
