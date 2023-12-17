import React from 'react';

import { Button, Input } from 'antd';
import { useLit } from '~/hooks';

import toast from 'react-hot-toast';

import type { EncryptResponse } from '@lit-protocol/types';

const Encrypt = () => {
	const { encrypt } = useLit();

	const [data, setData] = React.useState<string>('');
	const [response, setResponse] = React.useState<EncryptResponse | null>(null);

	const onClick = async () => {
		try {
			if (data === '') return;
			const res = await encrypt(data);
			toast.success('Encrypted Successfully');
			setResponse(res);
		} catch (error) {
			console.error(error);
			toast.error(String(error));
		}
	};
	return (
		<div className='mx-auto flex max-w-lg flex-col gap-6'>
			<div className='text-3xl font-medium'>Encrypt</div>
			<div className='flex flex-row gap-2'>
				<Input
					value={data}
					onChange={(e) => setData(e.target.value)}
					placeholder='Enter data to encrypt'
					size='large'
				/>
				<Button
					size='large'
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onClick={onClick}
				>
					Encrypt
				</Button>
			</div>
			{response && (
				<div className='flex max-w-lg flex-col gap-2 whitespace-pre-line break-all'>
					<p>
						<span className='text-lg font-medium'>Encrypted Data:</span> <br />
						{response.ciphertext}
					</p>
					<p>
						<span className='text-lg font-medium'>Encryption Key: </span> <br />
						{response.dataToEncryptHash}
					</p>
				</div>
			)}
		</div>
	);
};

export default Encrypt;
