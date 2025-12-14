const coffeeTypes = [
  "Espresso", "Americano", "Latte", "Cappuccino", "Flat White",
  "Macchiato", "Mocha", "Ristretto", "Long Black", "Cortado",
  "Affogato", "Irish Coffee", "Turkish Coffee", "Vienna", "Lungo",
  "Cold Brew", "Nitro Coffee", "Doppio", "Red Eye", "Black Eye",
  "Iced Coffee", "Mazagran", "Coffee Milk", "Cafe au Lait", "Breve",
  "Chicory Coffee", "Drip Coffee", "Percolator Coffee", "Frappuccino", "Glace",
  "Espresso Con Panna", "Café Bombón", "Café Cubano", "Café de Olla", "Pharisäer Kaffee",
  "Café Zorro", "Espresso Romano", "Bulletproof Coffee", "Café Brûlot", "Bicerin",
  "Café Touba", "Café Corretto", "Palazzo", "Café Shakerato", "Marocchino",
  "Café Rápido y Sucio", "Kopi Tubruk", "Kopi Joss", "Kopi Luwak", "Ca Phe Trung",
  "Ca Phe Sua Da", "Yuanyang", "Café del Tiempo", "Café Liégeois"
];

const coffeeImages = {
  "Espresso": "../imgs/Rezepteimgs/espresso.webp",
  "Americano": "../imgs/Rezepteimgs/americano.webp",
  "Latte": "../imgs/Rezepteimgs/latte.webp",
  "Cappuccino": "../imgs/Rezepteimgs/cappuccino.webp",
  "Flat White": "../imgs/Rezepteimgs/flat_white.webp",
  "Macchiato": "../imgs/Rezepteimgs/macchiato.webp",
  "Mocha": "../imgs/Rezepteimgs/mocha.webp",
  "Ristretto": "../imgs/Rezepteimgs/ristretto.webp",
  "Long Black": "../imgs/Rezepteimgs/long-black.webp",
  "Cortado": "../imgs/Rezepteimgs/cortado.webp",
  "Affogato": "../imgs/Rezepteimgs/affogato.webp",
  "Irish Coffee": "../imgs/Rezepteimgs/irish_coffee.webp",
  "Turkish Coffee": "../imgs/Rezepteimgs/turkish_coffee.webp",
  "Vienna": "../imgs/Rezepteimgs/vienna.webp",
  "Lungo": "../imgs/Rezepteimgs/lungo.webp",
  "Cold Brew": "../imgs/Rezepteimgs/cold-brew.webp",
  "Nitro Coffee": "../imgs/Rezepteimgs/nitro-coffee.webp",
  "Doppio": "../imgs/Rezepteimgs/doppio.webp",
  "Red Eye": "../imgs/Rezepteimgs/red-eye.webp",
  "Black Eye": "../imgs/Rezepteimgs/black-eye.webp",
  "Iced Coffee": "../imgs/Rezepteimgs/iced-coffee.webp",
  "Mazagran": "../imgs/Rezepteimgs/mazagran.webp",
  "Coffee Milk": "../imgs/Rezepteimgs/milk-coffee.webp",
  "Cafe au Lait": "../imgs/Rezepteimgs/cafe-au-lait.webp",
  "Breve": "../imgs/Rezepteimgs/breve.webp",
  "Chicory Coffee": "../imgs/Rezepteimgs/chicory.webp",
  "Drip Coffee": "../imgs/Rezepteimgs/drip_coffee.webp",
  "Percolator Coffee": "../imgs/Rezepteimgs/percolator.webp",
  "Frappuccino": "../imgs/Rezepteimgs/frappucchino.webp",
  "Glace": "https://images.unsplash.com/photo-1614227373539-d763a95a31a3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2xhY2VDb2ZmZWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
  "Espresso Con Panna": "https://images.unsplash.com/photo-1578314675325-450f4ea07f4e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fEVzcHJlc3NvJTIwQ29uJTIwUGFubmF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
  "Café Bombón": "https://images.unsplash.com/photo-1517578239113-b03992dcdd25?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2FmJUMzJUE5JTIwQm9tYiVDMyVCM258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
  "Café Cubano": "https://images.unsplash.com/photo-1545341122-64b73393fa64?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q2FmJUMzJUE5JTIwQ3ViYW5vfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
  "Café de Olla": "https://images.unsplash.com/photo-1716972016624-872990cf2ef7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fENhZiVDMyVBOSUyMGRlJTIwT2xsYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
  "Pharisäer Kaffee": "https://images.unsplash.com/photo-1669217508085-dcc2614636c3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fFBoYXJpcyVDMyVBNGVyJTIwS2FmZmVlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
  "Café Zorro": "https://images.unsplash.com/photo-1642316201223-2331fd52efa9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fENhZiVDMyVBOSUyMFpvcnJvfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
  "Espresso Romano": "https://images.pexels.com/photos/34315411/pexels-photo-34315411.jpeg",
  "Bulletproof Coffee": "https://images.unsplash.com/photo-1639670651107-06d8c2841a75?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8QnVsbGV0cHJvb2YlMjBDb2ZmZWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
  "Café Brûlot": "https://images.unsplash.com/photo-1581243440487-3d9642a6a11c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2FmJUMzJUE5JTIwQnIlQzMlQkJsb3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
  "Bicerin": "../imgs/Rezepteimgs/Bicerin.png",
  "Café Touba": "https://images.unsplash.com/photo-1640555051787-7d2a30e43863?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q2FmJUMzJUE5JTIwVG91YmF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
  "Café Corretto": "https://images.unsplash.com/photo-1645262458871-ef8d517745ca?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fENhZiVDMyVBOSUyMGNvcnJldHRvfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
  "Palazzo": "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvZmZlZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
  "Café Shakerato": "https://images.unsplash.com/photo-1717603545604-eaf2d1805ad7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29mZmVlJTIwaWNlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
  "Marocchino": "https://images.unsplash.com/photo-1667279601589-e5497f751d89?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjA0fHxtYXJyb2NjaW5vJTIwY29mZmVlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
  "Café Rápido y Sucio": "https://images.unsplash.com/photo-1688962475803-010f5b756e5a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjEyfHxtYXJyb2NjaW5vJTIwY29mZmVlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
  "Kopi Tubruk": "https://images.unsplash.com/photo-1521302080334-4bebac2763a6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBjb2ZmZWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
  "Kopi Joss": "https://images.unsplash.com/photo-1628406639308-2d4aa223c230?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGtvcGklMjBqb3NzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
  "Kopi Luwak": "https://images.unsplash.com/photo-1643081263742-556f3c8eed4b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGtvcGklMjBqb3NzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
  "Ca Phe Trung": "https://cdn.pixabay.com/photo/2022/11/07/04/36/vietnamese-hot-honey-eggs-coffee-7575584_1280.jpg",
  "Ca Phe Sua Da": "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fGljZWQlMjBjb2ZmZWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
  "Yuanyang": "https://images.unsplash.com/photo-1711370093106-a09b333c0b42?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVhJTIwY29mZmVlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
  "Café del Tiempo": "https://images.unsplash.com/photo-1721276333028-9c87433e2ebc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGVtb24lMjBjb2ZmZWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
  "Café Liégeois": "https://images.unsplash.com/photo-1706158625937-9fe6a9165104?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fHZhbmlsbGElMjBpY2UlMjBjb2ZmZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600"
};

const coffeeList = document.getElementById("coffeeList");
const searchInput = document.getElementById("searchInput");

function renderCoffeeList(filter = "") {
  coffeeList.innerHTML = "";

  coffeeTypes.forEach(coffee => {
    if (coffee.toLowerCase().includes(filter.toLowerCase())) {
      const li = document.createElement("li");

      const box = document.createElement("div");
      box.className = "coffee-box";

      const img = document.createElement("img");
      img.src = coffeeImages[coffee] || "../imgs/default.jpg";
      img.alt = coffee;

      const title = document.createElement("h3");
      title.textContent = coffee;

      box.appendChild(img);
      box.appendChild(title);

      // Klickverhalten auf Detailseite
      box.addEventListener("click", () => {
        window.location.href = `${coffee.toLowerCase().replace(/\s+/g, '-')}.html`;
      });

      li.appendChild(box);
      coffeeList.appendChild(li);
    }
  });
}

renderCoffeeList();

searchInput.addEventListener("input", () => {
  renderCoffeeList(searchInput.value);
});

// Wait for the page to be ready
document.addEventListener('DOMContentLoaded', () => {
  const homeBtn = document.getElementById('homeBtn');
  if (homeBtn) {
    homeBtn.addEventListener('click', () => {
      // Simple relative navigation – adjust if you store home in a different folder
      window.location.href = '../index.html';
    });
  }
});

