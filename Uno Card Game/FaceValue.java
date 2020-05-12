/**
 * this subclass creates a card object that contain the numbers (0-9),
 * a skip function, or a plus two type of card. Also assigns a colour to the card.
 */
public class FaceValue extends Card
{
    private int face;
    private int colour;
    
    
    public FaceValue(int face, int colour)
    {
        this.face = face;
        this.colour = colour;
    }
    
    
    public String faces[] = {"0", "1", "2", "3", "4", "5", "6",  "7", "8", "9", "skip", "plustwo"};
    public String colours[] = {"red", "yellow", "blue", "green"};
    
    public String[] getColours()
    {
        return colours;
    }
    
    /**
     * either a number, skip, or plus two on the card.
     * @return an integer that corresponds with a card
     */
    public int getFace()
    {
        return this.face;
    }
    
    // @return an integer that corresponds with a colour in the array
    public int getColour()
    {
        return this.colour;
    }
    
    //@return a string
    public String faceString()
    {
        return faces[face];
    }
    
    //@return a string
    public String colourString()
    {
        return colours[colour];
    }
    
    public String toString()
    {
      String faceString = faces[face];
      String colourString = colours[colour];
      
      return faceString + " " + colourString;
    }
}

