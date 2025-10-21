'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

interface ContactSectionProps {
  companyInfo: {
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
  } | null;
}

export default function ContactSection({ companyInfo }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      console.error('Erro ao enviar:', error);
    }
  };

  return (
    <section id="contato" className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
              <Mail className="w-4 h-4" />
              Contato
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Entre em Contato
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Estamos prontos para transformar seus projetos em realidade
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informações de contato */}
          <div className="space-y-8 animate-slide-up">
            <div className="flex gap-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-8 h-8 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Telefone</h3>
                <p className="text-slate-600">{companyInfo?.phone || '(XX) XXXX-XXXX'}</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-8 h-8 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
                <p className="text-slate-600">{companyInfo?.email || 'contato@diretriz.com.br'}</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-8 h-8 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Endereço</h3>
                <p className="text-slate-600">
                  {companyInfo?.address}, {companyInfo?.city} - {companyInfo?.state}
                </p>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Nome
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Telefone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                placeholder="(XX) XXXXX-XXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Mensagem
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all resize-none"
                placeholder="Sua mensagem..."
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              <Send className="w-5 h-5" />
              Enviar Mensagem
            </button>

            {submitted && (
              <div className="p-4 bg-green-100 text-green-700 rounded-lg animate-fade-in">
                Mensagem enviada com sucesso! Entraremos em contato em breve.
              </div>
            )}
          </form>
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
