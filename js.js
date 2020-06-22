//SHOW OR HIDE LATERAL MENU
function ShowHideMenu(){
    const menu=$('.menu')
    const overlay=$('#overlay')
    const sandwich=$('#sandwich')
    if(menu.classList.contains('hideMenu')){
        menu.classList.remove('hideMenu')
        overlay.classList.add('showOverlay')
        sandwich.classList.add('rotate')
    }else{
        menu.classList.add('hideMenu') 
        overlay.classList.remove('showOverlay')
        sandwich.classList.remove('rotate')
    }
}
//SELECTOR 
function $(selector){
    return document.querySelector(selector)
}
//SHOW OR HIDE CARD DETAIL
function hideShowCard(id){
    const cardDetail=$('#cardDetail');
    const cardDetailTitle=$('#cardDetailTitle')
    const cardDetailText=$('#cardDetailText')
    const cardTarget=$('#'+id);
    const title=cardTarget.childNodes[0].textContent
    const text=cardTarget.childNodes[1].textContent
    cardDetailTitle.innerHTML=title
    cardDetailText.innerHTML=text




    cardDetail.classList.remove('hide')
}
//READ JSON
 function traerDatos(){
    var xhttp=new XMLHttpRequest();
    xhttp.open("GET","historias.json",true);
    xhttp.send();
    
    xhttp.onreadystatechange=function (){
        if(this.readyState==4 && this.status==200){
            let datos=JSON.parse(this.responseText) 
            createCards(datos)
        }
    }
}

//CREATE CARDS
function createCards(itemJson){
    var i=0;
    for(let item of itemJson){
        createOneCard(i,item.title,item.text,item.img,item.link)
        i++;
    }     
}

function createOneCard(i,title,text,img,link){
    //Declarations and initializations
    const newCard=document.createElement('div');
    const cardTitle=document.createElement('div');
        const cardTitleSpan=document.createElement('span');
            const CardTitleSpanText=document.createTextNode(title)
    const cardText=document.createElement('div');
        const cardTextP=document.createElement('p');
            const CardTextPText=document.createTextNode(text)
    const cardImg=document.createElement('div');
        const cardImgImg=document.createElement('img');

    //set attributes to elements
    newCard.setAttribute('class','card');
    newCard.setAttribute('onclick','hideShowCard(this.id)');
    newCard.setAttribute('id','card'+i);
        cardTitle.setAttribute('class','cardTitle')
        cardText.setAttribute('class','cardText')
        cardImg.setAttribute('class','cardImg')
            cardImgImg.setAttribute('src',img) 

    //set childs
    $('#main').appendChild(newCard);
    newCard.appendChild(cardTitle);
        cardTitle.appendChild(cardTitleSpan);
            cardTitleSpan.appendChild(CardTitleSpanText);
    newCard.appendChild(cardText);
        cardText.appendChild(cardTextP);
        cardTextP.appendChild(CardTextPText);
    newCard.appendChild(cardImg);
        cardImg.appendChild(cardImgImg);
}

traerDatos()
