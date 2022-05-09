describe("test Sing-me-a-song", () => {
    it("shoul add new recommendations", () => {

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
        }) 
        
        cy.contains("Ocean Eyes - Billie Eilish");
        cy.contains("Bones - Imagine Dragons");
        cy.contains("Free Fall - Illenium");
        cy.contains("Graveto - Marilia Mendonça");
    })
})