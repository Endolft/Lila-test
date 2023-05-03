export const useFiles = (setGetIn, setFormState, formState) => {
	const { files } = formState;
	const arrayFiles = [];

	const fileVerification = (fileUrl, arrayFilesUrls) => {
		if (files.includes(fileUrl)) {
			return;
		}
		arrayFilesUrls.push(fileUrl);
		return arrayFilesUrls;
	};

	const handleDrop = (event) => {
		event.preventDefault();

		const { files: filesToLoad } = event.dataTransfer;

		Object.entries(filesToLoad).forEach(([key, file]) => {
			if (file.type.match(/image.*/)) {
				const data = new FileReader();
				data.addEventListener('load', () => {
					fileVerification(data.result, arrayFiles);
					setFormState({ ...formState, files: [...files, ...arrayFiles] });
				});
				data.readAsDataURL(file);
			}
		});
	};

	const handleDragOver = (event) => {
		event.preventDefault();
		if (event) {
			setGetIn(true);
			return;
		}
		setGetIn(false);
	};

	const handlechange = (event) => {
		event.preventDefault();

		const { files: filesToLoad } = event.target;

		Object.entries(filesToLoad).forEach(([key, file]) => {
			const data = new FileReader();
			data.addEventListener('load', () => {
				fileVerification(data.result, arrayFiles);

				// funcion
				setFormState({ ...formState, files: [...files, ...arrayFiles] });
			});
			data.readAsDataURL(file);
		});
	};

	const handleDelete = (file) => {
		const arrayFilter = files.filter((fileName) => fileName !== file);
		setFormState({ ...formState, files: arrayFilter });
	};

	return { handlechange, handleDragOver, handleDrop, handleDelete };
};
