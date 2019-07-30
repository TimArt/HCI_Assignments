# Modifications After User Tests
- My bot would not always grab parameters on the first try of cooking so I learned how to add parameters into training phrases. 
- One user requested a sandwich so I added this option.
- One user asked "Is cooking done?" which triggered the cooking intent, so I added this phrase to the cooking time intent.
- It was not recognizing when "soda" was said even though it was listed in the Entities, but it needed to also be a synonym label.
- Sometimes users would ask about their food and the bot would respond with literal variable labels "$Dish" and "$Drink". To fix this I attempted adding these intents as "follow-up" intents to keep the variables preserved but this did not work. Finally I had to make sure that the output and input contexts matched and that I used the pound context syntax: "#cooking.Drink" or "#cooking.Dish".
- I added further user phrasing to catch for the prepare food/drink intent since some users used phrases I had not thought of.
- I added more items to the dishes list.
