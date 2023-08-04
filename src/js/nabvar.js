window.customElements.define(
    "custom-navbar", class extends HTMLElement {
        constructor() {
            super();

            const root = this.attachShadow({ mode: 'open' });
            root.innerHTML = `
            <style>
                nav { 
                    background-color: #dc3545;
                    color: #fff;
                    border: 1px solid #dc3545;
                    font-weight: bold;
                }
                 
                nav a {
                    text-decoration: none;
                    color: white;
                }
                
                nav ul {
                    padding: 0;
                }
                
                .nav-menu {
                    padding: 0 1rem;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    list-style-type: none;
                }

                .return {
                    
                }
            </style>
            <nav> 
                <ul class="nav-menu">
                    <li>
                        <a class="return" href="index.html">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                        </svg>
                        </a>
                    </li>
                    <li><a class="nav-title" href="#">Phillip Morris</a></li>
                </ul>
            </nav>            
            `;
        }
    }
);