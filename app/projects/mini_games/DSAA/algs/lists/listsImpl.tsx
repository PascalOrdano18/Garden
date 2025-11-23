'use client';

import { type NodeType } from "./types";
import { useState } from "react";

type NodeViewProps = {
  node: NodeType;
};

function NodeView({ node }: NodeViewProps) {
  return (
    <svg width="80" height="50">
      <rect
        x="5"
        y="5"
        width="70"
        height="40"
        rx="8"
        ry="8"
        fill="#facc15"
        stroke="#eab308"
        strokeWidth="2"
      />
      <text
        x="40"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fill="#000000"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      >
        {node.value}
      </text>
    </svg>
  );
}

export default function ListsImpl() {
  const [firstNode, setFirstNode] = useState<NodeType | null>(null);
  const [lastNode, setLastNode] = useState<NodeType | null>(null);
  const [currentNodeValue, setCurrentNodeValue] = useState<string>("");

  const insertNode = () => {
    const value = Number(currentNodeValue);
    if (Number.isNaN(value)) return;

    if (!firstNode) {
      const node: NodeType = {
        value,
        id: 0,
      };
      setFirstNode(node);
      setLastNode(node);
      return ;
    }
    
    if (!lastNode) return;

    const node: NodeType = {
      prev: lastNode,
      value,
      id: lastNode.id + 1,
    };

    lastNode.next = node;

    setLastNode(node);
    return;
  };

  // Recorrer la lista desde firstNode para poder renderizar todos los nodos
  const nodes: NodeType[] = [];
  let current = firstNode;
  while (current) {
    nodes.push(current);
    current = current.next ?? null;
  }

  return (
    <div>
      {/* settings de la lista */}
      <div>
        <input
          type="number"
          value={currentNodeValue}
          onChange={(e) => setCurrentNodeValue(e.target.value)}
        />
        <button onClick={insertNode}>Add Node</button>
      </div>

      {nodes.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {nodes.map((node, index) => (
            <div key={node.id} className="flex items-center gap-2">
              <NodeView node={node} />
              {index < nodes.length - 1 && (
                <span className="text-yellow-100 text-lg">→</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
