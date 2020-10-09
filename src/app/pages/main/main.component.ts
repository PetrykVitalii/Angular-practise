import { Component, OnInit } from "@angular/core";
import { BricksService } from "src/app/shared/services/bricks.service";
import { IBricks } from "src/app/shared/interfaces/bricks.interface";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  arrBricks: IBricks[] = [];

  constructor(private bricksService: BricksService) { }

  ngOnInit(): void {
    this.getBricks();
  }

  getBricks() {
    this.bricksService.getBricks()
    this.bricksService.arrBricks.subscribe(data => {
      this.arrBricks = data;
    })
  }
}