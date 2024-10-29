"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import about from "../../assets/about.svg"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [scrollingDown, setScrollingDown] = useState(false);
  
  const [typedText, setTypedText] = useState("");
  const fullText = "digital...";
  const typingSpeed = 150; // Velocidade de digitação
  const deletingSpeed = 100; // Velocidade de apagamento
  const pauseBetweenCycles = 1500; // Pausa entre a digitação e o apagamento
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollingDown(currentScrollY > prevScrollY);
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDeleting && typedText.length < fullText.length) {
        setTypedText((prev) => prev + fullText[typedText.length]);
      } else if (isDeleting && typedText.length > 0) {
        setTypedText((prev) => prev.slice(0, -1));
      }

      if (typedText === fullText) {
        setIsDeleting(true);
        setTimeout(() => {
          setIsDeleting(false);
        }, pauseBetweenCycles);
      } else if (typedText.length === 0 && isDeleting) {
        setTimeout(() => {
          setIsDeleting(false);
        }, pauseBetweenCycles);
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearInterval(interval);
  }, [typedText, isDeleting]);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white font-sans min-h-screen">
      {/* Navbar */}
      <nav className={`bg-transparent fixed w-full top-0 z-10 transition-transform ${scrollingDown ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="container mx-auto p-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-accent">NexWeb</h1>
          <div className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className="cursor-pointer">
              <div className="w-6 h-1 bg-white mb-1"></div>
              <div className="w-6 h-1 bg-white mb-1"></div>
              <div className="w-6 h-1 bg-white"></div>
            </div>
          </div>
          <ul className={`flex-col md:flex md:flex-row md:space-x-8 text-lg absolute md:static bg-black md:bg-transparent transition-all duration-300 ease-in-out ${isMenuOpen ? 'top-16 left-0 w-full' : '-top-48 md:top-auto'}`}>
            <li><Link href="#home" className="hover:text-accent px-4 py-2 block font-semibold">Home</Link></li>
            <li><Link href="#about" className="hover:text-accent px-4 py-2 block font-semibold">About</Link></li>
            <li><Link href="#services" className="hover:text-accent px-4 py-2 block font-semibold">Services</Link></li>
            <li><Link href="#contact" className="hover:text-accent px-4 py-2 block font-semibold">Contact</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="flex flex-col justify-center items-center h-screen text-center relative">
        <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 animate-text-glow">
          Transforme Sua Presença {typedText}
        </h1>
        <p className="text-lg md:text-2xl mt-4">A NexWeb constrói experiências que encantam e convertem.</p>
        <button className="mt-10 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:from-pink-600 hover:to-purple-600 transition">
          Comece Agora
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gray-900 text-justify">
        <div className="flex justify-between max-w-[1320px] mx-auto">
          <div className="">
            <h2 className="text-4xl font-bold text-accent">Sobre Nós</h2>
            <p className="mt-6 text-lg max-w-2xl">
            Olá! Nós somos a NexWeb, uma agência apaixonada por ajudar marcas a brilhar no mundo digital. Sabemos que ter um site incrível e uma identidade de marca forte é essencial para se conectar com seus clientes. Por isso, estamos aqui para transformar sua presença online de maneira única e impactante.
            </p>
            <p className="mt-6 text-lg max-w-2xl">
            Nosso foco é criar websites que não apenas impressionam, mas que também atraem e engajam seu público. Queremos trabalhar lado a lado com você para desenvolver um branding que conte a sua história e ressoe com quem você realmente é.
            </p>
            <p className="mt-6 text-lg max-w-2xl">
            Se você ainda não tem uma presença digital forte, não se preocupe! Estamos prontos para guiá-lo nessa jornada e garantir que sua marca faça uma grande entrada no mundo online. Juntos, podemos construir experiências digitais que fazem a diferença e ajudam você a alcançar seus objetivos.
            </p>
            <p className="mt-6 text-lg max-w-2xl">
            Vamos conversar e transformar a sua marca digital?
            </p>
          </div>

          <div className="">
            <Image src={about} alt="" width={400} />
          </div>
        </div>
       
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-800 text-justify">
        <h2 className="text-4xl font-bold text-accent">Nossos Serviços</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-700 p-8 rounded-lg shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold">Criação de Sites</h3>
            <p className="mt-4 text-gray-300">Desenvolvimento de sites modernos e responsivos para qualquer dispositivo.</p>
          </div>
          <div className="bg-gray-700 p-8 rounded-lg shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold">Branding</h3>
            <p className="mt-4 text-gray-300">Desenvolvimento de marcas únicas e estratégias de identidade visual.</p>
          </div>
          <div className="bg-gray-700 p-8 rounded-lg shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold">Consultoria Digital</h3>
            <p className="mt-4 text-gray-300">Consultoria em estratégias digitais para impulsionar seu negócio.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-justify">
        <h2 className="text-4xl font-bold text-accent">Entre em Contato</h2>
        <p className="mt-6 text-lg max-w-2xl mx-auto">
          Quer saber mais sobre nossos serviços? Envie uma mensagem e vamos transformar a sua presença digital.
        </p>
        <form className="mt-10 max-w-xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-300 font-bold mb-2">Nome</label>
            <input className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white" type="text" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 font-bold mb-2">Email</label>
            <input className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white" type="email" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 font-bold mb-2">Mensagem</label>
            <textarea className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white" rows={4}></textarea>
          </div>
          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-lg hover:from-pink-600 hover:to-purple-600 transition">
            Enviar Mensagem
          </button>
        </form>
      </section>
    </div>
  );
}
