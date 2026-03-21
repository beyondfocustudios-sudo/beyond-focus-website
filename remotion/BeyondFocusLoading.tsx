import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { interpolate as flubberInterpolate } from "flubber";
import { useMemo } from "react";

const PETROL = "#0E3A45";
const CREAM = "#FAF9F7";

// SVG paths of the 4 B logo pieces (exact paths from .AI file)
// ViewBox: 325 195 135 155
const B_PATHS = [
  // Piece 0 — Top-right
  "M 437.421875 263.746094 C 444.128906 258.597656 447.332031 251.265625 447.332031 243.304688 C 447.332031 218.796875 428.835938 208.042969 405.386719 208.042969 L 401.472656 208.042969 L 400.691406 197.683594 L 400.347656 202.269531 L 400.777344 208.042969 L 402.511719 230.929688 C 402.640625 232.640625 402.875 234.328125 403.246094 235.949219 C 403.355469 236.511719 403.484375 237.054688 403.632812 237.574219 C 404.304688 240.167969 405.257812 242.65625 406.46875 244.992188 C 406.664062 245.382812 406.859375 245.769531 407.074219 246.140625 C 407.183594 246.3125 407.269531 246.484375 407.375 246.660156 C 407.851562 247.5 408.371094 248.324219 408.910156 249.101562 C 409.820312 250.421875 410.792969 251.65625 411.855469 252.84375 C 412.199219 253.234375 412.570312 253.625 412.9375 253.992188 C 413.28125 254.359375 413.652344 254.707031 414.019531 255.074219 C 415.574219 256.523438 417.242188 257.863281 419.035156 259.03125 C 419.382812 259.269531 419.730469 259.488281 420.097656 259.703125 C 420.660156 260.046875 421.222656 260.371094 421.78125 260.675781 C 422.238281 260.9375 422.691406 261.171875 423.148438 261.390625 C 423.191406 261.410156 423.210938 261.433594 423.253906 261.433594 C 423.707031 261.671875 424.164062 261.867188 424.617188 262.0625 C 424.660156 262.082031 424.683594 262.105469 424.703125 262.105469 C 425.179688 262.320312 425.679688 262.515625 426.152344 262.6875 C 426.566406 262.859375 426.976562 263.011719 427.40625 263.164062 C 429.050781 263.726562 430.738281 264.179688 432.492188 264.503906 C 432.96875 264.589844 433.445312 264.675781 433.917969 264.742188 C 434.003906 264.765625 434.070312 264.785156 434.15625 264.785156 C 434.675781 264.851562 435.171875 264.914062 435.695312 264.957031 C 436.019531 265.023438 436.34375 265.046875 436.667969 265.066406 L 460.636719 266.882812 L 460.9375 266.863281 L 469.914062 266.191406 Z",
  // Piece 1 — Top-left
  "M 397.492188 230.929688 L 399.21875 208.042969 L 348.796875 208.042969 L 348.796875 266.171875 L 363.332031 265.066406 C 381.589844 263.683594 396.105469 249.1875 397.492188 230.929688 Z",
  // Piece 2 — Bottom-left
  "M 399.546875 331.457031 L 397.492188 304.242188 C 396.105469 286.007812 381.589844 271.492188 363.332031 270.105469 L 348.796875 269.003906 L 336.683594 268.097656 L 336.226562 268.140625 L 330.085938 268.59375 L 348.796875 270 L 348.796875 331.457031 L 398.84375 331.457031 L 399.617188 341.75 L 399.964844 337.164062 L 399.535156 331.457031 Z",
  // Piece 3 — Bottom-right
  "M 437.335938 271.058594 C 436.882812 270.777344 436.449219 270.519531 435.976562 270.238281 L 435.953125 270.238281 C 435.929688 270.214844 435.910156 270.214844 435.886719 270.195312 C 435.324219 270.238281 434.785156 270.300781 434.222656 270.390625 C 433.769531 270.453125 433.335938 270.519531 432.902344 270.605469 L 432.859375 270.605469 C 432.449219 270.671875 432.015625 270.757812 431.605469 270.863281 C 430.609375 271.058594 429.636719 271.296875 428.683594 271.621094 C 428.25 271.730469 427.820312 271.882812 427.386719 272.03125 C 427.0625 272.140625 426.757812 272.25 426.433594 272.378906 C 426.066406 272.507812 425.699219 272.660156 425.308594 272.8125 C 424.832031 273.007812 424.359375 273.222656 423.882812 273.4375 C 423.210938 273.742188 422.539062 274.089844 421.871094 274.433594 C 421.070312 274.867188 420.289062 275.320312 419.535156 275.816406 C 418.949219 276.1875 418.386719 276.574219 417.824219 276.964844 C 417.132812 277.484375 416.460938 278.003906 415.8125 278.542969 C 415.316406 278.957031 414.816406 279.386719 414.34375 279.84375 C 413.800781 280.339844 413.261719 280.859375 412.761719 281.378906 C 412.480469 281.660156 412.199219 281.960938 411.917969 282.285156 C 411.441406 282.804688 410.988281 283.347656 410.558594 283.886719 C 410.210938 284.320312 409.863281 284.773438 409.539062 285.226562 C 409.324219 285.488281 409.128906 285.769531 408.957031 286.027344 C 408.695312 286.394531 408.457031 286.765625 408.222656 287.132812 C 407.917969 287.585938 407.636719 288.0625 407.375 288.539062 C 407.203125 288.796875 407.050781 289.078125 406.921875 289.359375 C 406.769531 289.621094 406.617188 289.878906 406.488281 290.140625 C 405.992188 291.089844 405.558594 292.0625 405.148438 293.058594 C 404.738281 294.074219 404.371094 295.09375 404.042969 296.132812 C 403.742188 297.148438 403.460938 298.1875 403.246094 299.226562 C 403.222656 299.355469 403.179688 299.484375 403.15625 299.613281 C 403.070312 300.046875 402.984375 300.480469 402.917969 300.910156 C 402.8125 301.476562 402.746094 302.015625 402.683594 302.578125 C 402.597656 303.117188 402.554688 303.679688 402.511719 304.242188 L 400.453125 331.457031 L 405.386719 331.457031 C 429.699219 331.457031 451.226562 323.171875 451.226562 296.195312 C 451.226562 288.515625 447.050781 277.265625 437.335938 271.058594 Z",
];

// Center of each B piece (bounding box center)
const PIECE_CENTERS: [number, number][] = [
  [425, 236],  // top-right
  [374, 237],  // top-left
  [365, 300],  // bottom-left
  [426, 301],  // bottom-right
];

// Generate an ellipse SVG path (oval)
function ellipsePath(cx: number, cy: number, rx: number, ry: number): string {
  return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy} Z`;
}

// ViewBox center
const VB_CX = 325 + 135 / 2; // 392.5
const VB_CY = 195 + 155 / 2; // 272.5

// Spin easing: sine curve (slow → fast → slow), more pronounced
function spinEase(t: number): number {
  return (1 - Math.cos(t * Math.PI)) / 2;
}

// Ease out with quartic for smoother deceleration
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

// Smooth ease in-out cubic
function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ── Timeline (seconds) ──────────────────────────────────────────────
// Blob:          0.0  → 0.4   (frames  0-12)
// Split:         0.4  → 0.6   (frames 12-18)
// Spin+Expand:   0.6  → 2.33  (frames 18-70)
// Morph begins:  1.83         (frame  55)  ← OVERLAP with spin
// Spin ends:     2.67         (frame  80)
// Morph ends:    3.2          (frame  96)
// Hold:          3.2  → 3.6   (frames 96-108)
// Fade:          3.6  → 4.5   (frames 108-135)

const BLOB_END = 0.4;
const SPIN_START = 0.4;
const SPIN_END = 2.67;       // rotation fully stops here
const SPREAD_PEAK = 1.6;     // circles reach max spread
const MORPH_START = 1.83;    // morph begins DURING spin
const MORPH_END = 3.2;       // morph fully complete
const HOLD_END = 3.6;
const FADE_END = 4.5;

// ~2 full turns (less than before = more elegant)
const TOTAL_ROTATION = Math.PI * 4;

// Much larger orbit radius so circles are clearly separated
const MAX_SPREAD = 55;

// Circle dimensions
const CIRCLE_R = 14;
const CIRCLE_RY = CIRCLE_R * 0.82;

export const BeyondFocusLoading: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // Memoize flubber interpolators (one per piece, from center-placed ellipse to final path)
  const morphInterpolators = useMemo(() => {
    return B_PATHS.map((targetPath, i) => {
      const c = PIECE_CENTERS[i];
      const source = ellipsePath(c[0], c[1], CIRCLE_R, CIRCLE_RY);
      return flubberInterpolate(source, targetPath, { maxSegmentLength: 2 });
    });
  }, []);

  // ── Global fade out ──
  const globalOpacity = t >= HOLD_END
    ? interpolate(t, [HOLD_END, FADE_END], [1, 0], { extrapolateRight: "clamp" })
    : 1;
  const globalScale = t >= HOLD_END
    ? interpolate(t, [HOLD_END, FADE_END], [1, 1.05], { extrapolateRight: "clamp" })
    : 1;

  // ── Phase 1: Blob (stronger presence) ──
  const blobProgress = interpolate(t, [0, BLOB_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blobOpacity = easeOutQuart(blobProgress);
  const blobRadius = 5 + 14 * easeOutQuart(blobProgress);
  const blobBlur = interpolate(blobProgress, [0, 1], [6, 3]); // less blur = more solid
  const blobGlowRadius = 45 * easeOutQuart(blobProgress);
  const blobGlowOpacity = blobOpacity * 0.4; // stronger glow

  // Split: blob fades as circles appear
  const splitProgress = interpolate(t, [BLOB_END, BLOB_END + 0.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Phase 2: Spin ──
  const spinDuration = SPIN_END - SPIN_START;
  const spinT = interpolate(t, [SPIN_START, SPIN_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rotation = TOTAL_ROTATION * spinEase(spinT);

  // ── Spread: gradual expansion then contract during morph ──
  // Circles expand from 0 to MAX_SPREAD, then contract back toward final positions
  const spreadProgress = interpolate(t, [BLOB_END, SPREAD_PEAK], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const spreadContractProgress = interpolate(t, [MORPH_START, MORPH_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const spreadExpand = MAX_SPREAD * easeOutQuart(spreadProgress);
  // During morph, spread contracts smoothly to 0 (pieces move to final B positions)
  const spreadContract = easeInOutCubic(spreadContractProgress);
  const spread = spreadExpand * (1 - spreadContract);

  // ── Circle blur: starts blurry, clears up ──
  const formProgress = interpolate(t, [BLOB_END, BLOB_END + 0.4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const circleBlur = interpolate(easeOutQuart(formProgress), [0, 1], [6, 0]);

  // ── Phase 3: Morph (overlaps with spin!) ──
  const morphProgress = interpolate(t, [MORPH_START, MORPH_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const morphEased = easeInOutCubic(morphProgress);

  // ── Compute each piece ──
  const pieces = [0, 1, 2, 3].map((i) => {
    const targetCenter = PIECE_CENTERS[i];
    const angle = rotation + (Math.PI / 2) * i;

    // Orbital position
    const orbitalX = VB_CX + Math.cos(angle) * spread;
    const orbitalY = VB_CY + Math.sin(angle) * spread;

    // Blend from orbital to final position as morph progresses
    const currentX = interpolate(morphEased, [0, 1], [orbitalX, targetCenter[0]]);
    const currentY = interpolate(morphEased, [0, 1], [orbitalY, targetCenter[1]]);

    // Self-rotation: face outward during spin, settle to 0
    const selfRotation = interpolate(morphEased, [0, 1], [angle, 0]);

    // Path: ellipse → final B piece via flubber
    let pathD: string;
    if (morphEased <= 0) {
      pathD = ellipsePath(currentX, currentY, CIRCLE_R, CIRCLE_RY);
    } else if (morphEased >= 1) {
      pathD = B_PATHS[i];
    } else {
      // During morph: create interpolator from current ellipse to final path
      const sourceEllipse = ellipsePath(currentX, currentY, CIRCLE_R, CIRCLE_RY);
      try {
        const interp = flubberInterpolate(sourceEllipse, B_PATHS[i], { maxSegmentLength: 2 });
        pathD = interp(morphEased);
      } catch {
        pathD = morphInterpolators[i](morphEased);
      }
    }

    return {
      pathD,
      x: currentX,
      y: currentY,
      selfRotation,
      blur: circleBlur * (1 - morphEased),
    };
  });

  const showBlob = t < BLOB_END + 0.2;
  const showCircles = t >= BLOB_END;

  return (
    <AbsoluteFill style={{ background: CREAM }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: globalOpacity,
          transform: `scale(${globalScale})`,
        }}
      >
        <svg
          viewBox="280 170 200 200"
          style={{
            width: "40%",
            height: "40%",
          }}
        >
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="blobBlur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation={blobBlur} />
            </filter>
            {pieces.map((piece, i) =>
              piece.blur > 0.3 ? (
                <filter
                  key={`blur-${i}`}
                  id={`circleBlur-${i}`}
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation={piece.blur} />
                </filter>
              ) : null
            )}
          </defs>

          {/* Phase 1: Blob — solid petrol dot with glow */}
          {showBlob && (
            <g opacity={blobOpacity * (1 - splitProgress)}>
              <circle
                cx={VB_CX}
                cy={VB_CY}
                r={blobGlowRadius}
                fill={PETROL}
                opacity={blobGlowOpacity}
                filter="url(#glow)"
              />
              <circle
                cx={VB_CX}
                cy={VB_CY}
                r={blobRadius}
                fill={PETROL}
                filter="url(#blobBlur)"
              />
            </g>
          )}

          {/* Phases 2-4: Spinning circles → morphing to B */}
          {showCircles &&
            pieces.map((piece, i) => (
              <g key={i} opacity={splitProgress}>
                {morphEased <= 0 ? (
                  <g
                    transform={`translate(${piece.x}, ${piece.y}) rotate(${(piece.selfRotation * 180) / Math.PI})`}
                  >
                    <ellipse
                      cx={0}
                      cy={0}
                      rx={CIRCLE_R}
                      ry={CIRCLE_RY}
                      fill={PETROL}
                      filter={
                        piece.blur > 0.3
                          ? `url(#circleBlur-${i})`
                          : undefined
                      }
                    />
                  </g>
                ) : (
                  <path
                    d={piece.pathD}
                    fill={PETROL}
                    filter={
                      piece.blur > 0.3
                        ? `url(#circleBlur-${i})`
                        : undefined
                    }
                  />
                )}
              </g>
            ))}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
