import { STORAGE_KEY, STORAGE_PATH } from './main';
import { Preferences } from '@capacitor/preferences';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

window.customElements.define(
    "show-photos", class extends HTMLElement {
        constructor() {
            super();
            const root = this.attachShadow({ mode: 'open' });
            root.innerHTML = `            
            <style>
                .table-responsive {
                    overflow: auto;
                    max-height: 50vh;
                    border-radius: 5px;
                }

                .table {
                    margin-top: .5rem;
                    border-collapse: collapse;
                    width: 100%;
                    border-radius: 5px;
                }

                td, th {
                    border: 1px solid #ddd;
                    padding: 8px;
                }

                tr:hover {
                    background-color: #ddd;
                }

                th {
                    text-align: center;
                    background-color: #0d6efd;
                    color: white;
                }

                .btn-delete {
                    background-color: #dc3545; 
                    border-color: #dc3545;
                    color: white;
                }
            </style>

            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th>Descripci&oacute;n</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="table-content">
                    </tbody>
                </table>
            </div>
            `; 
        }

        async connectedCallback() { 
            const self = this;            
            const bodyElem = document.querySelector("body");
            this.refreshList();
            
            bodyElem.addEventListener("reload-list", () =>{
                this.deleteList();
                this.refreshList();
            });
        }

        async refreshList(){
            const self = this;            
            let tableElem = self.shadowRoot.getElementById('table-content');

            let photos = [];
            const { value } = await Preferences.get({ key: STORAGE_KEY });
            if (value){
                const { data } = await Filesystem.readFile({
                    path: STORAGE_PATH,
                    directory: Directory.Documents,
                    encoding: Encoding.UTF8,
                });            
                photos = JSON.parse(data);
            }
            
            // INSERT HTML
            photos.forEach((item) => {
                tableElem.innerHTML +=
                `
                <tr>
                    <td>
                        <img src="${ item.photo }" height="30"/>
                    </td>
                    <td>
                        <textarea rows="2" cols="28" disabled>${ item.desc}</textarea>
                    </td>
                    <td style="text-align: center;">
                        <button id="1" class="btn-delete">X</button>
                    </td>
                </tr>
                `
            });
            tableElem.innerHTML += '</table></div>';
        }

        deleteList(){
            const self = this;            
            let tableElem = self.shadowRoot.getElementById('table-content');
            tableElem.innerHTML = "";
        }
    });