module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        // Core design palette
        background: { DEFAULT: "#0F100F" },
        surface: { DEFAULT: "#171917" },
        elevated: { DEFAULT: "#1E201D" },
        border: { DEFAULT: "#30332F" },
        primary: { DEFAULT: "#E8E8E2" },
        secondary: { DEFAULT: "#92968F" },
        accent: { DEFAULT: "#C8A358" }, // Warm amber
        accentLime: { DEFAULT: "#B7CD48" }, // Muted lime
        success: { DEFAULT: "#6C8B7B" }, // Muted green
        error: { DEFAULT: "#B86B6B" }, // Muted red
      },
      borderRadius: {
        none: "0",
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
      spacing: {
        "0": "0",
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "5": "20px",
        "6": "24px",
        "8": "32px",
        "10": "40px",
        "12": "48px",
        "16": "64px",
        "20": "80px",
      },
      animation: {
        fast: "150ms",
        normal: "300ms",
        slow: "500ms",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
        medium: "0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)",
        large: "0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
}
