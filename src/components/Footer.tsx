export default function Footer() {
  return (
    <footer className="bg-muted border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Traço Fino</h3>
            <p className="text-muted-foreground text-sm">
              O retoque que faltava no seu espelho.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading font-bold mb-4">Atendimento</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Trocas e Devoluções</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-bold mb-4">Informações</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Acompanhe as novidades e dicas de retoque.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © 2026 Traço Fino. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
