import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
                <Calculator className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-gradient">CalculaBrasil</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              O CalculaBrasil é um portal gratuito com calculadoras e simuladores financeiros 
              para ajudar brasileiros a tomar decisões mais inteligentes sobre suas finanças.
            </p>
          </div>

          {/* Calculadoras */}
          <div>
            <h3 className="font-display font-semibold mb-4">Calculadoras</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/juros-compostos" className="text-muted-foreground hover:text-primary transition-colors">
                  Juros Compostos
                </Link>
              </li>
              <li>
                <Link to="/emprestimo" className="text-muted-foreground hover:text-primary transition-colors">
                  Simulador de Empréstimo
                </Link>
              </li>
              <li>
                <Link to="/financiamento" className="text-muted-foreground hover:text-primary transition-colors">
                  Financiamento Imobiliário
                </Link>
              </li>
              <li>
                <Link to="/salario-liquido" className="text-muted-foreground hover:text-primary transition-colors">
                  Salário Líquido
                </Link>
              </li>
              <li>
                <Link to="/rescisao" className="text-muted-foreground hover:text-primary transition-colors">
                  Rescisão Trabalhista
                </Link>
              </li>
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="font-display font-semibold mb-4">Institucional</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/sobre" className="text-muted-foreground hover:text-primary transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-muted-foreground hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="text-muted-foreground hover:text-primary transition-colors">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {currentYear} CalculaBrasil. Todos os direitos reservados.</p>
          <p className="mt-2">
            As informações fornecidas são apenas para fins informativos e não constituem aconselhamento financeiro.
          </p>
        </div>
      </div>
    </footer>
  );
}
