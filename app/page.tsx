"use client"

import { useState, useEffect } from "react"
import { toEthiopian, toGregorian } from "ethiopian-date"
import { Calendar, Globe, Github, Linkedin, Twitter, Languages } from "lucide-react"

const ETHIOPIAN_MONTHS = {
  en: [
    "Meskerem",
    "Tikimt",
    "Hidar",
    "Tahsas",
    "Tir",
    "Yekatit",
    "Megabit",
    "Miazia",
    "Ginbot",
    "Sene",
    "Hamle",
    "Nehase",
    "Pagume",
  ],
  am: ["መስከረም", "ጥቅምት", "ኅዳር", "ታኅሳስ", "ጥር", "የካቲት", "መጋቢት", "ሚያዝያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜ"],
}

const TRANSLATIONS = {
  en: {
    title: "Ethiopian Calendar Converter",
    subtitle:
      "Convert dates between the Ethiopian Calendar and the Gregorian Calendar. The Ethiopian calendar has 13 months and is approximately 7-8 years behind the Gregorian calendar.",
    findEthiopianDate: "Find Ethiopian Date",
    enterGregorianDate: "Enter a Gregorian date to see its Ethiopian equivalent",
    enterGregorianDateLabel: "Enter Gregorian Date",
    ethiopianDate: "Ethiopian Date",
    selectDate: "Select a date",
    selectDateAbove: "Select a Date Above",
    chooseDate: "Choose any Gregorian date to see its Ethiopian calendar equivalent",
    quickOptions: "Quick Options",
    today: "Today",
    newYear2024: "New Year 2024",
    ethiopianNewYear: "Ethiopian New Year",
    christmas2024: "Christmas 2024",
    nextMonth: "Next Month",
    nextYear: "Next Year",
    year: "Year",
    month: "Month",
    day: "Day",
    aboutEthiopianCalendar: "About the Ethiopian Calendar",
    keyFeatures: "Key Features:",
    calendarDifference: "Calendar Difference:",
    features: [
      "13 months total",
      "12 months with 30 days each",
      "13th month (Pagume) has 5-6 days",
      "New Year starts on September 11th",
    ],
    differences: [
      "About 7-8 years behind Gregorian",
      "Different leap year calculation",
      "Used in Ethiopia and Eritrea",
      "Based on ancient Coptic calendar",
    ],
    pagume13th: "This is in Pagume, the 13th month (5-6 days)",
    monthOf13: (monthName: string, monthNum: number) => `This is in ${monthName}, month ${monthNum} of 13`,
    invalidMonth: "Invalid month",
    developerTitle: "Founder & CEO, Full Stack Developer",
    developerDescription:
      "Passionate about building tools that bridge cultural gaps and make technology accessible to everyone. This Ethiopian Calendar Converter is designed to help people easily convert between Ethiopian and Gregorian calendar systems.",
    footerCopyright: "Ethiopian Calendar Converter. Developed by Usmael Abdurhaman.",
    footerTech: "Built with Next.js, TypeScript, and Tailwind CSS. Uses the ethiopian-date library for conversions.",
  },
  am: {
    title: "የኢትዮጵያ ዘመን አቆጣጠር መቀየሪያ",
    subtitle:
      "በኢትዮጵያ ዘመን አቆጣጠር እና በግሪጎሪያን ዘመን አቆጣጠር መካከል ቀናትን ይቀይሩ። የኢትዮጵያ ዘመን አቆጣጠር 13 ወራት አሉት እና ከግሪጎሪያን ዘመን አቆጣጠር በ7-8 ዓመታት ይወዳል።",
    findEthiopianDate: "የኢትዮጵያ ቀን ያግኙ",
    enterGregorianDate: "የግሪጎሪያን ቀን ያስገቡ የኢትዮጵያ ቀን ለማየት",
    enterGregorianDateLabel: "የግሪጎሪያን ቀን ያስገቡ",
    ethiopianDate: "የኢትዮጵያ ቀን",
    selectDate: "ቀን ይምረጡ",
    selectDateAbove: "ከላይ ቀን ይምረጡ",
    chooseDate: "ማንኛውንም የግሪጎሪያን ቀን ይምረጡ የኢትዮጵያ ዘመን አቆጣጠር ተመሳሳይ ለማየት",
    quickOptions: "ፈጣን አማራጮች",
    today: "ዛሬ",
    newYear2024: "አዲስ ዓመት 2024",
    ethiopianNewYear: "የኢትዮጵያ አዲስ ዓመት",
    christmas2024: "ገና 2024",
    nextMonth: "ቀጣይ ወር",
    nextYear: "ቀጣይ ዓመት",
    year: "ዓመት",
    month: "ወር",
    day: "ቀን",
    aboutEthiopianCalendar: "ስለ ኢትዮጵያ ዘመን አቆጣጠር",
    keyFeatures: "ዋና ባህሪያት:",
    calendarDifference: "የዘመን አቆጣጠር ልዩነት:",
    features: ["በጠቅላላው 13 ወራት", "12 ወራት እያንዳንዳቸው 30 ቀናት", "13ኛው ወር (ጳጉሜ) 5-6 ቀናት አሉት", "አዲስ ዓመት በሴፕቴምበር 11 ይጀምራል"],
    differences: [
      "ከግሪጎሪያን በ7-8 ዓመታት ይወዳል",
      "የተለየ የመዝለል ዓመት ስሌት",
      "በኢትዮጵያ እና በኤርትራ ይጠቀማል",
      "በጥንታዊ ኮፕቲክ ዘመን አቆጣጠር ላይ የተመሰረተ",
    ],
    pagume13th: "ይህ በጳጉሜ ውስጥ ነው፣ 13ኛው ወር (5-6 ቀናት)",
    monthOf13: (monthName: string, monthNum: number) => `ይህ በ${monthName} ውስጥ ነው፣ ወር ${monthNum} ከ13`,
    invalidMonth: "ልክ ያልሆነ ወር",
    developerTitle: "መስራች እና ዋና ሥራ አስፈፃሚ፣ ሙሉ ስታክ ዲቨሎፐር",
    developerDescription:
      "የባህል ክፍተቶችን የሚያገናኙ እና ቴክኖሎጂን ለሁሉም ተደራሽ የሚያደርጉ መሳሪያዎችን በመገንባት ላይ ፍላጎት። ይህ የኢትዮጵያ ዘመን አቆጣጠር መቀየሪያ ሰዎች በኢትዮጵያ እና በግሪጎሪያን ዘመን አቆጣጠር ስርዓቶች መካከል በቀላሉ እንዲቀይሩ ለመርዳት የተነደፈ ነው።",
    footerCopyright: "የኢትዮጵያ ዘመን አቆጣጠር መቀየሪያ። በኡስማኤል አብዱራህማን የተሰራ።",
    footerTech: "በNext.js፣ TypeScript እና Tailwind CSS የተሰራ። ለመቀየሪያዎች ethiopian-date ላይብረሪ ይጠቀማል።",
  },
}

type Language = "en" | "am"

export default function CalendarConverter() {
  const [language, setLanguage] = useState<Language>("en")
  const [gregorianDate, setGregorianDate] = useState("")
  const [ethiopianYear, setEthiopianYear] = useState<number>(2016)
  const [ethiopianMonth, setEthiopianMonth] = useState<number>(1)
  const [ethiopianDay, setEthiopianDay] = useState<number>(1)
  const [lastUpdated, setLastUpdated] = useState<"gregorian" | "ethiopian">("gregorian")

  const t = TRANSLATIONS[language]
  const months = ETHIOPIAN_MONTHS[language]

  // Initialize with current date
  useEffect(() => {
    const today = new Date()
    const todayString = today.toISOString().split("T")[0]
    setGregorianDate(todayString)

    try {
      const ethiopianResult = toEthiopian(today.getFullYear(), today.getMonth() + 1, today.getDate())

      // Handle array result [year, month, day]
      if (Array.isArray(ethiopianResult) && ethiopianResult.length === 3) {
        const [year, month, day] = ethiopianResult
        setEthiopianYear(year)
        setEthiopianMonth(month)
        setEthiopianDay(day)
      }
      // Handle object result {year, month, day}
      else if (ethiopianResult && typeof ethiopianResult === "object" && "year" in ethiopianResult) {
        const { year, month, day } = ethiopianResult
        setEthiopianYear(year)
        setEthiopianMonth(month)
        setEthiopianDay(day)
      }
    } catch (error) {
      console.error("Error converting initial date:", error)
    }
  }, [])

  // Convert Gregorian to Ethiopian
  useEffect(() => {
    if (lastUpdated === "gregorian" && gregorianDate) {
      try {
        const date = new Date(gregorianDate)
        // Validate the date
        if (isNaN(date.getTime())) {
          console.error("Invalid Gregorian date")
          return
        }

        const ethiopianResult = toEthiopian(date.getFullYear(), date.getMonth() + 1, date.getDate())

        // Handle array result [year, month, day]
        if (Array.isArray(ethiopianResult) && ethiopianResult.length === 3) {
          const [year, month, day] = ethiopianResult
          if (year && month && day) {
            setEthiopianYear(year)
            setEthiopianMonth(month)
            setEthiopianDay(day)
          } else {
            console.error("Invalid Ethiopian date values:", ethiopianResult)
          }
        }
        // Handle object result {year, month, day}
        else if (ethiopianResult && typeof ethiopianResult === "object" && "year" in ethiopianResult) {
          const { year, month, day } = ethiopianResult
          if (year && month && day) {
            setEthiopianYear(year)
            setEthiopianMonth(month)
            setEthiopianDay(day)
          } else {
            console.error("Invalid Ethiopian date object:", ethiopianResult)
          }
        } else {
          console.error("Unexpected Ethiopian date format:", ethiopianResult)
        }
      } catch (error) {
        console.error("Error converting Gregorian to Ethiopian:", error)
      }
    }
  }, [gregorianDate, lastUpdated])

  // Convert Ethiopian to Gregorian
  useEffect(() => {
    if (lastUpdated === "ethiopian" && ethiopianYear && ethiopianMonth && ethiopianDay) {
      try {
        const gregorianResult = toGregorian(ethiopianYear, ethiopianMonth, ethiopianDay)

        // Handle array result [year, month, day]
        if (Array.isArray(gregorianResult) && gregorianResult.length === 3) {
          const [year, month, day] = gregorianResult
          const date = new Date(year, month - 1, day)
          setGregorianDate(date.toISOString().split("T")[0])
        }
        // Handle object result {year, month, day}
        else if (gregorianResult && typeof gregorianResult === "object" && "year" in gregorianResult) {
          const { year, month, day } = gregorianResult
          const date = new Date(year, month - 1, day)
          setGregorianDate(date.toISOString().split("T")[0])
        } else {
          console.error("Unexpected Gregorian date format:", gregorianResult)
        }
      } catch (error) {
        console.error("Error converting Ethiopian to Gregorian:", error)
      }
    }
  }, [ethiopianYear, ethiopianMonth, ethiopianDay, lastUpdated])

  const handleGregorianChange = (value: string) => {
    setGregorianDate(value)
    setLastUpdated("gregorian")
  }

  const handleEthiopianChange = (field: "year" | "month" | "day", value: number) => {
    if (field === "year") setEthiopianYear(value)
    if (field === "month") setEthiopianMonth(value)
    if (field === "day") setEthiopianDay(value)
    setLastUpdated("ethiopian")
  }

  const formatGregorianDate = () => {
    if (!gregorianDate) return ""
    const date = new Date(gregorianDate)
    const locale = language === "am" ? "am-ET" : "en-US"
    return date.toLocaleDateString(locale, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatEthiopianDate = () => {
    if (!ethiopianYear || !ethiopianMonth || !ethiopianDay) return t.selectDate

    // Ensure month is within valid range
    if (ethiopianMonth < 1 || ethiopianMonth > 13) return "Invalid date"

    const monthName = months[ethiopianMonth - 1]
    if (!monthName) return "Invalid month"

    return `${monthName} ${ethiopianDay}, ${ethiopianYear}`
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "am" : "en")
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4"
      dir="ltr"
    >
      <div className="max-w-6xl mx-auto">
        {/* Language Toggle */}
        <div className={`flex mb-6 justify-end`}>
          <button
            onClick={toggleLanguage}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
          >
            <Languages className="w-5 h-5" />
            <span className="font-medium">{language === "en" ? "አማርኛ" : "English"}</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Conversion Interface */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t.findEthiopianDate}</h2>
            <p className="text-gray-600">{t.enterGregorianDate}</p>
          </div>

          {/* Input Section */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex items-center mb-4">
              <Globe className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">{t.enterGregorianDateLabel}</h3>
            </div>
            <input
              type="date"
              value={gregorianDate}
              onChange={(e) => handleGregorianChange(e.target.value)}
              className="w-full px-4 py-4 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg text-center"
              placeholder={t.selectDate}
            />
            {gregorianDate && <p className="text-center text-sm text-gray-600 mt-2">{formatGregorianDate()}</p>}
          </div>

          {/* Result Display */}
          {gregorianDate && (
            <div className="max-w-lg mx-auto">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t.ethiopianDate}</h3>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
                <div className="text-4xl font-bold text-green-900 mb-3">{formatEthiopianDate()}</div>

                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-green-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-800">{ethiopianYear || "—"}</div>
                    <div className="text-sm text-green-600">{t.year}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-800">{ethiopianMonth || "—"}</div>
                    <div className="text-sm text-green-600">
                      {ethiopianMonth >= 1 && ethiopianMonth <= 13 ? months[ethiopianMonth - 1] : t.month}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-800">{ethiopianDay || "—"}</div>
                    <div className="text-sm text-green-600">{t.day}</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-green-200">
                  <p className="text-sm text-green-700">
                    {ethiopianMonth === 13
                      ? t.pagume13th
                      : ethiopianMonth >= 1 && ethiopianMonth <= 12
                        ? t.monthOf13(months[ethiopianMonth - 1], ethiopianMonth)
                        : t.invalidMonth}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!gregorianDate && (
            <div className="max-w-lg mx-auto text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t.selectDateAbove}</h3>
              <p className="text-gray-600">{t.chooseDate}</p>
            </div>
          )}

          {/* Quick Date Options */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h4 className="text-center text-sm font-medium text-gray-700 mb-4">{t.quickOptions}</h4>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => {
                  const today = new Date().toISOString().split("T")[0]
                  handleGregorianChange(today)
                }}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
              >
                {t.today}
              </button>
              {/* Next Gregorian New Year */}
              <button
                onClick={() => {
                  const now = new Date()
                  const year = now.getMonth() === 0 && now.getDate() === 1 ? now.getFullYear() + 1 : now.getFullYear() + (now.getMonth() > 0 || (now.getMonth() === 0 && now.getDate() > 1) ? 1 : 0)
                  handleGregorianChange(`${year}-01-01`)
                }}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
              >
                {`New Year ${(() => {
                  const now = new Date();
                  return now.getMonth() === 0 && now.getDate() === 1 ? now.getFullYear() + 1 : now.getFullYear() + (now.getMonth() > 0 || (now.getMonth() === 0 && now.getDate() > 1) ? 1 : 0)
                })()}`}
              </button>
              {/* Next Ethiopian New Year (September 11 or 12) */}
              <button
                onClick={() => {
                  const now = new Date()
                  let year = now.getFullYear()
                  let nextEny = new Date(`${year}-09-11`)
                  if (now >= nextEny) {
                    year += 1
                    nextEny = new Date(`${year}-09-11`)
                  }
                  handleGregorianChange(`${year}-09-11`)
                }}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
              >
                {`Ethiopian New Year ${(function() {
                  const now = new Date();
                  let year = now.getFullYear();
                  let nextEny = new Date(`${year}-09-11`);
                  if (now >= nextEny) year += 1;
                  // Ethiopian year is (Gregorian year - 7 or -8 depending on date)
                  // For simplicity, use -8 if before Sep 11, -7 if after
                  return year - (now < new Date(`${year}-09-11`) ? 8 : 7);
                })()}`}
              </button>
              {/* Next Christmas (December 25) */}
              <button
                onClick={() => {
                  const now = new Date()
                  let year = now.getFullYear()
                  let nextXmas = new Date(`${year}-12-25`)
                  if (now >= nextXmas) {
                    year += 1
                  }
                  handleGregorianChange(`${year}-12-25`)
                }}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
              >
                {`Christmas ${(() => {
                  const now = new Date();
                  let year = now.getFullYear();
                  let nextXmas = new Date(`${year}-12-25`);
                  if (now >= nextXmas) year += 1;
                  return year;
                })()}`}
              </button>
              {/* Next Month */}
              <button
                onClick={() => {
                  if (gregorianDate) {
                    const currentDate = new Date(gregorianDate)
                    const nextMonth = new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth() + 1,
                      currentDate.getDate(),
                    )
                    handleGregorianChange(nextMonth.toISOString().split("T")[0])
                  } else {
                    const today = new Date()
                    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())
                    handleGregorianChange(nextMonth.toISOString().split("T")[0])
                  }
                }}
                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
              >
                {t.nextMonth}
              </button>
              {/* Next Year (from today or selected date) */}
              <button
                onClick={() => {
                  if (gregorianDate) {
                    const currentDate = new Date(gregorianDate)
                    const nextYear = new Date(
                      currentDate.getFullYear() + 1,
                      currentDate.getMonth(),
                      currentDate.getDate(),
                    )
                    handleGregorianChange(nextYear.toISOString().split("T")[0])
                  } else {
                    const today = new Date()
                    const nextYear = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
                    handleGregorianChange(nextYear.toISOString().split("T")[0])
                  }
                }}
                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
              >
                {t.nextYear}
              </button>
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{t.aboutEthiopianCalendar}</h3>
          <div className="grid md:grid-cols-2 gap-6 text-gray-600">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">{t.keyFeatures}</h4>
              <ul className="space-y-1 text-sm">
                {t.features.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">{t.calendarDifference}</h4>
              <ul className="space-y-1 text-sm">
                {t.differences.map((difference, index) => (
                  <li key={index}>• {difference}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Developer Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white text-3xl font-bold">
              UA
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {language === "am" ? "ኡስማኤል አብዱራህማን" : "Usmael Abdurhaman"}
              </h3>
              <p className="text-lg font-medium text-gray-700 mb-2">{t.developerTitle}</p>
              <p className="text-gray-600 mb-4 max-w-2xl">{t.developerDescription}</p>
              <div className="flex justify-center md:justify-start gap-4">
                <a
                  href="https://github.com/usmaelabdureman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/usmael-lkdn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://twitter.com/esmiz_o"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                  <span>Twitter</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 text-gray-600 border-t border-gray-200">
          <p className="mb-2">
            © {new Date().getFullYear()} {t.footerCopyright}
          </p>
          <p className="text-sm">{t.footerTech}</p>
        </footer>
      </div>
    </div>
  )
}
