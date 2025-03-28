const prefix = process.env.prefix
const nextConfig = {
    output: "export",
    // basePath: prefix,
    assetPrefix: prefix,
    trailingSlash: true,
};

export default nextConfig;
