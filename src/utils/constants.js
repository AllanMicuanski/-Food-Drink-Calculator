// src/utils/constants.js

// Constantes de configuração para otimização
export const PIZZA_SIZES = {
  pequena: { fatias: 6, label: "Pequena (6 fatias)" },
  media: { fatias: 8, label: "Média (8 fatias)" },
  grande: { fatias: 10, label: "Grande (10 fatias)" },
  familia: { fatias: 12, label: "Família (12 fatias)" },
};

export const DRINK_PRESETS = {
  economico: { amount: 0.5, label: "Econômico (0.5L)" },
  normal: { amount: 0.75, label: "Normal (0.75L)" },
  generoso: { amount: 1.0, label: "Generoso (1L)" },
  festa: { amount: 1.5, label: "Festa (1.5L)" },
};

export const SLICES_PER_PERSON = {
  light: 2,
  normal: 3,
  muito: 4,
  faminto: 5,
};

export const VALIDATION_RULES = {
  pessoas: {
    min: 1,
    max: 100,
    required: true,
  },
  precoPizza: {
    min: 0,
    max: 1000,
    required: true,
  },
  bebidaPorPessoa: {
    min: 0,
    max: 5,
    required: false,
  },
};

export const ANIMATION_TYPES = {
  bounce: "animate-bounce",
  pulse: "animate-pulse",
  spin: "animate-spin",
  shake: "animate-shake",
  float: "animate-float",
};

export const WIZARD_STEPS = {
  PIZZA: 0,
  DRINKS: 1,
  RESULTS: 2,
};

export const PERFORMANCE_THRESHOLDS = {
  RENDER_TIME_WARNING: 16, // ms
  CALCULATION_TIME_WARNING: 5, // ms
  MEMORY_WARNING: 50 * 1024 * 1024, // 50MB
};
