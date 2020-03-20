let projectID = window.location.href.split('?')[1];
console.log(projectID)

let thisProject;

window.addEventListener('DOMContentLoaded', function () {
    loadData();
    
});

function loadData() {
	$.getJSON("content.json", (projects)=> {

        thisProject = projects.projects.filter( p => p.id == projectID)[0]
        console.log(thisProject);

        // call the handlebars function from below
		handle(thisProject);

	});
}

// add project information to page using handlebars 
function handle(project) {

    $('#fixed-back').css({'background': project.color})
    $('#title').html(project.title);
    $('#description').html(project.description);
    $('#project-link').prop('href', project['github-link']);
    $('#project-img').prop('src', `images/thumbnails/${project.images.thumbnail}`);

}