describe('Character Select tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://www.dnd5eapi.co/api/monsters/zombie', {
      response: 200,
      fixture: 'monster.json'
    })
    cy.intercept('GET', 'https://www.dnd5eapi.co/api/monsters/goblin', {
      response: 200,
      fixture: 'monster.json'
    })
    cy.intercept('GET', 'https://www.dnd5eapi.co/api/monsters/dire-wolf', {
      response: 200,
      fixture: 'monster.json'
    })
    cy.intercept('GET', 'https://www.dnd5eapi.co/api/monsters/ghoul', {
      response: 200,
      fixture: 'monster.json'
    })
    cy.intercept('GET', 'https://www.dnd5eapi.co/api/monsters/bugbear', {
      response: 200,
      fixture: 'monster.json'
    })
  })

  it('should render a player victory screen', () => {
    cy.visit('http://localhost:3000/player-end-game')
      .get('.winning-text')
      .contains('You defeated your foe!')
      .get('.winning-button')
      .click()
      .url()
      .should('eq', 'http://localhost:3000/character-select')
  })

  it('should render a monster victory screen', () => {
    cy.visit('http://localhost:3000/monster-end-game')
      .get('.losing-text')
      .contains('You have fallen...')
      .get('.losing-button')
      .click()
      .url()
      .should('eq', 'http://localhost:3000/character-select')
  })
})
