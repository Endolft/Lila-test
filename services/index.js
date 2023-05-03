import { basePath } from 'next.config';

/**
 * Estandarized interface for requests to API routes.
 * @param {string} url endpoint url.
 * @param {object} params optional params for the fetch request.
 * @param {*} defaultReturn optional default return value in case of unhandled error.
 * @returns an object containing two properties: ok and data.
 * ok is a boolean indicating if the request was successful.
 * data contains the data returned from the request or
 * in case of error it contains the default data or error description.
 */
const request = async (url, params, defaultReturn = null) => {
	try {
		const res = await fetch(`${basePath ?? ''}/api${url}`, params);
		const { data } = await res.json();

		if (res.status !== 200) return { ok: false, data };
		return { ok: true, data };
	} catch {
		return { ok: false, data: defaultReturn };
	}
};

export default request;
