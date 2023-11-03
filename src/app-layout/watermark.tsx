import { useEffect, useRef, useState } from 'react';

/** 内置水印组件 */
export interface WatermarkProps {
  rotate?: number;
  content: string;
  fontColor?: string;
  fontSize?: number;
  zIndex?: number;
  gapX?: number;
  gapY?: number;
  width?: number;
  height?: number;
}
const getPixelRatio = (context: any) => {
  if (!context) {
    return 1;
  }
  const backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;
  return (window.devicePixelRatio || 1) / backingStore;
};
export default ({
  content,
  rotate = -20,
  fontColor = 'rgba(0, 0, 0, .15)',
  fontSize = 12,
  zIndex = 999,
  gapX = 100,
  gapY = 50,
  width = 120,
  height = 64,
}: WatermarkProps) => {
  const [img, setImg]: any = useState('');
  const canvasRef: any = useRef({});
  const drawImage = () => {
    const ctx = canvasRef.current.getContext('2d');
    const ratio = getPixelRatio(ctx);
    ctx.width = (gapX + width) * ratio;
    ctx.height = (gapY + height) * ratio;
    ctx.font = `${fontSize * ratio}px normal`;
    ctx.fillStyle = fontColor;
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.fillText(content, 0, 100);
    setImg(canvasRef.current.toDataURL('image/png'));
  };
  useEffect(() => {
    drawImage();
  }, []);
  return (
    <>
      <div
        className="app-layout-water-mark"
        style={{
          backgroundImage: `url(${img})`,
          zIndex,
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          backgroundSize: gapX + width,
          pointerEvents: 'none',
          backgroundRepeat: 'repeat',
        }}
      />
      <canvas
        style={{
          position: 'fixed',
          bottom: -9999,
          right: -9999,
        }}
        ref={canvasRef}
        width="450"
        height="320"
      />
    </>
  );
};
