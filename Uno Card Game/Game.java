import java.util.*;
//The actual uno game that the player and computer plays. 
public class Game
{
    private Deck deck;
    private Hand player;
    private Hand computer;
    private Card currentCard;
    
    //the game method that contains the player and computer's turn. On a while loop until someone wins.
    public void unoGame()
    {
        System.out.println("Let's play UNO!");
        System.out.println("Type this card format: ex. \"2blue, plustwored\" No Spaces. ");
        deck = new Deck();
        deck.shuffle(); 
        player = new Hand();
        computer = new Hand();
        currentCard = deck.deal();
        /* loops between the player and computer's turn.
         * contains multiple methods for both the player and computer's turn
         * because of how skipping someone's turn messes up the order of both turns.
         */
        while(true)
        {
                
            
                System.out.println("-------------------------------------------");
                System.out.println("Current Card: " + currentCard);
                System.out.println("Here are your cards " + "(" + player.sizeOfHand() + " cards)" + ": ");
                player.printHand();
                if(!currentCard.faceString().equals("skip"))
                {
                    //returns the card the player chooses and puts down.
                    currentCard = playersTurn(currentCard);
                }
                //if the computer chooses to skip the player's turn
                else
                {
                    System.out.println("Skipped Player's Turn");
                    currentCard = computersTurn(currentCard);
                    if(currentCard.faceString().equals("skip"))
                    {
                        System.out.println("Skipped Player's turn");
                        currentCard = computersTurn(currentCard);
                    }
                    //break out if computer wins
                    if(currentCard == null)
                    {
                        break;
                    }
                    System.out.println("Current Card: " + currentCard);
                    currentCard = playersTurn(currentCard);
                }
                // breaks out of the game if the player/computer wins the game.
                if(currentCard == null)
                {
                    break;
                }
                
                if(!currentCard.faceString().equals("skip"))
                {
                    
                    currentCard = computersTurn(currentCard);
                }
                //if the player decides to skip the player's turn.
                else
                {
                    
                    System.out.println("Skipped Computer's Turn");
                    System.out.println("Here are your cards " + "(" + player.sizeOfHand() + " cards)" + ": ");
                    player.printHand();
                    currentCard = playersTurn(currentCard);
                    if(currentCard.faceString().equals("skip"))
                    {
                        System.out.println("Skipped Computer's turn");
                        currentCard = playersTurn(currentCard);
                    }
                    //break out if player wins
                    if(currentCard == null)
                    {
                        break;
                    }
                    currentCard = computersTurn(currentCard);
                }
                 if(currentCard == null)
                 {
                    break;
                 }
        }
    }
    
    /**
     *player's turn in UNO
     *@param the card that was just put down
      @return the card the player put down
     */
    public Card playersTurn(Card currentCard)
    {
        for(int x = 0; x < player.getHand().size(); x++)
        {
            /* checks to see if there is a possible card the player can put down based on the current card there is.
             * if there is a card available, asks the player to choose the card to put down.
             */
            if(currentCard.colourString().equals(player.getHand().get(x).colourString()) || currentCard.faceString().equals(player.getHand().get(x).faceString()) || player.getHand().get(x).faceString().equals("wild") || player.getHand().get(x).faceString().equals("wild4"))
            {
                System.out.println("What card do you want to put down? If uno, type uno at the end. No Spaces ");
                Scanner console = new Scanner(System.in);
                String card1 = console.next();
                String card = card1.toLowerCase();
                String numbers = "0123456789";
                String skip = "skip";
                //checks to see if the format the player typed the card is correct.
                if(!(card.length() <= 1) && (currentCard.colourString().equals(card.substring(1)) || (card.contains("uno") && player.getHand().size() == 1) || currentCard.faceString().equals(card.substring(0,1)) || card.equals("wild") || card.equals("wild4") || (card.contains(skip) && currentCard.colourString().equals(card.substring(4))) || (currentCard.faceString().contains("skip") && card.contains("skip")) || (card.contains("plustwo") && currentCard.colourString().equals(card.substring(7)) || (currentCard.faceString().contains("plustwo") && card.contains("plustwo"))))) 
                { 
                    //checks to see if the player typed in uno and only has one card in their hand.
                    //if yes, then the card returned will be null instead and it will break out of the game.
                    if(card.contains("uno") && player.getHand().size() == 1)
                    {
                        player.getHand().remove(0);
                        System.out.println("UNO! Player Wins!");
                        return null;
                        
                    }
                    //checks if the player decides to play a wild, wild plus 4, or a plus two card (special cards).
                    if(numbers.indexOf(card.substring(0,1)) == -1 && !card.contains(skip))
                    {
                        return checkSpecialCardPlayer(currentCard, card);
                    }
                    /* finds the card the player chooses to put down in their hand and removes it from their hand.
                     * Will also return the card the player put down so the computer knows
                     * what card to put down next.
                     */
                    for(int i = 0; i < player.getHand().size(); i++)
                    {
                        String newCard = player.getHand().get(i).faceString().toLowerCase();
                        String newCard2Colour = player.getHand().get(i).colourString().toLowerCase();
                        
                        if((card.substring(0, 1).equals(newCard) && card.substring(1).equals(newCard2Colour)) || (newCard.contains(skip) && card.substring(4).equals(newCard2Colour)))
                        {
                            Card remove = player.getHand().remove(i);
                            currentCard = remove;
                            System.out.println("Current Card: " + remove);
                            return currentCard;
                        }
                    }
                }
                //Will switch to the computer's turn if what the player entered is improper format or not a card.
                else
                {
                    System.out.println("Invalid card. Computer's Turn");
                    return currentCard;
                }
            }
        }
        /* if theres no possible card the player can put down based on the current card,
         * it will add a card to the player's hand and the computer will go.
         */
         player.getHand().add(deck.deal());
         System.out.println("No card available. Added one card. Computer's turn");
       
        return currentCard;
    }
   /**
    *computer's turn in the UNO game. 
    *@param the card that was just put down
    *@return the card the computer put down
    */
   public Card computersTurn(Card currentCard)
   {
        for(int j = 0; j < computer.getHand().size(); j++)
        {
            //finds a card in the computer's hand that can be put down based on the rules of UNO.
            if(currentCard.colourString().equals(computer.getHand().get(j).colourString()) || currentCard.faceString().equals(computer.getHand().get(j).faceString()) || computer.getHand().get(j).faceString().equals("wild") || computer.getHand().get(j).faceString().equals("wild4"))
            {
                //if the computer has one card left, it will be removed and computer automatically wins.
                if(computer.getHand().size() == 1)
                {
                     computer.getHand().remove(0);
                     System.out.println("Computer called UNO! Computer wins!");
                     return null;
                }
                //removes the card from the hand. 
                Card remove2 = computer.getHand().remove(j);
                currentCard = remove2;
                //checks to see if the card removed is a special card or not.
                if(remove2.faceString().equals("wild") || remove2.faceString().equals("plustwo") || remove2.faceString().equals("wild4"))
                {
                    return checkSpecialCardComputer(currentCard, remove2);
                }
                System.out.println("Computer puts down one card. Computer has " + computer.sizeOfHand() + " card(s)");
                return currentCard;
                
            }
        }
            //Will reach these lines of code if no available card can be put down.
             computer.getHand().add(deck.deal());
             System.out.println("No card available. Added one card to Computer. Player's turn");
           
            return currentCard; 
       }
    
    /**
     *Contains code of what happens if the player chooses a wild, a wild plus 4 , or a plus two card
     *@param the current card that was put down, 
     *@param and the card the player typed in
     *@return the card the player put down
     */
    public Card checkSpecialCardPlayer(Card currentCard, String card)
    {
        if(card.substring(0).equals("wild") || card.substring(0).equals("wild4"))
        {
            for(int i = 0; i < player.getHand().size(); i++)
            {
                String newWildCard = player.getHand().get(i).faceString().toLowerCase();
                
                if(card.substring(0).equals(newWildCard))
                {
                    Card remove3 = player.getHand().remove(i);
                    currentCard = remove3;
                    //asks the player to choose a colour
                    System.out.println("Change to what colour? ");
                    Scanner console = new Scanner(System.in);
                    String colour1 = console.next();
                    String colour = colour1.toLowerCase();
                    //check if player enters a wild plus 4 card.
                    if(card.substring(card.length() -1, card.length()).equals("4"))
                    {
                        //adds 4 cards to the opponent's hand.
                        for(int k = 0; k < 4; k++)
                        {
                            computer.getHand().add(deck.deal());
                        }
                        System.out.println("Added 4 cards to the computer's hand");
                    }
                    //chooses a card from the deck that matches the colour the player chooses then returns it as the current card.
                    for(int y = 0; y < deck.getDeck().size(); y++)
                    {
                        if(deck.getDeck().get(y).colourString().equals(colour))
                        {
                            Card deal = deck.getDeck().remove(y);
                            currentCard = deal;
                            System.out.println("Current Card: " + currentCard);
                            return currentCard;
                        }
                    }
                }
            }        
        }
       
       if(card.substring(0, 7).equals("plustwo"))
       {
           //finds the card from the player's hand that matches with what the player typed
         for(int i = 0; i < player.getHand().size(); i++)
        {
            String newPlus2Card = player.getHand().get(i).faceString().toLowerCase();
            
            if(card.substring(0, 7).equals(newPlus2Card))
            {
                //removes card from the hand.
                Card remove4 = player.getHand().remove(i);
                currentCard = remove4;
                //adds two cards to the computer.
                System.out.println("Added two Cards to Computer");
                computer.getHand().add(deck.deal());
                computer.getHand().add(deck.deal());
                return currentCard;
            }
        }       
       }
       return currentCard;
    }
    
    /**
     * codes what happens with the wild, wild plus 4, or the plus two card when the computer picks the card.
     * Method is different from the player. Does not contain a Scanner object.
     * @param the current card that was put down, 
     * @param and the special card the computer removed from their hand
     * @return the card the computer down
     */
     public Card checkSpecialCardComputer(Card currentCard, Card remove2)
    {
        if(remove2.faceString().equals("wild") || remove2.faceString().equals("wild4"))
        {
            String[] arr = remove2.getColours();
            //Randomly chooses a colour for the computer when it picks and wild or a wild plus four card.
            int ranNum = new Random().nextInt(arr.length);
            String ranColour = arr[ranNum];
            System.out.println("Computer changed colour to " + ranColour + ". Computer has " + computer.getHand().size() + " cards");
            if(remove2.faceString().substring(remove2.faceString().length() -1, remove2.faceString().length()).equals("4"))
            {
                //adds four cards to the player's hand.
                for(int k = 0; k < 4; k++)
                {
                    player.getHand().add(deck.deal());
                }
                System.out.println("Added 4 cards to the player's hand");
            }
            //returns a card that matches with the colour the "computer" picked
            for(int y = 0; y < deck.getDeck().size(); y++)
            {
                if(deck.getDeck().get(y).colourString().equals(ranColour))
                {
                    Card deal = deck.getDeck().remove(y);
                    currentCard = deal;
                    System.out.println("Current Card: " + currentCard);
                    return currentCard;
                }
            }
        }
       //the code if computer puts down the plus two card.
       if(remove2.faceString().equals("plustwo"))
       {
            //removes the card from the computer's hand.
            System.out.println("Computer's Turn. Added two Cards to the Player");
            //add two cards to the player's hand. 
            player.getHand().add(deck.deal());
            player.getHand().add(deck.deal());
            return currentCard;
       }
       return currentCard;
    }
}
