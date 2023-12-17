import React from 'react';

import { Button, Input } from 'antd';
import { useLit } from '~/hooks';

import toast from 'react-hot-toast';

const Decrypt = () => {
	const { decrypt } = useLit();

	const [encryptedData, setEncryptedData] = React.useState<string>('');
	const [key, setKey] = React.useState<string>('');

	const [data, setData] = React.useState<string | null>(null);

	const onClick = async () => {
		try {
			if (data === '') return;
			const res = await decrypt({
				ciphertext: encryptedData,
				dataToEncryptHash: key,
			});
			toast.success('Decrypted Successfully');
			setData(res);
		} catch (error) {
			console.error(error);
			toast.error('Error decrypting data');
		}
	};
	return (
		<div className='mx-auto my-4 flex max-w-lg flex-col gap-6'>
			<div className='text-3xl font-medium'>Decrypt</div>
			<div className='flex flex-col gap-2'>
				<Input
					value={encryptedData}
					onChange={(e) => setEncryptedData(e.target.value)}
					placeholder='Encrypted Data'
					size='large'
				/>
				<Input
					value={key}
					onChange={(e) => setKey(e.target.value)}
					placeholder='Encrypted Key'
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
			{data && (
				<p>
					<span className='text-lg font-medium'>Decrypted String:</span>
					<br />
					{data}
				</p>
			)}
		</div>
	);
};

export default Decrypt;
