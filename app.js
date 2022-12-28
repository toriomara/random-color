const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', e => {
  e.preventDefault()
  if(e.code === 'Space') {
    setRandomColors();
  };
})

document.addEventListener('click', e => {
  const type = e.target.dataset.type
  if (type === 'lock') {
    const node = e.target.tagName.toLowerCase() === 'i'
     ? e.target
     : e.target.children[0]

     node.classList.toggle('fa-lock-open');
     node.classList.toggle('fa-lock');
  } else if (type === 'copy') {
    copyToClickboard(e.target.textContent);
  }
})

function generateRandomColor() {
  const hexCodes = '0123456789ABCDEF';
  let color = '';
  for(let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }
  return `#${color}`
}

function copyToClickboard(text) {
  return navigator.clipboard.writeText(text);  
}

function setRandomColors(isinitial) {
  const colors = isinitial ? getColorsFromHash() : [];
  cols.forEach((col, index) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock');
    const text = col.querySelector('h2');
    const button = col.querySelector('button');
    const color = isinitial 
      ? colors[index] 
        ? colors[index] 
          : generateRandomColor() 
      : generateRandomColor();

    if (isLocked) {
      colors.push(text.textContent);
      return
    }

    // const color = isinitial ? colors[index] : 

    if (!isinitial) {
      colors.push(color);
    }

    text.textContent = color;
    col.style.background = color;

    setTextColor(text, color, button);
  })
  updateColorsHash(colors);
}

function setTextColor(text, color, button) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? 'black' : 'white'
  button.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateColorsHash(colors = []) {
  document.location.hash = colors.map((col) => col.substring(1)).join('-')
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
return document.location.hash.substring(1).split('-').map(color => `#${color}`)
  }
  return []
}

setRandomColors(true)