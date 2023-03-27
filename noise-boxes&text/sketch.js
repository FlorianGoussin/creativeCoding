//By Steve's Makerspace
//Video: https://youtu.be/oKwi8h_yTsY

let tries = 1000; //attempts to place rectangles
let gap = 1; //between rectangles
let minScale = 0.2; //smallest rectangle
let skip = 5; //pixels to skip when checking available space
let col, col3, firstCol, n2, scl, colE, palette1, palette2, palettesArray;
let noiseTime = 0;

const poem = `
Un taxi noir,
Celui d’après minuit,
Mon chauffeur slame,
Mixe de plusieurs langues,
Et ses sourcils de loup-garou,
Dans les nuits fauves de Beyrouth,
Cette montagne dressée au loin,
Constellation d’un Pollock en transe,
Je décroche
À côté de mes pompes,
Tel un somnambule,
La ville jappe,
Puis bat la mesure en rythme,
Par la fenêtre
Des fils électriques tressés à l’infini,
Tout va trop vite,
Ça défile,
Appartements percés de part en part,
Éclats de balle,
Des trous de la taille d’un obus,
Un goût de poussière,
Odeur de pneus brûlés,
Ma tête prête à exploser,
Comme si des doigts essayaient de me faire avouer
Mais quoi ?
Je délire,
Un gamin court après la voiture,
Le feu passe au rouge,
Des scooters nous tournent autour,
Haine de l’étranger,
Je fonce
Sur les bords de mer,
La lune fait du sur-place,
Le ciel pris de folie,
Des lucioles rebondissent sur le sable,
Des chars défilent,
Tremblement,
La terre entame son solo de jazz,
Je rêve d’une femme,
La peau claire,
Aux cheveux noirs,
Mais j’ai droit à la lampe
d’un militaire,
Braquée sur mon désir,
Il nous fait ranger sur le bas-côté,
Fouille au corps,
Vérification des papiers,
Le loup-garou ne veut pas aller plus loin,
Je longe la plage,
Des couples se cachent dans des voitures
Tous phares éteints,
Dans l’eau, elle est là,
La femme à la peau claire,
Aux cheveux noirs,
Elle n’a pas peur des flammes,
Des reflets brûlants sur les vagues,
Nous plongeons
Sous l’eau, une autre nuit,
Une longue phrase,
Sans un mot,
« A love » suprême.

Grégory Rateau, Conspiration du réel, Editions Unicité, 2022

CatégoriesGrégory Rateau, Chaos, Lieux, Passion, SensualitéUn commentairesur Beyrouth
Sélection : poèmes à la une
Dans l’interminable …
Paul Verlaine
Dans l’interminable
Ennui de la plaine,
La neige incertaine
Luit comme du sable.

Le ciel est de cuivre
Sans lueur aucune,
On croirait voir vivre
Et mourir la lune.

Comme des nuées
Flottent gris les chênes
Des forêts prochaines
Parmi les buées.

Le ciel est de cuivre
Sans lueur aucune.
On croirait voir vivre
Et mourir la lune.

Corneille poussive
Et vous, les loups maigres,
Par ces bises aigres
Quoi donc vous arrive ?

Dans l’interminable
Ennui de la plaine
La neige incertaine
Luit comme du sable.
`;

function preload() {
  palettes = loadJSON("colors.json");
}

function setup() {
  palettesArray = Object.values(palettes); //turning the JSON file into an array
  palettesLength = palettesArray.length;
  cnv = createCanvas(windowWidth-20,windowHeight-70);
  //cnv = createCanvas(2000, 2000);
  cnv.position(0, 30);
  let artButton = createButton("new art");
  artButton.position(10, 0);
  artButton.mousePressed(newArt);
  let saveButton = createButton("save jpg");
  saveButton.position(80, 0);
  saveButton.mousePressed(saveArt);
  rectMode(CENTER);
  newArt();
}

function newArt() {
  let timeLapse = millis();
  clear();
  rez1 = random(0.0005, 0.0025); //resolution of angle noise resolution
  rez2 = random(0.0005, 0.004); //resolution of color noise
  //rectangle min & max sizes
  wLow = random(10, 50); //min width
  wHigh = random(30, 70); //max width
  hLow = random(30, 70); //min height
  hHigh = random(70, 130); //max height
  // let strokeType = random(3);
  // if (strokeType < 0.5) {
    noStroke();
  // } else if (strokeType < 2.5) {
  //   stroke(0);
  // } else {
  //   stroke(255);
  // }
  // sclStart is how big rects are at start
  let sclType = random(3);
  if (sclType < 0.5) {
    sclStart = random(0.5, 1.5);
  } //small
  else if (sclType < 2.5) {
    sclStart = random(1.6, 2.2); //medium
  } else {
    sclStart = random(3.0, 7.5); //large
  }
  scl = (sclStart / 2000) * width;
  sclReduct = (sclStart / tries) * 1.3; //calculating how much to reduce the scale each try
  palette1 = floor(random(palettesArray.length));
  palette2 = floor(random(palettesArray.length));
  makeBackground();
  noiseTime += 10000;
  // location of centers of rotation and how much influence they have
  let x2 = random(width);
  let y2 = random(height);
  let x3 = random(width);
  let y3 = random(height);
  let ang2random = 1 //random(0.4, 1);
  let ang3random = 1 //random(0.4, 1);
  let center1 = random(10);
  let center2 = random(10);

  const poemParts = poem
    .split(/\s/)
    .filter(s=>s);
    // .map(s => 
    //   s.match(/.{1,10}(?:\s|$)/g))
    // .flat();
  let poemPartsIncrement = 0;

  for (i = 0; i < tries; i++) {
  // for (const poemPart of poemParts) {
    //start scale at 1 and gradually reduce to minimum size
    // scl -= sclReduct;
    // if (scl < minScale) {
    //   scl = minScale;
    // }
    //where to attempt rectangle
    x1 = random(width);
    y1 = random(height);
    // n used for rotation; n2 used for color
    n = noise(x1 * rez1 + noiseTime, y1 * rez1 + noiseTime);
    // n2 = noise(x1 * rez2 + noiseTime + 10000, y1 * rez2 + noiseTime + 10000);
    n2 = noise(x1 * rez2 + noiseTime, y1 * rez2 + noiseTime);
    //rec width & height
    const poemPart = poemParts[poemPartsIncrement];
    h = random(hLow, hHigh) * scl;
    textSize(h/2);
    w = textWidth(poemPart);
    // w = random(wLow, wHigh) * scl;
    ang1 = n * PI;
    // ang1 = n * PI * 2;
    //calculate angles for centers of rotation
    if (center1 < 5) {
      a = y1 - y2;
      b = x1 - x2;
      ang2 = atan(a / b) * ang2random;
    } else {
      ang2 = 0;
    }
    if (center2 < 5) {
      a2 = y1 - y3;
      b2 = x1 - x3;
      ang3 = atan(a2 / b2) * ang3random;
    } else {
      ang3 = 0;
    }
    // ang = ang1 + ang2 + ang3; 
    // ang = 0;
    ang = -ang1/4; // trying to get something horizontal quickly and dirty from the previous code.
    console.log(ang);
    open = true; //is the space available?
    firstCol = null;
    //check if space available for this rectangle; check small rec first
    checkRect(x1, y1, h, w, ang);

    // if (ang > (PI/2)) {
    //   continue;
    // }

    if (open == false) {
      continue;
    }
    // check larger rectangle
    h2 = h + gap * 2;
    w2 = w + gap * 2;
    checkRect(x1, y1, h2, w2, ang);
    if (open == true) {
      //if space available, then get a color and draw the rectangle
      push();
      translate(x1, y1);
      rotate(ang);
      // rotate(PI / 6);
      convert(firstCol); //convert the rgb color from the canvas to an hsb color
      firstHSB = hsbCol; //color in space currently
      getComboColor();
      // rectangle color can't be the same color as what's already there
      while (
        abs(huey - firstHSB[0]) < 15 &&
        abs(sat - firstHSB[1]) < 20 &&
        abs(brt - firstHSB[2]) < 20
      ) {
        //if it's too close, get a new color
        getComboColor();
      }
      colorMode(HSB, 360, 128, 100, 255);
      // colors were appearing pastel & washed out, so I'm increasing saturation and decreasing brightness; also giving hue some random variation
      // fill(
      //   huey + random(-10, 10),
      //   sat * random(1.1, 1.3),
      //   brt * random(0.8, 0.9),
      //   255
      // );
      
      // rect(0, 0, w, h);

      fill(
        huey + random(-10, 10),
        sat * random(1.1, 1.3),
        brt * random(0.8, 0.9),
        255
      );
      // translate(-w/2, h/2);
      // textSize(h);
      textAlign(LEFT, CENTER);
      textSize(h/3);
      // text(poemPart, -w/2, 0);
      text(poemPart, -w/3, 0);

      fill(
        huey + random(-10, 10),
        sat * random(1.1, 1.3),
        brt * random(0.8, 0.9),
        100
      );
      rect(0, 0, w, h);
      // rect(w/2, 0, w, h);
      // rect(w/2, 0, w + w/2, h);
      pop();
      colorMode(RGB);
      if (poemPart !== poemParts[poemParts.length - 1])
        poemPartsIncrement++;
    }
  }
  print("seconds: " + round((millis() - timeLapse) / 100) / 10);
}

function checkRect(x1, y1, h, w, ang) {
  // check 3 corners first
  y7 = y1 + h / 2;
  x7 = x1 - w / 2;
  rotate_point(x7, y7, x1, y1, ang);
  if (open == false) {
      return;
    }
  x7 = x1 + w/2;
  rotate_point(x7, y7, x1, y1, ang);
  if (open == false) {
      return;
    }
  y7 = y1 - h/2;
  rotate_point(x7, y7, x1, y1, ang);
  if (open == false) {
      return;
    }
  // plot points for each side
  y2 = y1 - h / 2; //top side
  for (x2 = x1 - w / 2; x2 < x1 + w / 2 + skip; x2 += skip) {
    // x1 y1 is center of rec; x2 y2 is each edge point
    if (open == false) {
      return;
    }
    rotate_point(x2, y2, x1, y1, ang);
  }
  y2 = y1 + h / 2; //bottom side
  for (x2 = x1 - w / 2; x2 < x1 + w / 2 + skip; x2 += skip) {
    if (open == false) {
      return;
    }
    rotate_point(x2, y2, x1, y1, ang);
  }
  x2 = x1 - w / 2; //left side
  for (y2 = y1 - h / 2; y2 < y1 + h / 2 + skip; y2 += skip) {
    if (open == false) {
      return;
    }
    rotate_point(x2, y2, x1, y1, ang);
  }
  x2 = x1 + w / 2; //right side
  for (y2 = y1 - h / 2; y2 < y1 + h / 2 + skip; y2 += skip) {
    if (open == false) {
      return;
    }
    rotate_point(x2, y2, x1, y1, ang);
  }
}

function rotate_point(pointX, pointY, originX, originY, angle) {
  //find where x and y are when rectangle is rotated and check color on canvas
  //https://stackoverflow.com/questions/4465931/rotate-rectangle-around-a-point
  //pointX & Y is the side point, originX & Y is the center of rectangle
  let xDiff = pointX - originX;
  let yDiff = pointY - originY;
  x = cos(angle) * xDiff - sin(angle) * yDiff + originX;
  y = sin(angle) * xDiff + cos(angle) * yDiff + originY;
  col = get(x,y); //canvas color
  if (firstCol == null) {
    firstCol = col;
  }
  // check if this point's color from the canvas is the same as the starting point's color
  if (
    abs(col[0] - firstCol[0]) < 5 &&
    abs(col[1] - firstCol[1]) < 5 &&
    abs(col[2] - firstCol[2]) < 5
  ) {
  } else {
    open = false;
  }
}

function saveArt() {
  save(Date.now() + ".jpg");
}
