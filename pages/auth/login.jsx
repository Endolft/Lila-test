import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLoginContext } from 'utils/auth';
import Img from 'components/Img';
import Input from 'components/Input';
import Button from 'components/Button';
import imgLogo from 'public/assets/logo.png';
import styles from 'styles/Login.module.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [success, setSuccess] = useState(false);
  const { login } = useLoginContext();
  const router = useRouter();

  /*  */

  const [dataAnswer, setDataAnswer] = useState('');

  /*  */

  useEffect(() => {
    router.prefetch('/');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleLogin = async () => {
    setSuccess(false);
    const { ok, data } = await login(form);

    if (ok) {
      setSuccess(true);
      // ToDo: Redirect the user to the home page after a successful login.
      router.push('/');
    } else {
      // ToDo: If the login fails, show the error message returned from the api to the user.
      setSuccess(false);
    }
    setDataAnswer(data);
  };

  return (
    <div className={styles.main}>
      <Img src={imgLogo} alt="Logo" className={styles.logo} />
      <Input
        className={styles.input}
        label="Email"
        name="email"
        value={form.email}
        handleChange={handleChange}
        size="large"
      />
      <Input
        className={styles.input}
        label="Contraseña"
        name="password"
        type="password"
        value={form.password}
        handleChange={handleChange}
        size="large"
      />
      {dataAnswer && (
        <p className={!success ? styles.error : styles.success}>{dataAnswer}</p>
      )}

      <Button
        className={styles.button}
        disabled={Object.values(form).some((val) => val === '')}
        label="Iniciar sesión"
        handleClick={handleLogin}
        size="medium"
      />
    </div>
  );
};

export default Login;
