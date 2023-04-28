/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: {
        25: "#F5FBFF",
        50: "#F0F9FF",
        100: "#E0F2FE",
        200: "#B9E6FE",
        300: "#7CD4FD",
        400: "#36BFFA",
        500: "#0BA5EC",
        600: "#0086C9",
        700: "#026AA2",
        800: "#065986",
        900: "#0B4A6F",
      },

      gray: {
        25: "#FCFCFD",
        50: "#F9FAFB",
        100: "#F2F4F7",
        200: "#EAECF0",
        300: "#D0D5DD",
        400: "#98A2B3",
        500: "#667085",
        600: "#475467",
        700: "#344054",
        800: "#1D2939",
        900: "#101828",
      },

      black: "#000000",

      white: "#FFFFFF",
    },

    fontFamily: {
      sans: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },

    fontSize: {
      txs: ["0.75rem", "1.125rem"],
      tsm: ["0.875rem", "1.25rem"],
      tmd: ["1rem", "1.5rem"],
      tlg: ["1.125rem", "1.75rem"],
      txl: ["1.25rem", "1.875rem"],
      dxs: ["1.5rem", "2rem"],
      dsm: ["1.875rem", "2.375rem"],
      dmd: ["2.25rem", "2.75rem"],
      dlg: ["3rem", "3.75rem"],
      dxl: ["3.75rem", "4.5rem"],
      d2xl: ["4.5rem", "5.625rem"],
    },

    fontWeight: {
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },

    extend: {},
  },
  plugins: [],
};
