import Tabletop from 'tabletop';

const PUBLIC_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTAzCyKYvnboR7hSMGfZhjUxUvTh97pvlSehop8bFPgxcGq0cn_hLhk30k1zEAIAS4JhFFFyAZVmK5d/pubhtml?gid=1823143616&single=true';

export const fetchSheetData = () => {
    return new Promise((resolve, reject) => {
        Tabletop.init({
            key: PUBLIC_SHEET_URL,
            simpleSheet: true,
            callback: data => resolve(data),
            error: err => reject(err)
        });
    });
};
