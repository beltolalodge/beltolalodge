"use client";
import { useEffect, useRef } from "react";

export default function FluidHero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl2");
        if (!gl) return;

        // --- WebGL Setup & Shaders ---
        const vertexShaderSrc = `#version 300 es
    in vec2 a_position;
    out vec2 v_uv;
    void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
    }`;

        // Simple fluid-like shader using time and mouse (simplified for stability/performance)
        const fragmentShaderSrc = `#version 300 es
    precision highp float;
    in vec2 v_uv;
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec2 u_resolution;
    out vec4 outColor;

    // Noise function
    float random (in vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    float noise (in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    float fbm (in vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 5; i++) {
            value += amplitude * noise(st);
            st *= 2.0;
            amplitude *= 0.5;
        }
        return value;
    }

    void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.x *= u_resolution.x / u_resolution.y;

        vec2 mouse = u_mouse / u_resolution.xy;
        mouse.x *= u_resolution.x / u_resolution.y;
        
        // Fluid distortion based on mouse
        float dist = distance(st, mouse);
        float interaction = smoothstep(0.4, 0.0, dist);
        
        vec2 q = vec2(0.);
        q.x = fbm( st + 0.00 * u_time);
        q.y = fbm( st + vec2(1.0));

        vec2 r = vec2(0.);
        r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*u_time + interaction * 0.5 );
        r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*u_time + interaction * 0.5);

        float f = fbm(st+r);

        // Color palette matching the theme (Gold/Sand/Water)
        vec3 color = mix(vec3(0.101961,0.619608,0.666667), // Watery Blue
                         vec3(0.666667,0.666667,0.498039), // Sand
                         clamp((f*f)*4.0,0.0,1.0));

        color = mix(color,
                    vec3(0,0,0.164706), // Navy
                    clamp(length(q),0.0,1.0));

        color = mix(color,
                    vec3(0.784, 0.643, 0.364), // Gold highlight
                    clamp(length(r.x),0.0,1.0));

        outColor = vec4((f*f*f+.6*f*f+.5*f)*color, 1.0);
        // Make it transparent to overlay on image
        outColor.a = 0.3 + interaction * 0.2; 
    }`;

        const createShader = (gl: WebGL2RenderingContext, type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const createProgram = (gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
            const program = gl.createProgram();
            if (!program) return null;
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error(gl.getProgramInfoLog(program));
                return null;
            }
            return program;
        };

        const vertShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSrc);
        const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc);
        if (!vertShader || !fragShader) return;

        const program = createProgram(gl, vertShader, fragShader);
        if (!program) return;

        const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
        const mouseUniformLocation = gl.getUniformLocation(program, "u_mouse");
        const timeUniformLocation = gl.getUniformLocation(program, "u_time");

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = [
            -1, -1,
            1, -1,
            -1, 1,
            -1, 1,
            1, -1,
            1, 1,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = canvas.height - e.clientY; // Invert Y for WebGL
        };
        window.addEventListener("mousemove", handleMouseMove);

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        window.addEventListener("resize", resize);
        resize();

        let startTime = performance.now();
        let animationFrameId: number;

        const render = () => {
            const time = (performance.now() - startTime) * 0.001;

            gl.useProgram(program);
            gl.bindVertexArray(vao);

            gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
            gl.uniform2f(mouseUniformLocation, mouseX, mouseY);
            gl.uniform1f(timeUniformLocation, time);

            gl.drawArrays(gl.TRIANGLES, 0, 6);

            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-60 mix-blend-overlay" />;
}
