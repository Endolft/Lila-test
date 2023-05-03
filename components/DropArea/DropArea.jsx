import PropTypes from 'prop-types';
import Img from 'components/Img';
import { useFiles } from 'hooks/useFiles';
import InputFiles from 'components/Inputfiles';
import styles from './DropArea.module.css';

const DropArea = ({
	files,
	name,
	formState,
	getIn,
	setGetIn,
	setFormState,
}) => {
	const { handleDragOver, handleDrop, handlechange, handleDelete } = useFiles(
		setGetIn,
		setFormState,
		formState
	);

	return (
		<div className={styles.dropzoneContainer}>
			{files.length === 0 && (
				<div
					className={!getIn ? styles.dropzone : styles.dropzoneIn}
					onDragOver={handleDragOver}
					onDrop={handleDrop}
					accept="image/jpeg, image/png, image/jpg"
				>
					{!getIn ? (
						<>
							<h4 className={styles.textSubtitle}>Subí tu imagen favorita </h4>
							<InputFiles handlechange={handlechange} />
						</>
					) : (
						<div className={styles.dropzoneInEmpty}>
							<p className={styles.text}> Soltá acá la imagen</p>
							<InputFiles handlechange={handlechange} />
						</div>
					)}
				</div>
			)}
			{files.length !== 0 && (
				<div
					className={styles.dropzoneIn}
					onDragOver={handleDragOver}
					onDrop={handleDrop}
				>
					<div className={styles.imagesScroll}>
						{files.map((file, index) => {
							return (
								<div key={index} className={styles.containerImage}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										onClick={() => handleDelete(file)}
										className={styles.buttoDelete}
									>
										<path fill="none" d="M0 0h24v24H0z" />{' '}
										<path d="M4 8h16v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8zm2 2v10h12V10H6zm3 2h2v6H9v-6zm4 0h2v6h-2v-6zM7 5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h5v2H2V5h5zm2-1v1h6V4H9z" />{' '}
									</svg>
									<Img
										src={file}
										alt={name}
										width={101}
										height={114}
										className={styles.imagesize}
									/>
								</div>
							);
						})}
					</div>
					<div className={styles.inputContainerwhitImages}>
						<InputFiles handlechange={handlechange} />
					</div>
				</div>
			)}
		</div>
	);
};
export default DropArea;

DropArea.propTypes = {
	files: PropTypes.array.isRequired,
	name: PropTypes.string.isRequired,
	formState: PropTypes.object.isRequired,
	getIn: PropTypes.bool.isRequired,
	setGetIn: PropTypes.func,
	setFormState: PropTypes.func,
};
