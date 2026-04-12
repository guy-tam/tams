import { defineConfig, devices } from '@playwright/test';

// הגדרת Playwright עבור בדיקות e2e של TAMS.
// חשוב: יש להריץ `npm run dev` בטרמינל נפרד לפני הפעלת `npm run test:e2e`.
// שרת הפיתוח אינו מופעל אוטומטית כאן כדי להימנע מאתחול שביר.
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
