import * as LitJsSdk from '@lit-protocol/lit-node-client';

// Types
import type {
	AccsDefaultParams,
	ConditionType,
	EncryptResponse,
} from '@lit-protocol/types';

const useLit = () => {
	// Must Have At least 0.1 MATIC
	const accessControlConditions: AccsDefaultParams[] = [
		{
			conditionType: 'evmBasic' as ConditionType,
			contractAddress: '',
			standardContractType: '',
			chain: 'mumbai',
			method: 'eth_getBalance',
			parameters: [':userAddress', 'latest'],
			returnValueTest: {
				comparator: '>=',
				value: '100000000000000000',
			},
		},
	];

	const initialize = async () => {
		const client = new LitJsSdk.LitNodeClient({
			litNetwork: 'cayenne',
		});
		await client.connect();
		const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: 'mumbai' });
		return { client, authSig };
	};

	const encrypt = async (data: string) => {
		try {
			const { client, authSig } = await initialize();
			if (!client || !authSig) {
				throw new Error('Lit Client Not Initialized');
			}
			const res = await LitJsSdk.encryptString(
				{
					accessControlConditions,
					authSig,
					chain: 'mumbai',
					dataToEncrypt: data,
				},
				client
			);
			return res;
		} catch (error) {
			throw new Error(String(error));
		}
	};

	const decrypt = async (res: EncryptResponse) => {
		try {
			const { client, authSig } = await initialize();
			if (!client || !authSig) {
				throw new Error('Lit Client Not Initialized');
			}
			const { ciphertext, dataToEncryptHash } = res;
			const decryptedString = await LitJsSdk.decryptToString(
				{
					accessControlConditions,
					ciphertext,
					dataToEncryptHash,
					authSig,
					chain: 'mumbai',
				},
				client
			);
			return decryptedString;
		} catch (error) {
			throw new Error(String(error));
		}
	};

	return { encrypt, decrypt };
};

export default useLit;
