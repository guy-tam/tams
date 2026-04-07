#!/bin/bash
# סקריפט חימום זהוב - מחליף גווני אפור קרים בגווני זהב חמים
# לא משנה את Navigation.tsx ו-DashboardLayout.tsx (סיידבר נשאר כהה)

cd /Users/open/tams

FILES=$(find src/components/sections src/components/charts src/app -name "*.tsx" \
  ! -name "Navigation.tsx" \
  ! -name "DashboardLayout.tsx" \
  ! -path "*/ui/*")

# כולל גם layout files ספציפיים
FILES="$FILES src/components/layout/SectionHeader.tsx src/components/layout/PageWrapper.tsx"

for f in $FILES; do
  [ ! -f "$f" ] && continue

  # --- גבולות זהובים חמים ---
  sed -i '' 's/border-gray-200/border-amber-200\/40/g' "$f"
  sed -i '' 's/border-gray-100/border-amber-100\/30/g' "$f"
  sed -i '' 's/border-gray-300/border-amber-300\/40/g' "$f"

  # --- רקעים זהובים חמים ---
  # חשוב: bg-gray-50/50 לפני bg-gray-50 כדי לתפוס את הספציפי קודם
  sed -i '' 's/bg-gray-50\/50/bg-amber-50\/20/g' "$f"
  sed -i '' 's/bg-gray-50 /bg-amber-50\/30 /g' "$f"
  sed -i '' 's/bg-gray-50"/bg-amber-50\/30"/g' "$f"
  sed -i '' 's/bg-gray-100/bg-amber-50\/50/g' "$f"

  # --- הובר רקעים זהובים ---
  sed -i '' 's/hover:bg-gray-50/hover:bg-amber-50\/40/g' "$f"
  sed -i '' 's/hover:bg-gray-100/hover:bg-amber-50\/60/g' "$f"

  # --- הובר גבולות זהובים ---
  sed -i '' 's/hover:border-gray-300/hover:border-amber-300\/50/g' "$f"

  echo "Updated: $f"
done

echo ""
echo "=== Golden warmth applied ==="
