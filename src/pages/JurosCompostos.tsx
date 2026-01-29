import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, RefreshCw } from "lucide-react";

interface MonthlyData {
  month: number;
  startBalance: number;
  deposit: number;
  interest: number;
  endBalance: number;
}

const JurosCompostos = () => {
  const [initialValue, setInitialValue] = useState<string>("1000");
  const [monthlyDeposit, setMonthlyDeposit] = useState<string>("100");
  const [interestRate, setInterestRate] = useState<string>("1");
  const [months, setMonths] = useState<string>("12");
  const [result, setResult] = useState<{
    finalAmount: number;
    totalDeposited: number;
    totalInterest: number;
    monthlyData: MonthlyData[];
  } | null>(null);

  const calculateCompoundInterest = () => {
    const P = parseFloat(initialValue) || 0;
    const PMT = parseFloat(monthlyDeposit) || 0;
    const r = (parseFloat(interestRate) || 0) / 100;
    const n = parseInt(months) || 0;

    const monthlyData: MonthlyData[] = [];
    let currentBalance = P;
    let totalInterest = 0;

    for (let i = 1; i <= n; i++) {
      const startBalance = currentBalance;
      const interest = currentBalance * r;
      totalInterest += interest;
      currentBalance = currentBalance + interest + PMT;

      monthlyData.push({
        month: i,
        startBalance,
        deposit: PMT,
        interest,
        endBalance: currentBalance,
      });
    }

    const totalDeposited = P + PMT * n;

    setResult({
      finalAmount: currentBalance,
      totalDeposited,
      totalInterest,
      monthlyData,
    });
  };

  const resetForm = () => {
    setInitialValue("1000");
    setMonthlyDeposit("100");
    setInterestRate("1");
    setMonths("12");
    setResult(null);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <Layout>
      <div className="container py-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 mx-auto mb-6 flex items-center justify-center">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Calculadora de Juros Compostos
          </h1>
          <p className="text-muted-foreground text-lg">
            Simule o crescimento do seu dinheiro ao longo do tempo com aportes mensais e juros sobre juros.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-2">
          {/* Form Card */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-display">Dados da Simulação</CardTitle>
              <CardDescription>
                Preencha os valores para calcular o rendimento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="initialValue">Valor Inicial (R$)</Label>
                <Input
                  id="initialValue"
                  type="number"
                  placeholder="1000"
                  value={initialValue}
                  onChange={(e) => setInitialValue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyDeposit">Aporte Mensal (R$)</Label>
                <Input
                  id="monthlyDeposit"
                  type="number"
                  placeholder="100"
                  value={monthlyDeposit}
                  onChange={(e) => setMonthlyDeposit(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Taxa de Juros Mensal (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.01"
                  placeholder="1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="months">Período (meses)</Label>
                <Input
                  id="months"
                  type="number"
                  placeholder="12"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={calculateCompoundInterest} className="flex-1 gradient-primary hover:opacity-90">
                  Calcular
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-display">Resultado</CardTitle>
              <CardDescription>
                Veja quanto seu dinheiro pode render
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="grid gap-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                      <p className="text-sm opacity-90">Valor Final</p>
                      <p className="text-3xl font-bold font-display">
                        {formatCurrency(result.finalAmount)}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-muted">
                        <p className="text-sm text-muted-foreground">Total Investido</p>
                        <p className="text-xl font-semibold text-foreground">
                          {formatCurrency(result.totalDeposited)}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950">
                        <p className="text-sm text-muted-foreground">Juros Ganhos</p>
                        <p className="text-xl font-semibold text-finance-green">
                          {formatCurrency(result.totalInterest)}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-muted">
                      <p className="text-sm text-muted-foreground">Rendimento Total</p>
                      <p className="text-xl font-semibold text-foreground">
                        {((result.totalInterest / result.totalDeposited) * 100).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>Preencha os dados e clique em calcular para ver o resultado.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Monthly Table */}
        {result && result.monthlyData.length > 0 && (
          <Card className="mt-8 max-w-5xl mx-auto shadow-card">
            <CardHeader>
              <CardTitle className="font-display">Evolução Mensal</CardTitle>
              <CardDescription>
                Acompanhe o crescimento mês a mês do seu investimento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold">Mês</TableHead>
                        <TableHead className="font-semibold text-right">Saldo Inicial</TableHead>
                        <TableHead className="font-semibold text-right">Aporte</TableHead>
                        <TableHead className="font-semibold text-right">Juros</TableHead>
                        <TableHead className="font-semibold text-right">Saldo Final</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {result.monthlyData.map((row) => (
                        <TableRow key={row.month}>
                          <TableCell className="font-medium">{row.month}º</TableCell>
                          <TableCell className="text-right">{formatCurrency(row.startBalance)}</TableCell>
                          <TableCell className="text-right">{formatCurrency(row.deposit)}</TableCell>
                          <TableCell className="text-right text-finance-green">{formatCurrency(row.interest)}</TableCell>
                          <TableCell className="text-right font-semibold">{formatCurrency(row.endBalance)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* SEO Content */}
        <section className="mt-16 max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-6">O que são Juros Compostos?</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Juros compostos são conhecidos como "juros sobre juros". Diferente dos juros simples, 
              onde o cálculo é sempre feito sobre o valor inicial, nos juros compostos os rendimentos 
              de cada período são somados ao capital para gerar novos juros no período seguinte.
            </p>
            <p className="mt-4">
              Esta é a forma mais comum de cálculo usada em investimentos, como CDBs, Tesouro Direto, 
              fundos de investimento e poupança. Quanto maior o prazo, maior é o efeito dos juros 
              compostos no crescimento do seu patrimônio.
            </p>
            <h3 className="font-display text-xl font-semibold mt-6 mb-3 text-foreground">Fórmula dos Juros Compostos</h3>
            <p>
              A fórmula básica é: <strong>M = P × (1 + i)^n</strong>, onde M é o montante final, 
              P é o principal (valor inicial), i é a taxa de juros e n é o número de períodos.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default JurosCompostos;
