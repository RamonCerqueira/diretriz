'use client';

import { Building2, Award, Users, Lightbulb } from 'lucide-react';

interface AboutSectionProps {
  data: {
    title: string;
    subtitle?: string;
    content?: string;
  };
  companyInfo: {
    name: string;
    description: string;
    mission: string;
    vision: string;
    values: string;
    foundedYear: number;
  } | null;
}

export default function AboutSection({ data, companyInfo }: AboutSectionProps) {
  return (
    <section id="sobre" className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
              <Building2 className="w-4 h-4" />
              Sobre Nós
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            {data?.title || 'Quem Somos'}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {data?.subtitle || 'Conheça a história e os valores que nos guiam'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              {companyInfo?.description || data?.content}
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Fundação</h3>
                  <p className="text-slate-600">Desde {companyInfo?.foundedYear || 2017}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Equipe Experiente</h3>
                  <p className="text-slate-600">Profissionais qualificados e dedicados</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Inovação</h3>
                  <p className="text-slate-600">Soluções criativas e modernas</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative h-96 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <img 
                src="/images/542370520_18418611880109522_688964167997659398_n.jpg" 
                alt="Sobre a Diretriz"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-slate-900 mb-2">Missão</h4>
                <p className="text-sm text-slate-600 line-clamp-3">
                  {companyInfo?.mission || 'Transformar espaços em experiências memoráveis'}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-slate-900 mb-2">Visão</h4>
                <p className="text-sm text-slate-600 line-clamp-3">
                  {companyInfo?.vision || 'Ser referência em arquitetura e engenharia'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-12 border-t border-slate-200">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-600 mb-2">500+</div>
            <p className="text-slate-600">Projetos Realizados</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-600 mb-2">8+</div>
            <p className="text-slate-600">Anos de Experiência</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-600 mb-2">100%</div>
            <p className="text-slate-600">Clientes Satisfeitos</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-600 mb-2">50+</div>
            <p className="text-slate-600">Profissionais</p>
          </div>
        </div>
      </div>
    </section>
  );
}
