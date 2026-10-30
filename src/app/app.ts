import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common'; // Para formatar a média com uma casa decimal

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  // Variáveis do formulário
  nome: string = '';
  n1: number | null = null;
  n2: number | null = null;
  n3: number | null = null;

  // Variáveis de controle de exibição e resultados
  mediaFinal: number = 0;
  situacao: string = '';
  corSituacao: string = '';
  mensagemErro: string = '';
  exibirResultado: boolean = false; // Mantenha apenas essa (apague as linhas de baixo que estavam repetidas)

  public calcularMedia(): void {
    // 1. Validar campos obrigatórios
    if (!this.nome.trim() || this.n1 === null || this.n2 === null || this.n3 === null) {
      this.mensagemErro = 'Todos os campos são obrigatórios!';
      this.exibirResultado = false;
      return;
    }

    // 2. Validar se as notas estão entre 0 e 10
    if (this.n1 < 0 || this.n1 > 10 || this.n2 < 0 || this.n2 > 10 || this.n3 < 0 || this.n3 > 10) {
      this.mensagemErro = 'As notas digitadas devem estar entre 0 e 10!';
      this.exibirResultado = false;
      return;
    }

    // Se passou nas validações, limpa os erros
    this.mensagemErro = '';

    // 3. Lógica do cálculo da média aritmética
    this.mediaFinal = (this.n1 + this.n2 + this.n3) / 3;

    // 4. Regra de negócio para definir Situação e Cor Opcional
    if (this.mediaFinal >= 7) {
      this.situacao = 'APROVADO';
      this.corSituacao = 'green';
    } else if (this.mediaFinal >= 5) {
      this.situacao = 'RECUPERAÇÃO';
      this.corSituacao = 'orange'; // Amarelo escuro/Laranja para melhor leitura
    } else {
      this.situacao = 'REPROVADO';
      this.corSituacao = 'red';
    }

    this.exibirResultado = true;
  }

  // Funcionalidade Extra: Limpar o formulário
  public limparFormulario(): void {
    this.nome = '';
    this.n1 = null;
    this.n2 = null;
    this.n3 = null;
    this.mediaFinal = 0;
    this.situacao = '';
    this.corSituacao = '';
    this.mensagemErro = '';
    this.exibirResultado = false;
  }
}