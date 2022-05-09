describe("test Sing-me-a-song", () => {

    it("should add new recommendations", () => {

        cy.request("POST", "http://localhost:5000/recommendations/e2e/truncate", {})

        const recommendations = [{
            name: 'Ocean Eyes - Billie Eilish',
            youtubeLink: 'https://www.youtube.com/watch?v=viimfQi_pUw'
        },
        {
            name: 'Bones - Imagine Dragons',
            youtubeLink: 'https://www.youtube.com/watch?v=TO-_3tck2tg'
        },
        {
            name: 'Free Fall - Illenium',
            youtubeLink: 'https://www.youtube.com/watch?v=DfLqy83UHk8'
        },
        {
            name: 'Graveto - Marilia Mendonça',
            youtubeLink: 'https://www.youtube.com/watch?v=CKtHg1jBREY'
        },
    ]

        cy.visit("http://localhost:3000") 

        cy.intercept("POST", "http://localhost:5000/recommendations").as("addRecommendation");

        recommendations.forEach(recommendation => {
            cy.get("input[placeholder=Name]").type(recommendation.name);
            cy.get("#link").type(recommendation.youtubeLink);
            cy.get("#button").click();
            cy.wait("@addRecommendation")

            cy.contains(recommendation.name); 
        }) 
    })

    it("should increase and deacrease scores", () => {

        for(let i = 0; i < 9; i++){
            cy.get('#recommendations').find('>div').filter(':contains("Free Fall - Illenium")').find('#up').click();
        }

        for(let i = 0; i < 6; i++){
            cy.get('#recommendations').find('>div').filter(':contains("Bones - Imagine Dragons")').find('#down').click();
        }

        for(let i = 0; i < 4; i++){
            cy.get('#recommendations').find('>div').filter(':contains("Graveto - Marilia Mendonça")').find('#up').click();
        }

        cy.contains('Graveto - Marilia Mendonça');
        cy.contains('Free Fall - Illenium');
        cy.contains('Bones - Imagine Dragons').should('not.exist');
        
    })

    it("should return the recommendation with the higher score first", () => {

        cy.contains('Top').click();
        cy.url().should("equal", "http://localhost:3000/top");
        
        cy.get('#recommendation').contains("Free Fall - Illenium"); 
 
    })

    it("should return an aleatory recommendation", () => {

        cy.contains('Random').click();
        cy.url().should("equal", "http://localhost:3000/random");
        
        cy.get('#recommendation').contains(/Free Fall - Illenium|Graveto - Marilia Mendonça|Ocean Eyes - Billie Eilish/g);
 
    })
})