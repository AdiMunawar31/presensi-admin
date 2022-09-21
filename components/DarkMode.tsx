import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import { IoColorPalette } from 'react-icons/io5';

const DarkMode = () => {
	const { theme, setTheme } = useTheme();

	const changeTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};
	return (
		<div>
			<li>
				<div className='m-3'>
					<button
						onClick={changeTheme}
						className='bg-white text-gray-800 font-bold rounded border-b-2 border-gray-500 hover:border-gray-600 hover:bg-gray-500 hover:text-white shadow-md py-1 px-6 inline-flex items-center'
					>
						<span className='mr-2'>Theme</span>
						<IoColorPalette />
					</button>
				</div>
			</li>
		</div>
	);
};

export default DarkMode;
