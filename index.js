const timelines = Array.from(document.querySelectorAll(".timeline"));

timelines.forEach(timeline => {
    let barItems = Array.from(timeline.querySelectorAll('.item'))
    barItems.forEach(item => {
        item.addEventListener('click', function () {
            timeline.querySelectorAll('.timeline-window-item').forEach(content => {
                content.classList.remove('active');
            });
            const target = this.getAttribute('data-itemId');
            timeline.querySelector(`#${target}`).classList.add('active');

            const root = document.querySelector(":root");
            
            if(window.innerWidth < 768){
                root.style.setProperty("--timelineBarLength", this.offsetTop - barItems[0].offsetTop  + "px");
            } else {
                root.style.setProperty("--timelineBarLength", this.offsetLeft -barItems[0].offsetLeft  + "px");
            }
        })
    })
})