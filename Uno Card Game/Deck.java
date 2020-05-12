//Class assembles the uno deck of cards
import java.util.*;
public class Deck
{
    private ArrayList<Card> deck;
    
    //add the Card objects to an ArrayList in order to assemble the deck for the game
    public Deck()
    {
        deck = new ArrayList<Card>();
        
        //for loop cycles through the number values of cards
        for(int i = 0; i < 12; i++)
        {
            //for loop cycles through the 4 different colours of cards
            for(int j = 0; j < 4; j++)
            {
                deck.add(new FaceValue(i, j));
            }
        }
        
        //cycles through the two types of wild cards
        for(int k = 0; k < 2; k++)
        {
            for(int x = 0; x < 4; x++)
            {
                deck.add(new Wild(k));
            }
            
        }
        
        
    }
        
        /**
         *deals one card
         *@return a card from the deck
         */
        public Card deal()
        {
            return deck.remove(0);
        }
        
        //shuffles the deck
        public void shuffle()
        {
            Collections.shuffle(deck);
        }
        
        /** 
         * returns an arraylist containing all the cards
         * @return the deck
         */
        public ArrayList<Card> getDeck()
        {
            return deck;
        }
        
        
        
    }
