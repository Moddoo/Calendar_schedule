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
         
                
    
    //  put the value of all inputs inside plnlst array then move it to localStorage using for loop 
    
        let txtArea = $("textarea");
        // for(let el of txtArea) {
        // plnLst.push(el.value);
        // }
        txtArea.each(function() {
            plnLst.push($(this).val())
        })
        console.log(plnLst)
        // localStorage.setItem("key", JSON.stringify(plnLst))
        
    
    //   add eventListener to buttons to put the new inputs in the array then save array in localStorage 
    
        let btn = $(".bton");
        
            btn.click(function() {
                    data = $(this).attr("data-time");
                    index = data - 9;
                    plnInput = $("textarea[data-time ="+ data +"]").val();
                    plnLst[index] = plnInput;
                    localStorage.setItem("key", JSON.stringify(plnLst));
                    console.log(plnLst)
            })


    //   move the inputs saved in localStorage to the array then to the textarea input
           
            // function storage() {
            //     plnLst = JSON.parse(localStorage.getItem("key"));
            //     for(let el of txtArea) {
            //         el.value = plnLst[el.dataset.time - 9];
            //     }
            //   }

            function storage() {
                localStorage.setItem("key",JSON.stringify(plnLst));
                plnLst = JSON.parse(localStorage.getItem("key"));
                txtArea.each(function() {
                   let index = $(this).attr("data-time")-9;
                       return $(this).val(plnLst[index])     
                })
              }

              storage()
              
          function pull() {

          }
          
    //   add classes to inputs compared to time
    
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
               plnLst=[]
               txtArea.each(function() {
                   plnLst.push($(this).val())
               })
               console.log(plnLst)
               localStorage.setItem("key",JSON.stringify(plnLst))
            })
                

        
    
});

