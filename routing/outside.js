const authMW = require('../middlewares/aut/authMW');
const checkPwMW = require('../middlewares/aut/checkPwMW');
const reverseAuthMW = require('../middlewares/aut/reverseAuthMW');
const logoutMW = require('../middlewares/aut/logoutMW');

const acceptPostMW = require('../middlewares/post/acceptPostMW');
const delPostMW = require('../middlewares/post/delPostMW');
const getHelpedMW = require('../middlewares/post/getHelpedMW');
const getNewsMW = require('../middlewares/post/getNewsMW');
const savePostMW = require('../middlewares/post/savePostMW');
const getUserPostMW = require('../middlewares/post/getUserPostMW');
const getOnePostMW = require('../middlewares/post/getOnePostMW');

const renderMW = require('../middlewares/render/renderMW');

const getUserMW = require('../middlewares/user/getUserMW');
const saveUserMW = require('../middlewares/user/saveUserMW');

const UserModel = require('../models/user');
const PostModel = require('../models/post');



module.exports = function (app) {
    const objectRepository = {
        UserModel: UserModel,
        PostModel: PostModel
    };

    /*
    * regiszrtációs oldal
    */
    app.use('/register',

        reverseAuthMW(objectRepository),
        saveUserMW(objectRepository),
        renderMW(objectRepository, 'register')
    );

    app.use('/logout',

        logoutMW(objectRepository),
        function(req, res, next){
            res.redirect('/');
          }
    );

    /*
    * felhasználási feltételek a regiszrációs oldalnál
    */
    app.get('/felhasznalasi',

        renderMW(objectRepository, 'felhasznalasi')
    );

    /*
     * főoldal, itt történik a bejelentkezés
    */
    app.get('/menu',

        authMW(objectRepository),
        getUserMW(objectRepository),
        renderMW(objectRepository, 'menu')
    );

    /*
    * kontakt fül
    */
    app.get('/contact',

        authMW(objectRepository),
        renderMW(objectRepository, 'kontakt')
    );

    /*
    * a user által elfogadott posztok
    */
    app.get('/helped',

        authMW(objectRepository),
        getUserMW(objectRepository),
        getHelpedMW(objectRepository),
        renderMW(objectRepository, 'helped')
    );

    /*
    * a felhasználó adhat itt meg új posztot
    */
    app.use('/profile/:userid/newpost',

        authMW(objectRepository),
        getUserMW(objectRepository),
        savePostMW(objectRepository),
        renderMW(objectRepository, 'newpost')
    );

    /*
    * a profil, a hozzátartozó adatokkal és posztokkal
    */
    app.get('/profile/:userid',

        authMW(objectRepository),
        getUserMW(objectRepository),
        getUserPostMW(objectRepository),
        renderMW(objectRepository, 'profil')
    );

    /*
    * itt menti a posztját a felhasználó szerkesztés után
    */
    app.use('/profile/:userid/edit/:postid',

        authMW(objectRepository),
        getUserMW(objectRepository),
        getUserPostMW(objectRepository),
        getOnePostMW(objectRepository),
        savePostMW(objectRepository),
        renderMW(objectRepository, 'newpost')
    );

    /*
    * a felhasználó itt törli az adott posztot
    */
    app.get('/profile/:userid/del/:postid',

        authMW(objectRepository),
        getUserMW(objectRepository),
        getOnePostMW(objectRepository),
        delPostMW(objectRepository),
        renderMW(objectRepository, 'profile/:userid')
    );

    /*
    * itt jelennek meg a nem elfogadott posztok más felhasználóktól
    */
    app.get('/posts',

        authMW(objectRepository),
        getUserMW(objectRepository),
        getNewsMW(objectRepository),
        renderMW(objectRepository, 'posts')
    );

    /*
    * a felhasználó itt fogadja el az adott posztot, visszairányít a "/posts"-ra
    */
    app.get('/posts/:postid',

        authMW(objectRepository),
        getUserMW(objectRepository),
        getOnePostMW(objectRepository),
        acceptPostMW(objectRepository)
    );

    /*
     * főoldal, itt történik a bejelentkezés
     */

    app.use('/',

        reverseAuthMW(objectRepository),
        checkPwMW(objectRepository),
        renderMW(objectRepository, 'index')
    );
};