import Button from 'components/Button';
import Input from 'components/Input';
import { withAuth } from 'utils/auth';
import FormServices from 'services/FormServices';
import styles from 'styles/Home.module.css';
import { useForm } from 'hooks/useForm';
import DropArea from 'components/DropArea';
import Header from 'components/Header';

// ToDo: code this page following Figma design and specifications (https://www.figma.com/file/To3P20ST6fowk2I5kQRCEd/Lila-Frontend-Challenge?node-id=0%3A1&t=Gdm4LTgM1B70TerQ-1).

function Home() {
	/** Sends form data to backend and shows success/error message. */
	const {
		onInputChange,
		name,
		formState,
		files,
		getIn,
		readyToSend,
		setGetIn,
		setFormState,
	} = useForm({
		name: '',
		files: [],
	});

	const handleSubmit = async (e) => {
		// Hint: I'll leave this submit handler placeholder here for help.
		e.preventDefault();

		const { ok, data } = await FormServices.save(formState);

		// Hint: complete the code inside the save method too.

		if (ok) {
			console.log(data);
			alert(data);
			// ToDo : show success message.s
		} else {
			// ToDo : show error message.
			console.log(data);
			alert(data);
		}
	};

	return (
		<>
			<Header />
			<main className={styles.formContainer}>
				<form className={styles.form}>
					<section>
						<h1 className={styles.h1}>¡Subí tu foto!</h1>

						{/* Good luck! */}

						<Input
							className={styles.input}
							label={'Nombre de la imagen'}
							handleChange={onInputChange}
							name="name"
							value={name}
							size="large"
						/>
						<DropArea
							files={files}
							getIn={getIn}
							setGetIn={setGetIn}
							name={name}
							formState={formState}
							setFormState={setFormState}
						/>
					</section>

					<Button
						className={!readyToSend ? styles.Button : styles.ButtonOk}
						label={'Enviar'}
						handleClick={handleSubmit}
						disabled={!readyToSend}
					/>
				</form>
			</main>
		</>
	);
}

// ToDo: use withAuth High Order Component to force authentication for this page.
export default withAuth(Home);
