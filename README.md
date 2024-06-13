Xpens is a Expense tracking app where you can add both the money in upi and also in-hand.
Xpens is Developed using React Native (expo-cli)
Xpens uses SQLite3 as backend database 
track monthly and yearly expenses
track borrowed money seperated as :
    > money you borrowed from someone 
    > money someone borrowd from you
Add money as upi or as cash seperately
To reflect the change in total amount due expenses and borrow, click the refresh button in wallet to update the values

Screens:
> Wallet
> Borrow
> Expense
> Monthly Expense

 Wallet: 
   . shows total amount you currently have in both upi and as cash
   . add button to add new amount to upi or cash
   . bottom component savings shows total saved amount in the current year
   . Borrow component pressable shows the total amount you borrowed 
   . Borrow component onPress navigated to Borrow screeen
   . Expense component pressable shows total yearly expense
   . Expense component onPress navigates to Expense screen 

 Borrow:
   . Borrow component have two pressable fields
   . add button allows user to add new data
   . borrow field shows the displays a list of cards that have 
         > name
         > amount borrowed 
         > reason of borrow
   . these cards can be seperated as 
         > to give 
             list of cards that have details of person you borrowed money
         > to get
             list of cards that have details of person who borrowed money from you

 Expense: 
   . Expese component have to pressable field to add data and to show data
   . Expense shows a calender view of the monthly expense and total expense made in that year
   . a field to select the year which you need to see tha expenses made during that year
   . each cell in the calender is pressable and onPress it navigates to Monthly Expense Screen 

 Monthly Expense: 
   . Monthly expese displays a list of cards which contain information about the expenses you made in that selected month
   . each card carry information :
         > Expense that made
         > Amount payed for that expense
         > Date of expense
   . card displayed are the expense taken place in thae selected month and the year only
         
 
 
