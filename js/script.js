
window.addEventListener('DOMContentLoaded', function () {
	loadData();
});

function loadData() {
	$.getJSON("content.json", (projects)=> {

        console.log(projects);

        // call the handlebars function from below
		handle(projects);

	});
}

// add projects to page using handlebars 
function handle(projects) {

    let source = $("#project-template").html();
    let projectTemplate = Handlebars.compile(source);
    let result = projectTemplate(projects);
    let container = $('#projects-container');
    container.append(result);

    // call the function to add all interactivity
    addInteractivity(projects);
}


function addInteractivity(projects) {

    // add random padding to projects
    let rowComponents = $('.flexrow-component')

    for (const comp of rowComponents) {
        let randomPadding = Math.random() * 150;
        $(comp).css({"margin-top": randomPadding})
    }
    

    $('.project-container').hover(function() {
        // console.log("hovering!")

        console.log(projects);

        // add info to quickview from json

        // get the project id
        let projectID = $(this).attr('id');
        console.log('id from project container', projectID);

        // find the project in my JSON data that matches the project being hovered on in the page 
        projects.projects.filter(function(p) {
            if (p.id == projectID) {
                console.log(p)
                // set the quickview text with the correct project info
                $('#qv-title').text(p.title);
                $('#qv-description').text(p.description);
                $('.qv-libraries').html('<strong>libraries: <strong>');
                for (const l of p.libraries) {
                    $('.qv-libraries').append(l)
                }
                $('#qv-logo').text(p.id.toUpperCase());
            }
        }); 

        // get accent color
        let colorBlock = $(this).children().css("background-color");
        console.log(colorBlock)

        //make full view button visible and add background color
        $(this).find('a').css({'visibility':'visible', 'background-color': colorBlock});
        $(this).find('img').css({'opacity': '0.5'})

        //make img opacity lower

        // make this element come to the font
        $(this).css('z-index', '999999999')

        // make the lightbox effect visible (using the color of the hovered element accent block)
        $('#light-box').css({'visibility':'visible', 'z-index':'99999999', 'background-color': `${colorBlock}`});

        // make the quickview box visible
        $('#quickview').css({'visibility':'visible'})
        $('#qv-label').css({'background':`${colorBlock}`})
        $('#qv-content').css({'color':`${colorBlock}`, 'display':'', 'flex-direction': ''})
        $('#qv-content-text').css({'flex-basis':'', 'padding-right':''})
        
        // get the x and y position of the hovered element
        let el = this.getBoundingClientRect()
        console.log(el)

        // if window width is greater than 1140 px set the position of the quickview box right or left
        if (window.innerWidth > 1140) {
            // if the x position is less than half of the viewport width, display the quickview on the right hand side, otherwise display it on the left
            if (el.x < window.innerWidth/2) {
                $('#quickview').css({'right':'20vw', 'top': '15vh', 'width': '30vw', 'height': '70vh','left': ''})
            } else {
                $('#quickview').css({'left':'20vw', 'width': '30vw', 'height': '70vh', 'right': ''})
            }
        } else {

            if (el.y < window.innerHeight/2) {
                $('#quickview').css({'right':'', 'left':'0', 'bottom':'0px', 'width':'100%', 'height':'40vh', 'top': ''})
                $('#qv-content').css({'display':'flex', 'flex-direction': 'row'})
                $('#qv-content-text').css({'flex-basis':'60%', 'padding-right':'20px'})
                $('#qv-logo').css({'flex-basis':'20%'})
            } else {
                $('#quickview').css({'visibility':'hidden'})
            }
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

}

