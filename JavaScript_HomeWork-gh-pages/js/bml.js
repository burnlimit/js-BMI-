var heightvalue=document.querySelector('.height');
var weightvalue=document.querySelector('.weight');
var bmiitem=document.querySelector('.bmivalue');
var sentdata=document.querySelector('.sent');
var page=document.querySelector('.page');
var resultcolor=document.querySelector('.resultcolor');
var getheightdata=JSON.parse(localStorage.getItem('height'))||[];
var getweightdata=JSON.parse(localStorage.getItem('weight'))||[];
var str='';
var pagestr='';
var dataarry=[];
var dataamount=0;
var month=new Date().getMonth()+1;
var pagenumber=1;
var hideresult=document.querySelector('.hideresult');
var iconbox=document.querySelector('.iconbox');
resultcolor.addEventListener('click',function(e){
    console.log(e);
    if (e.target.nodeName=="IMG"){
    sentdata.setAttribute('class','sent')
    resultcolor.setAttribute('class','hideresult')}
});

updatalist(pagenumber);

sentdata.addEventListener('click',pushdata);

function pushdata(e){
    e.preventDefault();
    if(heightvalue.value==""||weightvalue.value==""){return alert('此欄位不可為空')}
    getheightdata.push(heightvalue.value);
    getweightdata.push(weightvalue.value);
    localStorage.setItem('height',JSON.stringify(getheightdata));
    localStorage.setItem('weight',JSON.stringify(getweightdata));
    sentdata.setAttribute('class','hideclass');
    updatalist(pagenumber);
  
}

function updatalist(pagenumber){
     str='';
     pagestr='';
     dataarry=[];
     var OnePage5Data=5;
     
     dataamount=getheightdata.length;
    var pageamount=Math.ceil(dataamount/OnePage5Data);
    
    for(i=0;i<getheightdata.length;i++){       
        var BMI=getweightdata[i]/(getheightdata[i]*getheightdata[i]/10000);
        BMI=BMI.toFixed(1);
        
        if(BMI<18.5){
            dataarry.push('<li class="allcolor"><ul><li class="colorblue"></li><li><span class="typebmi">有點過輕</span></li><li><span class="small">BMI</span><span class="lage">'+BMI+'</span></li><li><span class="small">height</span><span class="lage">'+getheightdata[i]+'cm</span></li><li><span class="small">weight</span><span class="lage">'+getweightdata[i]+'kg</span></li><li>'+new Date().getFullYear()+'/'+month+'/'+new Date().getDate()+'</li><li><img src="assets/x.png" class="xx" data-xxnum='+i+'></li></ul></li>');
            
        }
        if(18.5<=BMI&&BMI<24){
         
            dataarry.push('<li class="allcolor"><ul><li class="colorgreen"></li><li><span class="typebmi">非常理想</span></li><li><span class="small">BMI</span><span class="lage">'+BMI+'</span></li><li><span class="small">height</span><span class="lage">'+getheightdata[i]+'cm</span></li><li><span class="small">weight</span><span class="lage">'+getweightdata[i]+'kg</span></li><li>'+new Date().getFullYear()+'/'+month+'/'+new Date().getDate()+'</li><li><img src="assets/x.png" class="xx" data-xxnum='+i+'></li></ul></li>');
            
        
        }
        if(24<=BMI&&BMI<27){
            dataarry.push('<li class="allcolor"><ul><li class="coloryellow"></li><li><span class="typebmi">有點過重</span></li><li><span class="small">BMI</span><span class="lage">'+BMI+'</span></li><li><span class="small">height</span><span class="lage">'+getheightdata[i]+'cm</span></li><li><span class="small">weight</span><span class="lage">'+getweightdata[i]+'kg</span></li><li>'+new Date().getFullYear()+'/'+month+'/'+new Date().getDate()+'</li><li><img src="assets/x.png" class="xx" data-xxnum='+i+'></li></ul></li>');
        
        }
           
           
           
           if(27<=BMI&&BMI<35){
         
            dataarry.push('<li class="allcolor"><ul><li class="colororange"></li><li><span class="typebmi">中度肥胖</span></li><li><span class="small">BMI</span><span class="lage">'+BMI+'</span></li><li><span class="small">height</span><span class="lage">'+getheightdata[i]+'cm</span></li><li><span class="small">weight</span><span class="lage">'+getweightdata[i]+'kg</span></li><li>'+new Date().getFullYear()+'/'+month+'/'+new Date().getDate()+'</li><li><img src="assets/x.png" class="xx" data-xxnum='+i+'></li></ul></li>');
           
         
           }


        if(BMI>=35){
            dataarry.push('<li class="allcolor"><ul><li class="colorred"></li><li><span class="typebmi">重度肥胖</span></li><li><span class="small">BMI</span><span class="lage">'+BMI+'</span></li><li><span class="small">height</span><span class="lage">'+getheightdata[i]+'cm</span></li><li><span class="small">weight</span><span class="lage">'+getweightdata[i]+'kg</span></li><li>'+new Date().getFullYear()+'/'+month+'/'+new Date().getDate()+'</li><li><img src="assets/x.png" class="xx" data-xxnum='+i+'></li></ul></li>');
         
        }
    }  
    console.log(iconbox);
        if(sentdata.getAttribute('class')!='sent'){colorresult(BMI);}
        console.log(pageamount);
        showcolorbtn(BMI);             
        bingdata(dataamount,pagenumber);  
        updatapage(pageamount);
    }



       function updatapage(pageamount){
       var count=0;
        if(count<pageamount&&pageamount>0){
            count++;
        
        for(var p=1;p<=pageamount;p++){
        pagestr+='<li><a href="javascript:void(0)"data-pagenum='+p+'>'+p+'<a></li>';
    
       }
       page.innerHTML=pagestr;}}
        
      
       
       

       function bingdata(dataamount,pagenumber){
       for(var c=0;c<5;c++){
        if(typeof dataarry[dataamount-1-((pagenumber-1)*5)-c]!='undefined'){
        str+=dataarry[dataamount-1-((pagenumber-1)*5)-c];
       }
       }
       bmiitem.innerHTML=str;
       }

       page.addEventListener('click',showpage);
    function showpage(e){
     if(e.target.nodeName!="A"){return}
     pagenumber=e.target.dataset.pagenum;
     console.log(pagenumber);
     updatalist(pagenumber);
    }
    bmiitem.addEventListener('click',function(e){
          if(e.target.nodeName=="IMG"){
            getheightdata.splice(e.target.dataset.xxnum,1);
            getweightdata.splice(e.target.dataset.xxnum,1);
            localStorage.setItem('height',JSON.stringify(getheightdata));
            localStorage.setItem('weight',JSON.stringify(getweightdata));
            updatalist(pagenumber);
            }
       })
       function showcolorbtn(BMI){
       var btnresult='';
            btnresult=('<div><p class="seeresult">'+BMI+'<br><span>BMI<span></p><div class="iconbox"><img src="assets/icons_loop.png"></div></div>');            
            resultcolor.innerHTML= btnresult;
       }

       function colorresult(BMI){
        if(typeof BMI=='undefined'){
            resultcolor.setAttribute('class','hideresult');
            sentdata.setAttribute('class','sent')
        }
        if(BMI<18.5){
            resultcolor.setAttribute('class','resultblue');
    }
        if(18.5<=BMI&&BMI<24){
            resultcolor.setAttribute('class','resultgreen');
    }
        if(24<=BMI&&BMI<27){
            resultcolor.setAttribute('class','resultorange');
    }  
        if(27<=BMI&&BMI<35){
            resultcolor.setAttribute('class','resultorange');
    }
        if(BMI>=35){
            resultcolor.setAttribute('class','resultred');
            
    }
    
}




