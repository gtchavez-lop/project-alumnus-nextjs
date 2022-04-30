/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			'media.graphassets.com',
			'avatars.dicebear.com',
			'images.unsplash.com',
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
