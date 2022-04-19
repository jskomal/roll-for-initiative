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

  it('should render a welcome message', () => {
    cy.visit('http://localhost:3000/')
      .get('.main-title')
      .contains('hail and well met, traveler...')
      .get('.enter-button')
      .contains('roll for initiative')
      .click()
      .url()
      .should('eq', 'http://localhost:3000/character-select')
      .get('.choose-text')
      .contains('Choose your champion!')
  })

  it('should have 3 champions to choose from', () => {
    cy.get('.character-container')
      .children()
      .should('have.length', 3)
  })

  it('Fighter card should show more details on the back', () => { 
    cy.get('.Ragnar')
      .contains('Fighter')
      .click()
      .get('h3')
      .contains('Hit Points: 28')
      .get('button')
      .contains('Select This Champion')
      .click()
      .url()
      .should('eq', 'http://localhost:3000/battle-ground')
  })

  it('Cleric card should show more details on the back', () => {
    cy.visit('http://localhost:3000/character-select')
      .get('.Zinyrae')
      .contains('Cleric')
      .click()
      .get('h3')
      .contains('Hit Points: 24')
      .get('button')
      .contains('Select This Champion')
      .click()
      .url()
      .should('eq', 'http://localhost:3000/battle-ground')
  })

  it('Rogue card should show more details on the back', () => {
    cy.visit('http://localhost:3000/character-select')
      .get('.Vaara')
      .contains('Rogue')
      .click()
      .get('h3')
      .contains('Hit Points: 18')
      .get('button')
      .contains('Select This Champion')
      .click()
      .url()
      .should('eq', 'http://localhost:3000/battle-ground')
  })
})
