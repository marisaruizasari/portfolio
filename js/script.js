
$('.project-container').hover(function() {
    // console.log("hovering!")

    // get accent color
    let colorBlock = $(this).children().css("background-color");
    console.log(colorBlock)

    //make full view button visible and add background color
    $(this).find('a').css({'visibility':'visible', 'background-color': `${colorBlock}`});
    $(this).find('img').css({'opacity': '0.5'})

    //make img opacity lower

    // make this element come to the font
    $(this).css('z-index', '999999999')

    // make the lightbox effect visible (using the color of the hovered element accent block)
    $('#light-box').css({'visibility':'visible', 'z-index':'99999999', 'background-color': `${colorBlock}`});

    // make the quickview box visible
    $('#quickview').css({'visibility':'visible'})
    $('#qv-label').css({'background':`${colorBlock}`})
    $('#qv-content').css({'color':`${colorBlock}`})
    
    // get the x and y position of the hovered element
    let el = this.getBoundingClientRect()
    console.log(el)

    // if the x position is less than half of the viewport width, display the quickview on the right hand side, otherwise display it on the left
    if (el.x < window.innerWidth/2) {
        $('#quickview').css({'right':'20vw', 'left': ''})
    } else {
        $('#quickview').css({'left':'20vw', 'right': ''})
    }

}, function() {
    // console.log("mouseout!")

    // change visibility back to hidden and move elements back to the correct index
    $(this).css('z-index', '5')
    $('#light-box').css({'visibility':'hidden', 'z-index':'0'});
    $('#quickview').css({'visibility':'hidden'})
    $(this).find('a').css({'visibility':'hidden'})
    $(this).find('img').css({'opacity': '1.0'})
});