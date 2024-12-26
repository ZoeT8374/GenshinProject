function useTabs(evt, tabName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tabsbutton");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function toggleContent(imageId, textId) {
    var image = document.getElementById(imageId);
    var text = document.getElementById(textId);
    
    image.classList.add('hidden');
    text.classList.remove('hidden');
}
