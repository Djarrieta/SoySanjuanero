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
            let j=0
            for(let img of item.img){
                cardImgElement=document.createElement('img')
                cardImgElement.setAttribute('class','cardImgElement')
                cardImgElement.setAttribute('src',img)
                cardImgElement.setAttribute('id','img '+j+' '+id)
                cardImgElement.setAttribute('onclick','nextCardImgElement(this.id.substring(this.id.length-7,this.id.length))')
                cardContainerImg.appendChild(cardImgElement)
                j++
            }
        //cardContainerImgNav
        if(item.img.length>1){
            const cardContainerImgNav=document.createElement('div')
            cardContainerImgNav.setAttribute('class','cardContainerImgNav')
            newCard.appendChild(cardContainerImgNav);
                //cardContainerImgNav button prev
                cardImgElement=document.createElement('img')
                cardImgElement.setAttribute('src','./icons/prev_24px.png')
                cardImgElement.setAttribute('id','prev'+id)
                cardImgElement.setAttribute('onclick','prevCardImgElement(this.id.substring(this.id.length-7,this.id.length))')
                cardContainerImgNav.appendChild(cardImgElement)
                //cardContainerImgNav button next
                cardImgElement=document.createElement('img')
                cardImgElement.setAttribute('src','./icons/right_button_24px.png')
                cardImgElement.setAttribute('id','next'+id)
                cardImgElement.setAttribute('onclick','nextCardImgElement(this.id.substring(this.id.length-7,this.id.length))')
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
                quantitySelection.setAttribute('class','cardContainerSocialList')
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

//NEXT IMG
function nextCardImgElement(card){
    
    if(datos[parseInt(card.substring(card.length-3,card.length))].img.length==1) {return}
    const c=$('#'+card + ' .cardContainerImg')
    const w=parseInt($('#'+card).offsetWidth) 
    if(c.style.marginLeft==''){
        c.style.marginLeft="-"+w+"px"
    }else{
        const leftIni=c.style.marginLeft.substring(0,c.style.marginLeft.length-2)
        const leftMax=(datos[parseInt(card.substring(card.length-3,card.length))].img.length-1)*-w
        if(leftMax==leftIni){   
            c.style.marginLeft='0px'
        }else{
            const leftFin=leftIni-w
            c.style.marginLeft=leftFin+'px'
        }
    }
}
//PREV IMG
function prevCardImgElement(card){
    const c=$('#'+card + ' .cardContainerImg')
    const w=parseInt($('#'+card).offsetWidth)
    const leftIni=c.style.marginLeft.substring(0,c.style.marginLeft.length-2)
    const leftMax=(datos[parseInt(card.substring(card.length-3,card.length))].img.length-1)*-w
    let leftFin;

    if(c.style.marginLeft=='' ||c.style.marginLeft=='0px'){
        leftFin=leftMax+'px'
        c.style.marginLeft=leftFin
    }else{
        leftFin=w+parseInt(leftIni) 
        c.style.marginLeft=leftFin+'px'
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
function hideAbout(){
    $('#aboutDetail').classList.add('hide')
    $('#containerDetail').innerHTML=''
}
function showSoySanjuanero(){
    //About Detail
    const aboutDetail=$('#aboutDetail')
    aboutDetail.classList.remove('hide')
    //Container
    const containerDetail=$('#containerDetail');
    //Image
    const detailImg=document.createElement('img');
    detailImg.setAttribute('class','detailImg')
    detailImg.setAttribute('src','https://i.imgur.com/iAsv8NK.jpg')
    containerDetail.appendChild(detailImg);
    
    //Title
    const detailTitle=document.createElement('div');
    detailTitle.setAttribute('class','detailTitle');
    detailTitle.innerHTML='SOY SANJUANERO'
    containerDetail.appendChild(detailTitle);
    //Text
    const detailText=document.createElement('div');
    detailText.setAttribute('class','detailText');
    detailText.innerHTML='San Juan Nepomuceno es un municipio ubicado en la parte norte del departamento de Bolívar.  Rico en cultura, gastronomía e historia. Éste municipio  además pertenece a la región de Los Montes De María, es reconocido por el Santuario de Flora y Fauna Los Colorados.  #SoySanjuanero inicia sus labores en el año 2.017, cuando un grupo de amigos locales identifican que dentro de cada  ámbito cultural presente en este municipio, siempre existe una historia que contar, por lo tanto, se conforma un grupo de trabajo colectivo que se da a la tarea de investigar,  documentar y difundir a través de escritos, imágenes y videos las vivencias que resaltan lo que es ser sanjuanero.  <br><br> #SoySanjuanero no tiene color político, su trabajo es netamente independiente, fuera de cualquier tipo de  intervención pública o privada. Sin embargo, su raíz  principal se sostiene gracias al valor que cada uno de ustedes como sociedad nos brinda para seguir avanzando en este hermoso proyecto.'
    containerDetail.appendChild(detailText);
}
function showSanJuanNepo(){
    //About Detail
    const aboutDetail=$('#aboutDetail')
    aboutDetail.classList.remove('hide')
    //Container
    const containerDetail=$('#containerDetail');
    //Image
    const detailImg=document.createElement('img');
    detailImg.setAttribute('class','detailImg')
    detailImg.setAttribute('src','https://scontent.fbaq5-1.fna.fbcdn.net/v/t1.0-9/s960x960/103790826_1136393816744606_8841400399473692648_o.jpg?_nc_cat=103&_nc_sid=2d5d41&_nc_eui2=AeHaosbFPsdElITSE9j57BZ8_1YxKiDJ1Qb_VjEqIMnVBj23nGqekTMLFeG__5DEywo&_nc_ohc=FmQpzeXXfusAX8hAwdh&_nc_ht=scontent.fbaq5-1.fna&_nc_tp=7&oh=f6ae356fec4f2ab4940006dfdc2af1a3&oe=5F1C094E')
    containerDetail.appendChild(detailImg);
    
    //Title
    const detailTitle=document.createElement('div');
    detailTitle.setAttribute('class','detailTitle');
    detailTitle.innerHTML='SAN JUAN NEPOMUCENO'
    containerDetail.appendChild(detailTitle);
    //Text
    const detailText=document.createElement('div');
    detailText.setAttribute('class','detailText');
    detailText.innerHTML='San Juan Nepomuceno es la tierra donde se puya bastante ñame y yuca harinosa con suero atollabuey, queso finquero y machucao de ají chivato. Aquí te embarrutas el bigote de merengue y dulce de leche saboreando una galleta maria luisa y además somos la tierra donde suena la abarca tres puntá del campesino y rebuzna el burro avisando que llegó el bastimento. Somos la tierra donde la cultura y la inteligencia es peste y se riega como la verdolaga en playón, estamos repletos de gente servicial, ponedera de sebo y con berraquera pa echá pa lante cualquier situación. <br><br> Fue fundado durante la época de la Colonia, el  10 de agosto  de  1776 , por Antonio de la Torre y Miranda, cuando llegó al valle de los Carretos trayendo consigo las primeras familias provenientes de Pileta (hoy Corozal) y de San Benito de Abad; estas familias estuvieron constituidas por 120 personas. El 11 de mayo de 1779 se protocolizaron los límites y las actas de posesión de los ejidos y distritos de San Juan y San Cayetano ante el escribano del Carmen, fue declarado municipio en el año de 1870. Luego se organiza la población convirtiéndose en un centro de mercadeo regional. <br><br> Según los restos arqueológicos encontramos en la región que este sitio estuvo habitado durante épocas muy remotas por grupos indígenas de la cultura denominada Malibues que pertenecían a la gran familia Caribe, estos nos dejaron como legado cultural el uso del bejuco Malibú, utilizaron la construcción de casas y corrales. Vivían en una etapa conocida en la arqueología americana Colombiana como Paleóindio Arcaico, cuyas principales características son: recolección de frutas y raíces, fabricación de una cerámica rústica con grabaciones zoomorfas. Estos restos señalan los primeros asentamientos indígenas de Colombia y se localizan en la costa norte del país, remontándose a una antigüedad de 400 a 1000 años a. C. En la época federal colombiana perteneció a la Provincia del Carmen en el Estado Soberano de Bolívar.'
    containerDetail.appendChild(detailText);

    const detailMap=document.createElement('div')
    detailMap.setAttribute('class','detailImg');
    detailMap.innerHTML="<iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15719.173627315484!2d-75.09258272264908!3d9.951139836153866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e58b6685173d38b%3A0xa300e510d5fcb0a!2sSan%20Ju%C3%A1n%20Nepomuceno%2C%20Bol%C3%ADvar!5e0!3m2!1ses-419!2sco!4v1593204763930!5m2!1ses-419!2sco' width='100%' height='400' frameborder='0' style='border:0;' allowfullscreen='' aria-hidden='false' tabindex='0'></iframe>"
    containerDetail.appendChild(detailMap);
}

//MOSTRAR DETALLES DE REDES SOCIALES
function ShowMenuSocialDetail(cont){
    $('#menuSocialDetail').innerHTML=cont.dataset.text
}
//SCROLL TO TOP
function scrollToTop(){
    $('#main').scrollTop= 0
}

//USAGE
traerDatos()

