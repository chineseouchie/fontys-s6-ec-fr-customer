/* eslint-disable no-undef */

function randomEmail() {
	const chars = "abcdefghijklmnopqrstuvwxyz1234567890";
	let string = "";
	for(let i=0; i<10; i++){
		string += chars[Math.floor(Math.random() * chars.length)];
	}

	return string + "@example.com"
}

const email = randomEmail();

describe("Register", () => {
	it("register with a valid account", () => {
		cy.visit("http://localhost:3000/")
		// cy.get("a").should("contain", "products")
		cy.contains("Register").click()
		cy.url().should("include", "/register")

		cy.get("[name=\"firstname\"]")
			.clear()
			.type("cypress")
			.should("have.value", "cypress")

		cy.get("[name=\"lastname\"]")
			.clear()
			.type("cypress-test")
			.should("have.value", "cypress-test")

		cy.get("[name=\"street\"]")
			.clear()
			.type("cypress-street")
			.should("have.value", "cypress-street")

		cy.get("[name=\"city\"]")
			.clear()
			.type("cypress-city")
			.should("have.value", "cypress-city")

		cy.get("[name=\"province\"]")
			.clear()
			.type("cypress-province")
			.should("have.value", "cypress-province")

		cy.get("[name=\"country\"]")
			.clear()
			.type("china")
			.should("have.value", "china")
		
		cy.get("[name=\"email\"]")
			.clear()
      	.type(email)
      	.should("have.value", email)

		cy.get("[name=\"password\"]")
			.clear()
      	.type("SecretPassword1!")
      	.should("have.value", "SecretPassword1!")

	
		cy.get("[type=\"submit\"]").click()
		cy.location("pathname").should("eq", "/login")
	})

	it("Login with valid account", () => {
		cy.visit("http://localhost:3000/")
		// cy.get("a").should("contain", "products")
		cy.contains("Login").click()
		cy.url().should("include", "/login")

		cy.get("[name=\"email\"]")
			.clear()
			.type(email)
			.should("have.value", email)

		cy.get("[name=\"password\"]")
			.clear()
			.type("SecretPassword1!")
			.should("have.value", "SecretPassword1!")

		cy.get("[type=\"submit\"]").click()
		cy.location("pathname").should("eq", "/")
	})

})
