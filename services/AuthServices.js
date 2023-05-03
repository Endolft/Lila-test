import request from '.';

const AuthServices = {
	login: (payload) =>
		request(
			'/auth/login',
			{
				headers: { 'Content-Type': 'application/json' },
				method: 'post',
				mode: 'cors',
				body: JSON.stringify(payload),
			},
			'Ha ocurrido un error'
		),
	refresh: (token) =>
		request(`/auth/tokenlogin`, {
			headers: { 'Content-Type': 'application/json', Authorization: token },
			method: 'post',
			mode: 'cors',
		}),
};

export default AuthServices;
