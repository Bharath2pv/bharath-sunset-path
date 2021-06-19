export const vertexShaderValue = [
  "vec3 mod289(vec3 x)",
  "{",
  "return x - floor(x * (1.0 / 289.0)) * 289.0;",
  "}",

  "vec4 mod289(vec4 x)",
  "{",
  "return x - floor(x * (1.0 / 289.0)) * 289.0;",
  "}",

  "vec4 permute(vec4 x)",
  "{",
  "return mod289(((x*34.0)+1.0)*x);",
  "}",

  "vec4 taylorInvSqrt(vec4 r)",
  "{",
  "return 1.79284291400159 - 0.85373472095314 * r;",
  "}",

  "vec3 fade(vec3 t) {",
  "return t*t*t*(t*(t*6.0-15.0)+10.0);",
  "}",

  "float cnoise(vec3 P)",
  "{",
  "vec3 Pi0 = floor(P);",
  "vec3 Pi1 = Pi0 + vec3(1.0);",
  "Pi0 = mod289(Pi0);",
  "Pi1 = mod289(Pi1);",
  "vec3 Pf0 = fract(P);",
  "vec3 Pf1 = Pf0 - vec3(1.0);",
  "vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);",
  "vec4 iy = vec4(Pi0.yy, Pi1.yy);",
  "vec4 iz0 = Pi0.zzzz;",
  "vec4 iz1 = Pi1.zzzz;",

  "vec4 ixy = permute(permute(ix) + iy);",
  "vec4 ixy0 = permute(ixy + iz0);",
  "vec4 ixy1 = permute(ixy + iz1);",

  "vec4 gx0 = ixy0 * (1.0 / 7.0);",
  "vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;",
  "gx0 = fract(gx0);",
  "vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);",
  "vec4 sz0 = step(gz0, vec4(0.0));",
  "gx0 -= sz0 * (step(0.0, gx0) - 0.5);",
  "gy0 -= sz0 * (step(0.0, gy0) - 0.5);",

  "vec4 gx1 = ixy1 * (1.0 / 7.0);",
  "vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;",
  "gx1 = fract(gx1);",
  "vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);",
  "vec4 sz1 = step(gz1, vec4(0.0));",
  "gx1 -= sz1 * (step(0.0, gx1) - 0.5);",
  "gy1 -= sz1 * (step(0.0, gy1) - 0.5);",

  "vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);",
  "vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);",
  "vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);",
  "vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);",
  "vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);",
  "vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);",
  "vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);",
  "vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);",

  "vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));",
  "g000 *= norm0.x;",
  "g010 *= norm0.y;",
  "g100 *= norm0.z;",
  "g110 *= norm0.w;",
  "vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));",
  "g001 *= norm1.x;",
  "g011 *= norm1.y;",
  "g101 *= norm1.z;",
  "g111 *= norm1.w;",

  "float n000 = dot(g000, Pf0);",
  "float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));",
  "float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));",
  "float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));",
  "float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));",
  "float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));",
  "float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));",
  "float n111 = dot(g111, Pf1);",

  "vec3 fade_xyz = fade(Pf0);",
  "vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);",
  "vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);",
  "float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);",
  "return 2.2 * n_xyz;",
  "}",

  "float pnoise(vec3 P, vec3 rep)",
  "{",
  "vec3 Pi0 = mod(floor(P), rep);",
  "vec3 Pi1 = mod(Pi0 + vec3(1.0), rep);",
  "Pi0 = mod289(Pi0);",
  "Pi1 = mod289(Pi1);",
  "vec3 Pf0 = fract(P);",
  "vec3 Pf1 = Pf0 - vec3(1.0);",
  "vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);",
  "vec4 iy = vec4(Pi0.yy, Pi1.yy);",
  "vec4 iz0 = Pi0.zzzz;",
  "vec4 iz1 = Pi1.zzzz;",

  "vec4 ixy = permute(permute(ix) + iy);",
  "vec4 ixy0 = permute(ixy + iz0);",
  "vec4 ixy1 = permute(ixy + iz1);",

  "vec4 gx0 = ixy0 * (1.0 / 7.0);",
  "vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;",
  "gx0 = fract(gx0);",
  "vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);",
  "vec4 sz0 = step(gz0, vec4(0.0));",
  "gx0 -= sz0 * (step(0.0, gx0) - 0.5);",
  "gy0 -= sz0 * (step(0.0, gy0) - 0.5);",

  "vec4 gx1 = ixy1 * (1.0 / 7.0);",
  "vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;",
  "gx1 = fract(gx1);",
  "vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);",
  "vec4 sz1 = step(gz1, vec4(0.0));",
  "gx1 -= sz1 * (step(0.0, gx1) - 0.5);",
  "gy1 -= sz1 * (step(0.0, gy1) - 0.5);",

  "vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);",
  "vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);",
  "vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);",
  "vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);",
  "vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);",
  "vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);",
  "vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);",
  "vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);",

  "vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));",
  "g000 *= norm0.x;",
  "g010 *= norm0.y;",
  "g100 *= norm0.z;",
  "g110 *= norm0.w;",
  "vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));",
  "g001 *= norm1.x;",
  "g011 *= norm1.y;",
  "g101 *= norm1.z;",
  "g111 *= norm1.w;",

  "float n000 = dot(g000, Pf0);",
  "float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));",
  "float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));",
  "float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));",
  "float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));",
  "float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));",
  "float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));",
  "float n111 = dot(g111, Pf1);",

  "vec3 fade_xyz = fade(Pf0);",
  "vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);",
  "vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);",
  "float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);",
  "return 2.2 * n_xyz;",
  "}",

  "#define PI 3.1415926535897932384626433832795",

  "uniform float time;",
  "uniform float scroll;",
  "uniform float maxHeight;",
  "uniform float speed;",
  "uniform float distortCenter;",
  "uniform float roadWidth;",
  "varying float vDisplace;",

  "varying float fogDepth;",

  "void main(){",

  "float t = time * speed;",
  "float wRoad = distortCenter;",
  "float wRoad2 = wRoad * 0.5;",

  "float angleCenter = uv.y * PI*4.0;",
  "angleCenter += t * 0.9;",

  "float centerOff = (",
  "sin(angleCenter) +",
  "sin(angleCenter*0.5)",
  ") * wRoad;",

  "vec3 noiseIn = vec3(uv, 1.0)*10.0;",
  "float noise = cnoise(vec3(noiseIn.x, noiseIn.y + scroll, noiseIn.z));",
  "noise += 1.0;",
  "float h = noise;",
  "float angle = (uv.x - centerOff) * PI;",
  "float f = abs(cos(angle));",
  "h *= pow(f, 1.5 + roadWidth);",

  "vDisplace = h;",

  "h*=maxHeight;",

  "vec3 transformed = vec3( position.x, position.y, position.z + h );",

  "vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );",
  "gl_Position = projectionMatrix * mvPosition;",

  "fogDepth = -mvPosition.z;",

  "}",
].join("\n");

export const fragmentShaderValue = [
  "uniform float time;",
  "uniform vec3 color;",
  "uniform sampler2D pallete;",
  " varying float vDisplace;",

  "uniform vec3 fogColor;",
  "uniform float fogNear;",
  "uniform float fogFar;",
  "varying float fogDepth;",

  "void main(){",

  "vec2 stripPos = vec2( 0.0, vDisplace * (sin(time)*0.5+0.7) );",
  "vec4 stripColor = texture2D( pallete, stripPos );",
  "stripColor *= pow(1.0-vDisplace, 1.0);",
  'gl_FragColor = stripColor;',

  "#ifdef USE_FOG",
  "float fogFactor = smoothstep( fogNear, fogFar, fogDepth );",
  "gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );",
  "#endif",
  "}",
].join("\n");

export const skyvertexShaderValue = [
  "uniform vec3 sunPosition;",
  "uniform float rayleigh;",
  "uniform float turbidity;",
  "uniform float mieCoefficient;",

  "varying vec3 vWorldPosition;",
  "varying vec3 vSunDirection;",
  "varying float vSunfade;",
  "varying vec3 vBetaR;",
  "varying vec3 vBetaM;",
  "varying float vSunE;",

  "const vec3 up = vec3( 0.0, 1.0, 0.0 );",

  // constants for atmospheric scattering
  "const float e = 2.71828182845904523536028747135266249775724709369995957;",
  "const float pi = 3.141592653589793238462643383279502884197169;",

  // wavelength of used primaries, according to preetham
  "const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );",
  // this pre-calcuation replaces older TotalRayleigh(vec3 lambda) function:
  // (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
  "const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );",

  // mie stuff
  // K coefficient for the primaries
  "const float v = 4.0;",
  "const vec3 K = vec3( 0.686, 0.678, 0.666 );",
  // MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
  "const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );",

  // earth shadow hack
  // cutoffAngle = pi / 1.95;
  "const float cutoffAngle = 1.6110731556870734;",
  "const float steepness = 1.5;",
  "const float EE = 1000.0;",

  "float sunIntensity( float zenithAngleCos ) {",
  "	zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );",
  "	return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );",
  "}",

  "vec3 totalMie( float T ) {",
  "	float c = ( 0.2 * T ) * 10E-18;",
  "	return 0.434 * c * MieConst;",
  "}",

  "void main() {",

  "	vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",
  "	vWorldPosition = worldPosition.xyz;",

  "	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
  "	gl_Position.z = gl_Position.w;", // set z to camera.far

  "	vSunDirection = normalize( sunPosition );",

  "	vSunE = sunIntensity( dot( vSunDirection, up ) );",

  "	vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );",

  "	float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );",

  // extinction (absorbtion + out scattering)
  // rayleigh coefficients
  "	vBetaR = totalRayleigh * rayleighCoefficient;",

  // mie coefficients
  "	vBetaM = totalMie( turbidity ) * mieCoefficient;",

  "}",
].join("\n");

export const skyfragmentShaderValue = [
  "varying vec3 vWorldPosition;",
  "varying vec3 vSunDirection;",
  "varying float vSunfade;",
  "varying vec3 vBetaR;",
  "varying vec3 vBetaM;",
  "varying float vSunE;",

  "uniform float luminance;",
  "uniform float mieDirectionalG;",

  "const vec3 cameraPos = vec3( 0.0, 0.0, 0.0 );",

  // constants for atmospheric scattering
  "const float pi = 3.141592653589793238462643383279502884197169;",

  "const float n = 1.0003;", // refractive index of air
  "const float N = 2.545E25;", // number of molecules per unit volume for air at
  // 288.15K and 1013mb (sea level -45 celsius)

  // optical length at zenith for molecules
  "const float rayleighZenithLength = 8.4E3;",
  "const float mieZenithLength = 1.25E3;",
  "const vec3 up = vec3( 0.0, 1.0, 0.0 );",
  // 66 arc seconds -> degrees, and the cosine of that
  "const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;",

  // 3.0 / ( 16.0 * pi )
  "const float THREE_OVER_SIXTEENPI = 0.05968310365946075;",
  // 1.0 / ( 4.0 * pi )
  "const float ONE_OVER_FOURPI = 0.07957747154594767;",

  "float rayleighPhase( float cosTheta ) {",
  "	return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );",
  "}",

  "float hgPhase( float cosTheta, float g ) {",
  "	float g2 = pow( g, 2.0 );",
  "	float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );",
  "	return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );",
  "}",

  // Filmic ToneMapping http://filmicgames.com/archives/75
  "const float A = 0.15;",
  "const float B = 0.50;",
  "const float C = 0.10;",
  "const float D = 0.20;",
  "const float E = 0.02;",
  "const float F = 0.30;",

  "const float whiteScale = 1.0748724675633854;", // 1.0 / Uncharted2Tonemap(1000.0)

  "vec3 Uncharted2Tonemap( vec3 x ) {",
  "	return ( ( x * ( A * x + C * B ) + D * E ) / ( x * ( A * x + B ) + D * F ) ) - E / F;",
  "}",

  "void main() {",
  // optical length
  // cutoff angle at 90 to avoid singularity in next formula.
  "	float zenithAngle = acos( max( 0.0, dot( up, normalize( vWorldPosition - cameraPos ) ) ) );",
  "	float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );",
  "	float sR = rayleighZenithLength * inverse;",
  "	float sM = mieZenithLength * inverse;",

  // combined extinction factor
  "	vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );",

  // in scattering
  "	float cosTheta = dot( normalize( vWorldPosition - cameraPos ), vSunDirection );",

  "	float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );",
  "	vec3 betaRTheta = vBetaR * rPhase;",

  "	float mPhase = hgPhase( cosTheta, mieDirectionalG );",
  "	vec3 betaMTheta = vBetaM * mPhase;",

  "	vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );",
  "	Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );",

  // nightsky
  "	vec3 direction = normalize( vWorldPosition - cameraPos );",
  "	float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]",
  "	float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]",
  "	vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );",
  "	vec3 L0 = vec3( 0.1 ) * Fex;",

  // composition + solar disc
  "	float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );",
  "	L0 += ( vSunE * 19000.0 * Fex ) * sundisk;",

  "	vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );",

  "	vec3 curr = Uncharted2Tonemap( ( log2( 2.0 / pow( luminance, 4.0 ) ) ) * texColor );",
  "	vec3 color = curr * whiteScale;",

  "	vec3 retColor = pow( color, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );",

  "	gl_FragColor = vec4( retColor, 1.0 );",

  "}",
].join("\n");
