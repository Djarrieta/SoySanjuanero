var datos
//READ JSON
function traerDatos(){
    var xhttp=new XMLHttpRequest();
    xhttp.open("GET","historias.json",true);
    xhttp.send();
    
    xhttp.onreadystatechange=function (){
        if(this.readyState==4 && this.status==200){
            datos=JSON.parse(this.responseText) 
            createCards(datos)
        }
    }
}
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
    const cardDetailTextAdd=$('#cardDetailTextAdd')
    const cardDetailImg=$('#cardDetailImg')

    if(cardDetail.classList.contains('hide')){
        const cardImg=datos[parseInt(id.substring(id.length-3,id.length))].img
        const cardTitle=datos[parseInt(id.substring(id.length-3,id.length))].title
        const cardText=datos[parseInt(id.substring(id.length-3,id.length))].text
        const cardTextAdd=datos[parseInt(id.substring(id.length-3,id.length))].textAdd
        const cardLink=datos[parseInt(id.substring(id.length-3,id.length))].link

        cardDetailImg.src=cardImg
        cardDetailTitle.innerHTML=cardTitle
        cardDetailText.innerHTML=cardText
        cardDetailTextAdd.innerHTML=cardTextAdd
        cardDetail.classList.remove('hide')
    }else{
        cardDetail.classList.add('hide')
    }
}
//SHOW ABOUT WITH DETAIL CARD
function showSoySanjuanero(){
    const cardDetail=$('#cardDetail');
    const cardDetailTitle=$('#cardDetailTitle')
    const cardDetailText=$('#cardDetailText')
    const cardDetailTextAdd=$('#cardDetailTextAdd')
    const cardDetailImg=$('#cardDetailImg')

    cardDetailImg.src='https://i.imgur.com/iAsv8NK.jpg'
    cardDetailTitle.innerHTML='SOBRE NOSOTROS'
    cardDetailText.innerHTML='San Juan Nepomuceno es un municipio ubicado en la parte norte del departamento de Bolívar. Rico en cultura, gastronomía e historia. Este municipio además pertenece a la región de Los Montes De María, es reconocido por el Santuario de Flora y Fauna Los Colorados.'
    cardDetailTextAdd.innerHTML='#SoySanjuanero inicia sus labores en el año 2017, cuando un grupo de amigos locales identifican que, dentro de cada ámbito cultural presente en este municipio, siempre existe una historia que contar, por lo tanto se conforma un grupo de trabajo colectivo que se da a la tarea de investigar, documentar y difundir a través de escritos, imágenes y videos las vivencias que resaltan lo que es ser sanjuanero. 			#SoySanjuanero no tiene color político, su trabajo es netamente independiente, fuera de cualquier grupo de intervención pública o privada. Sin embargo, su raíz principal se sostiene gracias al valor que cada uno de ustedes como sociedad nos brinda para seguir avanzando en este hermoso proyecto.'
    cardDetail.classList.remove('hide')   
}

function showSanJuanNepo(){
    const cardDetail=$('#cardDetail');
    const cardDetailTitle=$('#cardDetailTitle')
    const cardDetailText=$('#cardDetailText')
    const cardDetailTextAdd=$('#cardDetailTextAdd')
    const cardDetailImg=$('#cardDetailImg')

    cardDetailImg.src='https://i.imgur.com/vAGXP1z.png'
    cardDetailTitle.innerHTML='SAN JUAN NEPOMUCENO BOLÍVAR'
    cardDetailText.innerHTML='Yo soy donde es la tierra del mico Colorado, donde la inteligencia es peste y es riega como la verdolaga. '
    cardDetailTextAdd.innerHTML='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit id laborum voluptas commodi, aperiam quidem temporibus natus consequatur libero quia veniam fuga, praesentium autem sequi rem facere reprehenderit, deleniti quisquam.     Perspiciatis, unde dolorum? Ut nihil fugit repellat sint nostrum eveniet perferendis perspiciatis quia quam corporis saepe, commodi harum consequuntur ex tempora omnis nobis magnam aspernatur officia modi voluptatibus illum sapiente.    Voluptatum quibusdam fugit debitis, laboriosam rem cupiditate nesciunt possimus delectus molestiae porro aliquam officiis quisquam quas tempora obcaecati veritatis nam corrupti iure perferendis ab reiciendis, soluta non! Cum, corporis impedit!    Labore sint illum iusto magni asperiores eos tempora. Pariatur impedit dolores et quisquam ad esse molestiae accusantium perferendis officiis reprehenderit optio, cum reiciendis est maxime labore? Incidunt quaerat quo facilis?    Nesciunt beatae dolores dolorem necessitatibus, cupiditate voluptates doloribus corporis rerum earum voluptatibus impedit doloremque veritatis, asperiores dolor exercitationem sequi blanditiis nisi dignissimos molestias quo vel eligendi incidunt consequatur! Voluptatem, velit.'
    cardDetail.classList.remove('hide')   
}

//CREATE CARDS
function createCards(itemJson){
    var i=0;
    for(let item of itemJson){
        createOneCard(i,item.title,item.text,item.img,item.link)
        i++;
    }    
    console.log(i) 
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

    let id='000'+i
    id='card'+ id.substring(id.length-3,id.length)
    //set attributes to elements
    newCard.setAttribute('class','card');
    newCard.setAttribute('onclick','hideShowCard(this.id)');
    newCard.setAttribute('id',id);
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
//SCROLL TO TOP ON MAIN
function ScrollToTop(){
    $('#main').scrollTop=0
}
//MOSTRAR DETALLES DE REDES SOCIALES
function ShowMenuSocialDetail(cont){
    $('#menuSocialDetail').innerHTML=cont.dataset.text
}
//USAGE
traerDatos()
$('body').scrollTop=1000
