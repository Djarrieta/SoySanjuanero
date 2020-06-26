var datos
//SELECTOR 
function $(selector){
    return document.querySelector(selector)
}
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
//CREATE CARDS
function createCards(itemJson){
    var i=0;
    for(let item of itemJson){
        if(item.img.length>0){
            createOneCard(item,i)
            i++;
        }
    }    
}
//CREATE SINGLE CARD
function createOneCard(item,i){
    //card
    const newCard=document.createElement('div');
    let id='000'+i
    id='card'+ id.substring(id.length-3,id.length)
    newCard.setAttribute('class','card');
    newCard.setAttribute('id',id);
    $('#main').appendChild(newCard);
        //cardContainerImg
        const cardContainerImg=document.createElement('div')
        cardContainerImg.setAttribute('class','cardContainerImg')
        newCard.appendChild(cardContainerImg);
            //cardImgElement img 
            let cardImgElement
            for(let img of item.img){
                cardImgElement=document.createElement('img')
                cardImgElement.setAttribute('class','cardImgElement')
                cardImgElement.setAttribute('src',img)
                cardContainerImg.appendChild(cardImgElement)
            }
        //cardContainerImgNav
        if(item.img.length>1){
            const cardContainerImgNav=document.createElement('div')
            cardContainerImgNav.setAttribute('class','cardContainerImgNav')
            newCard.appendChild(cardContainerImgNav);
                //cardContainerImgNav button prev
                cardImgElement=document.createElement('img')
                cardImgElement.setAttribute('src','./icons/prev_24px.png')
                cardContainerImgNav.appendChild(cardImgElement)
                //cardContainerImgNav button next
                cardImgElement=document.createElement('img')
                cardImgElement.setAttribute('src','./icons/right_button_24px.png')
                cardContainerImgNav.appendChild(cardImgElement)
        }
        //cardContainerSocial
        const cardContainerSocial=document.createElement('div')
        cardContainerSocial.setAttribute('class','cardContainerSocial')
        newCard.appendChild(cardContainerSocial);
            //cardSocial
            createSocialElement(item.socialWhatsapp,'./icons/whatsapp_64px.png',cardContainerSocial)
            createSocialElement(item.socialFacebook,'./icons/facebook_circled_64px.png',cardContainerSocial)
            createSocialElement(item.socialInstagram,'./icons/instagram_old_64px.png',cardContainerSocial)
            createSocialElement(item.socialWeb,'./icons/website_64px.png',cardContainerSocial)
            createSocialElement(item.socialEmail,'./icons/email_64px.png',cardContainerSocial)
            createSocialElement(item.socialTel,'./icons/cell_phone_64px.png',cardContainerSocial)
            //quantity selection
            if(item.compra && item.compra.length>0){
                const quantitySelection=document.createElement('select')
                quantitySelection.setAttribute('name','Selecciona')
                quantitySelection.setAttribute('id','cant'+id)
                cardContainerSocial.appendChild(quantitySelection)
                    //quantity selection value
                    for(let j=1;j<item.compra.length+1;j++){
                        const quantitySelectionValue=document.createElement('option')
                        quantitySelectionValue.setAttribute('value',j)
                        quantitySelectionValue.innerHTML=j
                        quantitySelection.appendChild(quantitySelectionValue)
                    }
                //shop
                createSocialElement(item.compra[0],'./icons/add_shopping_cart_64px.png',cardContainerSocial)
            }

        //cardText
        if(item.text){
            const cardText=document.createElement('div')
            cardText.setAttribute('class','cardText')
            cardText.innerHTML=item.text
            newCard.appendChild(cardText);
        }

}
//CREATE SOCIAL ELEMENT
function createSocialElement(SocialElement,icon,cardContainerSocial){
    if(SocialElement && SocialElement!=''){
        //cardSocial
        const cardSocial=document.createElement('a')
        cardSocial.setAttribute('class','cardSocial')
        cardSocial.setAttribute('target','blank()')
        cardSocial.setAttribute('href',SocialElement)
        cardContainerSocial.appendChild(cardSocial)
            //cardSocial img
            const cardSocialImg=document.createElement('img')
            cardSocialImg.setAttribute('src',icon)
            cardSocial.appendChild(cardSocialImg)
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

//SHOW ABOUT
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

