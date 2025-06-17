
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section logo-section">
          <img src="/logo.png" alt="Logo" className="logo" />
          <h2>HackFlix</h2>
          <p>&copy; {new Date().getFullYear()} HackFlix. Todos los derechos reservados.</p>
        </div>

        <div className="footer-section contact-section">
          <h3>Contacto</h3>
          <p>Dirección: Av. Siempre Viva 123</p>
          <p>Teléfono: +598 1234 5678</p>
          <p>Email: contacto@hackflix.com</p>
        </div>

        <div className="footer-section links-section">
          <h3>Enlaces útiles</h3>
          <ul>
            <li><a href="/sobre-nosotros">Sobre nosotros</a></li>
            <li><a href="/contacto">Contacto</a></li>
            <li><a href="/faq">Preguntas frecuentes</a></li>
            <li><a href="/privacidad">Política de privacidad</a></li>
            <li><a href="/terminos">Términos y condiciones</a></li>
            <li><a href="/aviso-legal">Aviso legal</a></li>
            <li><a href="/mapa-del-sitio">Mapa del sitio</a></li>
          </ul>
        </div>

        <div className="footer-section subscribe-section">
          <h3>Suscríbete</h3>
          <p>Recibe nuestras novedades directamente en tu correo</p>
          <form>
            <input type="email" placeholder="Tu correo electrónico" required />
            <button type="submit">Suscribirme</button>
          </form>
        </div>

        <div className="footer-section social-section">
          <h3>Seguinos</h3>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        Volver arriba
      </button>
    </footer>
  );
};

export default Footer;
