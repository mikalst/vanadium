document.addEventListener('keydown', async (event) => {
    const keyName = event.key;
  
    // do not run when only Control key is pressed.
    if (keyName === 'Control') return;
    if (event.ctrlKey) return;    
    
    // do not run when input is active.
    if (document.activeElement.tagName === 'INPUT') return;

    console.debug(`VANADIUM: Key pressed ${keyName}`);

    if (keyName != 'f' && keyName != 'Escape' && isNaN(keyName)) return;

    if (!isNaN(keyName))
    {
        linkToFollow = linkToFollow + keyName.toString();
        console.debug("VANADIUM: Following link ", linkToFollow, ": ", globalLinks[linkToFollow]);
        if (timer)
        {
            clearTimeout(timer);
        }
        timer = startTimer();
    }
    // Links
    else if (keyName === 'f')
    {
        // Fire and forget.
        await removeLinks();
        findLinks();
    }
    else if (keyName === 'Escape')
    {
        // Fire and forget.
        removeLinks();
    }
}, false);
  
var globalLinks = {};
var linkToFollow = '';
var timer = null;
var numberOfLinks = 0;

async function findLinks() {
    var linkElements = document.getElementsByTagName("A");

    numberOfLinks = linkElements.length;

    for (var i=1; i<linkElements.length; i++)
    {
        link = linkElements[i];
        var rect = link.getBoundingClientRect();
        
        var div=document.createElement("div"); 
        div.style.position = 'absolute';
        div.style.left = rect.left + 'px';
        div.style.top = (window.scrollY + rect.top) + 'px';
        div.style.backgroundColor="black";
        div.style.color="yellow";
        div.id='linkToFollow' + i;

        document.body.appendChild(div);
        div.innerText=i.toString();
        globalLinks[i] = link.href;
    }
}

async function removeLinks() {
    for (var i=1; i<numberOfLinks; i++)
    {
        link = globalLinks[i];
        var element = document.getElementById('linkToFollow' + i)
        if (element)
        {
            element.remove();
        }
    }
    globalLinks = {};
    linkToFollow = '';
    timer = null;
    numberOfLinks = 0;
}

function startTimer() {
    return setTimeout(function () {
        console.log(linkToFollow);
        var link = globalLinks[linkToFollow];
        if (globalLinks[linkToFollow])
        {
            setTimeout(function () {
                window.location.href = link;
            }, 100);
        }
        linkToFollow = '';
    }, 500);
}