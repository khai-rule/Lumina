'use client';

import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface DiagramCanvasProps {
  selectedTool: string;
  onDiagramChange: (hasContent: boolean) => void;
}

interface DrawingElement {
  id: string;
  type: 'rectangle' | 'circle' | 'line' | 'text';
  x: number;
  y: number;
  width?: number;
  height?: number;
  text?: string;
  color: string;
}

const DiagramCanvas = ({ selectedTool, onDiagramChange }: DiagramCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [elements, setElements] = useState<DrawingElement[]>([]);
  const [currentElement, setCurrentElement] = useState<DrawingElement | null>(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    onDiagramChange(elements.length > 0);
  }, [elements, onDiagramChange]);

  useEffect(() => {
    redrawCanvas();
  }, [elements]);

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    elements.forEach((element) => {
      ctx.strokeStyle = element.color;
      ctx.fillStyle = element.color;
      ctx.lineWidth = 2;

      switch (element.type) {
        case 'rectangle':
          ctx.strokeRect(element.x, element.y, element.width || 0, element.height || 0);
          break;
        case 'circle':
          ctx.beginPath();
          ctx.arc(element.x, element.y, (element.width || 0) / 2, 0, 2 * Math.PI);
          ctx.stroke();
          break;
        case 'line':
          ctx.beginPath();
          ctx.moveTo(element.x, element.y);
          ctx.lineTo(element.x + (element.width || 0), element.y + (element.height || 0));
          ctx.stroke();
          break;
        case 'text':
          ctx.font = '16px Inter';
          ctx.fillText(element.text || '', element.x, element.y);
          break;
      }
    });
  };

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedTool === 'select') return;

    const pos = getMousePos(e);
    setStartPos(pos);
    setIsDrawing(true);

    if (selectedTool === 'text') {
      const text = prompt('Enter text:');
      if (text) {
        const newElement: DrawingElement = {
          id: Date.now().toString(),
          type: 'text',
          x: pos.x,
          y: pos.y,
          text,
          color: '#2563EB',
        };
        setElements((prev) => [...prev, newElement]);
      }
      setIsDrawing(false);
      return;
    }

    const newElement: DrawingElement = {
      id: Date.now().toString(),
      type: selectedTool as DrawingElement['type'],
      x: pos.x,
      y: pos.y,
      width: 0,
      height: 0,
      color: '#2563EB',
    };
    setCurrentElement(newElement);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentElement || selectedTool === 'text') return;

    const pos = getMousePos(e);
    const width = pos.x - startPos.x;
    const height = pos.y - startPos.y;

    setCurrentElement({
      ...currentElement,
      width,
      height,
    });

    // Redraw with current element
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    redrawCanvas();

    ctx.strokeStyle = currentElement.color;
    ctx.lineWidth = 2;

    switch (currentElement.type) {
      case 'rectangle':
        ctx.strokeRect(currentElement.x, currentElement.y, width, height);
        break;
      case 'circle':
        ctx.beginPath();
        ctx.arc(currentElement.x, currentElement.y, Math.abs(width) / 2, 0, 2 * Math.PI);
        ctx.stroke();
        break;
      case 'line':
        ctx.beginPath();
        ctx.moveTo(currentElement.x, currentElement.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        break;
    }
  };

  const handleMouseUp = () => {
    if (!isDrawing || !currentElement) return;

    if (Math.abs(currentElement.width || 0) > 5 || Math.abs(currentElement.height || 0) > 5) {
      setElements((prev) => [...prev, currentElement]);
    }

    setIsDrawing(false);
    setCurrentElement(null);
  };

  const clearCanvas = () => {
    setElements([]);
    setCurrentElement(null);
  };

  const undoLastAction = () => {
    setElements((prev) => prev.slice(0, -1));
  };

  return (
    <div className="relative w-full h-full bg-background border border-border rounded-lg overflow-hidden">
      <div className="absolute top-4 right-4 flex space-x-2 z-10">
        <button
          onClick={undoLastAction}
          disabled={elements.length === 0}
          className="p-2 bg-card border border-border rounded-md hover:bg-muted transition-default disabled:opacity-50 disabled:cursor-not-allowed"
          title="Undo"
        >
          <Icon name="ArrowUturnLeftIcon" size={16} />
        </button>
        <button
          onClick={clearCanvas}
          disabled={elements.length === 0}
          className="p-2 bg-card border border-border rounded-md hover:bg-muted transition-default disabled:opacity-50 disabled:cursor-not-allowed"
          title="Clear Canvas"
        >
          <Icon name="TrashIcon" size={16} />
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="w-full h-full cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      {elements.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-muted-foreground">
            <Icon name="PencilIcon" size={48} className="mx-auto mb-3 opacity-50" />
            <p className="text-lg font-medium">Start Drawing</p>
            <p className="text-sm">Select a tool and click to begin creating your diagram</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagramCanvas;