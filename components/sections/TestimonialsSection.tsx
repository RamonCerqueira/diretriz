'use client';

import { Star } from 'lucide-react';

interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  content: string;
  rating: number;
  imageUrl: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section id="depoimentos" className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
              <Star className="w-4 h-4" />
              Depoimentos
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Conheça as experiências de quem já trabalhou com a Diretriz
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400 animate-bounce"
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>

              <p className="text-slate-200 leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                {testimonial.imageUrl && (
                  <img
                    src={testimonial.imageUrl}
                    alt={testimonial.clientName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-yellow-500"
                  />
                )}
                <div>
                  <h4 className="font-semibold text-white">
                    {testimonial.clientName}
                  </h4>
                  <p className="text-slate-400 text-sm">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
