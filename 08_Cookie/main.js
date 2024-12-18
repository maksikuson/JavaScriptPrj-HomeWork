window.onload = function() {
    const savedColors = getCookies('colors');
    if (savedColors) {
        const colors = JSON.parse(savedColors);
        displayColors(colors);
    }
};

function displayColors(colors) {
    const colorList = document.getElementById('color-list');
    colorList.innerHTML = ''; 
    colors.forEach(color => {
        const li = document.createElement('li');
        
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        
        colorBox.style.backgroundColor = getColorCode(color.code, color.type); 

        colorBox.innerHTML = `${color.name} <br>(${color.type}) <br>${color.code}`;
        
        li.appendChild(colorBox);
        colorList.appendChild(li);
    });
}

function getColorCode(code, type) {
    if (type === 'RGB' || type === 'RGBA') {
        return `rgb${type === 'RGBA' ? 'a' : ''}(${code})`;
    }
    return code;  
}

function validateColorCode(type, code) {
    let regex;
    switch (type) {
        case 'RGB':
            regex = /^(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})$/;
            break;
        case 'RGBA':
            regex = /^(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0(\.\d+)?|1(\.0+)?)$/;
            break;
        case 'HEX':
            regex = /^#[0-9A-Fa-f]{6}$/;
            break;
        default:
            return false;
    }
    return regex.test(code);
}

function getCookies(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

function setCookies(name, value, hours) {
    const expires = new Date();
    expires.setHours(expires.getHours() + hours);
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
}

document.getElementById('color-form').onsubmit = function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const type = document.getElementById('type').value;
    const colorCode = document.getElementById('color-code').value.trim();
    
    const errors = [];
    if (!name || !/^[a-zA-Z]+$/.test(name)) {
        errors.push("Name is required and must contain only letters.");
    }

    const savedColors = getCookies('colors') ? JSON.parse(getCookies('colors')) : [];
    if (savedColors.some(color => color.name.toLowerCase() === name.toLowerCase())) {
        errors.push("This color name already exists.");
    }

    if (!validateColorCode(type, colorCode)) {
        errors.push("Invalid color code.");
    }

    const errorMessages = document.getElementById('error-messages');
    errorMessages.innerHTML = '';
    if (errors.length > 0) {
        errorMessages.innerHTML = errors.join('<br>');
        return;
    }

    const newColor = { name, type, code: colorCode };
    savedColors.push(newColor);
    setCookies('colors', JSON.stringify(savedColors), 3); 
    displayColors(savedColors);
    
    document.getElementById('color-form').reset();
};