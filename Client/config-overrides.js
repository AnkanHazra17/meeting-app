module.exports = function override(config) {
    // Exclude node_modules from source-map-loader
    config.module.rules = config.module.rules.map((rule) => {
        if (rule.loader && rule.loader.includes('source-map-loader')) {
            return { ...rule, exclude: [/node_modules/] };
        }
        return rule;
    });
    return config;
};