import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-botao-menu',
  templateUrl: './botao-menu.component.html',
  styleUrls: ['./botao-menu.component.scss']
})
export class BotaoMenuComponent implements OnInit {
  @Input() descricao = ''
  @Input() selecionado: boolean;
  @Output() clickk = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onCLick() {
    this.clickk.emit(this.descricao);
  }

}
