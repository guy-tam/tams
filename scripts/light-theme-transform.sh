#!/bin/bash
# סקריפט המרת ערכת נושא מכהה לבהיר
# מעדכן את כל קבצי הרכיבים (לא כולל סיידבר)

cd /Users/open/tams

FILES=$(find src/components/sections src/components/charts src/app -name "*.tsx" \
  ! -name "Navigation.tsx" \
  ! -name "DashboardLayout.tsx" \
  ! -path "*/layout.tsx")

# כולל גם layout files ספציפיים
FILES="$FILES src/components/layout/SectionHeader.tsx src/components/layout/PageWrapper.tsx"

for f in $FILES; do
  [ ! -f "$f" ] && continue

  # --- גבולות ---
  sed -i '' 's/border-white\/\[0\.06\]/border-gray-200/g' "$f"
  sed -i '' 's/border-white\/\[0\.08\]/border-gray-200/g' "$f"
  sed -i '' 's/border-white\/\[0\.04\]/border-gray-100/g' "$f"
  sed -i '' 's/border-white\/\[0\.05\]/border-gray-200/g' "$f"
  sed -i '' 's/border-white\/\[0\.1\]/border-gray-300/g' "$f"
  sed -i '' 's/border-white\/\[0\.12\]/border-gray-300/g' "$f"
  sed -i '' 's/border-white\/\[0\.15\]/border-gray-300/g' "$f"
  sed -i '' 's/border-white\/10/border-gray-200/g' "$f"
  sed -i '' 's/border-white\/15/border-gray-200/g' "$f"

  # --- רקעים ---
  sed -i '' 's/bg-white\/\[0\.015\]/bg-gray-50\/50/g' "$f"
  sed -i '' 's/bg-white\/\[0\.02\]/bg-gray-50\/50/g' "$f"
  sed -i '' 's/bg-white\/\[0\.025\]/bg-gray-50\/50/g' "$f"
  sed -i '' 's/bg-white\/\[0\.03\]/bg-white/g' "$f"
  sed -i '' 's/bg-white\/\[0\.04\]/bg-white/g' "$f"
  sed -i '' 's/bg-white\/\[0\.05\]/bg-gray-50/g' "$f"
  sed -i '' 's/bg-white\/\[0\.06\]/bg-gray-50/g' "$f"
  sed -i '' 's/bg-white\/\[0\.08\]/bg-gray-100/g' "$f"
  # bg-white/5 (without brackets)
  sed -i '' 's/bg-white\/5 /bg-gray-50 /g' "$f"
  sed -i '' 's/bg-white\/5"/bg-gray-50"/g' "$f"

  # --- הובר רקעים ---
  sed -i '' 's/hover:bg-white\/\[0\.02\]/hover:bg-gray-50/g' "$f"
  sed -i '' 's/hover:bg-white\/\[0\.03\]/hover:bg-gray-50/g' "$f"
  sed -i '' 's/hover:bg-white\/\[0\.04\]/hover:bg-gray-100/g' "$f"
  sed -i '' 's/hover:bg-white\/\[0\.05\]/hover:bg-gray-100/g' "$f"
  sed -i '' 's/hover:bg-white\/\[0\.06\]/hover:bg-gray-100/g' "$f"
  sed -i '' 's/hover:bg-white\/10/hover:bg-gray-100/g' "$f"

  # --- הובר גבולות ---
  sed -i '' 's/hover:border-white\/\[0\.1\]/hover:border-gray-300/g' "$f"
  sed -i '' 's/hover:border-white\/\[0\.12\]/hover:border-gray-300/g' "$f"
  sed -i '' 's/hover:border-white\/\[0\.15\]/hover:border-gray-300/g' "$f"
  sed -i '' 's/hover:border-amber-500\/15/hover:border-amber-400\/40/g' "$f"
  sed -i '' 's/hover:border-amber-500\/20/hover:border-amber-400\/40/g' "$f"

  # --- טקסט ---
  sed -i '' 's/text-zinc-400/text-gray-500/g' "$f"
  sed -i '' 's/text-zinc-500/text-gray-400/g' "$f"
  sed -i '' 's/text-zinc-600/text-gray-400/g' "$f"
  sed -i '' 's/text-zinc-300/text-gray-600/g' "$f"

  # text-white in content -> text-gray-900 (careful: not inside buttons)
  # We handle this more carefully below

  # --- באדג'ים ---
  sed -i '' 's/bg-amber-500\/10 px/bg-amber-50 px/g' "$f"
  sed -i '' 's/text-amber-400 border border-amber-500\/15/text-amber-700 border border-amber-200/g' "$f"
  sed -i '' 's/text-amber-400 border border-amber-500\/20/text-amber-700 border border-amber-200/g' "$f"
  sed -i '' 's/border border-amber-200 mb/border border-amber-200 mb/g' "$f"

  # --- אלמנטי select ---
  sed -i '' 's/bg-zinc-900/bg-white/g' "$f"

  # --- רקעים של סטטוס/קטגוריה ---
  sed -i '' 's/bg-zinc-500/bg-gray-400/g' "$f"
  sed -i '' 's/bg-zinc-600/bg-gray-400/g' "$f"

  # --- חלוקה ---
  sed -i '' 's/divide-white\/\[0\.04\]/divide-gray-100/g' "$f"

  # --- אזהרות ---
  sed -i '' 's/bg-amber-500\/\[0\.03\]/bg-amber-50/g' "$f"
  sed -i '' 's/bg-amber-500\/\[0\.04\]/bg-amber-50/g' "$f"
  sed -i '' 's/border-amber-500\/10/border-amber-200/g' "$f"
  sed -i '' 's/border-amber-500\/20/border-amber-200/g' "$f"

  echo "Updated: $f"
done

echo ""
echo "=== Batch replacements done ==="
echo "Now handling text-white -> text-gray-900 for specific content areas..."
