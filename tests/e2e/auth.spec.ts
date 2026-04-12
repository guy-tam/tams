import { test, expect } from '@playwright/test';

// בדיקות זרימת אימות — login, rejection, logout.
// הבדיקות מוגדרות כסדרתיות כדי שניתן יהיה להסתמך על מצב login בין בדיקות.
test.describe.configure({ mode: 'serial' });

test('login with demo credentials lands on dashboard', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel(/email/i).fill('demo@tams.io');
  await page.getByLabel(/password/i).fill('demo1234');
  // שליחת הטופס — כפתור מסוג submit או עם הטקסט "Sign In"
  await page.getByRole('button', { name: /sign in/i }).click();
  // יש להגיע ל-dashboard לאחר התחברות מוצלחת
  await expect(page).toHaveURL(/\/dashboard/);
  // תוכן הדשבורד צריך להיות גלוי (Portfolio או סקירת תיק)
  await expect(page.getByText(/portfolio|סקירת תיק/i).first()).toBeVisible();
});

test('wrong password is rejected', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel(/email/i).fill('demo@tams.io');
  await page.getByLabel(/password/i).fill('wrong-password');
  await page.getByRole('button', { name: /sign in/i }).click();
  // המשתמש צריך להישאר בעמוד ה-login
  await expect(page).toHaveURL(/\/login/);
  // הודעת שגיאה כלשהי צריכה להופיע
  await expect(page.getByRole('alert').or(page.getByText(/invalid|incorrect|שגוי|שגויה/i)).first()).toBeVisible();
});

test('logout clears session', async ({ page }) => {
  // login מחדש בתוך הבדיקה כדי לא להיות תלוי במצב חיצוני
  await page.goto('/login');
  await page.getByLabel(/email/i).fill('demo@tams.io');
  await page.getByLabel(/password/i).fill('demo1234');
  await page.getByRole('button', { name: /sign in/i }).click();
  await expect(page).toHaveURL(/\/dashboard/);

  // לחיצה על כפתור logout ב-DashboardLayout
  await page.getByRole('button', { name: /logout|log out|התנתק/i }).click();

  // ניסיון חוזר לגשת ל-dashboard צריך להפנות ל-login
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/login/);
});
