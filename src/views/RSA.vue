<template>
	<div>
		<p>RSA 테스트</p>
		<button @click="encrypt">시작</button>
	</div>
</template>

<script>
//import { loadPublicKey, loadPrivateKey } from '@/config/key';
export default {
	data() {
		return {};
	},
	methods: {
		encrypt() {
			//RSA
			// const NodeRSA = require('node-rsa');
			// let secret = 'This is a non readable secret';
			// let key_public = new NodeRSA(loadPublicKey());
			// let key_private = new NodeRSA(loadPrivateKey());
			// var encryptedString = key_public.encrypt(secret, 'base64');
			// console.log(encryptedString);
			// var decryptedStirng = key_private.decrypt(encryptedString, 'utf8');
			// console.log(decryptedStirng);
		},
	},
};
</script>

<style></style>
