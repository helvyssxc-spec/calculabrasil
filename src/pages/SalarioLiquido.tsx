import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wallet, RefreshCw } from "lucide-react";

// Tabela INSS 2026 (valores ilustrativos - atualizar com valores oficiais)
const INSS_TABLE = [
  { min: 0, max: 1518.00, rate: 0.075 },
  { min: 1518.01, max: 2793.88, rate: 0.09 },
  { min: 2793.89, max: 4190.83, rate: 0.12 },
  { min: 4190.84, max: 8157.41, rate: 0.14 },
];

// Tabela IRRF 2026 (valores ilustrativos - atualizar com valores oficiais)
const IRRF_TABLE = [
  { min: 0, max: 2259.20, rate: 0, deduction: 0 },
  { min: 2259.21, max: 2826.65, rate: 0.075, deduction: 169.44 },
  { min: 2826.66, max: 3751.05, rate: 0.15, deduction: 381.44 },
  { min: 3751.06, max: 4664.68, rate: 0.225, deduction: 662.77 },
  { min: 4664.69, max: Infinity, rate: 0.275, deduction: 896.00 },
];

const DEPENDENT_DEDUCTION = 189.59;

const SalarioLiquido = () => {
  const [grossSalary, setGrossSalary] = useState<string>("5000");
  const [dependents, setDependents] = useState<string>("0");
  const [otherDeductions, setOtherDeductions] = useState<string>("0");
  const [result, setResult] = useState<{
    grossSalary: number;
    inss: number;
    irrf: number;
    otherDeductions: number;
    netSalary: number;
    inssDetails: { range: string; value: number }[];
  } | null>(null);

  const calculateINSS = (salary: number) => {
    let inss = 0;
    const details: { range: string; value: number }[] = [];

    for (let i = 0; i < INSS_TABLE.length; i++) {
      const bracket = INSS_TABLE[i];
      const prevMax = i > 0 ? INSS_TABLE[i - 1].max : 0;

      if (salary > bracket.min) {
        const taxableInBracket = Math.min(salary, bracket.max) - prevMax;
        const taxValue = taxableInBracket * bracket.rate;
        inss += taxValue;
        details.push({
          range: `R$ ${bracket.min.toFixed(2)} - R$ ${bracket.max.toFixed(2)}`,
          value: taxValue,
        });
      }
    }

    return { total: Math.min(inss, 951.01), details }; // Teto INSS 2026
  };

  const calculateIRRF = (baseCalculo: number) => {
    for (const bracket of IRRF_TABLE) {
      if (baseCalculo >= bracket.min && baseCalculo <= bracket.max) {
        return baseCalculo * bracket.rate - bracket.deduction;
      }
    }
    return 0;
  };

  const calculateSalary = () => {
    const gross = parseFloat(grossSalary) || 0;
    const deps = parseInt(dependents) || 0;
    const other = parseFloat(otherDeductions) || 0;

    const inssResult = calculateINSS(gross);
    const inss = inssResult.total;

    const baseIRRF = gross - inss - deps * DEPENDENT_DEDUCTION;
    const irrf = Math.max(0, calculateIRRF(baseIRRF));

    const netSalary = gross - inss - irrf - other;

    setResult({
      grossSalary: gross,
      inss,
      irrf,
      otherDeductions: other,
      netSalary,
      inssDetails: inssResult.details,
    });
  };

  const resetForm = () => {
    setGrossSalary("5000");
    setDependents("0");
    setOtherDeductions("0");
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
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 mx-auto mb-6 flex items-center justify-center">
            <Wallet className="h-8 w-8 text-white" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Calculadora de Salário Líquido
          </h1>
          <p className="text-muted-foreground text-lg">
            Descubra quanto você recebe após descontos de INSS e Imposto de Renda.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-2">
          {/* Form Card */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-display">Dados do Salário</CardTitle>
              <CardDescription>
                Informe seu salário bruto e dependentes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="grossSalary">Salário Bruto (R$)</Label>
                <Input
                  id="grossSalary"
                  type="number"
                  placeholder="5000"
                  value={grossSalary}
                  onChange={(e) => setGrossSalary(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dependents">Número de Dependentes</Label>
                <Input
                  id="dependents"
                  type="number"
                  placeholder="0"
                  value={dependents}
                  onChange={(e) => setDependents(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherDeductions">Outros Descontos (R$)</Label>
                <Input
                  id="otherDeductions"
                  type="number"
                  placeholder="0"
                  value={otherDeductions}
                  onChange={(e) => setOtherDeductions(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Vale transporte, plano de saúde, pensão, etc.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={calculateSalary} className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 hover:opacity-90">
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
              <CardTitle className="font-display">Seu Salário Líquido</CardTitle>
              <CardDescription>
                Detalhamento dos descontos mensais
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="grid gap-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white">
                      <p className="text-sm opacity-90">Salário Líquido</p>
                      <p className="text-3xl font-bold font-display">
                        {formatCurrency(result.netSalary)}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                        <span className="text-muted-foreground">Salário Bruto</span>
                        <span className="font-semibold">{formatCurrency(result.grossSalary)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-red-50 dark:bg-red-950">
                        <span className="text-muted-foreground">INSS</span>
                        <span className="font-semibold text-destructive">- {formatCurrency(result.inss)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-red-50 dark:bg-red-950">
                        <span className="text-muted-foreground">IRRF</span>
                        <span className="font-semibold text-destructive">- {formatCurrency(result.irrf)}</span>
                      </div>
                      {result.otherDeductions > 0 && (
                        <div className="flex justify-between items-center p-3 rounded-lg bg-red-50 dark:bg-red-950">
                          <span className="text-muted-foreground">Outros Descontos</span>
                          <span className="font-semibold text-destructive">- {formatCurrency(result.otherDeductions)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Wallet className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>Preencha os dados e clique em calcular para ver o resultado.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tables */}
        <div className="mt-8 max-w-5xl mx-auto grid gap-8 lg:grid-cols-2">
          {/* INSS Table */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-display">Tabela INSS 2026</CardTitle>
              <CardDescription>
                Alíquotas progressivas por faixa salarial
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Faixa Salarial</TableHead>
                      <TableHead className="font-semibold text-right">Alíquota</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {INSS_TABLE.map((bracket, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {formatCurrency(bracket.min)} - {formatCurrency(bracket.max)}
                        </TableCell>
                        <TableCell className="text-right">{(bracket.rate * 100).toFixed(1)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* IRRF Table */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-display">Tabela IRRF 2026</CardTitle>
              <CardDescription>
                Base de cálculo mensal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Base de Cálculo</TableHead>
                      <TableHead className="font-semibold text-right">Alíquota</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {IRRF_TABLE.slice(0, 5).map((bracket, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {bracket.max === Infinity 
                            ? `Acima de ${formatCurrency(bracket.min)}`
                            : `${formatCurrency(bracket.min)} - ${formatCurrency(bracket.max)}`
                          }
                        </TableCell>
                        <TableCell className="text-right">
                          {bracket.rate === 0 ? "Isento" : `${(bracket.rate * 100).toFixed(1)}%`}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SEO Content */}
        <section className="mt-16 max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-6">Como é calculado o Salário Líquido?</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              O salário líquido é o valor que você efetivamente recebe após todos os descontos 
              obrigatórios. Os principais descontos são o INSS (Previdência Social) e o IRRF 
              (Imposto de Renda Retido na Fonte).
            </p>
            <h3 className="font-display text-xl font-semibold mt-6 mb-3 text-foreground">INSS Progressivo</h3>
            <p>
              Desde 2020, o INSS é calculado de forma progressiva, ou seja, cada faixa do seu 
              salário é tributada com uma alíquota diferente.
            </p>
            <h3 className="font-display text-xl font-semibold mt-6 mb-3 text-foreground">Dedução por Dependente</h3>
            <p>
              Cada dependente reduz a base de cálculo do IRRF em R$ {DEPENDENT_DEDUCTION.toFixed(2)}, 
              o que pode diminuir o imposto a pagar.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default SalarioLiquido;
