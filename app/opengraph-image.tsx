import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt =
  'MeetEase — AI-native video conferencing with live transcription and a Claude-powered copilot';
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
          justifyContent: 'space-between',
          padding: '80px',
          background:
            'radial-gradient(1000px 500px at 15% -10%, rgba(225,29,72,0.35), transparent 55%), radial-gradient(900px 500px at 110% 20%, rgba(244,63,94,0.18), transparent 50%), #0c0a09',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #e11d48, #fb7185)',
            }}
          />
          <div style={{ fontSize: 30, color: '#e7e5e4', fontWeight: 700 }}>
            MeetEase
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              color: '#fafaf9',
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Smarter meetings,
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              background: 'linear-gradient(90deg, #fb7185, #f43f5e)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            beautifully simple.
          </div>
          <div style={{ fontSize: 32, color: '#a8a29e', marginTop: 8 }}>
            HD video · live transcription · a Claude-powered copilot
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 26,
            color: '#78716c',
          }}
        >
          <div>Built by Chanda Charan Reddy</div>
          <div style={{ color: '#a8a29e' }}>charanreddy.dev</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
