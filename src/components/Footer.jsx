import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-wrapper">
      <div>
        <div className="footer-designer">Santhoshkumar Kanagaraj</div>
        <div className="footer-roles">Graphic Designer & UX/UI Designer</div>
      </div>
      <div className="footer-copy">
        &copy; {currentYear || 2026} &bull; Handcrafted with intent
      </div>
    </footer>
  );
}
