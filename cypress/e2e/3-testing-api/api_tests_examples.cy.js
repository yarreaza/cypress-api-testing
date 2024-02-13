context('Pruebas API con Cypress', ()=> {
   
    beforeEach(() => {
        cy.visit('/')
    })  
   
    describe('Método GET', ()=> {            
        it('TC-1. El enpoint "posts" responde con status 200', ()=> {
            cy.request({
                url: '/posts'
            }).then((respuesta) => {
                expect(respuesta.status).to.equal(200)
            })  
        })    
        it('TC-2. Validar la cantidad de post dentro del enpoint', ()=> {
            cy.request('/posts').its('body').should('have.length',100)
         })
         it('TC-3. Validar que existe un título en concreto en un elemento concreto del enpoint', ()=> {
            cy.visit('/')
            cy.request('/posts').its('body').should('have.length', 100).then((titulo)=> {
                expect(titulo[2]).to.have.property('title', 'ea molestias quasi exercitationem repellat qui ipsa sit aut')
            })
        })  
    });

    describe('Método POST', ()=> {
         it('TC-1. Validar que exista un tiúlo concreto en cualquier posición del enpoint', () => {
            cy.request('/posts').its('body').should('have.length', 100).then((posts) => {
                const expectedTitle = 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit';
                const titleExists = posts.some((post) => post.title === expectedTitle);
                expect(titleExists, `No se encontró el título "${expectedTitle}" en ninguno de los elementos`).to.be.true;
            });
        });
         it('TC-2. Validar que el POST request funciona correctamente para el enpoint', ()=> {
            cy.request('POST', '/posts', {
                userIde: 100,
                id: 1,
                title: 'Películas de Terror',
                body: 'Acá va la descripción, más detalles, etc'
            }).then((respuesta) => {
                expect(respuesta.body).to.have.property('title', 'Películas de Terror')
            })
         })
    })

    describe('Método PUT', ()=> {
         it('TC-1. Verificar que el método PUT funciona correctamente en el enpoint', ()=> {
            cy.request('PUT', '/posts/1', {
                userId: 100,
                id: 1,
                title: 'Películas de Terror',
                body: 'Acá va la descripción, más detalles, etc'
            }).then((respuesta)=> {
                    expect(respuesta.body).to.have.property('title', 'Películas de Terror');
                })
        })
    })

    describe('Método DELETE', ()=> {
        it('TC-1. Verificar que el método DELETE funciona correctamente en el enpoint', ()=>{
            cy.request('DELETE', '/posts/1')        
        })  
    })

/*     describe('Simular una solicitud GET', ()=> {      
         it('TC-1. Simula una solicitud GET a (posts con Stub', ()=>{
            const samplePosts = [
                {
                    userId: 110,
                    id: 10,
                    title: 'Películas de Terror Yelitza',
                    body: 'Ejemplo post 1'
                },
                {
                    userId: 111,
                    id: 11,
                    title: 'Películas de Terror Arreaza',
                    body: 'ejemplo post 2'
                }
            ];
            cy.intercept('GET', '/posts', samplePosts ).as('getPosts')
            cy.visit('/');
            cy.get('tbody > :nth-child(1) > :nth-child(2) > a').click();
            //cy.wait('@getPosts');
         })     
    }) */

    describe('API Plugin Test', ()=> {       
        it('TC-1. Usando cy.api() que se puede usar instalando la dependencia Cypress Plugin API (cypress-plugin-api) y que nos muestra una interfaz con detalles de lo que se envía o recibe', ()=>{
            cy.api('GET', 'https://jsonplaceholder.cypress.io/comments', {
                postId: 1,
                id: 1,
                name: "id labore ex et quam laborum",
                email: "Eliseo@gardner.biz",
                body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
  
        })
    })
});



         
    
        


         
    
        