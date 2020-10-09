import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IBricks, IAllBricks } from "../interfaces/bricks.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class BricksService {
  private url: string;
  arrBricks: Subject<IBricks[]> = new Subject
  constructor(private http: HttpClient) {
    this.url = "http://localhost:3000/bricks";
  }

  getBricks(): void {
    this.http.get<IAllBricks>(this.url).subscribe((data) => {
      this.arrBricks.next(data[0].arrBricks)
    })
  }
  newBricks(brick: IAllBricks){
   this.http.put<IAllBricks>(`${this.url}/1`, brick).subscribe()
  }
}