import { AbstractControl, ValidationErrors } from "@angular/forms";

export function returnDateValidator(control: AbstractControl): ValidationErrors | null {
    const loanDate = control.get('loanDate').value;
    const returnDate = control.get('returnDate').value;
    
    if (returnDate < loanDate) {
        return { returnDateBeforeLoanDate: true };
    } 
    const diffTime = Math.abs(returnDate - loanDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 14) {
        return { returnDateMoreThan14Days: true };
    }
    return null;
}