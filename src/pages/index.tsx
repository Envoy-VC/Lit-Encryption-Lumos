import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from './_app';

import { Encrypt, Decrypt } from '~/components';

const Home: NextPageWithLayout = () => {
	return (
		<div className='p-24'>
			<Encrypt />
			<Decrypt />
		</div>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Home;
