import { html } from '../../node_modules/lit-html/lit-html.js';
import { getById, deleteFruit } from '../data/fruits.js';
import { getUserData } from '../util.js';


const detailsTemplate = (fruit, onDelete) => html`
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src=${fruit.imageUrl} alt="example1" />
            <p id="details-title">${fruit.name}</p>
            <div id="info-wrapper">
                <div id="details-description">
                    <p>${fruit.description}</p>
                        <p id="nutrition">Nutrition</p>
                    <p id = "details-nutrition">${fruit.nutrition}</p>
                </div>
                ${fruit.canChange ? html`
                    <div id="action-buttons">
                        <a href="/edit/${fruit._id}" id="edit-btn">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
                    </div>`
                    : null
                }
            </div>
        </div>
    </section>
`;

export async function detailsPage(ctx) {
  const id = ctx.params.id;

  const requests = [
    getById(id),

  ];

const userData = getUserData();

const [fruit] = await Promise.all(requests);

if(userData) {
  fruit.canChange = userData._id == fruit._ownerId;
}

  ctx.render(detailsTemplate(fruit, onDelete));

  async function onDelete() {
    const choice = confirm('Are you sure, that delete this fruit?');

    if (choice) {
      await deleteFruit(id);
      ctx.page.redirect('/catalog');
    }
  }
}