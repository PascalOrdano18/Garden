'use client'

import { useState, useRef } from 'react';

export default function WriteOrDie(){
	
	const [input, setInput] = useState<string>('');
	const startTimerRef = useRef<number | null>(null);
	const endTimerRef = useRef<number | null>(null);
	
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(input);
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if(input === ''){
			startTimer();
		}
		setInput(e.target.value);
	}

	const startTimer = () => {
		startTimerRef.current = performance.now();
	}

	return (
		<div>
			<h1 className="text-4xl text-white mb-8">WRITE OR DIE</h1>
			<div className='w-full h-full bg-black opacity-70'>
				<form onSubmit={handleSubmit}>
					<input className='text-white bg-transparent focus:outline-none auto-focus' onChange={handleChange} value={input} /> 
				</form>
			</div>
		</div>
	);
}
