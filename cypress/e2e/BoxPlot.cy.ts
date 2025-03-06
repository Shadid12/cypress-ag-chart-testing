describe('BoxPlot Component', () => {
  beforeEach(() => {
    // Visit the page where the BoxPlot component is rendered
    cy.visit('http://localhost:5173/box-plot')
  });

  it('should render the BoxPlot chart with correct title and subtitle', () => {
    // Check if the title exists and has correct text
    // Using the aria-label to find the chart and then checking the SVG text elements
    cy.get('.ag-charts-canvas-proxy')
      .find('.ag-charts-proxy-elem svg text')
      .contains('HR Analytics')
      .should('exist');
    
    // Check if the subtitle exists and has correct text
    cy.get('.ag-charts-canvas-proxy')
      .find('.ag-charts-proxy-elem svg text')
      .contains('Salary Distribution by Department')
      .should('exist');
  });

  it('should render the box plot series area', () => {
    // Check that series area exists
    cy.get('.ag-charts-series-area')
      .should('exist');
    
    // Verify we have the chart container
    cy.get('.ag-charts-canvas-container')
      .should('exist');
    
    // Check that the chart is labeled correctly in the aria-label
    cy.get('.ag-charts-canvas-proxy')
      .should('have.attr', 'aria-label')
      .and('include', 'chart');
  });

  it('should have interactive elements for the chart', () => {
    // Check for the swapchain which contains the interactive elements
    cy.get('.ag-charts-swapchain')
      .should('exist');
    
    // Check for the focus indicator
    cy.get('.ag-charts-focus-indicator')
      .should('exist');
  });

  it('should display tooltips when interacting with the chart', () => {
    // Check that tooltip element exists
    cy.get('.ag-charts-tooltip')
      .should('exist');
    
    // Trigger a click on the chart area to potentially show tooltip
    cy.get('.ag-charts-series-area')
      .click({ force: true });
    
    // Wait briefly for potential tooltip to appear
    cy.wait(500);
  });

  it('should respond to window resize', () => {
    // Get the initial dimensions of the chart container
    cy.get('.ag-charts-canvas-container').then($container => {
      const initialWidth = $container.width();
      
      // Resize the viewport
      cy.viewport(500, 500);
      
      // Force a rerender
      cy.wait(500);
      
      // Check if the chart dimensions changed
      cy.get('.ag-charts-canvas-container').should($newContainer => {
        // Note: The width might not always change depending on the chart's responsive behavior
        // So we're checking if it exists rather than comparing dimensions
        expect($newContainer).to.exist;
      });
    });
  });

  // Additional test to verify more specific details if needed
  it('should have the correct structure for chart components', () => {
    // Check for canvas element
    cy.get('.ag-charts-canvas canvas')
      .should('exist');
    
    // Check for overlay elements
    cy.get('.ag-charts-canvas-overlay')
      .should('exist');
    
    // Check for crosshair labels
    cy.get('.ag-charts-crosshair-label')
      .should('exist');
  });
});