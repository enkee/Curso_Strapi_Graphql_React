export function populateAllRelations(strapi: any, uid: string, depth = 2): any {
    const model = strapi.contentTypes[uid];
    if (!model) return {};

    const populate: Record<string, any> = {};

    for (const key in model.attributes) {
        const attr = model.attributes[key];

        if (['relation', 'component', 'dynamiczone', 'media'].includes(attr.type)) {
            if (depth > 1) {
                if (attr.type === 'relation' && attr.target) {
                    populate[key] = {
                        populate: populateAllRelations(strapi, attr.target, depth - 1),
                    };
                } else {
                    populate[key] = true;
                }
            } else {
                populate[key] = true;
            }
        }
    }

    return populate;
}
