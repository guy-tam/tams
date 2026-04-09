// תמונת OG דינמית — נוצרת אוטומטית עבור שיתוף ברשתות חברתיות
import { ImageResponse } from 'next/og'

export const alt = 'TAMS — Blockchain Investment Infrastructure'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0f1e 0%, #111827 50%, #0a0f1e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* קו עליון דקורטיבי בצבע זהב */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, transparent, #d4a843, transparent)',
            display: 'flex',
          }}
        />

        {/* מסגרת פנימית עדינה */}
        <div
          style={{
            position: 'absolute',
            top: '32px',
            left: '32px',
            right: '32px',
            bottom: '32px',
            border: '1px solid rgba(212, 168, 67, 0.15)',
            borderRadius: '8px',
            display: 'flex',
          }}
        />

        {/* תוכן מרכזי */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          {/* סמל דקורטיבי */}
          <div
            style={{
              width: '64px',
              height: '4px',
              background: '#d4a843',
              borderRadius: '2px',
              marginBottom: '8px',
              display: 'flex',
            }}
          />

          {/* כותרת ראשית */}
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '12px',
              display: 'flex',
            }}
          >
            TAMS
          </div>

          {/* קו מפריד זהב */}
          <div
            style={{
              width: '120px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #d4a843, transparent)',
              margin: '8px 0',
              display: 'flex',
            }}
          />

          {/* כותרת משנה */}
          <div
            style={{
              fontSize: 28,
              fontWeight: 400,
              color: '#d4a843',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            Blockchain Investment Infrastructure
          </div>

          {/* תיאור נוסף */}
          <div
            style={{
              fontSize: 16,
              fontWeight: 300,
              color: 'rgba(255, 255, 255, 0.5)',
              letterSpacing: '2px',
              marginTop: '16px',
              display: 'flex',
            }}
          >
            Institutional Grade Research & Analysis
          </div>
        </div>

        {/* קו תחתון דקורטיבי */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, transparent, #d4a843, transparent)',
            display: 'flex',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
