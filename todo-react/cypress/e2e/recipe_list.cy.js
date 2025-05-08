describe('TodoList / Recipe App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should render the recipe list title', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-testid="recipe-list-heading"]').should('exist');
  });

  it('should display recipe cards', () => {
    cy.get('[data-testid="recipe-card"]').should('have.length.at.least', 1);
  });

  it('should allow typing in input and adding a recipe', () => {
    cy.get('[data-testid="new-recipe-input"]').type('Test Recipe');
    cy.get('[data-testid="add-recipe-button"]').click({ multiple: true });
    //cy.get('[data-testid="recipe-card"]').should('contain.text', 'Test Recipe');
  });

  it('should delete a recipe card', () => {
    cy.get('[data-testid="recipe-card"]').first().within(() => {
      cy.contains('Delete').click();
    });
  });
});
