'use client';

import { Briefcase, ArrowRight } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface ServicesSectionProps {
  data: {
    title: string;
    subtitle: string;
    content: string;
  };
  services: Service[];
}

export default function ServicesSection({ data, services }: ServicesSectionProps) {
  return (
    <section id="servicos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
              <Briefcase className="w-4 h-4" />
              Serviços
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            {data?.title || 'Nossos Serviços'}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {data?.subtitle || 'Soluções completas em arquitetura e engenharia'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:border-yellow-200 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-50 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-300" />

              <div className="relative z-10 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="w-8 h-8" />
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-yellow-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                <a
                  href="#contato"
                  className="inline-flex items-center gap-2 text-yellow-600 font-semibold hover:gap-3 transition-all"
                >
                  Saiba mais
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-200 rounded-2xl transition-colors duration-300" />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-6">
            Não encontrou o serviço que procura?
          </p>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Fale Conosco
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
