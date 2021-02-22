describe("Test for Sprint Challenge", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/")
  });
  it("test can add text and select checkboxes and submit", function () {
    cy 
      .get('button[name="order"]')
      .click()
    cy
      .get('[data-cy="name"]')
      .type("Danielle")
      .should("have.value", "Danielle");
    cy
      .get('select[name="size"]')
      .select('Medium')
      .should("have.value", "Medium")

    cy
      .get('[type="checkbox"]')
      .check()
      .should("be.checked");
    cy
      .get("form").submit();
  });

});