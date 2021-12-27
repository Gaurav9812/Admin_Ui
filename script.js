//---------declaring necessary Variables

var response;
var noUser=10;
let onPage=1;


//--------making requst
function makeRequest(){
        var xhrRequset=new XMLHttpRequest();
        xhrRequset.open('get',' https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json',true);
        xhrRequset.send();
        xhrRequset.onload=function()
        {
             response=JSON.parse(xhrRequset.response);
            pages(response.length/noUser);
            displayUser(0);
        }
}

//---------displaying user according to no of user selected
function displayUser(start)
{
      let res=response;  
      
    for(let i=start;i<(parseInt(start)+parseInt(noUser)),i<res.length  ;i++)
    {
        
            //-----creating ROW    
        
            let tr=document.createElement('tr');
        
            //-----creating 1st column Checkbox     
        
            let td0=document.createElement('td');
            td0.innerHTML="<input type='checkbox'>"
        
            //-----creating 2nd Column  for name

            let td=document.createElement('td');
            td.innerHTML=res[i].name;
            
            
            //-----creating 2nd Column  for Email

            let td1=document.createElement('td');
            td1.innerHTML=res[i].email;
            
            
            //-----creating 2nd Column  for Roles

            let td2=document.createElement('td');
            td2.innerHTML=res[i].role;

            //-----creating 2nd Column  for Actions

            let td3=document.createElement('td');
            let editButton=document.createElement('button');
            editButton.innerHTML="<i class='fas fa-edit'></i>";
            
            //----------adding event Lisner to edit button
            editButton.addEventListener('click',function()
            {
                document.getElementById("edit-form").style.display="flex";
                let forme=document.querySelectorAll("#edit-form form input");
                forme[0].value=td.innerText;
                forme[1].value=td1.innerText;
                forme[2].value=td2.innerText;

                document.querySelectorAll("#edit-form form button")[0].addEventListener('click',function(event){
                    event.preventDefault();
                    forme=document.querySelectorAll("#edit-form form input");
                    td.innerText=forme[0].value;
                    td1.innerText=forme[1].value;
                    td2.innerText=forme[2].value;
                    document.getElementById("edit-form").style.display="none";
                });
                
            })
            
            //-------adding event-listner on delete icon on ACtion
            let deleteButton=document.createElement('button');
            deleteButton.innerHTML="<i class='fas fa-trash-alt'></i>";
            deleteButton.addEventListener('click',function()
            {
                tr.remove();
            })
            
            td3.appendChild(editButton);
            td3.appendChild(deleteButton);

            //--------adding all the column in row
            tr.appendChild(td0);
            tr.appendChild(td);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            
            //--------appending row to table
            document.getElementsByTagName('tbody')[0].appendChild(tr); //.appendChild(tr);
    }
}
makeRequest();

//----------removing all the child for new pages

function removeChild()
{   let child=document.querySelectorAll('tbody tr');

    for(let i=1;i<child.length;i++)
    {
    document.getElementsByTagName('tbody')[0].removeChild(child[i]);
    }
}

//-------------adding no. of pages According to no. of user selected

function pages(n)
{
        for(let i=0;i<n;i++)
        {
            let div=document.createElement('div');
            div.innerHTML=i+1;
            if(i==0)
            {
                onPage=div;
                console.log("div added",onPage.innerText)
                div.style.backgroundColor="lightblue";
            }
            div.classList.add("pages-style");
            // ----------adding event listner on pages
            div.addEventListener('click',function (){
                
                //left Arrow
                if(this.innerText!=1)
                {
                    document.getElementById("left-arrow").classList.add("pointer");
                }else
                {
                    document.getElementById("left-arrow").classList.remove("pointer");
                }
                 //right arrow   
                if(this.innerText>n)
                {
                    document.getElementById("right-arrow").classList.remove("pointer");
                        
                }else
                {
                    document.getElementById("right-arrow").classList.add("pointer");
                }   

                    if(onPage.innerText!=i+1)
                    {   onPage.style.backgroundColor="palevioletred";
                        this.style.backgroundColor="lightblue";
                        onPage=this;
                        removeChild();

                        displayUser(i*noUser);
                    }
               
                });
            document.getElementById('pages').appendChild(div);
        }
}
document.getElementById("right-arrow").classList.add("pointer");

//--------adding event listener on left arrow

document.getElementById("left-arrow").addEventListener('click',function()
{
    if(onPage.innerText!=1)
    {
        document.getElementById("left-arrow").classList.add("pointer");
        document.getElementsByClassName('pages-style')[onPage.innerText-2].click();
        if(onPage.innerText==1)
        {
            document.getElementById("left-arrow").classList.remove("pointer");
            
        }
    }
})

//--------adding event listener on left arrow

document.getElementById("right-arrow").addEventListener('click',function()
{
    var pag=document.getElementsByClassName('pages-style');
    if(onPage.innerText!=pag.length)
    {
        console.log(pag);
        pag[parseInt(onPage.innerText)].click();
    }
})

// ---------remove pages to count new pages

function removePages()
{
    let child=document.querySelectorAll('#pages div');

    for(let i=0;i<child.length;i++)
    {
    document.getElementById("pages").removeChild(child[i]);
    }
}

//----------radio buttons to change no of user in single page

var radios=document.getElementsByClassName('radio_button');
for(let radio in radios) {
    radios[radio].onclick = function() {
        noUser=this.value;
        removeChild();
        removePages();
        pages(response.length/noUser);

        displayUser((onPage.innerText-1)*noUser);
    }
}

//---------func to check alll the checkbox

function selectAll()
{
    var el=document.querySelectorAll("td input");
    for(let i=1;i<el.length;i++)
    {
        el[i].checked=!el[i].checked;
    }
}

//---------deleteing all the checked rows

function deleteChecked()
{   var ed=document.querySelectorAll("tr");
    var el=document.querySelectorAll("td input");
    
    for(let i=0;i<el.length;i++)
    {
        if(i!=0 &&  el[i].checked)
        {
            
            ed[i].remove();
        }
    }
}


//-----------adding eventLisner on 1st check box to select all the rows
document.querySelectorAll("td input")[0].addEventListener('click',function()
{
    selectAll();
})

//-------adding event listner on delete selected
document.getElementById("delete").addEventListener('click',function()
    {
            deleteChecked();
    })


//-----------function to for search bar
function sortRows()
{
    
    var   txtValue;
  
  let filter = ""+document.getElementById("search-bar").value.toUpperCase();
  let table = document.getElementsByTagName("table")[0];
   let tr = table.getElementsByTagName("tr");
    console.log(filter);
  // Loop through all table rows, and hide those who don't match the search query
  for (let i = 1; i <tr.length; i++) {
    for(let j=1;j<=3;j++){
    let td = tr[i].getElementsByTagName("td")[j];
    
    if (td) {
      txtValue = td.textContent || td.innerText;
      
      let index=txtValue.toUpperCase().indexOf(filter);
      
      if (index==0){
          
        tr[i].style.display = "";
        break
      } else {
        tr[i].style.display = "none";
      }
    }
    }
  }
  
}

