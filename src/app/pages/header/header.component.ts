import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { BricksService } from 'src/app/shared/services/bricks.service';
import { IBricks, IAllBricks } from 'src/app/shared/interfaces/bricks.interface';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public bricks = new FormGroup({
    line: new FormControl("", [Validators.required, Validators.pattern(/^\d$/)]),
    start: new FormControl('', [Validators.required, Validators.pattern(/^\d$/)]),
    end: new FormControl('', [Validators.required, Validators.pattern(/^\d$/)])
  });
  arrBricks: IBricks[] = []

  constructor(private bricksService: BricksService) { }

  ngOnInit(): void {
    this.getBricks()
  }
  getBricks() {
    this.bricksService.arrBricks.subscribe(data => {
      this.arrBricks = data
    })
  }
  addBricks(formData: FormData) {
    for (let i = formData['start']; i <= formData['end']; i++) {
      this.arrBricks.forEach(brick => {
        if (brick.id === formData['line'] * 8 - 8 + +i) {
          brick.status = true
        }
      })
    }
    this.send(this.arrBricks)
  }
  reset() {
    this.arrBricks.forEach(value => { value.status = false })
    this.send(this.arrBricks)
  }
  send(arrBricks: IBricks[]) {
    const newArrBricks: IAllBricks = {
      id: 1,
      arrBricks: arrBricks
    }
    this.bricksService.newBricks(newArrBricks)
    this.getBricks()
  }
  
}
