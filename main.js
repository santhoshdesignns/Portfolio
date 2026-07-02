// JavaScript for Interactive Resume Utilities

document.addEventListener('DOMContentLoaded', () => {
  const printBtn = document.getElementById('print-btn');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');

  // Trigger A4 Print / PDF Save Dialog
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Copy Email to Clipboard and Trigger Custom Toast Alert
  if (copyEmailBtn && toast) {
    const emailText = 'santhosh.designns@gmail.com';

    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailText)
        .then(() => {
          showToast('Email copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy email: ', err);
          showToast('Could not copy email. Please copy manually.');
        });
    });
  }

  // Helper function to animate the toast alert
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    
    // Auto-dismiss toast after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // Smooth interactive shadow-tilts for premium cards (optional refinement)
  const interactiveCards = document.querySelectorAll('.sidebar-card, .experience-card, .project-card, .compact-card, .stat-card');
  
  interactiveCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });
});
