describe('Main view Tests', () => {
  it('should render a welcome message', () => {
    cy.visit('http://localhost:3000/')
      .get('.main-title')
      .contains('hail and well met, traveler...')
      .get('.enter-button')
      .contains('roll for initiative')
  })
})
