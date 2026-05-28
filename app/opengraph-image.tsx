import { ImageResponse } from 'next/og';

export const alt = "Pascal Ordano's Garden";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000000',
          padding: '80px',
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: '#FEF9C3',
            letterSpacing: '-0.04em',
            textAlign: 'center',
          }}
        >
          Pascal Ordano&apos;s Garden
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 36,
            color: '#9ca3af',
            textAlign: 'center',
            maxWidth: 900,
          }}
        >
          A place where I share what I create and things that interest me.
        </div>
      </div>
    ),
    { ...size },
  );
}
