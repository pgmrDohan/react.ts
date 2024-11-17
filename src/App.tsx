import { RouterProvider } from 'react-router-dom';

import { useDarkMode, useRouter } from '@/hooks';
import { useEffect } from 'react';

const App = () => {
	const router = useRouter();
	const { applyTheme } = useDarkMode();

	useEffect(()=>{
		applyTheme();
	},[]);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;