window.customElements.define(
    "custom-navbar", class extends HTMLElement {
        constructor() {
            super();

            const root = this.attachShadow({ mode: 'open' });
            root.innerHTML = `
            <style>
                nav { 
                    background-color: #0d6efd;
                    border: 1px solid #0d6efd;
                }
                
                nav a {
                    text-decoration: none;
                    color: white;
                }
                
                nav ul {
                    padding: 0;
                }
                
                .nav-menu {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    list-style-type: none;
                }
            </style>
            <nav> 
                <ul class="nav-menu">
                    <li><a class="nav-title" href="#">Phillip Morris</a></li>
                </ul>
            </nav>            
            `;
        }
    }
);