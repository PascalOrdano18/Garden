'use client';

import { type NodeType } from "./types";
import { useEffect, useRef, useState } from "react";

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
  const [error, setError] = useState<string | null>(null);
  const [positions, setPositions] = useState<
    Record<number, { x: number; y: number }>
  >({});
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(
    null,
  );
  const areaRef = useRef<HTMLDivElement | null>(null);

  const insertNode = () => {
    const value = Number(currentNodeValue);

    if (currentNodeValue.trim() === "") {
      setError("Please enter a value before adding a node.");
      return;
    }

    if (Number.isNaN(value)) {
      setError("Only numeric values are allowed.");
      return;
    }

    setError(null);

    if (!firstNode) {
      const node: NodeType = {
        value,
        id: 0,
      };
      setFirstNode(node);
      setLastNode(node);
      setPositions((prev) => ({
        ...prev,
        [node.id]: prev[node.id] ?? { x: 120, y: 80 },
      }));
      setCurrentNodeValue("");
      return;
    }

    if (!lastNode) return;

    const node: NodeType = {
      prev: lastNode,
      value,
      id: lastNode.id + 1,
    };

    const updatedLastNode: NodeType = {
      ...lastNode,
      next: node,
    };

    setFirstNode((prev) => {
      if (!prev) return prev;
      // Update the chain by finding and updating the lastNode in the chain
      const updateNode = (n: NodeType | null): NodeType | null => {
        if (!n) return null;
        if (n.id === lastNode.id) {
          return updatedLastNode;
        }
        const updatedNext = updateNode(n.next ?? null);
        return {
          ...n,
          next: updatedNext === null ? undefined : updatedNext,
        };
      };
      const result = updateNode(prev);
      return result;
    });

    setLastNode(node);
    setPositions((prev) => ({
      ...prev,
      [node.id]: prev[node.id] ?? { x: 120 + node.id * 110, y: 80 },
    }));
    setCurrentNodeValue("");
    return;
  };

  const handleNodeMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    nodeId: number,
  ) => {
    if (!areaRef.current) return;

    const rect = areaRef.current.getBoundingClientRect();
    const pointerX = e.clientX - rect.left;
    const pointerY = e.clientY - rect.top;

    const currentPos =
      positions[nodeId] ?? {
        x: rect.width / 2,
        y: rect.height / 2,
      };

    setDraggingId(nodeId);
    setDragOffset({
      x: pointerX - currentPos.x,
      y: pointerY - currentPos.y,
    });

    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (draggingId === null || !areaRef.current || !dragOffset) return;

      const rect = areaRef.current.getBoundingClientRect();
      const pointerX = event.clientX - rect.left;
      const pointerY = event.clientY - rect.top;

      let x = pointerX - dragOffset.x;
      let y = pointerY - dragOffset.y;

      const padding = 30;
      x = Math.max(padding, Math.min(rect.width - padding, x));
      y = Math.max(padding, Math.min(rect.height - padding, y));

      setPositions((prev) => ({
        ...prev,
        [draggingId]: { x, y },
      }));
    };

    const handleMouseUp = () => {
      if (draggingId !== null) {
        setDraggingId(null);
        setDragOffset(null);
      }
    };

    if (draggingId !== null) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggingId, dragOffset]);

  // Recorrer la lista desde firstNode para poder renderizar todos los nodos
  const nodes: NodeType[] = [];
  let current = firstNode;
  while (current) {
    nodes.push(current);
    current = current.next ?? null;
  }

  return (
    <div className="space-y-4">
      {/* list settings */}
      <div className="bg-zinc-900/60 border border-yellow-100/20 rounded-xl px-4 py-3 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-end gap-3">
        <div className="flex-1">
          <label className="block text-xs sm:text-sm font-medium text-yellow-100 mb-1.5">
            Add value to the list
          </label>
          <input
            type="number"
            inputMode="numeric"
            value={currentNodeValue}
            onChange={(e) => {
              setCurrentNodeValue(e.target.value);
              if (error) setError(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                insertNode();
              }
            }}
            placeholder="e.g. 10"
            className="w-full rounded-lg border border-yellow-100/40 bg-black/40 px-3 py-2 text-sm text-yellow-50 placeholder:text-yellow-100/40 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 transition"
          />
          <p className="mt-1 text-[11px] sm:text-xs text-yellow-100/70">
            Values are added to the end of the list in the order you insert them.
          </p>
          {error && (
            <p className="mt-1 text-[11px] sm:text-xs text-red-300">
              {error}
            </p>
          )}
        </div>

        <button
          onClick={insertNode}
          className="inline-flex items-center justify-center rounded-lg bg-yellow-300 px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-yellow-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={currentNodeValue.trim() === ""}
        >
          Add Node
        </button>
      </div>

      {nodes.length > 0 && (
        <div
          ref={areaRef}
          className="relative mt-2 h-64 w-full rounded-xl border border-yellow-100/20 bg-black/40 overflow-hidden"
        >
          <svg
            className="pointer-events-none absolute inset-0"
            width="100%"
            height="100%"
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="8"
                refX="8"
                refY="4"
                orient="auto"
              >
                <path d="M0,0 L8,4 L0,8 z" fill="#facc15" />
              </marker>
            </defs>

            {nodes.map((node, index) => {
              const next = index < nodes.length - 1 ? nodes[index + 1] : null;
              if (!next) return null;

              const from = positions[node.id];
              const to = positions[next.id];

              if (!from || !to) return null;

              return (
                <line
                  key={`${node.id}-${next.id}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="#facc15"
                  strokeWidth={2}
                  markerEnd="url(#arrowhead)"
                />
              );
            })}
          </svg>

          {nodes.map((node) => {
            const pos = positions[node.id];
            if (!pos) return null;

            return (
              <div
                key={node.id}
                className="absolute cursor-grab active:cursor-grabbing"
                style={{
                  left: pos.x,
                  top: pos.y,
                  transform: "translate(-50%, -50%)",
                }}
                onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
              >
                <NodeView node={node} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
