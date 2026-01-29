import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";

const Privacidade = () => {
  return (
    <Layout>
      <div className="container py-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Política de Privacidade
          </h1>
          <p className="text-muted-foreground">
            Última atualização: Janeiro de 2026
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="shadow-card">
            <CardContent className="p-8 md:p-12 prose prose-lg max-w-none">
              <h2 className="font-display text-xl font-semibold mt-0">1. Introdução</h2>
              <p className="text-muted-foreground">
                O CalculaBrasil ("nós", "nosso" ou "site") está comprometido em proteger sua 
                privacidade. Esta Política de Privacidade explica como coletamos, usamos e 
                protegemos suas informações quando você usa nosso site.
              </p>

              <h2 className="font-display text-xl font-semibold">2. Informações que Coletamos</h2>
              <p className="text-muted-foreground">
                <strong>2.1 Informações de Uso:</strong> Coletamos automaticamente informações 
                sobre como você interage com nosso site, incluindo páginas visitadas, tempo de 
                permanência e tipo de navegador.
              </p>
              <p className="text-muted-foreground">
                <strong>2.2 Dados de Calculadoras:</strong> Os valores inseridos nas calculadoras 
                são processados localmente em seu navegador e NÃO são armazenados em nossos 
                servidores.
              </p>
              <p className="text-muted-foreground">
                <strong>2.3 Cookies:</strong> Utilizamos cookies para melhorar sua experiência 
                e para fins de análise. Você pode desativar os cookies nas configurações do 
                seu navegador.
              </p>

              <h2 className="font-display text-xl font-semibold">3. Google AdSense</h2>
              <p className="text-muted-foreground">
                Utilizamos o Google AdSense para exibir anúncios em nosso site. O Google pode 
                usar cookies para exibir anúncios com base em suas visitas anteriores a este 
                e outros sites. Você pode desativar a publicidade personalizada visitando as{" "}
                <a 
                  href="https://www.google.com/settings/ads" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Configurações de Anúncios do Google
                </a>.
              </p>

              <h2 className="font-display text-xl font-semibold">4. Google Analytics</h2>
              <p className="text-muted-foreground">
                Utilizamos o Google Analytics para entender como os visitantes usam nosso site. 
                Esta ferramenta coleta informações anônimas sobre seu comportamento de navegação.
              </p>

              <h2 className="font-display text-xl font-semibold">5. Uso das Informações</h2>
              <p className="text-muted-foreground">
                As informações coletadas são usadas para:
              </p>
              <ul className="text-muted-foreground">
                <li>Melhorar nosso site e serviços</li>
                <li>Analisar padrões de uso</li>
                <li>Exibir anúncios relevantes</li>
                <li>Responder suas mensagens de contato</li>
              </ul>

              <h2 className="font-display text-xl font-semibold">6. Compartilhamento de Dados</h2>
              <p className="text-muted-foreground">
                Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, 
                exceto conforme descrito nesta política (Google AdSense e Analytics).
              </p>

              <h2 className="font-display text-xl font-semibold">7. Segurança</h2>
              <p className="text-muted-foreground">
                Implementamos medidas de segurança para proteger suas informações. No entanto, 
                nenhum método de transmissão pela internet é 100% seguro.
              </p>

              <h2 className="font-display text-xl font-semibold">8. Seus Direitos (LGPD)</h2>
              <p className="text-muted-foreground">
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
              </p>
              <ul className="text-muted-foreground">
                <li>Confirmar a existência de tratamento de dados</li>
                <li>Acessar seus dados</li>
                <li>Solicitar correção de dados incompletos ou desatualizados</li>
                <li>Solicitar a eliminação de dados desnecessários</li>
                <li>Revogar o consentimento a qualquer momento</li>
              </ul>

              <h2 className="font-display text-xl font-semibold">9. Menores de Idade</h2>
              <p className="text-muted-foreground">
                Nosso site não é destinado a menores de 18 anos. Não coletamos intencionalmente 
                informações de menores.
              </p>

              <h2 className="font-display text-xl font-semibold">10. Alterações</h2>
              <p className="text-muted-foreground">
                Podemos atualizar esta política periodicamente. Recomendamos que você revise 
                esta página regularmente para se manter informado sobre nossas práticas.
              </p>

              <h2 className="font-display text-xl font-semibold">11. Contato</h2>
              <p className="text-muted-foreground">
                Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato 
                conosco através da nossa página de{" "}
                <a href="/contato" className="text-primary hover:underline">
                  Contato
                </a>.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Privacidade;
