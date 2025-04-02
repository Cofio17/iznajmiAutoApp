const prefix = process.env.prefix
const ENV = process.env.NODE_ENV
const nextConfig = {
    output: "export",
    assetPrefix: ENV === "production" ? prefix : "",
    trailingSlash: true,
};

export default nextConfig;
