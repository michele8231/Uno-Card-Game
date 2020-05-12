//Abstract card class required to create 2 different types of cards for the deck.
public abstract class Card
{
    public Card()
    {
    }
    
    //@return the number, "plus two", "wild", "wild4", or "skip" of the card. 
    public abstract String faceString();
    
    //@return the colour of the card
    public abstract String colourString();
    
    //@return the arraylist of colours. Needed for when the computer calls a colour randomly
    public abstract String[] getColours();
    
}