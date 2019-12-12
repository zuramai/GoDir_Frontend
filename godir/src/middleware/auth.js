export default function auth({next, router}) {
    if(!localStorage.getItem('godir_user')) {
        return router.push({name: 'login'});
    }

    return next();
}