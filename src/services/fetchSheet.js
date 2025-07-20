export const fetchSheetData = async () => {
    try {
        const res = await fetch(import.meta.env.VITE_SHEET_BEST_URL);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("❌ Error fetching data from Sheet.best", error);
        return [];
    }
};
