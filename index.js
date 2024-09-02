const timelines = Array.from(document.querySelectorAll(".timeline"));
const root = document.querySelector(":root");

timelines.forEach(timeline => {
    let barItems = Array.from(timeline.querySelectorAll('.item'))
    barItems.forEach(item => {
        item.addEventListener('click', function () {
            if(this.classList.contains('pop-out')) return;
            barItems.forEach(item => {
                if(barItems.indexOf(item) > barItems.indexOf(this)) {
                    item.classList.remove('active-ring');
                } 
                else {
                    item.classList.add('active-ring');
                }
            } )

            timeline.querySelector('.timeline-window-item.active').classList.add('item-leave');
            setTimeout(() => {
                timeline.querySelectorAll('.timeline-window-item').forEach(content => {
                    content.classList.remove('item-leave');
                });
                // remove active class from all content items
                timeline.querySelectorAll('.timeline-window-item').forEach(content => {
                    content.classList.remove('active');
                });
                // remove pop-out class from all bar items
                barItems.forEach(item => {
                    item.classList.remove('pop-out');
                })
                // add active class to target content item
                const target = this.getAttribute('data-itemId');
                timeline.querySelector(`#${target}`).classList.add('active');

                this.classList.add('pop-out');
            }, 500);


            // animate timeline bar length
            if (window.innerWidth < 768) {
                root.style.setProperty("--timelineBarLength", this.offsetTop - barItems[0].offsetTop + "px");
            } else {
                root.style.setProperty("--timelineBarLength", this.offsetLeft - barItems[0].offsetLeft + "px");
            }
        })
    })
})

// Reset timeline bar length on window resize
window.addEventListener('resize', function () {
    root.style.setProperty("--timelineBarLength", 0 + "px");
    timelines.forEach(timeline => {
        timeline.querySelectorAll('.timeline-window-item').forEach(content => {
            content.classList.remove('active');
        });
        timeline.querySelectorAll('.item').forEach(item => { item.classList.remove('active-ring') });
        timeline.querySelectorAll('.item').forEach(item => { item.classList.remove('pop-out') });
        timeline.querySelectorAll('.item')[0].classList.add('pop-out');
        timeline.querySelectorAll('.timeline-window-item')[0].classList.add('active');
    })

});