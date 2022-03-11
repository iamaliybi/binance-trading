const Visibility = ({ visibility, children, component }) => {
	if (visibility) return component ?? children;

	return null;
};

export default Visibility;
