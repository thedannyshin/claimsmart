import { useEffect, useRef } from "react";

const VERT = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

out vec4 outColor;

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

float sdSphere(vec3 p, float r) {
  return length(p) - r;
}

float sdTorus(vec3 p, vec2 t) {
  vec2 q = vec2(length(p.xz) - t.x, p.y);
  return length(q) - t.y;
}

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

vec3 floatCenter(float t) {
  return vec3(
    0.22 * sin(t * 0.37 + 0.6),
    0.18 * sin(t * 0.29 + 1.8),
    0.14 * sin(t * 0.43 + 2.4)
  );
}

float mapScene(vec3 p, float t) {
  p -= floatCenter(t);

  vec3 q = p;
  q.xz *= rot(0.42 * sin(t * 0.21 + 0.4));
  q.yz *= rot(0.36 * sin(t * 0.17 + 1.1));

  vec3 r = p;
  r.xy *= rot(0.38 * sin(t * 0.19 + 2.0));
  r.xz *= rot(0.30 * sin(t * 0.24 + 0.7));

  float blob = sdSphere(
    q - vec3(0.0, 0.12 * sin(t * 0.33 + 1.4), 0.08 * cos(t * 0.27)),
    0.62
  );
  float ring = sdTorus(r, vec2(0.78, 0.11));
  float pearl = sdSphere(
    r - vec3(
      0.42 * sin(t * 0.31 + 0.9),
      0.30 * cos(t * 0.26 + 1.6),
      0.42 * cos(t * 0.34 + 2.2)
    ),
    0.22
  );

  float d = smin(blob, ring, 0.38);
  d = smin(d, pearl, 0.28);

  vec3 w = p;
  w.xz *= rot(0.28 * sin(t * 0.15 + 3.1));
  float arc = sdTorus(w + vec3(0.0, -0.35, 0.0), vec2(1.05, 0.06));
  d = smin(d, arc, 0.22);

  return d;
}

vec3 calcNormal(vec3 p, float t) {
  const float e = 0.0015;
  vec2 h = vec2(e, 0.0);
  return normalize(vec3(
    mapScene(p + h.xyy, t) - mapScene(p - h.xyy, t),
    mapScene(p + h.yxy, t) - mapScene(p - h.yxy, t),
    mapScene(p + h.yyx, t) - mapScene(p - h.yyx, t)
  ));
}

vec3 shade(vec3 p, vec3 rd, float t) {
  vec3 n = calcNormal(p, t);
  vec3 light = normalize(vec3(-0.35, 0.85, 0.55));
  float diff = clamp(dot(n, light), 0.0, 1.0);
  float rim = pow(1.0 - clamp(dot(n, -rd), 0.0, 1.0), 2.4);
  float spec = pow(clamp(dot(reflect(-light, n), -rd), 0.0, 1.0), 28.0);

  vec3 deep = vec3(0.059, 0.243, 0.090);
  vec3 sage = vec3(0.694, 0.859, 0.722);
  vec3 keylime = vec3(0.882, 0.957, 0.875);
  vec3 cream = vec3(1.0, 0.996, 0.992);

  vec3 base = mix(deep, sage, diff);
  base = mix(base, keylime, rim * 0.5);
  base += spec * keylime * 0.3;

  float fog = 1.0 - exp(-0.22 * length(p));
  vec3 bg = mix(cream, keylime, 0.35);
  return mix(base, bg, fog * 0.72);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
  float t = u_time;

  vec3 ro = vec3(
    0.10 * sin(t * 0.25 + 1.2),
    0.08 * sin(t * 0.31 + 2.1),
    2.65 + 0.06 * sin(t * 0.22 + 0.5)
  );
  vec3 rd = normalize(vec3(uv, -1.55));

  rd.xy *= rot(0.07 * sin(t * 0.28 + 0.8));
  rd.xz *= rot(0.08 * sin(t * 0.23 + 1.6));
  rd.yz *= rot(0.05 * cos(t * 0.27 + 2.4));

  float traveled = 0.0;
  vec3 col = vec3(0.882, 0.957, 0.875);
  bool hit = false;

  for (int i = 0; i < 72; i++) {
    vec3 p = ro + rd * traveled;
    float d = mapScene(p, t);
    if (d < 0.0012) {
      col = shade(p, rd, t);
      hit = true;
      break;
    }
    traveled += d * 0.82;
    if (traveled > 8.0) break;
  }

  if (!hit) {
    float depth = 0.5 - uv.y * 0.5;
    vec3 sage = vec3(0.694, 0.859, 0.722);
    vec3 keylime = vec3(0.882, 0.957, 0.875);
    vec3 cream = vec3(1.0, 0.996, 0.992);
    col = mix(keylime, sage, clamp(depth, 0.0, 1.0) * 0.55);
    col = mix(col, cream, smoothstep(-0.35, 0.65, uv.y) * 0.35);
  }

  col = pow(col, vec3(0.92));
  outColor = vec4(col, 1.0);
}
`;

function compileShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

interface HeroAbstractBackgroundProps {
  className?: string;
}

export function HeroAbstractBackground({ className = "" }: HeroAbstractBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", { alpha: false, antialias: true });
    if (!gl) return;

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERT);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const loc = gl.getAttribLocation(program, "a_position");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");

    let raf = 0;
    let start = performance.now();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const container = canvas.parentElement;
      const bounds = (container ?? canvas).getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(bounds.width * dpr));
      const h = Math.max(1, Math.floor(bounds.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const draw = (now: number) => {
      resize();
      const elapsed = reducedMotion ? 0 : (now - start) * 0.001;

      gl.useProgram(program);
      gl.enableVertexAttribArray(loc);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, elapsed);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (!reducedMotion) raf = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(resize);
    const container = canvas.parentElement;
    if (container) observer.observe(container);
    else observer.observe(canvas);
    resize();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
    />
  );
}
