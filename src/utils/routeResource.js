module.exports = (resourceName, controllerName, app, apiOnly = true) => {
    const resources = apiOnly ? ['index', 'store', 'show', 'update', 'destroy'] : ['index', 'create', 'store', 'show', 'edit', 'update', 'destroy'] 
    
    resources.forEach(element => {
        console.log(controllerName.element)
    });
    
    /* return app.get(`/${resourceName}`, controllerName.index); */
}
