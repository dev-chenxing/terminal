/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg": "#282A36",
        "bg-light": "#343746",
        "bg-lighter": "#424450",
        "bg-dark": "#21222C",
        "bg-darker": "#191A21",
        "fg": "#F8F8F2",
        "muted": "#6272A4",
        "selection": "#44475A",
        "white": "#FFFFFF",
        "bright-black": "#6272A4",
        "red": "#FF5555",
        "bright-red": "#FF6E6E",
        "yellow": "#F1FA8C",
        "bright-yellow": "#FFFFA5",
        "green": "#50FA7B",
        "bright-green": "#69FF94",
        "cyan": "#8BE9FD",
        "bright-cyan": "#A4FFFF",
        "blue": "#BD93F9",
        "bright-blue": "#D6ACFF",
        "purple": "#BD93F9",
        "orange": "#FFB86C",
        "pink":"#FF79C6"
      },
      fontFamily: {
        "fira-code": ["Fira Code", "monospace"],
        segoe: "Segoe UI",
      },
      keyframes: {
        blink: {
          "0%": { opacity: 1 },
          "48%": { opacity: 1 },
          "50%": { opacity: 0 },
          "99%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        blink: "blink 1.5s linear infinite",
      },
      boxShadow: {
        "5xl": "0 10px 30px 0 rgba(0, 0, 0, 0.75)",
        terminal: "0 0 0 3px rgba(0, 0, 0, 0.16)",
      },
    },
  },
  plugins: [],
};
