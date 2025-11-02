'use client'

import { Node } from "./types";
import { useState, useEffect, useRef } from 'react';
 


const populate = (nodeAmount: number, containerWidth: number, containerHeight: number, nodeSize: number = 48): Node[] => {
	const graph: Node[] = [];
	const maxX = containerWidth - nodeSize;
	const maxY = containerHeight - nodeSize;
	
	for(let i = 0; i < nodeAmount; i++){
		const node: Node = {
			id: i,
			value: Math.floor(Math.random() * 10),
			neighbours: [],
			x: Math.random() * maxX,
			y: Math.random() * maxY,
		}
		graph.push(node);
	}

	for(let i = 0; i < nodeAmount; i++){
		let neighboursAmount = Math.floor(Math.random() * 4); // max3 neighbours por ahora
		for(let j = 0; j < neighboursAmount; j++){
			let neighbourId = Math.floor(Math.random() * 10);
			if(i !== neighbourId && !graph[neighbourId]?.neighbours.includes(i) && !graph[i].neighbours.includes(neighbourId)){
				graph[i]?.neighbours?.push(neighbourId);
				graph[neighbourId]?.neighbours?.push(i);
			}
		}
	}
	console.log(graph);
	return graph;
}

export default function Graphs(){
	
	const [nodes, setNodes] = useState<Node[]>([]);
	const [draggedNode, setDraggedNode] = useState<number | null>(null);
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;
		
		const containerRect = containerRef.current.getBoundingClientRect();
		const containerWidth = containerRect.width;
		const containerHeight = containerRect.height;
		
		console.log('useEffect');
		setNodes(populate(5, containerWidth, containerHeight));
	}, []);

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, nodeId: number) => {
		e.preventDefault();
		const node = nodes.find(n => n.id === nodeId);
		if(!node || !containerRef.current) return;

		const containerRect = containerRef.current.getBoundingClientRect();
		// Calcular el offset: diferencia entre dónde hiciste click y la posición actual del nodo
		setDragOffset({
			x: e.clientX - containerRect.left - node.x,
			y: e.clientY - containerRect.top - node.y
		});
		setDraggedNode(nodeId);
	}

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if(!draggedNode || !containerRef.current) return;
		
		const containerRect = containerRef.current.getBoundingClientRect();
		// Restar el offset para mantener la posición relativa del click
		const newX = e.clientX - containerRect.left - dragOffset.x;
		const newY = e.clientY - containerRect.top - dragOffset.y;
		
		setNodes(prevNodes => 
			prevNodes.map(node => 
				node.id === draggedNode ? 
					{ ...node, x: newX, y: newY } 
				: node
			)
		);
	}


	return(
		<div className="w-full">
			<h1 className="text-4xl text-white mb-8">
				GRAPHS
			</h1>

			<div 
				ref={containerRef}
				className="relative w-[calc(100vw-2rem)] max-w-none h-[800px] border border-gray-700 rounded-lg -mx-4"
				style={{ width: 'calc(100vw - 2rem)' }}
				onMouseMove={handleMouseMove}
				onMouseUp={() => setDraggedNode(null)}
			>
				{nodes.map((node) => (
					<div 
						key={node.id} 
						className="absolute bg-blue-800 rounded-full w-12 h-12 flex items-center justify-center cursor-move"
						style={{
							left: `${node.x}px`,
							top: `${node.y}px`,
						}}
						onMouseDown={(e) => handleMouseDown(e, node.id)}
					>
						<span className="text-white font-bold">{node.value}</span>
					</div>
				))}
			</div>

		</div>
	);

}
