import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../category.service';
import { Category } from '../model/Category';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss'
})
export class CategoryEditComponent implements OnInit {
  category: Category;

  constructor(
    // To access the data in your dialog component, you have to use the MAT_DIALOG_DATA injection token.
    // https://material.angular.io/components/dialog/overview#sharing-data-with-the-dialog-component
    public dialogRef: MatDialogRef<CategoryEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {category : Category},
    private categoryService: CategoryService,
) {}

ngOnInit(): void {
 /*  this.category = new Category(); */
  /* this.category = this.data.category != null ? this.data.category : new Category();  */
  this.category = this.data.category ? Object.assign({}, this.data.category) : new Category(); 

}

onSave() {
  this.categoryService.saveCategory(this.category).subscribe(() => {
      this.dialogRef.close();
  });
}

onClose() {
  this.dialogRef.close();
}

}
