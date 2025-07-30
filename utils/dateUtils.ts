import { toEthiopian, toGregorian } from "ethiopian-date"

export interface EthiopianDate {
  year: number
  month: number
  day: number
}

export interface GregorianDate {
  year: number
  month: number
  day: number
}

/**
 * Convert Gregorian date to Ethiopian date
 */
export function convertToEthiopian(year: number, month: number, day: number): EthiopianDate {
  try {
    return toEthiopian(year, month, day)
  } catch (error) {
    console.error("Error converting to Ethiopian date:", error)
    throw new Error("Invalid Gregorian date provided")
  }
}

/**
 * Convert Ethiopian date to Gregorian date
 */
export function convertToGregorian(year: number, month: number, day: number): GregorianDate {
  try {
    return toGregorian(year, month, day)
  } catch (error) {
    console.error("Error converting to Gregorian date:", error)
    throw new Error("Invalid Ethiopian date provided")
  }
}

/**
 * Get Ethiopian month names
 */
export const ETHIOPIAN_MONTHS = [
  "Meskerem", // መስከረም
  "Tikimt", // ጥቅምት
  "Hidar", // ኅዳር
  "Tahsas", // ታኅሳስ
  "Tir", // ጥር
  "Yekatit", // የካቲት
  "Megabit", // መጋቢት
  "Miazia", // ሚያዝያ
  "Ginbot", // ግንቦት
  "Sene", // ሰኔ
  "Hamle", // ሐምሌ
  "Nehase", // ነሐሴ
  "Pagume", // ጳጉሜ
] as const

/**
 * Get the maximum days for a given Ethiopian month
 */
export function getMaxDaysInEthiopianMonth(month: number): number {
  if (month === 13) {
    return 6 // Pagume can have 5 or 6 days
  }
  return 30 // All other months have 30 days
}

/**
 * Validate Ethiopian date
 */
export function isValidEthiopianDate(year: number, month: number, day: number): boolean {
  if (year < 1 || month < 1 || month > 13 || day < 1) {
    return false
  }

  const maxDays = getMaxDaysInEthiopianMonth(month)
  return day <= maxDays
}

/**
 * Format Ethiopian date as string
 */
export function formatEthiopianDate(year: number, month: number, day: number): string {
  if (!isValidEthiopianDate(year, month, day)) {
    return "Invalid Date"
  }

  const monthName = ETHIOPIAN_MONTHS[month - 1]
  return `${monthName} ${day}, ${year}`
}

/**
 * Get current Ethiopian date
 */
export function getCurrentEthiopianDate(): EthiopianDate {
  const today = new Date()
  return convertToEthiopian(today.getFullYear(), today.getMonth() + 1, today.getDate())
}

/**
 * Get Ethiopian New Year date in Gregorian calendar for a given Ethiopian year
 */
export function getEthiopianNewYearInGregorian(ethiopianYear: number): GregorianDate {
  return convertToGregorian(ethiopianYear, 1, 1)
}
