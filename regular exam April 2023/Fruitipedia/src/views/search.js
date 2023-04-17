import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { get } from "../data/api.js";
import { getUserData } from "../util.js";

const searchTemplate = (onSearch) => html`
    <section id="search">
        <div class="form">
            <h2>Search</h2>
            <form class="search-form" @submit=${onSearch}>
                <input type="text" name="search" id="search-input"/>
                <button class="button-list">Search</button>
            </form>
        </div>
        <h4>Results:</h4>
        <div class="search-result">
        </div>
    </section>
`;

export async function searchPage(ctx) {
    ctx.render(searchTemplate(onSearch))

    async function onSearch(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const searchString = Object.fromEntries(formData.entries())
        const data = await get(`/data/fruits?where=name%20LIKE%20%22${searchString.search}%22`);
        // /data/fruits?where=name%20LIKE%20%22${query}%22

        form.reset();
        showResult(data)
    }

    function showResult(result) {
        const searchContainer = document.querySelector('.search-result');
        const userData = getUserData();
        const resultTemplate = () => html`
            <div class="fruit">
                ${result.map(x => html`
                    <img src=${x.imageUrl} alt="example1" />
                    <h3 class="title">${x.name}</h3>
                    <p class="description">${x.description}</p>
                    <a class="details-btn" href="/details/${x._id}">More Info</a>
                `)}
            </div>
        `;
        const emptyResult = () => html`
            <p class="no-result">No result.</p>
        `;
        if (result.length > 0) {

            render(resultTemplate(result), searchContainer)
        } else {
            render(emptyResult(), searchContainer)
        }
    }
}