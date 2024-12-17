import { MatDateFormats } from "@angular/material/core";

export const CUSTOM_DATE_FORMATS: MatDateFormats = {
    parse: {
        dateInput: 'YYYY-MM-DD',
    }, 
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'YYYY-MM-DD',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};