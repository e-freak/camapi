module.exports = (api) => {
    api.cache(true);
    const presets = [
        [
            '@babel/preset-env',
            {
                targets: { node: true },
                useBuiltIns: 'usage',
                corejs: 3,
            },
        ],
    ];
    return { presets };
};
