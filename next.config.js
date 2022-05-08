/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: '/',
			},
		];
	},
	images: {
		domains: [
			'media.graphassets.com',
			'avatars.dicebear.com',
			'images.unsplash.com',
			'cdn.sanity.io',
		],
	},
	experimental: {
		urlImports: [
			'https://framer.com/m/',
			'https://framerusercontent.com/',
			'https://ga.jspm.io/',
			'https://jspm.dev/',
			'https://fonts.googleapis.com',
			'https://avatars.dicebear.com',
		],
	},
};

module.exports = nextConfig;
