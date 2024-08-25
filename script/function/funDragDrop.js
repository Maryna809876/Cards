import interact from 'https://cdn.interactjs.io/v1.9.20/interactjs/index.js'
export function makeDraggable() {
    interact('.draggable').draggable({
      inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true
        })
      ],
  
      listeners: {
        move: dragMoveListener
      }
    });
  
    function dragMoveListener(event) {
      var target = event.target;
      var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
      target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }
  }

