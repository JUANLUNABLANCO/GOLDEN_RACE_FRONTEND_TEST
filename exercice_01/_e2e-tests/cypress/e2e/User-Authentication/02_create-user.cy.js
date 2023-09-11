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
          name: "test",
          email: "test@gmail.com",
          password:"test12345678",
          role: 'admin'
      }
    }).then((resp)=> {
      expect(resp.status).to.eq(201)  // recurso creado
      expect(resp.body).to.have.property('name', 'test')
      expect(resp.body).to.have.property('email', 'test@gmail.com')
      expect(resp.body).to.have.property('role', 'user')
      expect(resp.body).to.have.property('id')
      // console.log('## DATA: ', resp.body)
    });
  });
});
