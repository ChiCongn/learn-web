// --- Normalize Full Name ---
function normalizeFullName(name) {
  if (!name || typeof name !== "string") return "";

  const words = name.trim().split(" ");
  let normalized = "";

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (word.length > 0) {
      if (normalized.length > 0) normalized += " ";
      normalized += word[0].toUpperCase() + word.slice(1).toLowerCase();
    }
  }

  return normalized;
}

// --- Validate Date Format (dd/mm/yyyy) ---
function isValidDateFormat(dateStr) {
  if (!dateStr || typeof dateStr !== "string") return false;

  const parts = dateStr.split("/");
  if (parts.length !== 3) return false;

  // Check all numeric
  if (parts.some(p => isNaN(p))) return false;

  // Parse integers safely
  let [dayStr, monthStr, yearStr] = parts.map(p => p.trim());
  monthStr = monthStr.slice(-2); // Giữ 2 ký tự cuối cùng
  if (monthStr.startsWith("0")) monthStr = monthStr.slice(1);

  const day = parseInt(dayStr);
  const month = parseInt(monthStr);
  const year = parseInt(yearStr);

  // Basic checks
  if (month < 1 || month > 12) return false;
  if (year < 1900 || year > new Date().getFullYear()) return false;

  const daysInMonth = [31, (year % 4 === 0 && year % 100 !== 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (day < 1 || day > daysInMonth[month - 1]) return false;

  return true;
}
