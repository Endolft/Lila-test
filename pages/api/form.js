/* eslint-disable no-constant-condition */
import { isDevelopment } from 'services/constants';

const DEBUG_ENABLED = true; // Switch this variable whenever you need to debug API Route locally to see logs.

const log = (...args) => {
	if (isDevelopment && DEBUG_ENABLED) console.log(...args);
};
// ToDo Opcional: change form validations in this file to accept more than one file.

const handler = async ({ method, body, headers }, resToFront) => {
	try {
		switch (method.toUpperCase()) {
			case 'POST': {
				if (!headers.authorization)
					return resToFront.status(401).json({ data: null }); // No token provided
				// We will not validate the user exists, just assume the provided token is valid for now.

				// Validate form fields content:
				if (typeof body.name !== 'string')
					return resToFront
						.status(400)
						.json({ data: "Expected string type at 'name' field" });
				if (body.name.length === 0)
					return resToFront
						.status(400)
						.json({ data: "Expected non-empty string at 'name' field" });

				if (!typeof body.files === 'array')
					return resToFront
						.status(400)
						.json({ data: "Expected string type at 'files' field" });
				if (
					!body.files.every((file) => {
						return typeof file === 'string';
					})
				)
					return resToFront
						.status(400)
						.json({ data: "Expected string type at 'files' field" });
				if (body.files.length === 0)
					return resToFront
						.status(400)
						.json({ data: "Expected non-empty string at 'files' field" });

				// Form fields have a valid format.
				return resToFront.status(200).json({ data: 'Formulario enviado' });
			}
			default:
				return resToFront.status(405).json({ data: null });
		}
	} catch (error) {
		log('ERROR: ', error);

		resToFront.status(500).json({ data: 'Ha ocurrido un error' });
	}
};

export default handler;
