/* eslint-disable no-undef */
describe("render App", () => {
	it("shows nav title", () => {
		cy.visit("http://localhost:3000/")
		// cy.get("a").should("contain", "products")
		cy.contains("Register").click()
		cy.url().should("include", "/register")
		// cy.contains("Register")
	})
})