import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import { getById, updateOffer } from '../data/offers.js';



const editTemplate = (offer, onEdit) => html`
  <section id="edit">
          <div class="form">
            <h2>Edit Offer</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input
                type="text"
                name="title"
                id="job-title"
                placeholder="Title"
                .value=${offer.title}
              />
              <input
                type="text"
                name="imageUrl"
                id="job-logo"
                placeholder="Company logo url"
                .value=${offer.imageUrl}
              />
              <input
                type="text"
                name="category"
                id="job-category"
                placeholder="Category"
                .value=${offer.category}
              />
              <textarea
                id="job-description"
                name="description"
                placeholder="Description"
                rows="4"
                cols="50"
                .value=${offer.description}
              ></textarea>
              <textarea
                id="job-requirements"
                name="requirements"
                placeholder="Requirements"
                rows="4"
                cols="50"
                .value=${offer.requirements}
              ></textarea>
              <input
                type="text"
                name="salary"
                id="job-salary"
                placeholder="Salary"
                .value=${offer.salary}
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
`;

export async function editPage(ctx) {

  const id = ctx.params.id;
  const offer = await getById(id);

     ctx.render(editTemplate(offer, createSubmitHandler(onEdit)));

     async function onEdit({
        title,
        imageUrl, 
        category, 
        description, 
        requirements, 
        salary
      } 
    ) {
        if ([
          title,
          imageUrl, 
          category, 
          description, 
          requirements, 
          salary].some(f => f == '')) {
            return alert('All fields are required'); 
          }

          await updateOffer(id, {
              title,
              imageUrl, 
              category, 
              description, 
              requirements, 
              salary
          });

          ctx.page.redirect('/catalog/' + id);
     }
}

