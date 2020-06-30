const container = document.querySelector('.container');
const header_2 = document.querySelector(".header-2");

let currentDate = new Date();
let monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const month = document.createElement('h2');

//Displays the current month and year
month.textContent = monthsOfYear[currentDate.getMonth()] + " " + currentDate.getFullYear() + ":";
month.classList.add('month');
header_2.appendChild(month);

/*
 * Creates two links to switch 
 * between the essential spending graph
 * and the luxury spending graph
 */
const essential = document.createElement('h2');
essential.textContent = "essential spending graph";
essential.classList.add("link-essential");

const luxury = document.createElement('h2');
luxury.textContent = "luxury spending graph";
luxury.classList.add("link-luxury");

const links = document.createElement('div');
links.classList.add("links");
links.appendChild(essential);
links.appendChild(luxury);

header_2.appendChild(links);

graph_essentials = document.querySelector(".graph_essentials");
legend_essentials = document.querySelector(".legend_essentials");
graph_luxuries = document.querySelector(".graph_luxuries");
legend_luxuries = document.querySelector(".legend_luxuries");

/* Displays the corresponding graph
 * depending on which link is clicked
 */

essential.addEventListener('click',
function() {
    graph_essentials.style.display = "grid";
    legend_essentials.style.display = "grid";
    graph_luxuries.style.display = "none";
    legend_luxuries.style.display = "none";


});

luxury.addEventListener('click', 
function() {
    graph_essentials.style.display = "none";
    graph_luxuries.style.display = "grid";
    legend_essentials.style.display = "none";
    legend_luxuries.style.display = "grid";


});

/**************************************************************/

/*Spending and Savings Money and Transfers*/

//Creates the error message to be displayed when an error occurs
let error = document.createElement("h2");
error.classList.add("error");

//the popups that allow the user to input money to their spending and savings
document.getElementById("popup2").addEventListener('click',
function() {
    document.querySelector('.bg-modal2').style.display = 'flex';
});

document.getElementById("popup3").addEventListener('click',
function() {
    document.querySelector('.bg-modal3').style.display = 'flex';
});


//closes the popups
document.querySelector('.close2').addEventListener('click', function() {
    document.querySelector('.bg-modal2').style.display = 'none';
    if(modalcontent2.contains(error))
    {
        modalcontent2.removeChild(error);
    }
   
});

document.querySelector('.close3').addEventListener('click', function() {
    document.querySelector('.bg-modal3').style.display = 'none';
    
});

//Keeps track of the overall saving and spending amounts
let savings = 0;
let spending = 0;

let savingsText = document.createElement('h2');
let spendingText = document.createElement('h2');
let inputSpending = document.querySelector(".spendingMoney");
let inputSavings = document.querySelector(".savingsMoney");

const modalcontent3 = document.querySelector(".modal-content3");
const modalcontent2 = document.querySelector(".modal-content2");

//if there is already a spending amount displayed on the page, it clears it
function clearSpending()
{
    spendingText.textContent = "";
    spendingText.classList.add('spending');
    container.appendChild(spendingText);
}

//if there is already a savings amount displayed on the page, it clears it
function clearSavings()
{
    savingsText.textContent = "";
    savingsText.classList.add('savings');
    container.appendChild(savingsText);
}

//As the user adds more money to their spending/savings, the page will update and display the new amounts

function updateSpending()
{
    spendingText.textContent = "$" + spending;
    spendingText.classList.add('spending');
    container.appendChild(spendingText);
}

function updateSavings()
{
    savingsText.textContent = "$" + savings;
    savingsText.classList.add('savings');
    container.appendChild(savingsText);
}

/*
 * Enables the user to input the amount to their spending
 * and transfer money from their spending to their savings
 */
function spendingAmount()
{
    //removes any previous error messages
    if(modalcontent2.contains(error))
    {
        modalcontent2.removeChild(error);
    }
    if(inputSpending.placeholder === "Spending Money")   
    {
        let addAmount = Number(document.querySelector(".spendingMoney").value);
        //checks if the user entered a valid number 
        if(isNaN(addAmount))
        {
            error.textContent = "Please enter a valid number."
            modalcontent2.appendChild(error);
    
        }
        //updates the current spending amount and displays it
        else
        {
            clearSpending(); 
            spending += addAmount;
            spending = rounding(spending);
            updateSpending();
        }
    }
    else
    {
        //transfer money to their savings 
        if(inputSpending.placeholder === "Amount to Transfer" && spending != 0)
        {
            let transferAmount = Number(inputSpending.value);
            //checks if the user entered a valid number
            if(isNaN(transferAmount))
            {
                error.textContent = "Please enter a valid number."
                modalcontent2.appendChild(error);
            }
            //eliminates the chance of transfering a negative amount of money
            else if(transferAmount < 0)
            {
                error.textContent = "Please enter a positive number."
                modalcontent2.appendChild(error);
            }
            else{
                //checks if there is enough money to be transferred 
                if(transferAmount <= spending)
                {
                    clearSpending();
                    spending -= transferAmount;
                    savings += transferAmount;
                    spending = rounding(spending);
                    updateSpending();
                    clearSavings();
                    savings = rounding(savings);
                    updateSavings();
                }
                else
                {
                    error.textContent = "Not Enough Money.";
                    modalcontent2.appendChild(error);
                }
            }
        }
        else if(spending === 0)
        {
            error.textContent = "Add Money to your Savings First.";
            modalcontent2.appendChild(error);
        }
    }
}

/*
 * Enables the user to input the amount to their savings
 * and transfer money from their savings to their spending
 */
function savingAmount()
{
    //removes any previous error messages
    if(modalcontent3.contains(error))
    {
        modalcontent3.removeChild(error);
    }
    if(inputSavings.placeholder === "Savings Money")
    {
        let addAmount = Number(document.querySelector(".savingsMoney").value);
        //checks if a valid number is entered
        if(isNaN(addAmount))
        {
            error.textContent = "Please enter a valid number."
            modalcontent3.appendChild(error);
    
        }
        //updates the current savings amount and displays it
        else{
            clearSavings();
            savings += addAmount;
            savings = rounding(savings);
            updateSavings();
        }
    }
    else{
        if(inputSavings.placeholder === "Amount to Transfer" && savings != 0)
        {
            let transferAmount = Number(inputSavings.value);
            //checks if the user enters a number
            if(isNaN(transferAmount))
            {
                error.textContent = "Please enter a valid number."
                modalcontent3.appendChild(error);
        
            }
            //eliminates the chance the user enters a negative number to transfer
            else if(transferAmount < 0)
            {
                error.textContent = "Please enter a positive number."
                modalcontent3.appendChild(error);
            }
            else
            {
                //checks if there is enough money to transfer
                if(transferAmount <= savings)
                {
                    clearSavings();
                    savings -= transferAmount;
                    spending += transferAmount;
                    savings = rounding(savings);
                    updateSavings();
                    clearSpending();
                    spending = rounding(spending);
                    updateSpending();
                }
                else
                {
                    error.textContent = "Not Enough Money.";
                    modalcontent3.appendChild(error);
                }
            }
        }
        else if(savings === 0)
        {
            error.textContent = "Add Money to your Spending First.";
            modalcontent3.appendChild(error);
        }
    }

}

//rounds number to be displayed on the page to two decimal places
function rounding(money)
{
    if(money % 1 != 0)
    {
        money = Math.round(money*100)/100;
    }
    return money;
}

//displays the feature to allow transfers to occur

function transferToSavings()
{
    
    inputSpending.placeholder = "Amount to Transfer";
    if(modalcontent2.contains(error))
    {
        modalcontent2.removeChild(error);
    }
}

function transferToSpending()
{
    inputSavings.placeholder = "Amount to Transfer";
    if(modalcontent3.contains(error))
    {
        modalcontent3.removeChild(error);
    }

}

//displays the feature to add money to the user's spending and savings

function originalSpending()
{
    
    inputSpending.placeholder = "Spending Money";
    if(modalcontent2.contains(error))
    {
        modalcontent2.removeChild(error);
    }
}

function originalSavings()
{
    inputSavings.placeholder = "Savings Money";
    if(modalcontent3.contains(error))
    {
        modalcontent3.removeChild(error);
    }

}

/*********************************************************************************************/

/*essential graph section*/

let graph_spending1 = document.querySelector(".graph_spending1");
let graph_spending2 = document.querySelector(".graph_spending2");
let school = document.querySelector("#school");
let transportation = document.querySelector("#transportation");
let groceries = document.querySelector("#groceries");
let healthcare = document.querySelector("#healthcare");
let utilities = document.querySelector("#utilities");
let category1 = "";
let essentialSpending = ["school", "transportation", "groceries", "healthcare", "utilities"];
let essentialColours = ["#f2a65a", "#34435e", "#667761", "#dd614a", "#a7bed3"];

//allows the user to click on the icons to add their purchases for each category

school.addEventListener('click',
function() {
    document.querySelector('.graph_spending1').style.display = 'block';
    category1 = "school";
});

transportation.addEventListener('click',
function() {
    document.querySelector('.graph_spending1').style.display = 'block';
    category1 = "transportation";
});

groceries.addEventListener('click',
function() {
    document.querySelector('.graph_spending1').style.display = 'block';
    category1 = "groceries";
});

healthcare.addEventListener('click',
function() {
    document.querySelector('.graph_spending1').style.display = 'block';
    category1 = "healthcare";
});

utilities.addEventListener('click',
function() {
    document.querySelector('.graph_spending1').style.display = 'block';
    category1 = "utilities";
});

//closes the popups that allows the the user to enter their essential and luxury purchasing amounts

document.querySelector('.close4').addEventListener('click', function() {
    document.querySelector('.graph_spending1').style.display = 'none';
    if(graph_spending1.contains(error))
    {
        graph_spending1.removeChild(error);
    }
});

document.querySelector('.close5').addEventListener('click', function() {
    document.querySelector('.graph_spending2').style.display = 'none';
    if(graph_spending2.contains(error))
    {
        graph_spending2.removeChild(error);
    }
});

//keeps track of the total spending for each category of the essential spending graph
let essentialMoney = [0, 0, 0, 0, 0];

let essentialBars = [document.querySelector(".bar-school"), document.querySelector(".bar-transportation"), document.querySelector(".bar-groceries"),
document.querySelector(".bar-healthcare"), document.querySelector(".bar-utilities")];

//visually displays purchasing habits graphically after the user enters their spending amounts
function addGraph1()
{
    //how much the user entered for their purchase
    let money = Number(document.getElementById("money1").value);

    if(graph_spending1.contains(error))
    {
        graph_spending1.removeChild(error);
    }

    if(isNaN(money))
    {
        error.textContent = "Please enter a valid number."
        graph_spending1.appendChild(error);
    }
    else
    {
        //checks if their is enough spending money to make the purchase
        if(money <= spending)
        {
            spending -= money;
            /* loops through all the essential spending
             * categories to properly update the graph
             * with the new purchase the user entered
             */
            for(let i = 0; i < essentialBars.length; i++)
            {
                if(category1 == essentialSpending[i])
                {
                    essentialMoney[i] += money;
                    if(essentialMoney[i] <= 500)
                    {
                        //the bars of the graph increase in height as the user logs more purchases
                        essentialBars[i].style.height = essentialMoney[i] + "px";
                        essentialBars[i].style.backgroundColor = essentialColours[i];
                    }
                    else if(essentialMoney[i] >= 500)
                    {
                        essentialBars[i].style.height = "500px";
                        essentialBars[i].style.backgroundColor = essentialColours[i];
                    }
                    //updates the new spending amount after the purchase is logged
                    clearSpending();
                    spending = rounding(spending);
                    updateSpending();
                }

                //displays the total spending for each category when the user hovers over the bars of the graph
                let moneyCategory = document.createElement("h2");
                moneyCategory.textContent = "$" + essentialMoney[i];
                moneyCategory.classList.add("moneyCategory");
                essentialBars[i].appendChild(moneyCategory);
                moneyCategory.style.display = "none";
                essentialBars[i].onmouseover = function(){
                    moneyCategory.style.display = "block";
                    essentialIcons[i].style.display = "none";
                }
                essentialBars[i].onmouseout = function(){
                    moneyCategory.style.display = "none";
                    essentialIcons[i].style.display = "inline";
                }
            }

        }
        else
        {
            error.textContent = "Not enough spending money.";
            graph_spending1.appendChild(error);
        } 
    }
}


let essentialTitles = [document.querySelector(".title-school"), document.querySelector(".title-transportation"), document.querySelector(".title-groceries"),
document.querySelector(".title-healthcare"), document.querySelector(".title-utilities")];

let essentialIcons = [document.querySelector("#school"), document.querySelector("#transportation"), document.querySelector("#groceries"), 
document.querySelector("#healthcare"), document.querySelector("#utilities")];

//displays the names of the categories below the icons
for(let i = 0; i < essentialTitles.length; i++)
{
    essentialIcons[i].onmouseover = function(){
        essentialTitles[i].style.display = "block";
    }

    essentialIcons[i].onmouseout = function(){
        essentialTitles[i].style.display = "none";
    }
}

/*luxury spending graph*/

let diningOut = document.querySelector("#diningOut");
let shopping = document.querySelector("#shopping");
let entertainment = document.querySelector("#entertainment");
let vacation = document.querySelector("#vacation");
let other = document.querySelector("#other");
let category2 = "";
let luxurySpending = ["diningOut", "shopping", "entertainment", "vacation", "other"];
let luxuryColours = ["#eb4034", "#7f6a85", "#439c94", "#e8cd74", "#dbc1c1"];

//allows the user to click on the icons to add their purchases for each category

diningOut.addEventListener('click',
function() {
    document.querySelector('.graph_spending2').style.display = 'block';
    category2 = "diningOut";
});

shopping.addEventListener('click',
function() {
    document.querySelector('.graph_spending2').style.display = 'block';
    category2 = "shopping";
});

entertainment.addEventListener('click',
function() {
    document.querySelector('.graph_spending2').style.display = 'block';
    category2 = "entertainment";
});

vacation.addEventListener('click',
function() {
    document.querySelector('.graph_spending2').style.display = 'block';
    category2 = "vacation";
});

other.addEventListener('click', 
function(){
    document.querySelector('.graph_spending2').style.display = 'block';
    category2 = "other";
})

document.querySelector('.close4').addEventListener('click', function() {
    document.querySelector('.graph_spending2').style.display = 'none';
});

//keeps track of the total spending for each category of the luxury spending graph
let luxuryMoney = [0, 0, 0, 0, 0];

let luxuryBars = [document.querySelector(".bar-diningOut"), document.querySelector(".bar-shopping"), document.querySelector(".bar-entertainment"),
document.querySelector(".bar-vacation"), document.querySelector(".bar-other")];

//visually displays purchasing habits graphically after the user enters their spending amounts
function addGraph2()
{
    //how much the user entered for their purchase
    let money = Number(document.getElementById("money2").value);

    if(graph_spending2.contains(error))
    {
        graph_spending2.removeChild(error);
    }
    
    if(isNaN(money))
    {
        error.textContent = "Please enter a valid number."
        graph_spending2.appendChild(error);

    }
    else
    {
        //checks if their is enough spending money to make the purchase
        if(money <= spending)
        {
            spending -= money;
            /* loops through all the luxury spending
             * categories to properly update the graph
             * with the new purchase the user entered
             */
            for(let i = 0; i < luxuryBars.length; i++)
            {
                if(category2 == luxurySpending[i])
                {
                    luxuryMoney[i] += money;
                    if(luxuryMoney[i] <= 500)
                    {
                        //the bars of the graph increase in height as the user logs more purchases
                        luxuryBars[i].style.height = luxuryMoney[i] + "px";
                        luxuryBars[i].style.backgroundColor = luxuryColours[i];
                    }
                    else if(luxuryMoney[i] >= 500)
                    {
                        luxuryBars[i].style.height = "500px";
                        luxuryBars[i].style.backgroundColor = luxuryColours[i];
                    }
                    //updates the new spending amount after the purchase is logged
                    clearSpending();
                    spending = rounding(spending);
                    updateSpending();
                }
                //displays the total spending for each category when the user hovers over the bars of the graph
                let moneyCategory = document.createElement("h2");
                moneyCategory.textContent = "$" + luxuryMoney[i];
                moneyCategory.classList.add("moneyCategory");
                luxuryBars[i].appendChild(moneyCategory);
                moneyCategory.style.display = "none";
                luxuryBars[i].onmouseover = function(){
                    moneyCategory.style.display = "block";
                    luxuryIcons[i].style.display = "none";
                }
                luxuryBars[i].onmouseout = function(){
                    moneyCategory.style.display = "none";
                    luxuryIcons[i].style.display = "inline";
                }
            }
        }
        else
        {
            error.textContent = "Not enough spending money.";
            graph_spending2.appendChild(error);
        }
    }
}


let luxuryTitles = [document.querySelector(".title-diningOut"), document.querySelector(".title-shopping"), document.querySelector(".title-entertainment"),
document.querySelector(".title-vacation"), document.querySelector(".title-other")];

let luxuryIcons = [document.querySelector("#diningOut"), document.querySelector("#shopping"), document.querySelector("#entertainment"), 
document.querySelector("#vacation"), document.querySelector("#other")];

//displays the names of the categories below the icons
for(let i = 0; i < luxuryTitles.length; i++)
{
    luxuryIcons[i].onmouseover = function(){
        luxuryTitles[i].style.display = "block";
    }

    luxuryIcons[i].onmouseout = function(){
        luxuryTitles[i].style.display = "none";
    }
}












