//creates the cards that allow you to change colours and change colours while adding 4 cards to the other player
public class Wild extends Card
{
    private int suit;
    public Wild(int suit)
    {
        this.suit = suit;    
    }
    
    public String wilds[] = {"wild", "wild4"};
    public String colours[] = {"red", "yellow", "blue", "green"};
    
    public int getWild()
    {
        return this.suit;
    }
    
    public String toString()
    {
        String wildString = wilds[this.suit];
        
        return wildString + "";
    }
    
    public String faceString()
    {
        return wilds[suit];
    }
    
    /**
     *@returns no colour but this abstract method is required because the other subclass needs to use this method to return a colour
     */
    public String colourString()
    {
        return "";
    }
    
    /**
     * needed in order for the computer to randomly change the colours. 
     * @return arraylist of colours
     */
    public String[] getColours()
    {
        return colours;
    }
    
}
