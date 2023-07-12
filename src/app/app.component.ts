import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

interface Cell {
  x: number;
  y: number;
}

class Snake {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  cells: Cell[];
  maxCells: number;

  constructor() {
    this.x = 0; // starting x
    this.y = 0; // starting y
    this.directionX = 20; // direction move x
    this.directionY = 0; // direction move y
    this.cells = [];
    this.maxCells = 4;
  }

  move(): void {
    this.x += this.directionX;
    this.y += this.directionY;

    if (this.x>=400) {
      this.x = 0;
    }

    const newHead: Cell = { x: this.x, y: this.y };
    this.cells.unshift(newHead);

    if (this.cells.length > this.maxCells) {
      this.cells.pop();
    }
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @ViewChild('canvas', {static: true}) canvasRef!: ElementRef<HTMLCanvasElement>;

  private context!: CanvasRenderingContext2D | null;
  private snake: Snake = new Snake();
  private gameSpeed = 100;
  private gameLoopTimeout = 0;

  ngOnInit() {
    this.context = this.canvasRef.nativeElement.getContext('2d');
    document.addEventListener('keydown', this.changeDirection.bind(this));
    this.gameLoop();
  }

  changeDirection(event: KeyboardEvent): void {
    const LEFT_KEY = 'ArrowLeft';
    const RIGHT_KEY = 'ArrowRight';
    const UP_KEY = 'ArrowUp';
    const DOWN_KEY = 'ArrowDown';

    if (event.code === LEFT_KEY && this.snake.directionX === 0) {
      this.snake.directionX = -20;
      this.snake.directionY = 0;
    }

    if (event.code === DOWN_KEY && this.snake.directionY === 0) {
      this.snake.directionY = 20;
      this.snake.directionX = 0;
    }
    console.log(this.snake);
  }

  gameLoop(): void {
    this.snake.move();
    this.draw();
    setTimeout(() => this.gameLoop(), this.gameSpeed);
  }

  draw() {
    const ctx = this.context;
    ctx?.clearRect(0,0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

    for (let i = 0; i < this.snake.cells.length; i++) {
      const cell = this.snake.cells[i];
      ctx!.fillStyle = 'green';
      ctx?.fillRect(cell.x, cell.y , 20, 20);
    }

  }

}
