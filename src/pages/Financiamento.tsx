import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, RefreshCw } from "lucide-react";

interface InstallmentData {
  installment: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
}

const Financiamento = () => {
  const [propertyValue, setPropertyValue] = useState<string>("300000");
  const [downPayment, setDownPayment] = useState<string>("60000");
  const [interestRate, setInterestRate] = useState<string>("0.9");
  const [months, setMonths] = useState<string>("360");
  const [system, setSystem] = useState<string>("price");
  const [result, setResult] = useState<{
    financedAmount: number;
    firstPayment: number;
    lastPayment: number;
    totalPayment: number;
    totalInterest: number;
    installments: InstallmentData[];
  } | null>(null);

  const calculateFinancing = () => {
    const P = (parseFloat(propertyValue) || 0) - (parseFloat(downPayment) || 0);
    const r = (parseFloat(interestRate) || 0) / 100;
    const n = parseInt(months) || 0;

    if (P <= 0 || r <= 0 || n <= 0) return;

    const installments: InstallmentData[] = [];
    let totalPayment = 0;
    let balance = P;

    if (system === "price") {
      // Sistema Price (parcelas fixas)
      const factor = Math.pow(1 + r, n);
      const monthlyPayment = P * (r * factor) / (factor - 1);

      for (let i = 1; i <= Math.min(n, 60); i++) {
        const interest = balance * r;
        const principal = monthlyPayment - interest;
        balance = balance - principal;
        totalPayment += monthlyPayment;

        installments.push({
          installment: i,
          payment: monthlyPayment,
          interest,
          principal,
          balance: Math.max(0, balance),
        });
      }

      totalPayment = monthlyPayment * n;

      setResult({
        financedAmount: P,
        firstPayment: monthlyPayment,
        lastPayment: monthlyPayment,
        totalPayment,
        totalInterest: totalPayment - P,
        installments,
      });
    } else {
      // Sistema SAC (amortização constante)
      const monthlyAmortization = P / n;

      for (let i = 1; i <= Math.min(n, 60); i++) {
        const interest = balance * r;
        const payment = monthlyAmortization + interest;
        balance = balance - monthlyAmortization;
        totalPayment += payment;

        installments.push({
          installment: i,
          payment,
          interest,
          principal: monthlyAmortization,
          balance: Math.max(0, balance),
        });
      }

      // Calculate total for all months
      let calcBalance = P;
      let calcTotal = 0;
      for (let i = 1; i <= n; i++) {
        const interest = calcBalance * r;
        calcTotal += monthlyAmortization + interest;
        calcBalance -= monthlyAmortization;
      }

      setResult({
        financedAmount: P,
        firstPayment: installments[0].payment,
        lastPayment: monthlyAmortization + (P - monthlyAmortization * (n - 1)) * r,
        totalPayment: calcTotal,
        totalInterest: calcTotal - P,
        installments,
      });
    }
  };

  const resetForm = () => {
    setPropertyValue("300000");
    setDownPayment("60000");
    setInterestRate("0.9");
    setMonths("360");
    setSystem("price");
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
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 mx-auto mb-6 flex items-center justify-center">
            <Home className="h-8 w-8 text-white" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Simulador de Financiamento Imobiliário
          </h1>
          <p className="text-muted-foreground text-lg">
            Simule seu financiamento usando tabela Price ou SAC e compare os resultados.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-2">
          {/* Form Card */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-display">Dados do Financiamento</CardTitle>
              <CardDescription>
                Informe os valores do imóvel e condições
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="propertyValue">Valor do Imóvel (R$)</Label>
                <Input
                  id="propertyValue"
                  type="number"
                  placeholder="300000"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="downPayment">Entrada (R$)</Label>
                <Input
                  id="downPayment"
                  type="number"
                  placeholder="60000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Taxa de Juros Mensal (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.01"
                  placeholder="0.9"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="months">Prazo (meses)</Label>
                <Input
                  id="months"
                  type="number"
                  placeholder="360"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Sistema de Amortização</Label>
                <Select value={system} onValueChange={setSystem}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Tabela Price (Parcelas Fixas)</SelectItem>
                    <SelectItem value="sac">SAC (Amortização Constante)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={calculateFinancing} className="flex-1 bg-gradient-to-r from-purple-500 to-violet-600 hover:opacity-90">
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
                Sistema: {system === "price" ? "Tabela Price" : "SAC"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="grid gap-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 text-white">
                      <p className="text-sm opacity-90">Valor Financiado</p>
                      <p className="text-3xl font-bold font-display">
                        {formatCurrency(result.financedAmount)}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-muted">
                        <p className="text-sm text-muted-foreground">Primeira Parcela</p>
                        <p className="text-xl font-semibold text-foreground">
                          {formatCurrency(result.firstPayment)}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-muted">
                        <p className="text-sm text-muted-foreground">Última Parcela</p>
                        <p className="text-xl font-semibold text-foreground">
                          {formatCurrency(result.lastPayment)}
                        </p>
                      </div>
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
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Home className="h-12 w-12 mx-auto mb-4 opacity-30" />
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
              <CardTitle className="font-display">Primeiras 60 Parcelas</CardTitle>
              <CardDescription>
                Detalhamento das parcelas do financiamento
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
          <h2 className="font-display text-2xl font-bold mb-6">Price ou SAC: Qual escolher?</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              <strong>Tabela Price:</strong> As parcelas são fixas durante todo o financiamento. 
              É mais fácil para planejar o orçamento, mas você paga mais juros no total.
            </p>
            <p className="mt-4">
              <strong>SAC:</strong> As parcelas começam mais altas e vão diminuindo. 
              Você paga menos juros no total, mas precisa de uma renda maior no início.
            </p>
            <h3 className="font-display text-xl font-semibold mt-6 mb-3 text-foreground">Use FGTS para reduzir custos</h3>
            <p>
              Você pode usar seu FGTS como entrada ou para amortizar o saldo devedor, 
              reduzindo o prazo ou o valor das parcelas.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Financiamento;
