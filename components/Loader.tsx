import React from 'react';

const Loader = () => {
	return (
		<div className='flex justify-center py-40'>
			<div
				className='animate-spin inline-block w-10 h-10 border-4 border-current border-t-transparent text-blue-600 rounded-full'
				role='status'
				aria-label='loading'
			>
				<span className='sr-only'>Loading...</span>
			</div>
		</div>
	);
};

export default Loader;
