var closeEnoughColors = new CloseEnoughColors();
var colors = {
  personal: '#ffffff',
  palette: [
    '#ffffff',
    '#000000'
  ]
};
var personalColorInput = document.querySelector('[name="personal-color"]');
var paletteColorInputsContainer = document.getElementsByClassName('palette-inputs')[0];
var paletteColorInputs;
var paletteColorInputHTML = '';
var paletteColorAddButton = document.getElementById('palette-color-add');
var initPaletteColorsLength = colors.palette.length;
var resultElement = document.getElementById('result-color');
var resultContainerElement = document.getElementById('result');
var resultHexElement = document.getElementById('result-color-hex');
var resultRGBElement = document.getElementById('result-color-rgb');
var resultHexCopyButton = document.getElementById('result-hex-copy');
var resultRGBCopyButton = document.getElementById('result-rgb-copy');
var setResult = function (result) {
  if (result) {
    resultContainerElement.style = 'display: block;';
    resultElement.style = 'background-color: ' + result.hex + ';';
    resultHexElement.value = result.hex;
    resultRGBElement.value = 'rgb(' + result.rgb.r + ', ' + result.rgb.g + ', ' + result.rgb.b + ')';
  } else {
    resultContainerElement.style = 'display: none;';
  }
};
var paletteChange = function (e) {
  var input = e.target;
  var inputIndex = Number(input.name);
  var result;

  colors.palette[inputIndex] = input.value;
  result = closeEnoughColors.getClosestColor( colors.personal, colors.palette );

  setResult(result);
};
var i;

for (i = 0; i < initPaletteColorsLength; i++) {
  paletteColorInputHTML += '<div>' +
      '<input class="palette-input" id="palette-color-' + (i + 1) + '" name="' + (i + 1) + '" type="color" value="' + colors.palette[i] + '" />' +
    '</div>';
}

paletteColorInputsContainer.innerHTML = paletteColorInputHTML;
paletteColorInputs = document.getElementsByClassName('palette-input');
personalColorInput.value = colors.personal;

for (i = 0; i < initPaletteColorsLength; i++) {
  paletteColorInputs[i].onchange = paletteChange;
}

personalColorInput.onchange = function (e) {
  var result = closeEnoughColors.getClosestColor( e.target.value, colors.palette );

  colors.personal = e.target.value;

  setResult(result);
}

paletteColorAddButton.onclick = function (e) {
  var newColor = '#000000';
  var newInputContainer = document.createElement('div');
  var newInputCount = paletteColorInputs.length + 1;
  var result;

  colors.palette.push(newColor);
  result = closeEnoughColors.getClosestColor( colors.personal, colors.palette );

  newInputContainer.innerHTML = '<input class="palette-input" id="palette-color-' + newInputCount + '" name="' + newInputCount + '" type="color" value="' + newColor + '" />';
  paletteColorInputsContainer.appendChild(newInputContainer);
  paletteColorInputs = document.getElementsByClassName('palette-input');

  newInputContainer.getElementsByClassName('palette-input')[0].onchange = paletteChange;

  setResult(result);
}

resultHexCopyButton.onclick = function () {
  resultHexElement.select();
  document.execCommand("Copy");
  resultHexCopyButton.innerText = 'Copied!';
  setTimeout(function () {
    resultHexCopyButton.innerText = 'Copy';
  }, 3000);
}

resultRGBCopyButton.onclick = function () {
  resultRGBElement.select();
  document.execCommand("Copy");
  resultRGBCopyButton.innerText = 'Copied!';
  setTimeout(function () {
    resultRGBCopyButton.innerText = 'Copy';
  }, 3000);
}

setResult(closeEnoughColors.getClosestColor( colors.personal, colors.palette ));
