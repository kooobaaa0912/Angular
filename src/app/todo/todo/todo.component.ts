import { Component, OnInit } from '@angular/core';
import{ AbstractControl,FormBuilder,FormGroup,Validators } from '@angular/forms';


interface TodoItem{
  title: string;
  description: string;
  isComplete: boolean;
  date: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  public hasDetail = false;
  public itemList: Array<TodoItem> = new Array<TodoItem>();
  public todoForm: FormGroup;
  constructor(
    protected formBulider: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
  }


  /*Form作成と初期値設定*/
  createForm():void{
    this.todoForm = this.formBulider.group({
      title:[
        '',[Validators.required]
      ],
      description:[''],
      date:[''],
      isComplete:[false]
    });
  }
  onSaveTodoItem(): void{
    const item: TodoItem ={
      title: this.todoForm.get('title').value,
      isComplete: false,
      description: null,
      date: null
    };
    if(this.hasDetail){
      item.description = this.todoForm.get('description').value;
      item.date = this.todoForm.get('date').value;
    }

    this.itemList.push(item);
    this.clearForm();
  }

  clearForm(): void{
    this.todoForm.reset();
  }

  onDeleteItem(item: TodoItem): void{
    this.itemList = this.itemList.filter(i =>i!== item)
  }
}
