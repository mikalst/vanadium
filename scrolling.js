document.addEventListener('keydown', async (event) => {
    const keyName = event.key;
  
    // do not run when only Control key is pressed.
    if (keyName === 'Control') return;
    if (event.ctrlKey) return;    
    
    // do not run when input is active.
    if (document.activeElement.tagName === 'INPUT') return;

    console.debug(`VANADIUM: Key pressed ${keyName}`);

    // Scrolling
    if (keyName === 'k')
    {
        if (!cooldown)
        {
            scroll(-0.5);
            cooldown = startScrollCooldown();
        }
    }
    else if (keyName === 'j')
    {
        if (!cooldown)
        {
            scroll(0.5);
            cooldown = startScrollCooldown();
        }
    }
}, false);
  
var cooldown = null;

function scroll(y) {
    window.scrollBy({
        top: y*window.innerHeight,
        left: 0
    });
}

function startScrollCooldown() {

    return setTimeout(function () {
        cooldown = null;
    }, 50);
}