// Твой HTML:
// <header>
//   <div class="navbar">
//     <div class="logo-area">
//       <span class="logo">ЯД</span>
//       <h1>Дудник Ярослав Вячеславович</h1>
//     </div>
//     <nav>
//       <ul>
//         <li><a href="#about">Обо мне</a></li>
//         <li><a href="#skills">Навыки</a></li>
//         <li><a href="#contacts">Контакты</a></li>
//       </ul>
//     </nav>
//   </div>
// </header>

export default function Navbar() {
  return (
    <header>
      <div className="navbar">
        <div className="logo-area">
          <span className="logo">ЯД</span>
          <h1>Дудник Ярослав Вячеславович</h1>
        </div>
        <nav>
          <ul>
            <li><a href="#about">Обо мне</a></li>
            <li><a href="#skills">Навыки</a></li>
            <li><a href="#contacts">Контакты</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}