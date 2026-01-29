import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const Contato = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Simular envio
    setSubmitted(true);
    toast.success("Mensagem enviada com sucesso!");
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setSubmitted(false);
  };

  return (
    <Layout>
      <div className="container py-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="w-16 h-16 rounded-2xl gradient-primary mx-auto mb-6 flex items-center justify-center">
            <MessageSquare className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Entre em Contato
          </h1>
          <p className="text-muted-foreground text-lg">
            Tem alguma dúvida, sugestão ou encontrou algum erro? Fale conosco!
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-5">
          {/* Contact Form */}
          <Card className="shadow-card lg:col-span-3">
            <CardHeader>
              <CardTitle className="font-display">Envie sua Mensagem</CardTitle>
              <CardDescription>
                Responderemos o mais breve possível
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-accent/20 mx-auto mb-6 flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-accent" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    Mensagem Enviada!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Obrigado pelo contato. Responderemos em breve.
                  </p>
                  <Button variant="outline" onClick={resetForm}>
                    Enviar outra mensagem
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome *</Label>
                      <Input
                        id="name"
                        placeholder="Seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Assunto</Label>
                    <Input
                      id="subject"
                      placeholder="Sobre o que deseja falar?"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem *</Label>
                    <Textarea
                      id="message"
                      placeholder="Escreva sua mensagem aqui..."
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full gradient-primary hover:opacity-90">
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">E-mail</h3>
                    <p className="text-sm text-muted-foreground">
                      contato@calculabrasil.com.br
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="pt-6">
                <h3 className="font-display font-semibold mb-3">Perguntas Frequentes</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>• Os cálculos estão atualizados?</li>
                  <li>• Posso usar para fins profissionais?</li>
                  <li>• Encontrei um erro, como reporto?</li>
                  <li>• Podem adicionar nova calculadora?</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <h3 className="font-display font-semibold mb-2">Tempo de Resposta</h3>
                <p className="text-sm text-muted-foreground">
                  Normalmente respondemos em até 48 horas úteis. Para assuntos urgentes, 
                  mencione no assunto.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contato;
