const tiffanyBlueTheme = {
    primary: "#16838E",
    background: "#FFFBFB",
    inputBorderColor: "rgba(18,184,191,0.4)",
    inputPlaceholderColor: "rgba(18,184,191,0.5)",
    buttonText: "#FFFFFF",
    secondary: "#12B8BF",
    errorText: "#B91C1C",
    errorBackground: "#FEE2E2",
    activeTabColor: "#0D5D65",
    homeHeaderBorderColor: "rgba(18,184,191,0.4)",
    lightBackground: "rgba(18, 185, 191, 0.10)",
    backgroundShadowColor: "#1E1E1E"
}

//vivid = 0.03 and cooler = 86
const lightTheme = {
    backgroundDark: "hsl(41 26% 88%)",
    background: "hsl(41 47% 94%)",
    backgroundLight: "hsl(41 100% 99%)",
    text: "hsl(36 98% 3%)",
    textMuted: "hsl(41 19% 26%)",
    highlight: "hsl(41 100% 97%)",
    border: "hsl(41 11% 48%)",
    borderMuted: "hsl(41 14% 60%)",
    primary: "hsl(45 100% 14%)",
    secondary: "hsl(223 46% 34%)",
    danger: "hsl(9 21% 41%)",
    warning: "hsl(52 23% 34%)",
    success: "hsl(147 19% 36%)",
    info: "hsl(217 22% 41%)",
}


const darkTheme = {
    backgroundDark: "hsl(35 75% 1%)",
    background: "hsl(39 49% 4%)",
    backgroundLight: "hsl(41 28% 8%)",
    text: "hsl(41 79% 92%)",
    textMuted: "hsl(41 18% 67%)",
    highlight: "hsl(41 14% 37%)",
    border: "hsl(41 19% 26%)",
    borderMuted: "hsl(41 30% 16%)",
    primary: "hsl(42 52% 60%)",
    secondary: "hsl(222 77% 76%)",
    danger: "hsl(9 26% 64%)",
    warning: "hsl(52 19% 57%)",
    success: "hsl(146 17% 59%)",
    info: "hsl(217 28% 65%)",


}

const THEMES = {
    tiffanyBlue: tiffanyBlueTheme,
    dark: darkTheme,
    light: lightTheme,
}

export const COLORS = THEMES.light;