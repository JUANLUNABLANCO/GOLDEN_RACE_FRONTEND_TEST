/// <reference types="cypress" />

context('Create User', () => {
  it('endpoint:  send body {email, name and password} and receive a status code 200, and the same user with an id, whitout password', () => {
    cy.task("queryDb", "DELETE from user_entity").then(results => {
      cy.log(results)
    })
    cy.request({
      method:"POST",
      url: 'http://localhost:3000/api/users',
      form: false,
      body: {
          name: "test2",
          email: "TEST2@GMail.com",  // debe ser unico y lo convierte a minusculas
          password:"test12345678",
          role: 'admin'
      }
    }).then((resp)=> {
      expect(resp.status).to.eq(201)  // recurso creado
      expect(resp.body).to.have.property('name', 'test2')
      expect(resp.body).to.have.property('email', 'test2@gmail.com')
      expect(resp.body).to.have.property('role', 'user')  // 
      expect(resp.body).to.have.property('id')
      // console.log('## DATA: ', resp.body)
    });
  });
  it('endpoint:  send an existing email to the endpoint users/exists to test one user email is available', () => {
    cy.request({
      method:"POST",
      url: 'http://localhost:3000/api/users/exist',
      form: false,
      body: {
          email: "test2@gmail.com",
      }
    }).then((resp)=> {
      expect(resp.status).to.eq(201)  // recurso creado
      expect(resp.body).to.eq(true);
      // console.log('## DATA: ', resp.body)
    });
  });
  it('endpoint:  send a not existing email to the endpoint users/exists to test one user email is available', () => {
    cy.request({
      method:"POST",
      url: 'http://localhost:3000/api/users/exist',
      form: false,
      body: {
          email: "test2000000@gmail.com",
      }
    }).then((resp)=> {
      expect(resp.status).to.eq(201)  // recurso creado
      expect(resp.body).to.eq(false);
      // console.log('## DATA: ', resp.body)
    });
  });
});