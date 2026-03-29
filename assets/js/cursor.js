document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.getElementById('custom-cursor');
  const cursorFollower = document.getElementById('custom-cursor-follower');
  
  if (!cursor || !cursorFollower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  
  // Speed of the follower delay (lower is slower)
  const speed = 0.15;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Move the tiny dot cursor instantly
    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  // Highlight cursor on interactive elements
  const interactables = document.querySelectorAll('a, button, input, textarea, select, .feature-card, .module-card, .lesson-card-item, .quiz-option, .tab-btn');
  
  interactables.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursorFollower.classList.add('hovering');
      cursor.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      cursorFollower.classList.remove('hovering');
      cursor.classList.remove('hovering');
    });
  });

  // Animation loop for the follower
  function animateFollower() {
    // Linear interpolation for smooth trailing
    followerX += (mouseX - followerX) * speed;
    followerY += (mouseY - followerY) * speed;
    
    // Apply transform and offset by half of the follower width/height to center it
    cursorFollower.style.transform = `translate3d(${followerX - 16}px, ${followerY - 16}px, 0)`;
    
    requestAnimationFrame(animateFollower);
  }

  animateFollower();
});
