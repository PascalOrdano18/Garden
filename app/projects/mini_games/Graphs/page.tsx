'use client'

import { Node } from "./types";
import { useState, useEffect, useRef } from 'react';
import BFS, { BFSStep } from "./algorithms/bfs";
 


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
			status: 'notVisited',
			state: false,
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

	const setGraph = () => {
		if (!containerRef.current) return;
		
		const containerRect = containerRef.current.getBoundingClientRect();
		const containerWidth = containerRect.width;
		const containerHeight = containerRect.height;
		
		const population = Math.floor(Math.random() * 5) + 3;

		setNodes(populate(population, containerWidth, containerHeight));
	}	
	useEffect(() => {
		setGraph();
	}, []);

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, nodeId: number) => {
		e.preventDefault();
		e.stopPropagation(); // Evitar que se propague el evento
		const node = nodes.find(n => n.id === nodeId);
		if(!node || !containerRef.current) return;

		// Validar que las coordenadas del nodo sean válidas
		const nodeX = node.x ?? 0;
		const nodeY = node.y ?? 0;

		const containerRect = containerRef.current.getBoundingClientRect();
		// Calcular el offset: diferencia entre dónde hiciste click y la posición actual del nodo
		setDragOffset({
			x: e.clientX - containerRect.left - nodeX,
			y: e.clientY - containerRect.top - nodeY
		});
		setDraggedNode(nodeId);
	}

	// Runner: consume pasos emitidos por BFS (callback) y re-renderiza con delay
	const runBFS = async () => {
		// resetear estados visuales antes de correr
		setNodes(prev => prev.map(n => ({ ...n, status: 'notVisited' })));

		const steps: BFSStep[] = [];
		BFS(nodes, (step) => {
			steps.push(step);
		});

		for (const step of steps) {
			setNodes(prev => prev.map(n =>
				n.id === step.nodeId
					? { ...n, status: step.status }
					: n
			));
			await new Promise(res => setTimeout(res, 250));
		}
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if(draggedNode === null || !containerRef.current) return;
		
		const containerRect = containerRef.current.getBoundingClientRect();
		// Restar el offset para mantener la posición relativa del click
		const newX = e.clientX - containerRect.left - dragOffset.x;
		const newY = e.clientY - containerRect.top - dragOffset.y;
		
		// Asegurar que las coordenadas sean válidas y estén dentro de los límites
		const nodeSize = 48;
		const maxX = containerRect.width - nodeSize;
		const maxY = containerRect.height - nodeSize;
		
		setNodes(prevNodes => 
			prevNodes.map(node => 
				node.id === draggedNode ? 
					{ ...node, x: Math.max(0, Math.min(newX, maxX)), y: Math.max(0, Math.min(newY, maxY)) } 
				: node
			)
		);
	}


	return(
		<div className="w-full">
			<div className="flex flex-col items-center justify-center">
				<h1 className="text-4xl text-white mb-8">
					GRAPHS
				</h1>
				<div className="w-full m-2 flex flex-row items-center justify-center">
					<button className="bg-black p-2 rounded-lg w-40 hover:text-yellow-100 transition-all mx-2" onClick={setGraph}>New Graph</button>
					<button className="bg-black p-2 rounded-lg w-40 hover:text-yellow-100 transition-all mx-2" onClick={runBFS}>BFS</button>
				</div>
			</div>

			<div 
				ref={containerRef}
				className="relative bg-black opacity-70 w-[calc(100vw-2rem)] max-w-none h-[800px] border border-gray-700 rounded-lg -mx-4"
				style={{ width: 'calc(100vw - 2rem)' }}
				onMouseMove={handleMouseMove}
				onMouseUp={() => setDraggedNode(null)}
			>

				<svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
					{nodes.map((node) => (
						node.neighbours.map((neighbourId) => {
							if(node.id >= neighbourId) return null
							const neighbour = nodes.find(n => n.id === neighbourId);
							if(!neighbour) return null;
							return (
									<line 
										key={node.id - neighbourId}
										x1={node.x + 24}
										y1={node.y + 24}
										x2={neighbour.x + 24}
										y2={neighbour.y + 24}
										stroke="#3b82f6"
										strokeWidth="2"
									/>
							)
						})
					))}
				</svg>
				
				{nodes.map((node) => (

					<div 
						key={node.id} 
						className="absolute rounded-full w-12 h-12 flex items-center justify-center cursor-move z-10"
						style={{
							background: `${!node.state ? "blue" : "black"}`,
							left: `${node.x ?? 0}px`,
							top: `${node.y ?? 0}px`,
							zIndex: draggedNode === node.id ? 50 : 10
						}}
						onMouseDown={(e) => handleMouseDown(e, node.id)}
					>
						<span className="text-white font-bold pointer-events-none">{node.id + 1}</span>
					</div>
				))}
			</div>

		</div>
	);

}
