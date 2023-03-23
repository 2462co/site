var THICKNESS = Math.pow(200, 2),
  SPACING = 20,
  MARGIN = 0,
  COLOR = 220,
  DRAG = 0.95,
  EASE = 0.25,
  container,
  particle,
  canvas,
  mouse,
  stats,
  list,
  ctx,
  tog,
  man,
  dx,
  dy,
  mx,
  my,
  d,
  t,
  f,
  a,
  b,
  i,
  n,
  w,
  h,
  p,
  s,
  r,
  c,
  COLS,
  ROWS,
  NUM_PARTICLES;

particle = {
  vx: 0,
  vy: 0,
  x: 0,
  y: 0,
};

function updateCanvasSize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;

  COLS = Math.floor((w - MARGIN * 2) / SPACING);
  ROWS = Math.floor((h - MARGIN * 2) / SPACING);
  NUM_PARTICLES = ROWS * COLS;

  list = [];

  for (i = 0; i < NUM_PARTICLES; i++) {
    p = Object.create(particle);
    p.x = p.ox = MARGIN + SPACING * (i % COLS);
    p.y = p.oy = MARGIN + SPACING * Math.floor(i / COLS);

    list[i] = p;
  }
}

function handleDeviceOrientation(event) {
  var alpha = event.alpha; // Rotation around the Z-axis (0 to 360)
  var beta = event.beta; // Front-to-back motion (180 to -180)
  var gamma = event.gamma; // Left-to-right motion (-90 to 90)

  // Normalize gamma and beta to be within 0 and 1
  var normalizedGamma = (gamma + 90) / 180;
  var normalizedBeta = (beta + 180) / 360;

  // Update the mouse coordinates (mx and my) based on the gyroscope data
  mx = w * normalizedGamma;
  my = h * normalizedBeta;
  man = true;
}

function init() {
  container = document.getElementById("container");
  canvas = document.createElement("canvas");

  if (window.DeviceOrientationEvent) {
    window.addEventListener(
      "deviceorientation",
      handleDeviceOrientation,
      false
    );
  } else {
    console.log("Device orientation not supported");
  }

  ctx = canvas.getContext("2d");
  man = false;
  tog = true;

  list = [];

  updateCanvasSize();

  container.appendChild(canvas);
  window.addEventListener("resize", updateCanvasSize);

  container.addEventListener("mousemove", function (e) {
    bounds = container.getBoundingClientRect();
    mx = e.clientX - bounds.left;
    my = e.clientY - bounds.top;
    man = true;
  });
  container.addEventListener("mousemove", function (e) {
    bounds = container.getBoundingClientRect();
    mx = e.clientX - bounds.left;
    my = e.clientY - bounds.top;
    man = true;
  });
}

function step() {
  if (stats) stats.begin();

  if ((tog = !tog)) {
    for (i = 0; i < NUM_PARTICLES; i++) {
      p = list[i];

      d = (dx = mx - p.x) * dx + (dy = my - p.y) * dy;
      f = -THICKNESS / d;

      if (d < THICKNESS) {
        t = Math.atan2(dy, dx);
        p.vx += f * Math.cos(t);
        p.vy += f * Math.sin(t);
      }

      p.x += (p.vx *= DRAG) + (p.ox - p.x) * EASE;
      p.y += (p.vy *= DRAG) + (p.oy - p.y) * EASE;
    }
  } else {
    b = (a = ctx.createImageData(w, h)).data;

    for (i = 0; i < NUM_PARTICLES; i++) {
      p = list[i];
      (b[(n = (~~p.x + ~~p.y * w) * 4)] = b[n + 1] = b[n + 2] = COLOR),
        (b[n + 3] = 255);
    }

    ctx.putImageData(a, 0, 0);
  }

  if (stats) stats.end();
  requestAnimationFrame(step);
}

init();
step();
