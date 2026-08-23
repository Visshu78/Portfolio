import React from 'react';

export default function VisionHudOverlay() {
  return (
    <>
      {/* Fixed corner overlays — subtly frame the viewport */}
      <div
        className="fixed top-16 left-4 pointer-events-none z-30 font-mono text-[0.58rem] leading-5 hidden xl:block"
        style={{ color: 'rgba(255,255,255,0.12)' }}
      >
        <div style={{ color: 'rgba(0,240,255,0.3)' }}>[ OPTICAL_GRID // 40px ]</div>
        <div>CALIBRATION: PASS</div>
      </div>

      <div
        className="fixed bottom-5 right-6 pointer-events-none z-30 font-mono text-[0.58rem] text-right leading-5 hidden xl:block"
        style={{ color: 'rgba(255,255,255,0.1)' }}
      >
        <div style={{ color: 'rgba(0,240,255,0.25)' }}>ENGINE: FP16_TENSORRT</div>
        <div>V1SSHU78</div>
      </div>
    </>
  );
}
