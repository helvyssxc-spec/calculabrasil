import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Award, Heart } from "lucide-react";

const Sobre = () => {
  return (
    <Layout>
      <div className="container py-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Sobre o CalculaBrasil
          </h1>
          <p className="text-muted-foreground text-lg">
            Ferramentas financeiras gratuitas para ajudar brasileiros a tomar 
            melhores decisões sobre seu dinheiro.
          </p>
        </div>

        {/* Mission */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="shadow-card">
            <CardContent className="p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div>
                  <h2 className="font-display text-2xl font-bold mb-4">Nossa Missão</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    O CalculaBrasil nasceu com o objetivo de democratizar o acesso a ferramentas 
                    financeiras de qualidade. Acreditamos que todos os brasileiros merecem ter 
                    acesso a simuladores e calculadoras precisas, sem precisar pagar por isso.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Nossas calculadoras são atualizadas regularmente com as tabelas oficiais 
                    do governo, garantindo que você sempre tenha resultados confiáveis para 
                    suas decisões financeiras.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="w-48 h-48 rounded-full gradient-primary flex items-center justify-center">
                    <Target className="w-24 h-24 text-primary-foreground" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-center mb-8">Nossos Valores</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="shadow-card text-center">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 rounded-2xl gradient-primary mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold mb-2">Precisão</h3>
                <p className="text-sm text-muted-foreground">
                  Cálculos baseados nas tabelas oficiais e legislação vigente.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card text-center">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 rounded-2xl gradient-success mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold mb-2">Gratuidade</h3>
                <p className="text-sm text-muted-foreground">
                  Todas as ferramentas são 100% gratuitas, sem custos ocultos.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card text-center">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold mb-2">Acessibilidade</h3>
                <p className="text-sm text-muted-foreground">
                  Interface simples e intuitiva para qualquer pessoa usar.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="max-w-3xl mx-auto mt-16">
          <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900">
            <CardContent className="p-6">
              <h3 className="font-display font-semibold mb-2 text-amber-800 dark:text-amber-200">
                Aviso Importante
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                As informações e cálculos fornecidos pelo CalculaBrasil são apenas para fins 
                informativos e educacionais. Não constituem aconselhamento financeiro, jurídico 
                ou tributário. Recomendamos sempre consultar um profissional qualificado para 
                decisões importantes sobre suas finanças.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Sobre;
