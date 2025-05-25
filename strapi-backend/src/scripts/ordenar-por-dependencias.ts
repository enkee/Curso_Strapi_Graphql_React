export function ordenarColeccionesPorDependencias(strapi: any): {
    orden: string[];
    ciclicos: string[];
} {
    const grafo: Record<string, Set<string>> = {};
    const contentTypes = strapi.contentTypes;

    for (const uid in contentTypes) {
        if (!uid.startsWith('api::')) continue;
        grafo[uid] = new Set();

        for (const key in contentTypes[uid].attributes) {
            const attr = contentTypes[uid].attributes[key];
            if (attr.type === 'relation' && attr.target?.startsWith('api::')) {
                grafo[uid].add(attr.target);
            }
        }
    }

    const orden: string[] = [];
    const conCiclo: string[] = [];
    const visitados = new Set<string>();
    const enProceso = new Set<string>();

    function visitar(uid: string) {
        if (visitados.has(uid)) return;
        if (enProceso.has(uid)) {
            if (!conCiclo.includes(uid)) conCiclo.push(uid);
            return;
        }

        enProceso.add(uid);
        grafo[uid]?.forEach(dep => visitar(dep));
        enProceso.delete(uid);

        visitados.add(uid);
        orden.push(uid);
    }

    for (const uid of Object.keys(grafo)) {
        visitar(uid);
    }

    const final = orden.concat(conCiclo.filter(u => !orden.includes(u)));

    return { orden: final, ciclicos: conCiclo };
}
