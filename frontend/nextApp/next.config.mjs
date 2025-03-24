const nextConfig = {
    output: "export",
    basePath: '/blog',
    // assetPrefix: process.env.NODE_ENV === 'production' ? '/blog' : '',
    assetPrefix: '/blog',
    trailingSlash: true,
};

export default nextConfig;
