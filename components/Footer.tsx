'use client';

import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { useState } from 'react';

interface FooterProps {
  companyInfo: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
  } | null;
}

export default function Footer({ companyInfo }: FooterProps) {
  const [showScroll, setShowScroll] = useState(false);

  const handleScroll = () => {
    setShowScroll(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  typeof window !== 'undefined' && window.addEventListener('scroll', handleScroll);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Sobre */}
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-4">DIRETRIZ</h3>
            <p className="text-slate-400 mb-4">
              Transformando espaços em experiências memoráveis através de projetos de arquitetura e engenharia inovadores.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-yellow-500 hover:bg-yellow-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110 active:scale-95">
                <Facebook className="w-5 h-5 text-slate-900" />
              </a>
              <a href="#" className="w-10 h-10 bg-yellow-500 hover:bg-yellow-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110 active:scale-95">
                <Instagram className="w-5 h-5 text-slate-900" />
              </a>
              <a href="#" className="w-10 h-10 bg-yellow-500 hover:bg-yellow-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110 active:scale-95">
                <Linkedin className="w-5 h-5 text-slate-900" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h4 className="text-lg font-semibold text-white mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <a href="#sobre" className="hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-yellow-400 rounded-full group-hover:w-2 transition-all" />
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-yellow-400 rounded-full group-hover:w-2 transition-all" />
                  Serviços
                </a>
              </li>
              <li>
                <a href="#projetos" className="hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-yellow-400 rounded-full group-hover:w-2 transition-all" />
                  Projetos
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-yellow-400 rounded-full group-hover:w-2 transition-all" />
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h4 className="text-lg font-semibold text-white mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span>{companyInfo?.phone || '(XX) XXXX-XXXX'}</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span>{companyInfo?.email || 'contato@diretriz.com.br'}</span>
              </li>
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span>{companyInfo?.address}, {companyInfo?.city} - {companyInfo?.state}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <h4 className="text-lg font-semibold text-white mb-6">Newsletter</h4>
            <p className="text-slate-400 mb-4 text-sm">
              Receba novidades e atualizações sobre nossos projetos.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="seu@email.com"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-white placeholder-slate-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95"
              >
                Inscrever
              </button>
            </form>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-slate-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {currentYear} Diretriz Arquitetura e Engenharia. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-yellow-400 transition-colors text-sm">
                Política de Privacidade
              </a>
              <a href="#" className="text-slate-400 hover:text-yellow-400 transition-colors text-sm">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Botão Scroll to Top */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-yellow-500 hover:bg-yellow-600 text-slate-900 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-110 active:scale-95 animate-bounce z-40"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </footer>
  );
}
