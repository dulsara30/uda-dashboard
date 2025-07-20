import Tabletop from 'tabletop';

const SHEET_ID = '1vTAzCyKYvnboR7hSMGfZhjUxUvTh97pvlSehop8bFPgxcGq0cn_hLhk30k1zEAIAS4JhFFFyAZVmK5d';

export const fetchSheetData = () => {
    return new Promise((resolve, reject) => {
        Tabletop.init({
            key: SHEET_ID,
            simpleSheet: true,
            callback: data => resolve(data),
            error: err => reject(err)
        });
    });
};
