export default () => ({
    graphql: {
        enabled: true,
        config: {
            defaultLimit: 100,
            maxLimit: 500,
            playgroundAlways: true,
            apolloServer: {
                introspection: true,
            },
        },
    },
});
