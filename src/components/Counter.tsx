import { useState } from 'react';

export default function Counter() {
	const [count, setCount] = useState(0);

	return (
		<button
			onClick={() => setCount(count + 1)}
			className="bg-fuchsia-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-fuchsia-700"
		>
			Clicked {count} times
		</button>
	);
}
