<template>
	<div class="login-body">
		<!-- loading bar -->

		<!-- //loading bar -->

		<!-- wrap -->
		<div id="wrap">
			<!-- skip navi -->
			<!-- <div id="accessibility">
        <a href="http://10.20.60.50:8080/crm/index.do#container"
          >본문 바로가기</a
        >
      </div> -->
			<!-- //skip navi -->

			<!-- login-box -->
			<div class="login-box">
				<h1 class="ci">
					<img src="@/css/ci.png" alt="OnePlus" />
					<span>Secureone CRM System</span>
				</h1>

				<form class="form" @submit.prevent="submitForm">
					<div class="form-box">
						<div class="form-group">
							<label for="uid" class="hid">ID</label>
							<input
								type="text"
								name="user_id"
								id="user_id"
								class="ip01"
								placeholder="아이디"
								autocomplete="off"
								v-model="username"
							/>
						</div>

						<div class="form-group">
							<label for="upw" class="hid">PASSWORD</label>
							<input
								type="password"
								name="user_pw"
								id="user_pw"
								class="ip01"
								placeholder="비밀번호"
								autocomplete="new-password"
								v-model="password"
							/>
						</div>
					</div>

					<button class="hgbtn btn-login" type="submit">
						LOG IN
					</button>

					<div class="login-helper">
						<!-- <a href="#">아아이디 찾기</a>
				<a href="#">비밀번호 찾기</a> -->
					</div>
				</form>
			</div>
			<!-- //login-box -->
		</div>
		<!-- //wrap -->
		<div style="display:none;">
			<form
				id="loginfrm"
				method="POST"
				action="http://10.20.60.50:8080/crm/secureone/main.do"
			>
				<input type="hidden" id="jsessionkey" name="jsessionkey" value="" />
				<input type="hidden" id="enckey" name="enckey" value="" />
				<input type="hidden" id="login_code" name="login_code" value="" />
			</form>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import { loginUser } from '@/api/index';
import { loadPublicKey } from '../config/key';
export default {
	data() {
		return {
			username: '',
			password: '',
			logMessage: '',
			userIp: '',
			accessCount: 0,
			userBlock: false,
			publicKey: '',
		};
	},
	computed: {
		newPassword() {
			const NodeRSA = require('node-rsa');
			let newPW = this.password;
			let key_public = new NodeRSA(loadPublicKey());
			var encryptedString = key_public.encrypt(newPW, 'base64');
			//console.log(encryptedString);
			return encryptedString;
		},
	},
	methods: {
		async submitForm() {
			//console.log('비밀번호 암호화: ' + this.newPassword);
			const userData = {
				username: this.username,
				password: this.password,
				newPW: this.newPassword,
			};
			const response = await loginUser(userData);
			console.log('login log: ' + response);

			//response message test
			axios
				.post('http://localhost:3000/login', userData)
				.then(({ data }) => {
					console.log('axios data');
					console.log(data);
				})
				.catch(e => {
					console.log('axios 리스폰스 error');
					console.log(e);
				});
		},
	},
	created() {
		// init 테스트
		// axios.get('http://localhost:3000/init').then(res => {
		// 	this.publicKey = res.data.publicKey;
		// 	//console.log(this.publicKey);
		// });
		// n e 테스트
		// const NodeRSA = require('node-rsa');
		// const key = new NodeRSA(loadPublicKey());
		// console.log(key);
		// key.generateKeyPair(1024, 65537);
		// var newPW = '1234';
		// var encryptedString = key.encrypt(newPW, 'base64');
		// console.log(encryptedString);
	},
};
</script>

<style scoped>
/* @import '../css/w2ui-1.5.rc1.css'; */
/* @import '../css/vm-layout.css'; */
@import '../css/vm-style.css';
/* @import '../css/vm-popup.css'; */
</style>
