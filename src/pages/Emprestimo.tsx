import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, RefreshCw } from "lucide-react";

interface InstallmentData {
  installment: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
}

const Emprestimo = () => {
  const [loanAmount, setLoanAmount] = useState<string>("10000");
  const [interestRate, setInterestRate] = useState<string>("2");
  const [months, setMonths] = useState<string>("12");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    installments: InstallmentData[];
  } | null>(null);

  const calculateLoan = () => {
    const P = parseFloat(loanAmount) || 0;
    const r = (parseFloat(interestRate) || 0) / 100;
    const n = parseInt(months) || 0;

    if (P <= 0 || r <= 0 || n <= 0) return;

    // Fórmula Price: PMT = P * [r(1+r)^n] / [(1+r)^n - 1]
    const factor = Math.pow(1 + r, n);
    const monthlyPayment = P * (r * factor) / (factor - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - P;

    const installments: InstallmentData[] = [];
    let balance = P;

    for (let i = 1; i <= n; i++) {
      const interest = balance * r;
      const principal = monthlyPayment - interest;
      balance = balance - principal;

      installments.push({
        installment: i,
        payment: monthlyPayment,
        interest,
        principal,
        balance: Math.max(0, balance),
      });
    }

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
      installments,
    });
  };

  const resetForm = () => {
    setLoanAmount("10000");
    setInterestRate("2");
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
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 mx-auto mb-6 flex items-center justify-center">
            <CreditCard className="h-8 w-8 text-white" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Simulador de Empréstimo
          </h1>
          <p className="text-muted-foreground text-lg">
            Calcule as parcelas mensais, juros totais e veja a tabela de amortização completa.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-2">
          {/* Form Card */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-display">Dados do Empréstimo</CardTitle>
              <CardDescription>
                Informe o valor, taxa e prazo desejados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="loanAmount">Valor do Empréstimo (R$)</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  placeholder="10000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Taxa de Juros Mensal (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.01"
                  placeholder="2"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="months">Prazo (meses)</Label>
                <Input
                  id="months"
                  type="number"
                  placeholder="12"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={calculateLoan} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90">
                  Simular
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
              <CardTitle className="font-display">Resultado da Simulação</CardTitle>
              <CardDescription>
                Valores calculados para o seu empréstimo
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="grid gap-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                      <p className="text-sm opacity-90">Parcela Mensal</p>
                      <p className="text-3xl font-bold font-display">
                        {formatCurrency(result.monthlyPayment)}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-muted">
                        <p className="text-sm text-muted-foreground">Total a Pagar</p>
                        <p className="text-xl font-semibold text-foreground">
                          {formatCurrency(result.totalPayment)}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950">
                        <p className="text-sm text-muted-foreground">Total de Juros</p>
                        <p className="text-xl font-semibold text-destructive">
                          {formatCurrency(result.totalInterest)}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-muted">
                      <p className="text-sm text-muted-foreground">Custo do Empréstimo</p>
                      <p className="text-xl font-semibold text-foreground">
                        {((result.totalInterest / parseFloat(loanAmount)) * 100).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>Preencha os dados e clique em simular para ver o resultado.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Installments Table */}
        {result && result.installments.length > 0 && (
          <Card className="mt-8 max-w-5xl mx-auto shadow-card">
            <CardHeader>
              <CardTitle className="font-display">Tabela de Amortização</CardTitle>
              <CardDescription>
                Detalhamento de cada parcela do empréstimo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold">Parcela</TableHead>
                        <TableHead className="font-semibold text-right">Valor</TableHead>
                        <TableHead className="font-semibold text-right">Juros</TableHead>
                        <TableHead className="font-semibold text-right">Amortização</TableHead>
                        <TableHead className="font-semibold text-right">Saldo Devedor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {result.installments.map((row) => (
                        <TableRow key={row.installment}>
                          <TableCell className="font-medium">{row.installment}ª</TableCell>
                          <TableCell className="text-right">{formatCurrency(row.payment)}</TableCell>
                          <TableCell className="text-right text-destructive">{formatCurrency(row.interest)}</TableCell>
                          <TableCell className="text-right text-finance-green">{formatCurrency(row.principal)}</TableCell>
                          <TableCell className="text-right font-semibold">{formatCurrency(row.balance)}</TableCell>
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
          <h2 className="font-display text-2xl font-bold mb-6">Como funciona o Simulador de Empréstimo?</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Nosso simulador utiliza a <strong>Tabela Price</strong>, também conhecida como Sistema Francês 
              de Amortização. Neste sistema, as parcelas são fixas durante todo o período do empréstimo.
            </p>
            <p className="mt-4">
              A cada mês, a composição da parcela muda: no início, você paga mais juros e menos amortização. 
              Com o tempo, a situação se inverte e você passa a amortizar mais o saldo devedor.
            </p>
            <h3 className="font-display text-xl font-semibold mt-6 mb-3 text-foreground">Dica Importante</h3>
            <p>
              Antes de contratar um empréstimo, compare as taxas entre diferentes instituições financeiras. 
              Pequenas diferenças na taxa de juros podem resultar em grandes economias ao longo do prazo.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Emprestimo;
