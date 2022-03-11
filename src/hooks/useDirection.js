import { useSelector } from 'react-redux';
import { RTL_LANGS } from '../constants';

const selector = state => state.trade.language;
const useDirection = () => {
	const language = useSelector(selector);
	return RTL_LANGS.includes(String(language).toLowerCase()) ? 'rtl' : 'ltr';
};

export default useDirection;
