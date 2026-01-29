import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, CreditCard, Home, Wallet, Scale, ArrowRight } from "lucide-react";

const calculators = [
  {
    title: "Juros Compostos",
    description: "Simule rendimentos e investimentos ao longo do tempo com juros sobre juros.",
    icon: TrendingUp,
    path: "/juros-compostos",
    color: "bg-finance-blue",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    title: "Simulador de Empréstimo",
    description: "Calcule parcelas mensais, juros totais e veja a tabela de amortização.",
    icon: CreditCard,
    path: "/emprestimo",
    color: "bg-finance-green",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    title: "Financiamento Imobiliário",
    description: "Simule seu financiamento usando tabela Price ou SAC.",
    icon: Home,
    path: "/financiamento",
    color: "bg-finance-purple",
    gradient: "from-purple-500 to-violet-600",
  },
  {
    title: "Salário Líquido",
    description: "Descubra quanto você recebe após descontos de INSS e IRRF.",
    icon: Wallet,
    path: "/salario-liquido",
    color: "bg-finance-orange",
    gradient: "from-orange-500 to-amber-600",
  },
  {
    title: "Rescisão Trabalhista",
    description: "Calcule seus direitos em caso de demissão ou pedido de demissão.",
    icon: Scale,
    path: "/rescisao",
    color: "bg-finance-teal",
    gradient: "from-teal-500 to-cyan-600",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 gradient-primary opacity-5" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
              Calculadoras Financeiras{" "}
              <span className="text-gradient">Gratuitas</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Simule empréstimos, investimentos, rescisões e muito mais. 
              Tome decisões financeiras mais inteligentes com ferramentas simples e precisas.
            </p>
          </div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-12">
            Escolha uma Calculadora
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {calculators.map((calc, index) => (
              <Link
                key={calc.path}
                to={calc.path}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="h-full card-hover border-0 shadow-card group-hover:shadow-card-hover">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${calc.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <calc.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="font-display text-xl group-hover:text-primary transition-colors">
                      {calc.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {calc.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                      Acessar calculadora
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
              Por que usar o CalculaBrasil?
            </h2>
            <div className="grid gap-8 md:grid-cols-3 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl gradient-primary mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-display font-semibold mb-2">Resultados Precisos</h3>
                <p className="text-sm text-muted-foreground">
                  Cálculos baseados nas tabelas oficiais atualizadas de 2026.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl gradient-success mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💸</span>
                </div>
                <h3 className="font-display font-semibold mb-2">100% Gratuito</h3>
                <p className="text-sm text-muted-foreground">
                  Todas as calculadoras são completamente grátis para usar.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="font-display font-semibold mb-2">Tabelas Detalhadas</h3>
                <p className="text-sm text-muted-foreground">
                  Visualize mês a mês a evolução dos seus cálculos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
