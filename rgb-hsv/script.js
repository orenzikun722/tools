document.getElementById("r-input").addEventListener('input', ev => {
  document.getElementById("r-range").value = ev.target.value;
  updateRGB();
})
document.getElementById("g-input").addEventListener('input', ev => {
  document.getElementById("g-range").value = ev.target.value;
  updateRGB();
})
document.getElementById("b-input").addEventListener('input', ev => {
  document.getElementById("b-range").value = ev.target.value;
  updateRGB();
})
document.getElementById("r-range").addEventListener('input', ev => {
  document.getElementById("r-input").value = ev.target.value;
  updateRGB();
})
document.getElementById("g-range").addEventListener('input', ev => {
  document.getElementById("g-input").value = ev.target.value;
  updateRGB();
})
document.getElementById("b-range").addEventListener('input', ev => {
  document.getElementById("b-input").value = ev.target.value;
  updateRGB();
})

document.getElementById("h-input").addEventListener('input', ev => {
  document.getElementById("h-range").value = ev.target.value;
  updateHSV();
})
document.getElementById("s-input").addEventListener('input', ev => {
  document.getElementById("s-range").value = ev.target.value;
  updateHSV();
})
document.getElementById("v-input").addEventListener('input', ev => {
  document.getElementById("v-range").value = ev.target.value;
  updateHSV();
})
document.getElementById("h-range").addEventListener('input', ev => {
  document.getElementById("h-input").value = ev.target.value;
  updateHSV();
})
document.getElementById("s-range").addEventListener('input', ev => {
  document.getElementById("s-input").value = ev.target.value;
  updateHSV();
})
document.getElementById("v-range").addEventListener('input', ev => {
  document.getElementById("v-input").value = ev.target.value;
  updateHSV();
})

function updateHSV() {
  const h = parseInt(document.getElementById("h-input").value);
  const s = parseInt(document.getElementById("s-input").value);
  const v = parseInt(document.getElementById("v-input").value);
  const rgb = hsvToRgb(h, s, v);
  document.getElementById("r-input").value = rgb.r;
  document.getElementById("r-range").value = rgb.r;
  document.getElementById("g-input").value = rgb.g;
  document.getElementById("g-range").value = rgb.g;
  document.getElementById("b-input").value = rgb.b;
  document.getElementById("b-range").value = rgb.b;
  document.getElementById("color-display").style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  document.getElementById("hex-input").value = `#${rgb.r.toString(16).padStart(2, '0')}${rgb.g.toString(16).padStart(2, '0')}${rgb.b.toString(16).padStart(2, '0')}`;
  document.getElementById("decimal-input").value = parseInt(`${rgb.r.toString(16).padStart(2, '0')}${rgb.g.toString(16).padStart(2, '0')}${rgb.b.toString(16).padStart(2, '0')}`, 16);
}






updateInputHSVColors(parseInt(document.getElementById("h-input").value), parseInt(document.getElementById("s-input").value), parseInt(document.getElementById("v-input").value));

function updateRGB() {
  const r = parseInt(document.getElementById("r-input").value);
  const g = parseInt(document.getElementById("g-input").value);
  const b = parseInt(document.getElementById("b-input").value);
  document.getElementById("color-display").style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  document.getElementById("hex-input").value = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  document.getElementById("decimal-input").value = parseInt(`${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`, 16);
  const hsv = rgbToHsv(r, g, b);
  document.getElementById("h-input").value = hsv.h.toFixed();
  document.getElementById("h-range").value = hsv.h.toFixed();


  document.getElementById("s-input").value = hsv.s.toFixed();
  document.getElementById("s-range").value = hsv.s.toFixed();


  document.getElementById("v-input").value = hsv.v.toFixed();
  document.getElementById("v-range").value = hsv.v.toFixed();
  updateInputHSVColors(hsv.h, hsv.s, hsv.v);
}

function updateInputRGBColors(r, g, b) {
  document.getElementById("r-input").style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  document.getElementById("g-input").style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  document.getElementById("b-input").style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}
function updateInputHSVColors(h, s, v) {
  document.getElementById("h-input").style.backgroundColor = `hsl(${h}, 100%, 50%)`;
  let bg = getComputedStyle(document.getElementById("h-input")).backgroundColor;
  let [rc, gc, bc] = bg.match(/\d+/g).map(Number);
  document.getElementById("h-input").style.color = `rgb(${255 - rc}, ${255 - gc}, ${255 - bc})`;
  
  document.getElementById("s-input").style.backgroundColor = `hsl(${h}, ${s}%, 50%)`;
  bg = getComputedStyle(document.getElementById("s-input")).backgroundColor;
  [rc, gc, bc] = bg.match(/\d+/g).map(Number);
  document.getElementById("s-input").style.color = `rgb(${255 - rc}, ${255 - gc}, ${255 - bc})`;

  document.getElementById("v-input").style.backgroundColor = `hsl(${h}, 100%, ${v / 2}%)`;
  bg = getComputedStyle(document.getElementById("v-input")).backgroundColor;
  [rc, gc, bc] = bg.match(/\d+/g).map(Number);
  document.getElementById("v-input").style.color = `rgb(${255 - rc}, ${255 - gc}, ${255 - bc})`;
}

function rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    const v = max;

    const s = max === 0 ? 0 : delta / max;

    let h;

    if (delta === 0) {
        h = 0;
    } else if (max === r) {
        h = 60 * (((g - b) / delta) % 6);
    } else if (max === g) {
        h = 60 * ((b - r) / delta + 2);
    } else {
        h = 60 * ((r - g) / delta + 4);
    }
    if (h < 0) {
        h += 360;
    }

    return {
        h,
        s: s * 100,
        v: v * 100
    };
}
function hsvToRgb(h, s, v) {
    s /= 100;
    v /= 100;

    const c = v * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = v - c;

    let r, g, b;

    if (h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (h < 300) {
        r = x;
        g = 0;
        b = c;
    } else {
        r = c;
        g = 0;
        b = x;
    }

    return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255)
    };
}

document.getElementById("hex-input").addEventListener('input', ev => {
  const hex = ev.target.value;
  if (/^#([0-9A-Fa-f]{6})$/.test(hex)) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    document.getElementById("r-input").value = r;
    document.getElementById("g-input").value = g;
    document.getElementById("b-input").value = b;
    document.getElementById("r-range").value = r;
    document.getElementById("g-range").value = g;
    document.getElementById("b-range").value = b;
    updateRGB();
  }
});
document.getElementById("decimal-input").addEventListener('input', ev => {
  const decimal = parseInt(ev.target.value, 10);
  if (!isNaN(decimal) && decimal >= 0 && decimal <= 16777215) {
    const r = (decimal >> 16) & 0xFF;
    const g = (decimal >> 8) & 0xFF;
    const b = decimal & 0xFF;
    document.getElementById("r-input").value = r;
    document.getElementById("g-input").value = g;
    document.getElementById("b-input").value = b;
    document.getElementById("r-range").value = r;
    document.getElementById("g-range").value = g;
    document.getElementById("b-range").value = b;
    updateRGB();
  }
});