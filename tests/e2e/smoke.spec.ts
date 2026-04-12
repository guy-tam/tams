import { test, expect } from '@playwright/test';

// בדיקות smoke בסיסיות — מוודאות שהעמודים העיקריים נטענים.

test('homepage loads and shows brand', async ({ page }) => {
  await page.goto('/');
  // הכותרת של הדף חייבת להכיל את שם המותג
  await expect(page).toHaveTitle(/TAMS/i);
  // לפחות קישור ניווט אחד צריך להיות גלוי
  const navLinks = page.getByRole('link');
  await expect(navLinks.first()).toBeVisible();
});

test('company page loads', async ({ page }) => {
  // דף החברה צריך להיטען ללא כשל רשת וכולל תוכן
  const response = await page.goto('/company');
  expect(response?.ok()).toBeTruthy();
  const bodyText = await page.locator('body').innerText();
  expect(bodyText.trim().length).toBeGreaterThan(0);
});

test('login page loads', async ({ page }) => {
  await page.goto('/login');
  // יש לוודא שקיים שדה אימייל בטופס ההתחברות
  await expect(page.getByLabel(/email/i)).toBeVisible();
});

test('dashboard requires auth', async ({ page }) => {
  // ללא עוגיית session, הניסיון לגשת ל-dashboard צריך להפנות ל-login
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/login/);
});
