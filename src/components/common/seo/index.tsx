import { NextSeo } from 'next-seo';

const SEO = () => {
	return (
		<NextSeo
			title='Lit Encrypt and Decrypt'
			description='A Simple App to show how to encrypt and decrypt data using Lit Protocol'
			openGraph={{
				url: 'https://lit-encryption-lumos.vercel.app',
				title: 'Lit Encrypt and Decrypt',
				description:
					'A Simple App to show how to encrypt and decrypt data using Lit Protocol',
				images: [
					{
						url: 'https://i.ibb.co/YhWLyTb/OG.png',
						width: 1200,
						height: 630,
						alt: 'W3S OG Image',
						type: 'image/png',
					},
				],
				siteName: 'Lit Encrypt and Decrypt',
			}}
			twitter={{
				cardType: 'summary_large_image',
			}}
		/>
	);
};

export default SEO;
