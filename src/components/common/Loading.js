import { makeStyles, createStyles } from '@mui/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => createStyles({
	container: {
		position: 'absolute',
		top: '0px',
		left: '0px',
		width: '100%',
		height: '100%',
		zIndex: 2000,
		backdropFilter: 'blur(10px)',
	},

	spinner: {
		boxSizing: 'border-box',
		margin: '0px',
		minWidth: '0px',
		display: 'flex',
		width: '30px',
		height: '30px',
		WebkitBoxAlign: 'center',
		alignItems: 'center',
		WebkitBoxPack: 'justify',
		justifyContent: 'space-between',
		zIndex: 100,
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
		textAlign: 'center',

		'&>div': {
			boxSizing: 'border-box',
			margin: 0,
			minWidth: 0,
			backgroundColor: theme.palette.primary.main,
			height: '100%',
			width: '3px',
			WebkitAnimation: 'animation-spinner 1.2s infinite ease-in-out',
			animation: 'animation-spinner 1.2s infinite ease-in-out',

			'&:nth-child(1)': {
				WebkitAnimationDelay: '-0.3s',
				animationDelay: '-0.3s',
			},

			'&:nth-child(2)': {
				WebkitAnimationDelay: '-0.2s',
				animationDelay: '-0.2s',
			},

			'&:nth-child(3)': {
				WebkitAnimationDelay: '-0.1s',
				animationDelay: '-0.1s',
			},

			'&:nth-child(4)': {
				WebkitAnimationDelay: '0s',
				animationDelay: '0s',
			},
		}
	},
}));

const Loading = ({ loading, children, keepMounted = false, className }) => {
	const classes = useStyles();

	const Spinner = () => (
		<div className={clsx(classes.container, className)}>
			<div className={classes.spinner}>
				<div />
				<div />
				<div />
				<div />
			</div>
		</div>
	);


	if (!keepMounted) {
		if (loading) return (<Spinner />);

		return children ?? null;
	} else {
		return (
			<>
				{loading && <Spinner />}
				{children}
			</>
		);
	}
};

export default Loading;
