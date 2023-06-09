import { html } from '../../node_modules/lit-html/lit-html.js';
import { getById, deleteBook } from '../data/books.js';
import { getUserData } from '../util.js';
import { get, post } from '../data/api.js';


const bookTemplate = (book, onDelete, data, userData, likes, likeAction, currentBookLike) => html`

    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${book.title}</h3>
            <p class="type">Type: ${book.type}</p>
            <p class="img"><img src=${book.imageUrl}></p>
            <div class="actions">
                ${userData? 
                    html `
                        ${userData._id === data._ownerId ?
                        html `
                            <a class="button" href="/edit/${data._id}">Edit</a>
                            <a class="button" href="javascript:void(0)" @click=${onDelete}>Delete</a>`
                        : html `
                            ${currentBookLike === 0 ? html`<a class="button" href="javascript:void(0)" @click=${likeAction}>Like</a>`:null}`
                            
                        }
                    `
                    : null}
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${likes}</span>
                </div>
            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${book.description}</p>
        </div>
    </section>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const book = await getById(id);
    const userData = getUserData();
    const data = await get('/data/books/' + id);
    const likes = await get(`/data/likes?where=bookId%3D%22${id}%22&distinct=_ownerId&count`);
    let currentBookLike = 1
    if(userData){
        currentBookLike = await get(`/data/likes?where=bookId%3D%22${id}%22%20and%20_ownerId%3D%22${userData._id}%22&count`);
    }

    ctx.render(bookTemplate(book, onDelete, data, userData, likes, likeAction, currentBookLike));

    async function likeAction(){
        const bookId = id;
        const likeBook = await post('/data/likes', { bookId })
        ctx.page.redirect(`/details/${id}`);
    }

    async function onDelete() {
        const choice = confirm('Are you sure, that delete this book?');
    
        if (choice) {
          await deleteBook(id);
          ctx.page.redirect('/');
        }
      }
}