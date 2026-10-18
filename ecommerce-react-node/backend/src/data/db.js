import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(dir, 'db.json');

const seed = {
  products: [
    { id: 1, name: 'Notebook Pro 14"', price: 5499.9, stock: 8, emoji: '💻', description: 'Notebook com 16GB RAM e SSD 512GB.' },
    { id: 2, name: 'Mouse sem fio', price: 129.9, stock: 40, emoji: '🖱️', description: 'Mouse ergonômico, bateria de longa duração.' },
    { id: 3, name: 'Teclado mecânico', price: 349.9, stock: 25, emoji: '⌨️', description: 'Switch blue, ABNT2, retroiluminado.' },
    { id: 4, name: 'Headset gamer', price: 259.9, stock: 15, emoji: '🎧', description: 'Som surround 7.1 com microfone removível.' },
    { id: 5, name: 'Monitor 27" 4K', price: 2299.0, stock: 6, emoji: '🖥️', description: 'Painel IPS, 60Hz, HDMI e DisplayPort.' },
    { id: 6, name: 'Webcam Full HD', price: 189.9, stock: 30, emoji: '📷', description: '1080p com microfone embutido.' }
  ],
  orders: [],
  nextProductId: 7,
  nextOrderId: 1
};

let data;
function load() {
  if (data) return data;
  try {
    data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch {
    data = structuredClone(seed);
    save();
  }
  return data;
}
function save() {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

export const db = { load, save };
