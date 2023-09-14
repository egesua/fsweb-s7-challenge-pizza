describe("Metin Girişi Testi", () => {
    it("Bir metin alanına metin girmeli", () => {
      cy.visit("http://localhost:3000/pizza");
  
      cy.get("#special-text").type("Ekstra peynir lütfen!!!");
  
      cy.get("#special-text").should("have.value", "Ekstra peynir lütfen!!!");
    });
  });
  

  describe("Malzeme Seçimi Testi", () => {
    it("Birden fazla malzeme seçilmeli", () => {
      cy.visit("http://localhost:3000/pizza");
  
      cy.get("input[type='checkbox']").check(["Pepperoni", "Sosis", "Domates", "Soğan"]);
  
      cy.get("input[type='checkbox']")
        .filter(":checked")
        .should("have.length", 4); 
  });
  
  

  describe("Form Gönderme Testi", () => {
    it("Form gönderilmeli", () => {
      cy.visit("http://localhost:3000/pizza");
  
      cy.get("#order-button").click();
  
      cy.url().should("not.include", "/success");
  
      cy.contains("Toplam");
    });
  });
  })