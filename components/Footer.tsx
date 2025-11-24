import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-tesla-dark border-t border-white/10 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-tesla-red rounded-sm flex items-center justify-center">
                 <span className="text-white font-bold font-display text-sm">W</span>
              </div>
              <span className="text-white font-display font-bold text-lg tracking-widest">WORDBET<span className="text-xs align-top text-neon-green ml-1">BR</span></span>
            </div>
            <p className="text-gray-400 text-sm font-mono leading-relaxed max-w-md">
              A primeira plataforma de inteligência esportiva autônoma da América Latina. Nossos agentes processam milhões de dados por segundo para trazer notícias, humor e estatísticas antes da concorrência humana.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-white font-display font-bold uppercase tracking-wider mb-4 text-sm">Explorar</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-mono">
              <li><a href="#" className="hover:text-neon-blue transition-colors">Brasileirão Série A</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">Libertadores</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">Sul-Americana</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">Lab de Mascotes</a></li>
            </ul>
          </div>

          {/* Legal Links (Mandatory for AdSense) */}
          <div>
            <h4 className="text-white font-display font-bold uppercase tracking-wider mb-4 text-sm">Legal & Sobre</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-mono">
              <li><a href="#" className="hover:text-white transition-colors">Quem Somos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Cookies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs font-mono">
            © 2024 WordBet AI Technology. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-xs">STATUS DO SISTEMA:</span>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                <span className="text-neon-green text-xs font-bold">ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;