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
     


    // Work Day Planner ........

    
         let plnLst = [];
         let data;
         let index;
         let plnInput;
         let txtArea;
         let store;
         let now = $("#now");
             now.append("' " + moment().format('MMMM Do YYYY' + " '"));
         
                
    
    //  put the value of all inputs inside plnLst array then move it to localStorage using for loop 
    
    
     
        function storage() {
                store = localStorage.getItem("key");
                txtArea = $("textarea");

            if(!store){
                txtArea.each(function() {
                    plnLst.push($(this).val())
                })
                localStorage.setItem("key", JSON.stringify(plnLst));
            } else{
                plnLst = JSON.parse(localStorage.getItem("key"));
                txtArea.each(function() {
                   let index = $(this).attr("data-time")-9;
                       return $(this).val(plnLst[index])     
                })
            }
          }

          storage()
         
    
    //   add eventListener to buttons to put the new inputs in the array then save array in localStorage 
    
        let btn = $(".bton");
        
            btn.click(function() {
                    data = $(this).attr("data-time");
                    index = data - 9;
                    plnInput = $("textarea[data-time ="+ data +"]").val();
                    plnLst[index] = plnInput;
                    localStorage.setItem("key", JSON.stringify(plnLst));
                    })
                
          
    //   add classes to inputs compared to time
    function buildPlanner(timestamp) {
        //for loop to create HTML list elements
        //in for loop, check timestamp to determine color of list element

        //sample obj= {
        // ts1: [task 1, task 2] 
        // ts2:  
        // }

    }
    
        function time() {
            $(txtArea).each(function() {
                let data = parseInt($(this).attr("data-time"));
                if(data < today.getHours()) {
                   $(this).addClass("bg-secondary")
                //    $(this).parent().css("pointer-events", "none")
                } else if (data === today.getHours()) {
                   $(this).addClass("bg-danger")
                }else {$(this).addClass("bg-success")}
            })
        }
        time()

    //    add button to clear all

        let clear = $(".clear");
        
            clear.click(function(){
               $("textarea").val("");
               plnLst=[];
               txtArea.each(function() {
                   plnLst.push($(this).val())
               })
               localStorage.setItem("key",JSON.stringify(plnLst))
            })
                

        // $("td").click(function(){ 
        //     if($(this).text() == today.getDate()){
        //         $(this).css({
        //             background: "black",
        //             color: "white",
        //         });
        //         return;
                
        //     } else if($(this).text() > today.getDate()) {
        //         $(this).addClass("bg-warning");
        //         y = $(".wow").clone(true).appendTo("body");
        //         y.removeClass("wow");
        //         debugger;
        //         $("textarea").each(function(){
        //             $(this).val("");
        //         })
        //         $(".wow").addClass("d-none");
        //         // y.addClass("d-none")
        //         // console.log(y)
        //     }
        // })
    
});

