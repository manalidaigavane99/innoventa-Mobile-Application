services
  -firestore service related addig data in database( if u want to write any code write a new function)
  -Group.ts : group datastructue defined
  -group.service.ts: fetching groups from database
  -Qr.service : related to QR
  -users.service : fetching user related data from databse
  
 details about component :
  QR component : page related to generating QR 
               : associated with those users who are showcasing their project
   
  Display Component : associated with those users who are going to evaluate
                    : displays a page where when clicking on scan button camera opens and qr is scanned
                    : after scanning redirects to group-info component
                    : group-info component html page displays project details ad rubriccs
                    :after clicking on submit , list reloads
                    :list of thos teams which are evaluated by the user
     
 fuctionalities covered : ( make suure u are aware of the database structure)
 - database updation of marks given by user in users isDone array
 - user id without @gmail.com
 - displaying updated list of teams which are evaluated by user
 - Qr generation and scanning succesful
 - Qr disappears after 2 sec
 - Qr is random chages everytime
 - project details are displayed
 
