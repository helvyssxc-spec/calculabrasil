import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Scale, RefreshCw } from "lucide-react";

const Rescisao = () => {
  const [salary, setSalary] = useState<string>("3000");
  const [monthsWorked, setMonthsWorked] = useState<string>("24");
  const [terminationType, setTerminationType] = useState<string>("sem_justa_causa");
  const [daysWorkedMonth, setDaysWorkedMonth] = useState<string>("15");
  const [vacationDays, setVacationDays] = useState<string>("0");
  const [hasAviso, setHasAviso] = useState<boolean>(true);
  const [fgtsBalance, setFgtsBalance] = useState<string>("5000");
  const [result, setResult] = useState<{
    saldoSalario: number;
    decimoTerceiro: number;
    ferias: number;
    tercoFerias: number;
    avisoPrevio: number;
    multaFgts: number;
    fgtsTotal: number;
    total: number;
    breakdown: { label: string; value: number }[];
  } | null>(null);

  const calculateRescisao = () => {
    const salarioBase = parseFloat(salary) || 0;
    const mesesTrabalhados = parseInt(monthsWorked) || 0;
    const diasTrabalhados = parseInt(daysWorkedMonth) || 0;
    const diasFerias = parseInt(vacationDays) || 0;
    const saldoFgts = parseFloat(fgtsBalance) || 0;

    // Saldo de salário
    const saldoSalario = (salarioBase / 30) * diasTrabalhados;

    // 13º proporcional
    const meses13 = mesesTrabalhados % 12 || 12;
    const decimoTerceiro = (salarioBase / 12) * Math.min(meses13, 12);

    // Férias proporcionais
    const mesesFerias = mesesTrabalhados % 12;
    const feriasProporcionais = (salarioBase / 12) * mesesFerias;
    
    // Férias vencidas (se houver)
    const feriasVencidas = diasFerias > 0 ? salarioBase : 0;
    const ferias = feriasProporcionais + feriasVencidas;
    const tercoFerias = ferias / 3;

    // Aviso prévio (se aplicável)
    let avisoPrevio = 0;
    if (terminationType === "sem_justa_causa" && hasAviso) {
      const diasAviso = 30 + Math.min(Math.floor(mesesTrabalhados / 12) * 3, 60);
      avisoPrevio = (salarioBase / 30) * diasAviso;
    }

    // Multa FGTS (40% para demissão sem justa causa)
    let multaFgts = 0;
    let fgtsTotal = saldoFgts;
    if (terminationType === "sem_justa_causa") {
      multaFgts = saldoFgts * 0.4;
      fgtsTotal = saldoFgts + multaFgts;
    } else if (terminationType === "acordo") {
      multaFgts = saldoFgts * 0.2;
      fgtsTotal = saldoFgts * 0.8 + multaFgts; // Saca 80% + 20% de multa
    }

    const breakdown: { label: string; value: number }[] = [
      { label: "Saldo de Salário", value: saldoSalario },
      { label: "13º Proporcional", value: decimoTerceiro },
      { label: "Férias Proporcionais + Vencidas", value: ferias },
      { label: "1/3 de Férias", value: tercoFerias },
    ];

    if (avisoPrevio > 0) {
      breakdown.push({ label: "Aviso Prévio Indenizado", value: avisoPrevio });
    }

    if (terminationType !== "justa_causa" && terminationType !== "pedido") {
      breakdown.push({ label: "Saldo FGTS", value: saldoFgts });
      if (multaFgts > 0) {
        breakdown.push({ label: "Multa 40% FGTS", value: multaFgts });
      }
    }

    const totalVerbas = saldoSalario + decimoTerceiro + ferias + tercoFerias + avisoPrevio;
    const total = terminationType === "justa_causa" || terminationType === "pedido" 
      ? totalVerbas 
      : totalVerbas + fgtsTotal;

    setResult({
      saldoSalario,
      decimoTerceiro,
      ferias,
      tercoFerias,
      avisoPrevio,
      multaFgts,
      fgtsTotal,
      total,
      breakdown,
    });
  };

  const resetForm = () => {
    setSalary("3000");
    setMonthsWorked("24");
    setTerminationType("sem_justa_causa");
    setDaysWorkedMonth("15");
    setVacationDays("0");
    setHasAviso(true);
    setFgtsBalance("5000");
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
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 mx-auto mb-6 flex items-center justify-center">
            <Scale className="h-8 w-8 text-white" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Calculadora de Rescisão Trabalhista
          </h1>
          <p className="text-muted-foreground text-lg">
            Calcule seus direitos em caso de demissão, pedido de demissão ou acordo.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-2">
          {/* Form Card */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-display">Dados do Contrato</CardTitle>
              <CardDescription>
                Informe os dados do seu contrato de trabalho
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="salary">Último Salário Bruto (R$)</Label>
                <Input
                  id="salary"
                  type="number"
                  placeholder="3000"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthsWorked">Tempo de Trabalho (meses)</Label>
                <Input
                  id="monthsWorked"
                  type="number"
                  placeholder="24"
                  value={monthsWorked}
                  onChange={(e) => setMonthsWorked(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Tipo de Rescisão</Label>
                <Select value={terminationType} onValueChange={setTerminationType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sem_justa_causa">Demissão sem Justa Causa</SelectItem>
                    <SelectItem value="pedido">Pedido de Demissão</SelectItem>
                    <SelectItem value="acordo">Acordo (Demissão Consensual)</SelectItem>
                    <SelectItem value="justa_causa">Demissão por Justa Causa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="daysWorkedMonth">Dias Trabalhados no Mês</Label>
                <Input
                  id="daysWorkedMonth"
                  type="number"
                  placeholder="15"
                  value={daysWorkedMonth}
                  onChange={(e) => setDaysWorkedMonth(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fgtsBalance">Saldo do FGTS (R$)</Label>
                <Input
                  id="fgtsBalance"
                  type="number"
                  placeholder="5000"
                  value={fgtsBalance}
                  onChange={(e) => setFgtsBalance(e.target.value)}
                />
              </div>

              {terminationType === "sem_justa_causa" && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasAviso"
                    checked={hasAviso}
                    onCheckedChange={(checked) => setHasAviso(checked as boolean)}
                  />
                  <Label htmlFor="hasAviso" className="text-sm">
                    Aviso prévio indenizado (não trabalhou)
                  </Label>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button onClick={calculateRescisao} className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-600 hover:opacity-90">
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
              <CardTitle className="font-display">Valor da Rescisão</CardTitle>
              <CardDescription>
                Detalhamento das verbas rescisórias
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="grid gap-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white">
                      <p className="text-sm opacity-90">Total a Receber</p>
                      <p className="text-3xl font-bold font-display">
                        {formatCurrency(result.total)}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      {result.breakdown.map((item, index) => (
                        <div 
                          key={index} 
                          className="flex justify-between items-center p-3 rounded-lg bg-muted"
                        >
                          <span className="text-muted-foreground text-sm">{item.label}</span>
                          <span className="font-semibold text-finance-green">
                            + {formatCurrency(item.value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Scale className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>Preencha os dados e clique em calcular para ver o resultado.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Info Cards */}
        <div className="mt-8 max-w-5xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <h3 className="font-display font-semibold mb-2">Sem Justa Causa</h3>
              <p className="text-sm text-muted-foreground">
                Direito a todas as verbas + 40% de multa sobre o FGTS + seguro-desemprego.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <h3 className="font-display font-semibold mb-2">Pedido de Demissão</h3>
              <p className="text-sm text-muted-foreground">
                Recebe verbas proporcionais, mas não saca FGTS nem recebe multa.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <h3 className="font-display font-semibold mb-2">Acordo</h3>
              <p className="text-sm text-muted-foreground">
                Saca 80% do FGTS + 20% de multa. Aviso prévio pela metade.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <h3 className="font-display font-semibold mb-2">Justa Causa</h3>
              <p className="text-sm text-muted-foreground">
                Recebe apenas saldo de salário e férias vencidas.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* SEO Content */}
        <section className="mt-16 max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-6">Entenda seus Direitos na Rescisão</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              A rescisão trabalhista envolve diversos cálculos que variam conforme o tipo de 
              desligamento. É importante conhecer seus direitos para verificar se os valores 
              pagos pelo empregador estão corretos.
            </p>
            <h3 className="font-display text-xl font-semibold mt-6 mb-3 text-foreground">Aviso Prévio Proporcional</h3>
            <p>
              O aviso prévio é de 30 dias + 3 dias para cada ano trabalhado na empresa, 
              limitado a 90 dias no total. Quando indenizado, o valor é pago junto com a rescisão.
            </p>
            <h3 className="font-display text-xl font-semibold mt-6 mb-3 text-foreground">Prazo de Pagamento</h3>
            <p>
              O empregador tem até 10 dias corridos após o término do contrato para pagar 
              as verbas rescisórias. O atraso gera multa de um salário.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Rescisao;
