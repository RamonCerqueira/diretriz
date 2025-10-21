'use client';

import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openProgress = Math.min(scrollY / 500, 1);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/549197093_18420321886109522_1589379916551028456_n.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: openProgress * 0.9,
        }}
      />

      <div
        className="absolute top-0 left-0 h-full w-1/2 z-10"
        style={{
          backgroundImage: 'url(/images/imagem01.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          transform: `translateX(-${openProgress * 100}%)`,
          transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30"
          style={{ opacity: openProgress }}
        />
      </div>

      <div
        className="absolute top-0 right-0 h-full w-1/2 z-10"
        style={{
          backgroundImage: 'url(/images/imagem02.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'left center',
          transform: `translateX(${openProgress * 100}%)`,
          transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <div 
          className="absolute inset-0 bg-gradient-to-l from-transparent to-black/30"
          style={{ opacity: openProgress }}
        />
      </div>

      <div 
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4"
        style={{
          opacity: 1 - openProgress * 1.5,
          transform: `scale(${1 - openProgress * 0.2})`,
        }}
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-2xl">
              <span className="text-3xl font-bold text-slate-900">D</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            DIRETRIZ
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 font-light tracking-wide">
            ARQUITETURA E ENGENHARIA
          </p>
        </div>

        <p className="text-2xl md:text-3xl font-light text-center max-w-3xl mb-12 leading-relaxed">
          Onde seus sonhos ganham forma
        </p>

        <div className="animate-bounce">
          <ArrowDown className="w-8 h-8 text-yellow-400" />
        </div>
      </div>

      <div 
        className="absolute inset-0 z-15 flex flex-col items-center justify-center text-white px-4"
        style={{
          opacity: openProgress,
          transform: `translateY(${(1 - openProgress) * 50}px)`,
        }}
      >
        {/* <div className="text-center max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Transformamos espaços em experiências
          </h2>
          <p className="text-xl md:text-2xl text-slate-200 mb-8 leading-relaxed">
            Projetos de arquitetura e engenharia que unem funcionalidade, estética e inovação
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#projetos"
              className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Ver Projetos
            </a>
            <a
              href="#contato"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg transition-all duration-300 border border-white/30"
            >
              Fale Conosco
            </a>
          </div>
        </div> */}
      </div>

      <div className="absolute inset-0 bg-black/40 z-5" />
    </section>
  );
}
