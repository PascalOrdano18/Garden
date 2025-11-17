'use client'

import { useState, useRef } from 'react';

export default function WriteOrDie(){
	
	const [input, setInput] = useState<string>('');
	const startTimerRef = useRef<number | null>(null);
	
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(input);
	}

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if(input === ''){
			startTimer();
		}
		setInput(e.target.value);
	}

	const startTimer = () => {
		startTimerRef.current = performance.now();
	}

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-8">
			<h1 className="text-5xl font-bold text-white mb-12 tracking-wider">WRITE OR DIE</h1>
			<div className='w-full max-w-7xl px-8'>
				<form onSubmit={handleSubmit} className="w-full">
					<textarea 
						className='w-full h-96 text-white bg-transparent focus:outline-none text-2xl font-mono tracking-wide leading-relaxed resize-none placeholder:text-gray-500 border-2 border-gray-700 rounded-lg p-6 focus:border-gray-500 transition-colors' 
						onChange={handleChange} 
						value={input}
						placeholder="Empieza a escribir..."
						autoFocus
					/> 
				</form>
			</div>
		</div>
	);
}
