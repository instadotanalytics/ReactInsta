// BackgroundCanvas.jsx
import React, { useRef, useEffect } from 'react';

const BackgroundCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let width, height;
    let time = 0;
    const shapes = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const rect = parent.getBoundingClientRect();
      width = rect.width || 1200;
      height = rect.height || 700;
      
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initShapes();
    };

    const initShapes = () => {
      shapes.length = 0;
      const minDim = Math.min(width, height);
      
      // Light purple/indigo gradient blobs - exactly like the image
      shapes.push({
        x: width * 0.2,
        y: height * 0.15,
        radius: minDim * 0.45,
        color: 'rgba(139, 92, 246, 0.06)',
        blur: 120,
        speedX: 0.00015,
        speedY: 0.0001,
        phase: 0,
      });
      
      shapes.push({
        x: width * 0.7,
        y: height * 0.2,
        radius: minDim * 0.35,
        color: 'rgba(99, 102, 241, 0.05)',
        blur: 100,
        speedX: -0.00012,
        speedY: 0.00018,
        phase: 1.2,
      });
      
      shapes.push({
        x: width * 0.5,
        y: height * 0.75,
        radius: minDim * 0.4,
        color: 'rgba(192, 132, 252, 0.04)',
        blur: 130,
        speedX: 0.0001,
        speedY: -0.00012,
        phase: 2.5,
      });
      
      shapes.push({
        x: width * 0.85,
        y: height * 0.6,
        radius: minDim * 0.25,
        color: 'rgba(167, 139, 250, 0.03)',
        blur: 80,
        speedX: 0.0002,
        speedY: 0.00008,
        phase: 0.7,
      });
      
      shapes.push({
        x: width * 0.3,
        y: height * 0.85,
        radius: minDim * 0.2,
        color: 'rgba(129, 140, 248, 0.04)',
        blur: 70,
        speedX: -0.00018,
        speedY: 0.00025,
        phase: 1.8,
      });
      
      // Very light accent blobs
      shapes.push({
        x: width * 0.1,
        y: height * 0.4,
        radius: minDim * 0.12,
        color: 'rgba(196, 181, 253, 0.03)',
        blur: 50,
        speedX: 0.00025,
        speedY: -0.00015,
        phase: 0.3,
      });
      
      shapes.push({
        x: width * 0.9,
        y: height * 0.3,
        radius: minDim * 0.1,
        color: 'rgba(224, 231, 255, 0.04)',
        blur: 45,
        speedX: -0.0003,
        speedY: 0.0002,
        phase: 2.0,
      });
    };

    const draw = () => {
      // Clear with very light background
      ctx.clearRect(0, 0, width, height);
      
      // Soft gradient background - like the image
      const gradient = ctx.createRadialGradient(
        width * 0.4, height * 0.3, 0,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.8
      );
      gradient.addColorStop(0, '#faf9ff');
      gradient.addColorStop(0.2, '#f5f3ff');
      gradient.addColorStop(0.5, '#ede9fe');
      gradient.addColorStop(0.7, '#e0e7ff');
      gradient.addColorStop(0.9, '#dbeafe');
      gradient.addColorStop(1, '#f1f5f9');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Draw soft blobs with feathery edges
      shapes.forEach(shape => {
        const { x, y, radius, color, blur, speedX, speedY, phase } = shape;
        
        // Gentle floating motion
        const floatX = Math.sin(time * speedX + phase) * radius * 0.05;
        const floatY = Math.cos(time * speedY + phase * 0.7) * radius * 0.05;
        
        const cx = x + floatX;
        const cy = y + floatY;
        
        // Create extremely soft gradient blob
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, color);
        grad.addColorStop(0.3, color);
        grad.addColorStop(0.7, color);
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        
        ctx.save();
        ctx.filter = `blur(${blur}px)`;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      
      // Very subtle white glow overlay
      const glow = ctx.createRadialGradient(
        width * 0.3, height * 0.2, 0,
        width * 0.3, height * 0.2, Math.max(width, height) * 0.6
      );
      glow.addColorStop(0, 'rgba(255,255,255,0.15)');
      glow.addColorStop(0.3, 'rgba(255,255,255,0.05)');
      glow.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
      
      // Additional subtle light from the right
      const glow2 = ctx.createRadialGradient(
        width * 0.8, height * 0.1, 0,
        width * 0.8, height * 0.1, Math.max(width, height) * 0.4
      );
      glow2.addColorStop(0, 'rgba(139, 92, 246, 0.03)');
      glow2.addColorStop(1, 'rgba(139, 92, 246, 0)');
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, width, height);
      
      time += 0.004;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default BackgroundCanvas;