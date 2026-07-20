"use client";

export default function ChibiFarmerLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Small animated chibi farmer card container */}
      <div className="bg-white rounded-[32px] border border-gray-100/80 shadow-md p-8 flex flex-col items-center justify-center max-w-[280px] w-full transition-all duration-300">
        
        {/* SVG Chibi Farmer */}
        <div className="relative w-36 h-36">
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full select-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Embedded styles for standalone smooth vector animation */}
            <style>{`
              @keyframes swingHoe {
                0%, 100% {
                  transform: rotate(-10deg);
                }
                50% {
                  transform: rotate(20deg);
                }
              }
              @keyframes wobblePlant {
                0%, 100% {
                  transform: scale(1) rotate(0deg);
                }
                50% {
                  transform: scale(1.1) rotate(5deg);
                }
              }
              @keyframes floatSoil {
                0% {
                  opacity: 0;
                  transform: translate(0, 0) scale(0.5);
                }
                40% {
                  opacity: 0.8;
                }
                100% {
                  opacity: 0;
                  transform: translate(8px, -12px) scale(1.2);
                }
              }
              @keyframes floatSweat {
                0% {
                  opacity: 0;
                  transform: translate(0, 0) scale(0.6);
                }
                30% {
                  opacity: 1;
                }
                100% {
                  opacity: 0;
                  transform: translate(-6px, 8px) scale(1);
                }
              }
              .anim-hoe-group {
                animation: swingHoe 1.2s ease-in-out infinite;
                transform-origin: 46px 72px;
              }
              .anim-plant-group {
                animation: wobblePlant 1.2s ease-in-out infinite;
                transform-origin: 85px 95px;
              }
              .anim-soil-particle-1 {
                animation: floatSoil 1.2s ease-in-out infinite;
                animation-delay: 0.6s;
              }
              .anim-soil-particle-2 {
                animation: floatSoil 1.2s ease-in-out infinite;
                animation-delay: 0.7s;
              }
              .anim-sweat {
                animation: floatSweat 2s ease-in-out infinite;
              }
            `}</style>

            {/* Background Sky / Soft Glow */}
            <circle cx="60" cy="60" r="50" fill="#F0FDF4" />

            {/* Soil Ground Line */}
            <path
              d="M15,95 L105,95"
              stroke="#D1D5DB"
              strokeWidth="4"
              strokeLinecap="round"
            />
            
            {/* Small Dirt Piles */}
            <path d="M78,95 C80,88 88,88 92,95 Z" fill="#78350F" />
            <path d="M40,95 C42,91 48,91 50,95 Z" fill="#9A3412" />

            {/* Sweating Droplet (Chibi Detail) */}
            <path
              d="M26,62 Q23,65 24,68 Q26,69 27,66 Z"
              fill="#38BDF8"
              className="anim-sweat"
              style={{ transformOrigin: "26px 62px" }}
            />

            {/* Sprout Plant (Right Side) */}
            <g className="anim-plant-group">
              {/* Sprout Stem */}
              <path
                d="M85,95 L85,82"
                stroke="#10B981"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Left Leaf */}
              <path
                d="M85,84 C80,78 78,80 85,84 Z"
                fill="#34D399"
              />
              {/* Right Leaf */}
              <path
                d="M85,82 C90,76 92,78 85,82 Z"
                fill="#059669"
              />
              {/* Bud center */}
              <circle cx="85" cy="80" r="1.5" fill="#FCD34D" />
            </g>

            {/* Farmer Body & Head */}
            {/* Feet */}
            <circle cx="38" cy="95" r="4.5" fill="#4B5563" />
            <circle cx="48" cy="95" r="4.5" fill="#4B5563" />

            {/* Clothes (Blue Overalls) */}
            <path
              d="M32,95 L32,74 C32,68 54,68 54,74 L54,95 Z"
              fill="#2563EB"
            />
            {/* Yellow Shirt underneath */}
            <path
              d="M38,72 L48,72 L45,78 L41,78 Z"
              fill="#FBBF24"
            />

            {/* Head (Chibi Face) */}
            <circle cx="43" cy="58" r="13" fill="#FED7AA" />
            
            {/* Cute Cheeks */}
            <circle cx="34" cy="61" r="2.5" fill="#F87171" opacity="0.6" />
            <circle cx="52" cy="61" r="2.5" fill="#F87171" opacity="0.6" />

            {/* Big Shiny Chibi Eyes */}
            <circle cx="37" cy="57" r="2.2" fill="#1F2937" />
            <circle cx="36.5" cy="56.2" r="0.8" fill="#FFFFFF" /> {/* eye shine */}
            
            <circle cx="49" cy="57" r="2.2" fill="#1F2937" />
            <circle cx="48.5" cy="56.2" r="0.8" fill="#FFFFFF" /> {/* eye shine */}

            {/* Happy Smile */}
            <path
              d="M41,63 Q43,66 45,63"
              stroke="#1F2937"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Straw Hat */}
            {/* Top crown */}
            <path
              d="M32,48 C32,32 54,32 54,48 Z"
              fill="#EAB308"
            />
            {/* Hat ribbon/band */}
            <path
              d="M32,48 L54,48 L53,45 L33,45 Z"
              fill="#DC2626"
            />
            {/* Hat Brim */}
            <ellipse
              cx="43"
              cy="49"
              rx="21"
              ry="3"
              fill="#FACC15"
            />

            {/* Animated Hoe and Arm Group */}
            <g className="anim-hoe-group">
              {/* Shoulder to Hand Arm */}
              <path
                d="M46,72 L58,74 L68,66"
                stroke="#2563EB"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Hand skin circle */}
              <circle cx="68" cy="66" r="3.5" fill="#FED7AA" />

              {/* Hoe (Cangkul) */}
              {/* Wooden shaft handle */}
              <line
                x1="52"
                y1="76"
                x2="82"
                y2="42"
                stroke="#78350F"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Grey Iron Connector */}
              <path
                d="M80,44 L86,39 L88,43 Z"
                fill="#4B5563"
              />
              {/* Hoe Blade */}
              <path
                d="M86,39 L92,54 L84,56 Z"
                fill="#9CA3AF"
              />
            </g>

            {/* Flying Soil Dust Particles on hoe strike */}
            <circle
              cx="79"
              cy="90"
              r="2"
              fill="#B45309"
              className="anim-soil-particle-1"
            />
            <circle
              cx="86"
              cy="88"
              r="1.5"
              fill="#78350F"
              className="anim-soil-particle-2"
            />
          </svg>
        </div>

        {/* Pulsing loading... text below */}
        <span className="text-gray-400 text-xs sm:text-sm font-bold tracking-wider animate-pulse mt-4 uppercase">
          loading...
        </span>
      </div>
    </div>
  );
}
