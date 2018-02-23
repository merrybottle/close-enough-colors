(function(context) {
  var hexValues = "0123456789abcdef";

  function closeEnoughColors(color, palette) {
    if (!color || !palette || !palette.length) {
      return null;
    }

    var rgbColor = getRGBObject(color);

    if (!rgbColor) {
      return null;
    }

    var closestColor;
    var closestDifference = null;
    var difference;
    var paletteColor;
    var paletteSize = palette.length;

    for (var i = 0; i < paletteSize; i++) {
      paletteColor = getRGBObject(palette[i]);

      difference = Math.sqrt(
        Math.pow(rgbColor.r - paletteColor.r, 2) +
        Math.pow(rgbColor.g - paletteColor.g, 2) +
        Math.pow(rgbColor.b - paletteColor.b, 2)
      );

      if (difference < closestDifference || closestDifference === null) {
        closestDifference = difference;
        closestColor = paletteColor;
      }
    }

    if (!closestColor) {
      closestColor = rgbColor;
    }

    return {
      hex: getHexString(closestColor),
      rgb: closestColor
    };
  }

  function getHexString(color) {
    var toHex = (rgbPart) => {
      var num = parseInt(rgbPart, 10);

      if (isNaN(num)) {
        return '00';
      }

      num = Math.max(0, Math.min(num, 255));

      return hexValues.charAt((num - num % 16) / 16) + hexValues.charAt(num % 16);
    };

    return '#' + toHex(color.r) + toHex(color.g) + toHex(color.b);
  }

  function getRGBObject(color) {
    if (!color || typeof color !== 'string') {
      return null;
    }

    var rgbColorMatch = color.match(/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/);

    if (rgbColorMatch) {
      return {
        r: rgbColorMatch[1],
        g: rgbColorMatch[2],
        b: rgbColorMatch[3]
      };
    }

    var hexColorMatch = color.match(/^#((?:[0-9a-f]{3}){1,2})$/i);

    if (hexColorMatch) {
      var hex = hexColorMatch[1];

      if (hex.length === 3) {
        hex = hex.charAt(0) + hex.charAt(0) + hex.charAt(1) + hex.charAt(1) + hex.charAt(2) + hex.charAt(2);
      }

      return {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16)
      };
    }

    return null;
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = closeEnoughColors;
  } else {
    context.closeEnoughColors = closeEnoughColors;
  }
}(this));
