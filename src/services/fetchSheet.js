import Tabletop from 'tabletop';

const SHEET_ID = '1GxNsJFj1YdjRicbLOLRIi94_qMSxEpNv0XXt9rVmQjE';

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
