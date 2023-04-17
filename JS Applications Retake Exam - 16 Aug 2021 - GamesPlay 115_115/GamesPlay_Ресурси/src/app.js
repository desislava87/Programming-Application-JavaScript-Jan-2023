import page from '../node_modules/page/page.mjs';

import { addSession } from './middlewares/session.js';
import { addRender } from './middlewares/render.js';

import { logout } from './api/user.js';

import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';


// for test
//in console F12
// 1 - await api.getRecent() - get array
// 2 - localStorage - empty
// 2 - await api.login('peter@abv.bg', '123') - wrong password, in Network details
// 2 - await api.login('peter@abv.bg', '123456') - details
// 2 - localStorage - not empty
// 3 - logout and localStorage empty
// 4 - await api.register('haily@abv.bg', '123')
// 5 - create games in browser
// 5 - await api.create(
//     {
//       title: 'My Game',
//       category: 'Action,
//       maxLevel: '100,
//       imageUrl: 'hdhdh,
//       summary: 'Some description'
//     }
//     )

// 1
// import * as api from './api/games.js';
//2
// import * as api from './api/user.js';
//3
import * as api from './api/comments.js';

window.api = api;

page(addSession);
page(addRender);

page('/', homePage);
page('/catalog', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/logout', onLogout);

page.start();

function onLogout(ctx) {
    logout();
    ctx.page.redirect('/');
}