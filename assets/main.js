$(document).ready(function(){
     let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
     let today = new Date();
     let currentMonth = today.getMonth();
     let currentYear = today.getFullYear();
     let monthAndYear = $("#monthAndYear");
     let prev = $("#prev");
     let next = $("#next");
     calendar(currentMonth,currentYear);
     prev.click(prevo);
     next.click(nex);

     function calendar(month,year) {
         let firstDay = new Date(year, month).getDay();
         let daysNo = function(year,month)  {
              return 32 - (new Date(year,month,32).getDate());
            }
            console.log(daysNo(currentYear,currentMonth))
         let tBody    = $("#calendar-body");
             tBody.text("");
             monthAndYear.text(months[month] + " " + year);
         let day = 1;

         for(i=0; i<6; i++) {
                 var row = $("<tr>");
                //  var td = $("<td>");
                         
             for(j=0; j<7; j++) {
            
                 if(i === 0 && j < firstDay) {
                    var td = $("<td>");
                    var tdTxt = td.append("");
                        row.append(tdTxt);

             }   else if(day > daysNo(year,month)) { break;}
                 else {
                     var td = $("<td>").addClass("text-center");
                        
                          if(day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                               td.css({
                                   background: "black",
                                   color: "white",
                               }) 
                          }
                      var tdTxt = td.append(day);
                      row.append(tdTxt) ;
                      day++;
                 }
             }
             tBody.append(row);
         }   
      

     }


     function prevo() {
          currentYear  = (currentMonth === 0) ? currentYear -1 : currentYear;
          currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
          calendar(currentMonth,currentYear)
     }

     function nex() {
         currentYear  = (currentMonth === 11) ? currentYear + 1 : currentYear;
         currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1 ;
         calendar(currentMonth,currentYear);
     }
     
     //  $("#btn").click(function() {
     //     localStorage.setItem("key",JSON.stringify($("textarea[data-time=9]").val()));
     // })
     
     // $(function() {
 
     //     $("textarea[data-time=9]").text(JSON.parse(localStorage.getItem("key")))
 
     // })


    // Work Day Planner ........
    
    let btn = $(".bton");
    let plnLst = [];
    
    
    // let storage = localStorage.setItem("key", JSON.stringify(plnLst))

    // btn.each(function() {
    //   $(this).click(function() {
    //       let data = $(this).attr("data-time");
    //       let index = data - 9;
    //       let plnInput = $("textarea[data-time ="+ data +"]").val();
    //           plnLst[index] = plnInput;
    //           localStorage.setItem("key", JSON.stringify(plnLst));
    //           console.log(localStorage) 
    //         })
    //     })
    btn.click(function() {
          let data = $(this).attr("data-time");
          let index = data - 9;
          let plnInput = $("textarea[data-time ="+ data +"]").val();
              plnLst[index] = plnInput;
              localStorage.setItem("key", JSON.stringify(plnLst));
              console.log(localStorage) 
            })
            console.log(localStorage)
        


    

  

});

