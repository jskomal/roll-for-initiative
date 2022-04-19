describe('Main view Tests', () => {
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
  })

  it('should be able to click roll for initiative', () => {
    cy.get('.enter-button')
      .contains('roll for initiative')
      .click()
      .url()
      .should('eq', 'http://localhost:3000/character-select')
      .get('.choose-text')
      .contains('Choose your champion!')
  })

  it('should be able to get instructions on how to play', () => {
    cy.visit('http://localhost:3000/')
      .get('.howToPlay-button')
      .contains('how to play')
      .click()
      .get('.howToPlay-title')
      .contains('Welcome to Roll for Initiative!')
  })

  it('should be able to go from instructions to choose your champion', () => {
    cy.get('.proceed-to-characters-button')
      .contains('choose your champion')
      .click()
      .get('.choose-text')
      .contains('Choose your champion!')
  })

  it('should be able to see game credits', () => {
    cy.visit('http://localhost:3000/')
      .get('#credits')
      .contains('credits')
      .click()
      .get('.howToPlay-title')
      .contains('Credits')
  })

  it('should be able to go from credits back to home', () => {
    cy.get('.howToPlay-title')
      .contains('Credits')
      .get('button')
      .contains('Home')
      .click()
      .get('.main-title')
      .contains('hail and well met, traveler...')
      .get('.enter-button')
      .contains('roll for initiative')
    
  })
})
