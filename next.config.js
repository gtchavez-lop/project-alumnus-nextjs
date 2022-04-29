/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			'media.graphassets.com',
			'avatars.dicebear.com',
			'images.unsplash.com',
		],
	},
};

module.exports = nextConfig;
