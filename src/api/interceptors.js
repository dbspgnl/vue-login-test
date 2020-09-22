export function setInterceptors(instance) {
	instance.interceptors.request.use(
		function(config) {
			return config;
		},
		function(error) {
			return Promise.reject(error);
		},
	);

	instance.interceptors.response.use(
		function(response) {
			//console.log('인터셉터 res: ' + response);
			return response;
		},
		function(error) {
			console.log('인터셉터 res error: ' + error);
			return Promise.reject(error);
		},
	);
	return instance;
}
