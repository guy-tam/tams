#!/bin/bash
# החזרה לרקע כהה + זהב — שילוב בין חלל כהה לנגיעות זהב פרימיום
cd /Users/open/tams

FILES=$(find src/components/sections src/components/charts src/app -name "*.tsx" \
  ! -name "Navigation.tsx" \
  ! -name "DashboardLayout.tsx" \
  ! -path "*/ui/*")

FILES="$FILES src/components/layout/SectionHeader.tsx src/components/layout/PageWrapper.tsx"

for f in $FILES; do
  [ ! -f "$f" ] && continue

  # --- גבולות: חזרה לשקיפות על כהה עם נגיעת זהב ---
  sed -i '' 's/border-amber-200\/40/border-amber-500\/15/g' "$f"
  sed -i '' 's/border-amber-100\/30/border-white\/[0.06]/g' "$f"
  sed -i '' 's/border-amber-300\/40/border-amber-500\/25/g' "$f"
  sed -i '' 's/border-amber-300\/50/border-amber-500\/30/g' "$f"

  # --- רקעים: חזרה לשקוף על כהה ---
  sed -i '' 's/bg-amber-50\/20/bg-white\/[0.03]/g' "$f"
  sed -i '' 's/bg-amber-50\/30/bg-white\/[0.04]/g' "$f"
  sed -i '' 's/bg-amber-50\/50/bg-white\/[0.06]/g' "$f"
  sed -i '' 's/bg-amber-50\/60/bg-white\/[0.08]/g' "$f"
  sed -i '' 's/bg-\[#fffcf5\]/bg-white\/[0.04]/g' "$f"

  # --- הובר רקעים ---
  sed -i '' 's/hover:bg-amber-50\/40/hover:bg-white\/[0.04]/g' "$f"
  sed -i '' 's/hover:bg-amber-50\/60/hover:bg-white\/[0.06]/g' "$f"

  # --- הובר גבולות ---
  sed -i '' 's/hover:border-amber-400\/40/hover:border-amber-500\/25/g' "$f"

  # --- טקסט: חזרה ללבן/אפור על כהה ---
  sed -i '' 's/text-gray-900/text-white/g' "$f"
  sed -i '' 's/text-gray-800/text-white/g' "$f"
  sed -i '' 's/text-gray-700/text-zinc-200/g' "$f"
  sed -i '' 's/text-gray-500/text-zinc-400/g' "$f"
  sed -i '' 's/text-gray-400/text-zinc-500/g' "$f"

  # --- badges על רקע כהה ---
  sed -i '' 's/bg-amber-50 text-amber-700 border-amber-200/bg-amber-500\/10 text-amber-400 border-amber-500\/15/g' "$f"
  sed -i '' 's/bg-blue-50 text-blue-700 border-blue-200/bg-blue-500\/10 text-blue-400 border-blue-500\/15/g' "$f"
  sed -i '' 's/bg-amber-50 border-amber-200/bg-amber-500\/[0.06] border-amber-500\/15/g' "$f"
  sed -i '' 's/bg-amber-50/bg-amber-500\/[0.06]/g' "$f"

  # --- inputs על רקע כהה ---
  sed -i '' 's/bg-white border-amber-200\/40/bg-zinc-900\/80 border-amber-500\/15/g' "$f"

  # --- צללים ---
  sed -i '' 's/shadow-blue-200\/30/shadow-blue-500\/10/g' "$f"

  echo "Reverted: $f"
done

echo "=== Dark + Gold applied ==="
