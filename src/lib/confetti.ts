import confetti from 'canvas-confetti';

const PALETTE = ['#3987e5', '#199e70', '#c98500', '#9085e9', '#0ca30c'];

export function fireConfetti() {
  confetti({
    particleCount: 80,
    spread: 65,
    startVelocity: 40,
    origin: { y: 0.65 },
    colors: PALETTE,
  });
}

export function fireCelebration() {
  const end = Date.now() + 900;
  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors: PALETTE });
    confetti({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors: PALETTE });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
