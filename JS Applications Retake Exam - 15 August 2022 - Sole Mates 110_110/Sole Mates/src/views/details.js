import { html } from '../../node_modules/lit-html/lit-html.js';
import { getById, deleteShoes } from '../data/shoes.js';
import { getUserData } from '../util.js';


const detailsTemplate = (shoe, onDelete) => html`
    <section id="details">
        <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
            <img src=${shoe.imageUrl} alt="example1" />
            </div>
            <div id="info-wrapper">
            <p>Brand: <span id="details-brand">${shoe.brand}</span></p>
            <p>
                Model: <span id="details-model">${shoe.model}</span>
            </p>
            <p>Release date: <span id="details-release">${shoe.release}</span></p>
            <p>Designer: <span id="details-designer">${shoe.designer}</span></p>
            <p>Value: <span id="details-value">${shoe.value}</span></p>
        </div>

        <!--Edit and Delete are only for creator-->

            ${shoe.canChange ? html`
            <div id="action-buttons">
            <a href="/edit/${shoe._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
            </div>` : null}
        </div>
    </section>
`;

export async function detailsPage(ctx) {
  const id = ctx.params.id;

  const requests = [
    getById(id),

  ];

const userData = getUserData();

const [shoe] = await Promise.all(requests);

if(userData) {
  shoe.canChange = userData._id == shoe._ownerId;
}

  ctx.render(detailsTemplate(shoe, onDelete));

  async function onDelete() {
    const choice = confirm('Are you sure?');

    if (choice) {
      await deleteShoes(id);
      ctx.page.redirect('/catalog');
    }
  }
}