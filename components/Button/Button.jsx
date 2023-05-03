import { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'utils/classNames';
import styles from './Button.module.css';

const Button = ({
	handleClick,
	label,
	size,
	primary,
	className,
	disabled,
	...props
}) => {
	const [loading, setLoading] = useState(false);

	const handleClickLoader = async (...params) => {
		setLoading(true);
		await handleClick(...params);
		setLoading(false);
	};

	return (
		<button
			className={cn(
				styles.button,
				styles[size],
				styles[primary ? 'primary' : 'secondary'],
				className
			)}
			onClick={handleClickLoader}
			disabled={loading || disabled}
			{...props}
		>
			{loading ? <span className={styles.loading}></span> : label}
		</button>
	);
};

Button.propTypes = {
	handleClick: PropTypes.func,
	label: PropTypes.string,
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	className: PropTypes.string,
	primary: PropTypes.bool,
	disabled: PropTypes.bool,
};

Button.defaultProps = {
	handleClick: () => {},
	className: '',
	label: '',
	size: 'medium',
	primary: true,
	disabled: false,
};

export default Button;
