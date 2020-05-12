import java.util.*;
//this class creates the 7 cards the player and computer will use to play the game.
public class Hand
{
    private ArrayList<Card> hand;
    private Deck deck = new Deck();
    
    //assemble the 7 cards in the form of an ArrayList of Cards
    public Hand()
    {
        deck.shuffle();
        hand = new ArrayList<Card>();
        for(int i = 0; i < 7; i++)
        {
            hand.add(deck.deal());    
        }
       
    }
    
    //Prints the cards in the hand arraylist (of the player or the computer's hand)
    public void printHand()
    {
        for(int i = 0; i < hand.size(); i++)
        {
            if(i == hand.size() - 1)
            {
                System.out.println(hand.get(i));
            }
            else
            {
                System.out.print(hand.get(i) +", ");
            }
        }
    }
    
    //@returns the cards the player and computer currently has
    public ArrayList<Card> getHand()
    {
        return hand;
    }
    
    //@returns the amount of cards in a hand
    public int sizeOfHand()
    {
        return hand.size();
    }
    
    
}
    
    
    
