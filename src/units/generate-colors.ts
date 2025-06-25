export function getRandomColorRGB(): string {
  const colors = [
    'rgb(243, 141, 223)',
    'rgba(0, 205, 185)',
    'rgba(170, 148, 221)',
    'rgba(255,115,92)',
    'rgba(0, 172, 248)',
  ];
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
