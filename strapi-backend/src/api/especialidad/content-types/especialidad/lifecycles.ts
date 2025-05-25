import { generarMenu } from '../../../../utils/generar-menu';

export default {
    async afterCreate() {
        await generarMenu(strapi);
    },
    async afterUpdate() {
        await generarMenu(strapi);
    },
    async afterDelete() {
        await generarMenu(strapi);
    },
};
