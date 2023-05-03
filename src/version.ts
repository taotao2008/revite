export const APP_VERSION = "__APP_VERSION__";
export const IS_REVOLT =
    import.meta.env.VITE_API_URL === "https://app.aizen.chat/api" ||
    // future proofing
    import.meta.env.VITE_API_URL === "https://app.aizen.chat/api" ||
    import.meta.env.VITE_API_URL === "https://app.aizen.chat/api";
