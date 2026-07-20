"use client";

import { FaShoppingBag } from "react-icons/fa";

export default function PaperBagLoader() {
  return (
    <div className="flex flex-col items-center justify-center select-none">
      {/* SVG Container for the falling items and green paper bag */}
      <div className="relative w-36 h-36 drop-shadow-xl">
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Embedded animations for high performance SVG transition */}
          <style>{`
            @keyframes dropShirt {
              0% {
                transform: translate(0, -60px) rotate(0deg) scale(0.5);
                opacity: 0;
              }
              15% {
                opacity: 1;
              }
              70% {
                opacity: 1;
              }
              90%, 100% {
                transform: translate(4px, 15px) rotate(180deg) scale(0.7);
                opacity: 0;
              }
            }
            @keyframes dropShoe {
              0% {
                transform: translate(0, -60px) rotate(0deg) scale(0.5);
                opacity: 0;
              }
              15% {
                opacity: 1;
              }
              70% {
                opacity: 1;
              }
              90%, 100% {
                transform: translate(-4px, 15px) rotate(-140deg) scale(0.7);
                opacity: 0;
              }
            }
            @keyframes dropHeart {
              0% {
                transform: translate(0, -60px) rotate(0deg) scale(0.5);
                opacity: 0;
              }
              15% {
                opacity: 1;
              }
              70% {
                opacity: 1;
              }
              90%, 100% {
                transform: translate(2px, 15px) rotate(220deg) scale(0.7);
                opacity: 0;
              }
            }
            @keyframes squashBag {
              0%, 100% {
                transform: scale(1);
              }
              25% {
                transform: scale(1.06, 0.94);
              }
              45% {
                transform: scale(0.96, 1.04);
              }
              65% {
                transform: scale(1.02, 0.98);
              }
              80% {
                transform: scale(1);
              }
            }
            @keyframes pulseShadow {
              0%, 100% {
                transform: scale(1);
                opacity: 0.6;
              }
              25% {
                transform: scale(1.12);
                opacity: 0.9;
              }
              45% {
                transform: scale(0.92);
                opacity: 0.4;
              }
              65% {
                transform: scale(1.02);
                opacity: 0.7;
              }
            }
            .anim-shirt {
              animation: dropShirt 1.8s cubic-bezier(0.25, 1, 0.5, 1) infinite;
              transform-origin: 60px 40px;
            }
            .anim-shoe {
              animation: dropShoe 1.8s cubic-bezier(0.25, 1, 0.5, 1) infinite;
              animation-delay: 0.6s;
              transform-origin: 56px 40px;
            }
            .anim-heart {
              animation: dropHeart 1.8s cubic-bezier(0.25, 1, 0.5, 1) infinite;
              animation-delay: 1.2s;
              transform-origin: 64px 40px;
            }
            .anim-bag-group {
              animation: squashBag 1.8s ease-in-out infinite;
              transform-origin: 60px 95px;
            }
            .anim-shadow {
              animation: pulseShadow 1.8s ease-in-out infinite;
              transform-origin: 60px 98px;
            }
          `}</style>

          {/* Background Soft Glow */}
          <circle cx="60" cy="60" r="50" fill="#F0FDF4" opacity="0.9" />

          {/* Bag Shadow */}
          <ellipse
            cx="60"
            cy="98"
            rx="20"
            ry="3.5"
            fill="#D1D5DB"
            className="anim-shadow"
          />

          {/* Falling Item 1: Cute Pink T-Shirt */}
          <g className="anim-shirt" style={{ transformOrigin: "60px 40px" }}>
            <path
              d="M50,30 L54,34 L56,33 L58,35 L62,35 L64,33 L66,34 L70,30 L66,26 L64,28 C62,26 58,26 56,28 L54,26 Z"
              fill="#F472B6"
            />
          </g>

          {/* Falling Item 2: Yellow Sneaker Shoe */}
          <g className="anim-shoe" style={{ transformOrigin: "56px 40px" }}>
            <path
              d="M48,32 C48,28 52,27 56,30 L64,31 L64,35 L50,35 C48,35 48,33 48,32 Z"
              fill="#FACC15"
            />
            {/* White Sole */}
            <path
              d="M49,34 L63,34 L63,36 L50,36 Z"
              fill="#FFFFFF"
            />
          </g>

          {/* Falling Item 3: Blue Eco Heart */}
          <g className="anim-heart" style={{ transformOrigin: "64px 40px" }}>
            <path
              d="M60,28 C58,25 64,23 64,28 C64,23 70,25 68,28 L64,33 Z"
              fill="#38BDF8"
            />
          </g>

          {/* Green Paper Bag Group (Squeezes when items enter) */}
          <g className="anim-bag-group">
            {/* Bag Handles */}
            {/* Left Handle */}
            <path
              d="M48,56 C48,43 54,43 54,56"
              stroke="#FBBF24"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Right Handle */}
            <path
              d="M66,56 C66,43 72,43 72,56"
              stroke="#FBBF24"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Bag Body (Trapezoid Paper Bag) */}
            {/* Left Darker shadow side */}
            <path
              d="M38,95 L44,56 L60,56 L60,95 Z"
              fill="#0F472E"
            />
            {/* Right Emerald Side */}
            <path
              d="M60,95 L60,56 L76,56 L82,95 Z"
              fill="#145A3B"
            />

            {/* ReUse Decorative Eco Leaf Badge on Bag */}
            <path
              d="M60,68 C64,68 67,73 60,78 C53,73 56,68 60,68 Z"
              fill="#FBBF24"
            />
            <path
              d="M60,78 L60,72"
              stroke="#145A3B"
              strokeWidth="1"
            />
          </g>
        </svg>
      </div>

      {/* Pulsing loading... text below */}
      <span className="text-emerald-800 text-xs sm:text-sm font-black tracking-widest animate-pulse mt-5 uppercase">
        loading...
      </span>
    </div>
  );
}
