import type { Subject, Grade, Chapter, Activity } from '../types';

// Helper to create activities
const createQuiz = (id: string, question: string, options: string[], correct: number, explanation: string, xp = 10): Activity => ({
  id, type: 'quiz', question, tokenReward: xp,
  data: { options, correctAnswer: correct, explanation }
});

const createFlashcard = (id: string, question: string, front: string, back: string, xp = 5): Activity => ({
  id, type: 'flashcard', question, tokenReward: xp,
  data: { front, back }
});

const createMatch = (id: string, question: string, pairs: {term: string, definition: string}[], xp = 15): Activity => ({
  id, type: 'match', question, tokenReward: xp,
  data: { pairs }
});

const createTrueFalse = (id: string, question: string, statement: string, isTrue: boolean, explanation: string, xp = 8): Activity => ({
  id, type: 'true_false', question, tokenReward: xp,
  data: { statement, isTrue, explanation }
});

const createFillBlank = (id: string, question: string, sentence: string, blanks: string[], options: string[], xp = 12): Activity => ({
  id, type: 'fill_blank', question, tokenReward: xp,
  data: { sentence, blanks, options }
});

// ============ PHYSICS CURRICULUM ============
const physicsPlusOneChapters: Chapter[] = [
  {
    id: 'phy-11-1',
    name: 'Physical World',
    description: 'Scope and excitement of physics, fundamental forces',
    moduleCount: 3,
    modules: [
      {
        id: 'phy-11-1-m1',
        name: 'Introduction to Physics',
        description: 'What is physics and its branches',
        totalTokens: 50,
        levels: [
          {
            id: 'phy-11-1-m1-l1',
            name: 'Start',
            order: 1,
            totalTokens: 50,
            activities: [
              createQuiz('phy-11-1-m1-l1-a1', 'Which branch of physics deals with motion?', ['Thermodynamics', 'Mechanics', 'Optics', 'Electromagnetism'], 1, 'Mechanics studies motion and forces.', 10),
              createFlashcard('phy-11-1-m1-l1-a2', 'Key Term', 'Physics', 'The study of nature and natural phenomena', 5),
              createTrueFalse('phy-11-1-m1-l1-a3', 'True or False', 'Physics is derived from a Greek word meaning nature', true, 'Physics comes from Greek "physis" meaning nature', 8),
            ]
          },
          {
            id: 'phy-11-1-m1-l2',
            name: 'Branches',
            order: 2,
            totalTokens: 60,
            activities: [
              createMatch('phy-11-1-m1-l2-a1', 'Match the branches', [
                {term: 'Mechanics', definition: 'Motion and forces'},
                {term: 'Thermodynamics', definition: 'Heat and temperature'},
                {term: 'Optics', definition: 'Light and vision'},
                {term: 'Electromagnetism', definition: 'Electric and magnetic phenomena'},
              ], 15),
              createQuiz('phy-11-1-m1-l2-a2', 'Which scientist is known as the father of modern physics?', ['Newton', 'Einstein', 'Galileo', 'Bohr'], 2, 'Einstein revolutionized physics with relativity', 12),
            ]
          }
        ]
      },
      {
        id: 'phy-11-1-m2',
        name: 'Fundamental Forces',
        description: 'The four fundamental forces of nature',
        totalTokens: 70,
        levels: [
          {
            id: 'phy-11-1-m2-l1',
            name: 'Forces Overview',
            order: 1,
            totalTokens: 70,
            activities: [
              createQuiz('phy-11-1-m2-l1-a1', 'Which is the strongest fundamental force?', ['Gravity', 'Electromagnetic', 'Strong Nuclear', 'Weak Nuclear'], 2, 'Strong nuclear force holds atomic nuclei together', 10),
              createMatch('phy-11-1-m2-l1-a2', 'Match forces with their range', [
                {term: 'Gravitational', definition: 'Infinite range'},
                {term: 'Electromagnetic', definition: 'Infinite range'},
                {term: 'Strong Nuclear', definition: 'Very short range (~10^-15 m)'},
                {term: 'Weak Nuclear', definition: 'Very short range (~10^-18 m)'},
              ], 15),
              createTrueFalse('phy-11-1-m2-l1-a3', 'True or False', 'Gravity is the weakest of all fundamental forces', true, 'Gravity is approximately 10^39 times weaker than strong nuclear force', 10),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-11-2',
    name: 'Units and Measurements',
    description: 'SI units, dimensional analysis, measurement errors',
    moduleCount: 4,
    modules: [
      {
        id: 'phy-11-2-m1',
        name: 'SI Units',
        description: 'International System of Units',
        totalTokens: 60,
        levels: [
          {
            id: 'phy-11-2-m1-l1',
            name: 'Base Units',
            order: 1,
            totalTokens: 60,
            activities: [
              createMatch('phy-11-2-m1-l1-a1', 'Match base quantities with units', [
                {term: 'Length', definition: 'meter (m)'},
                {term: 'Mass', definition: 'kilogram (kg)'},
                {term: 'Time', definition: 'second (s)'},
                {term: 'Temperature', definition: 'kelvin (K)'},
                {term: 'Current', definition: 'ampere (A)'},
              ], 15),
              createQuiz('phy-11-2-m1-l1-a2', 'What is the SI unit of amount of substance?', ['mole', 'candela', 'ampere', 'kelvin'], 0, 'Mole (mol) is the SI unit for amount of substance', 10),
            ]
          }
        ]
      },
      {
        id: 'phy-11-2-m2',
        name: 'Measurement Errors',
        description: 'Types of errors and significant figures',
        totalTokens: 70,
        levels: [
          {
            id: 'phy-11-2-m2-l1',
            name: 'Error Types',
            order: 1,
            totalTokens: 70,
            activities: [
              createQuiz('phy-11-2-m2-l1-a1', 'Which error occurs due to faulty calibration?', ['Random error', 'Systematic error', 'Gross error', 'Parallax error'], 1, 'Systematic errors are consistent and due to instrument faults', 10),
              createTrueFalse('phy-11-2-m2-l1-a2', 'True or False', 'Random errors can be minimized by taking multiple measurements', true, 'Taking multiple readings and averaging reduces random errors', 8),
              createFillBlank('phy-11-2-m2-l1-a3', 'Fill in the blanks', 'The _____ error is the difference between measured and true value.', ['absolute'], ['absolute', 'relative', 'percentage', 'random'], 12),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-11-3',
    name: 'Motion in a Straight Line',
    description: 'Position, velocity, acceleration, kinematic equations',
    moduleCount: 5,
    modules: [
      {
        id: 'phy-11-3-m1',
        name: 'Basic Concepts',
        description: 'Position, distance, displacement',
        totalTokens: 55,
        levels: [
          {
            id: 'phy-11-3-m1-l1',
            name: 'Position & Path',
            order: 1,
            totalTokens: 55,
            activities: [
              createQuiz('phy-11-3-m1-l1-a1', 'What is the difference between distance and displacement?', ['Distance is vector, displacement is scalar', 'Distance is scalar, displacement is vector', 'Both are vectors', 'Both are scalars'], 1, 'Distance is path length (scalar), displacement is change in position (vector)', 10),
              createTrueFalse('phy-11-3-m1-l1-a2', 'True or False', 'Displacement can be zero even when distance is not zero', true, 'When you return to the starting point, displacement is zero but distance is not', 8),
            ]
          }
        ]
      },
      {
        id: 'phy-11-3-m2',
        name: 'Velocity & Acceleration',
        description: 'Speed, velocity, acceleration concepts',
        totalTokens: 65,
        levels: [
          {
            id: 'phy-11-3-m2-l1',
            name: 'Rate of Change',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('phy-11-3-m2-l1-a1', 'What is the unit of acceleration in SI?', ['m/s', 'm/s²', 'm²/s', 's/m'], 1, 'Acceleration = change in velocity / time, so unit is m/s²', 10),
              createFlashcard('phy-11-3-m2-l1-a2', 'Key Formula', 'v = u + at', 'Final velocity = initial velocity + acceleration × time', 5),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-11-4',
    name: 'Motion in a Plane',
    description: 'Vectors, projectile motion, circular motion',
    moduleCount: 5,
    modules: [
      {
        id: 'phy-11-4-m1',
        name: 'Vectors',
        description: 'Vector operations and components',
        totalTokens: 60,
        levels: [
          {
            id: 'phy-11-4-m1-l1',
            name: 'Vector Basics',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('phy-11-4-m1-l1-a1', 'What is the angle between two vectors for maximum resultant?', ['0°', '90°', '180°', '270°'], 0, 'At 0°, vectors add directly giving maximum resultant', 10),
              createMatch('phy-11-4-m1-l1-a2', 'Match vector operations', [
                {term: 'Scalar product', definition: 'A·B = |A||B|cos θ'},
                {term: 'Vector product', definition: '|A×B| = |A||B|sin θ'},
                {term: 'Unit vector', definition: 'Vector with magnitude 1'},
              ], 15),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-11-5',
    name: 'Laws of Motion',
    description: 'Newtons laws, friction, circular motion',
    moduleCount: 5,
    modules: [
      {
        id: 'phy-11-5-m1',
        name: 'Newtons First Law',
        description: 'Inertia and equilibrium',
        totalTokens: 55,
        levels: [
          {
            id: 'phy-11-5-m1-l1',
            name: 'Inertia',
            order: 1,
            totalTokens: 55,
            activities: [
              createQuiz('phy-11-5-m1-l1-a1', 'Which law defines inertia?', ['First', 'Second', 'Third', 'None'], 0, 'Newtons First Law is also called Law of Inertia', 10),
              createTrueFalse('phy-11-5-m1-l1-a2', 'True or False', 'Inertia depends on mass', true, 'Mass is the measure of inertia', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-11-6',
    name: 'Work, Energy and Power',
    description: 'Work done, kinetic and potential energy, power',
    moduleCount: 4,
    modules: [
      {
        id: 'phy-11-6-m1',
        name: 'Work and Energy',
        description: 'Work-energy theorem',
        totalTokens: 60,
        levels: [
          {
            id: 'phy-11-6-m1-l1',
            name: 'Work Definition',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('phy-11-6-m1-l1-a1', 'Work done is zero when:', ['Force is zero', 'Displacement is zero', 'Force ⊥ displacement', 'All of these'], 3, 'W = F·d·cos θ, so work is zero in all these cases', 10),
              createFlashcard('phy-11-6-m1-l1-a2', 'Work-Energy Theorem', 'W = ΔKE', 'Work done equals change in kinetic energy', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-11-7',
    name: 'System of Particles and Rotational Motion',
    description: 'Center of mass, torque, angular momentum',
    moduleCount: 6,
    modules: [
      {
        id: 'phy-11-7-m1',
        name: 'Center of Mass',
        description: 'COM calculation',
        totalTokens: 55,
        levels: [
          {
            id: 'phy-11-7-m1-l1',
            name: 'COM Basics',
            order: 1,
            totalTokens: 55,
            activities: [
              createQuiz('phy-11-7-m1-l1-a1', 'Where is COM of a uniform rod?', ['At center', 'At one end', 'At 1/4 point', 'Varies'], 0, 'For uniform objects, COM is at geometric center', 10),
              createMatch('phy-11-7-m1-l1-a2', 'Match concepts', [
                {term: 'Torque', definition: 'τ = r × F'},
                {term: 'Angular momentum', definition: 'L = r × p'},
                {term: 'Moment of inertia', definition: 'I = Σmr²'},
              ], 15),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-11-8',
    name: 'Gravitation',
    description: 'Universal law, orbital motion, satellites',
    moduleCount: 5,
    modules: [
      {
        id: 'phy-11-8-m1',
        name: 'Universal Gravitation',
        description: 'Newtons law of gravitation',
        totalTokens: 60,
        levels: [
          {
            id: 'phy-11-8-m1-l1',
            name: 'Gravitational Force',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('phy-11-8-m1-l1-a1', 'Gravitational force is:', ['Always attractive', 'Always repulsive', 'Both', 'Zero'], 0, 'Gravity is always attractive, never repulsive', 10),
              createFillBlank('phy-11-8-m1-l1-a2', 'Formula', 'F = G_____ / r²', ['m₁m₂'], ['m₁m₂', 'm₁+m₂', 'm₁-m₂', 'm₁/m₂'], 10),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-11-9',
    name: 'Mechanical Properties of Solids',
    description: 'Stress, strain, elasticity',
    moduleCount: 4,
    modules: [
      {
        id: 'phy-11-9-m1',
        name: 'Elasticity',
        description: 'Hookes law, elastic moduli',
        totalTokens: 50,
        levels: [
          {
            id: 'phy-11-9-m1-l1',
            name: 'Stress and Strain',
            order: 1,
            totalTokens: 50,
            activities: [
              createQuiz('phy-11-9-m1-l1-a1', 'Unit of stress is:', ['N/m²', 'N/m', 'Nm', 'N'], 0, 'Stress = Force/Area, unit is N/m² or Pascal', 10),
              createTrueFalse('phy-11-9-m1-l1-a2', 'True or False', 'Hookes law is valid for all materials', false, 'Hookes law applies only within elastic limit', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-11-10',
    name: 'Mechanical Properties of Fluids',
    description: 'Pressure, viscosity, surface tension',
    moduleCount: 5,
    modules: [
      {
        id: 'phy-11-10-m1',
        name: 'Fluid Pressure',
        description: 'Pascals law, hydrostatic pressure',
        totalTokens: 55,
        levels: [
          {
            id: 'phy-11-10-m1-l1',
            name: 'Pressure Basics',
            order: 1,
            totalTokens: 55,
            activities: [
              createQuiz('phy-11-10-m1-l1-a1', 'Hydraulic lift works on:', ['Archimedes principle', 'Pascals law', 'Bernoullis principle', 'Hookes law'], 1, 'Pascals law: pressure applied to fluid is transmitted equally', 10),
              createFlashcard('phy-11-10-m1-l1-a2', 'Formula', 'P = ρgh', 'Hydrostatic pressure = density × g × depth', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-11-11',
    name: 'Thermal Properties of Matter',
    description: 'Heat, temperature, expansion, calorimetry',
    moduleCount: 4,
    modules: [
      {
        id: 'phy-11-11-m1',
        name: 'Heat and Temperature',
        description: 'Thermal expansion',
        totalTokens: 50,
        levels: [
          {
            id: 'phy-11-11-m1-l1',
            name: 'Thermal Concepts',
            order: 1,
            totalTokens: 50,
            activities: [
              createQuiz('phy-11-11-m1-l1-a1', 'Specific heat capacity unit:', ['J/kg·K', 'J/kg', 'J/K', 'kg/J'], 0, 's = Q/(mΔT), unit is J/(kg·K)', 10),
              createMatch('phy-11-11-m1-l1-a2', 'Match terms', [
                {term: 'Conduction', definition: 'Heat transfer through contact'},
                {term: 'Convection', definition: 'Heat transfer by fluid motion'},
                {term: 'Radiation', definition: 'Heat transfer by EM waves'},
              ], 15),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-11-12',
    name: 'Thermodynamics',
    description: 'Laws of thermodynamics, heat engines',
    moduleCount: 5,
    modules: [
      {
        id: 'phy-11-12-m1',
        name: 'First Law',
        description: 'Energy conservation in thermodynamics',
        totalTokens: 60,
        levels: [
          {
            id: 'phy-11-12-m1-l1',
            name: 'First Law',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('phy-11-12-m1-l1-a1', 'First law of thermodynamics is:', ['ΔQ = ΔU + ΔW', 'ΔU = ΔQ + ΔW', 'ΔW = ΔU + ΔQ', 'None'], 0, 'First law: dQ = dU + dW (heat = internal energy + work)', 10),
              createTrueFalse('phy-11-12-m1-l1-a2', 'True or False', 'In isothermal process, ΔU = 0', true, 'Temperature constant means no change in internal energy', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-11-13',
    name: 'Kinetic Theory',
    description: 'Behavior of gases, kinetic theory of gases',
    moduleCount: 4,
    modules: [
      {
        id: 'phy-11-13-m1',
        name: 'Gas Laws',
        description: 'Ideal gas equation',
        totalTokens: 50,
        levels: [
          {
            id: 'phy-11-13-m1-l1',
            name: 'Ideal Gas',
            order: 1,
            totalTokens: 50,
            activities: [
              createQuiz('phy-11-13-m1-l1-a1', 'PV = nRT is:', ['Ideal gas equation', 'Boyle law', 'Charles law', 'Gay-Lussac law'], 0, 'PV = nRT is the ideal gas equation of state', 10),
              createFlashcard('phy-11-13-m1-l1-a2', 'Boltzmann constant', 'k = R/Nₐ', 'k = 1.38 × 10⁻²³ J/K', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-11-14',
    name: 'Oscillations',
    description: 'Simple harmonic motion, pendulum, spring',
    moduleCount: 5,
    modules: [
      {
        id: 'phy-11-14-m1',
        name: 'SHM Basics',
        description: 'Simple harmonic motion equations',
        totalTokens: 55,
        levels: [
          {
            id: 'phy-11-14-m1-l1',
            name: 'SHM Equations',
            order: 1,
            totalTokens: 55,
            activities: [
              createQuiz('phy-11-14-m1-l1-a1', 'Time period of simple pendulum depends on:', ['Mass', 'Length', 'Both', 'None'], 1, 'T = 2π√(L/g), depends only on length and g', 10),
              createFillBlank('phy-11-14-m1-l1-a2', 'Formula', 'x(t) = A sin(_____)', ['ωt + φ'], ['ωt + φ', 'ωt - φ', 'ωt', 'φ'], 10),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-11-15',
    name: 'Waves',
    description: 'Transverse and longitudinal waves, sound',
    moduleCount: 5,
    modules: [
      {
        id: 'phy-11-15-m1',
        name: 'Wave Basics',
        description: 'Wave types and characteristics',
        totalTokens: 60,
        levels: [
          {
            id: 'phy-11-15-m1-l1',
            name: 'Wave Properties',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('phy-11-15-m1-l1-a1', 'Speed of wave is:', ['v = fλ', 'v = f/λ', 'v = λ/f', 'v = f+λ'], 0, 'Wave speed = frequency × wavelength', 10),
              createMatch('phy-11-15-m1-l1-a2', 'Match wave types', [
                {term: 'Transverse', definition: 'Oscillation ⊥ propagation'},
                {term: 'Longitudinal', definition: 'Oscillation ∥ propagation'},
                {term: 'Sound', definition: 'Longitudinal mechanical wave'},
              ], 15),
            ]
          }
        ]
      }
    ]
  }
];

const physicsPlusTwoChapters: Chapter[] = [
  {
    id: 'phy-12-1',
    name: 'Electric Charges and Fields',
    description: 'Electric charge, Coulombs law, electric field',
    moduleCount: 5,
    modules: [
      {
        id: 'phy-12-1-m1',
        name: 'Electric Charge',
        description: 'Properties and types of electric charge',
        totalTokens: 60,
        levels: [
          {
            id: 'phy-12-1-m1-l1',
            name: 'Charge Basics',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('phy-12-1-m1-l1-a1', 'What is the charge of an electron?', ['+1.6 × 10⁻¹⁹ C', '-1.6 × 10⁻¹⁹ C', '0 C', '+1 C'], 1, 'Electron carries a negative charge of -1.6 × 10⁻¹⁹ coulombs', 10),
              createTrueFalse('phy-12-1-m1-l1-a2', 'True or False', 'Like charges attract each other', false, 'Like charges repel, opposite charges attract', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-12-2',
    name: 'Electrostatic Potential',
    description: 'Potential, potential difference, capacitance',
    moduleCount: 4,
    modules: [
      {
        id: 'phy-12-2-m1',
        name: 'Electric Potential',
        description: 'Potential and potential difference',
        totalTokens: 65,
        levels: [
          {
            id: 'phy-12-2-m1-l1',
            name: 'Potential Energy',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('phy-12-2-m1-l1-a1', 'What is the unit of electric potential?', ['Volt', 'Ampere', 'Coulomb', 'Joule'], 0, 'Volt (V) is the SI unit of electric potential', 10),
              createFlashcard('phy-12-2-m1-l1-a2', 'Key Relationship', 'V = kQ/r', 'Electric potential at distance r from point charge Q', 5),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-12-3',
    name: 'Current Electricity',
    description: 'Ohms law, resistivity, Kirchhoffs laws',
    moduleCount: 5,
    modules: [
      {
        id: 'phy-12-3-m1',
        name: 'Electric Current',
        description: 'Drift velocity, Ohms law',
        totalTokens: 65,
        levels: [
          {
            id: 'phy-12-3-m1-l1',
            name: 'Ohms Law',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('phy-12-3-m1-l1-a1', 'Ohms law states V = :', ['IR', 'I/R', 'R/I', 'I+R'], 0, 'V = IR is Ohms law: voltage = current × resistance', 10),
              createFillBlank('phy-12-3-m1-l1-a2', 'Unit', 'Resistance is measured in _____', ['Ohms'], ['Ohms', 'Volts', 'Amperes', 'Watts'], 10),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-12-4',
    name: 'Moving Charges and Magnetism',
    description: 'Magnetic field, force on moving charges, Amperes law',
    moduleCount: 5,
    modules: [
      {
        id: 'phy-12-4-m1',
        name: 'Magnetic Force',
        description: 'Lorentz force',
        totalTokens: 70,
        levels: [
          {
            id: 'phy-12-4-m1-l1',
            name: 'Force on Moving Charge',
            order: 1,
            totalTokens: 70,
            activities: [
              createQuiz('phy-12-4-m1-l1-a1', 'Force on moving charge in B field:', ['F = qvB', 'F = q/B', 'F = vB/q', 'F = qv/B'], 0, 'F = qvB sin θ (Lorentz force)', 10),
              createTrueFalse('phy-12-4-m1-l1-a2', 'True or False', 'Magnetic force does no work', true, 'Magnetic force is always perpendicular to velocity, so no work', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-12-5',
    name: 'Magnetism and Matter',
    description: 'Magnetic properties, diamagnetism, paramagnetism, ferromagnetism',
    moduleCount: 4,
    modules: [
      {
        id: 'phy-12-5-m1',
        name: 'Magnetic Properties',
        description: 'Types of magnetism',
        totalTokens: 60,
        levels: [
          {
            id: 'phy-12-5-m1-l1',
            name: 'Dia, Para, Ferro',
            order: 1,
            totalTokens: 60,
            activities: [
              createMatch('phy-12-5-m1-l1-a1', 'Match magnetic types', [
                {term: 'Diamagnetism', definition: 'Weakly repelled by magnets'},
                {term: 'Paramagnetism', definition: 'Weakly attracted to magnets'},
                {term: 'Ferromagnetism', definition: 'Strongly attracted, can be magnetized'},
              ], 15),
              createQuiz('phy-12-5-m1-l1-a2', 'Which is ferromagnetic?', ['Aluminum', 'Copper', 'Iron', 'Bismuth'], 2, 'Iron, Nickel, Cobalt are ferromagnetic', 10),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-12-6',
    name: 'Electromagnetic Induction',
    description: 'Faradays law, Lenz law, self and mutual inductance',
    moduleCount: 5,
    modules: [
      {
        id: 'phy-12-6-m1',
        name: 'Faradays Law',
        description: 'EM induction',
        totalTokens: 70,
        levels: [
          {
            id: 'phy-12-6-m1-l1',
            name: 'EMI Basics',
            order: 1,
            totalTokens: 70,
            activities: [
              createQuiz('phy-12-6-m1-l1-a1', 'Faradays law: EMF equals:', ['dΦ/dt', 'Φ×t', 'Φ/t²', 'Φ+t'], 0, 'ε = -dΦ/dt (rate of change of flux)', 10),
              createFlashcard('phy-12-6-m1-l1-a2', 'Lenz Law', 'Direction of induced current', 'Opposes the change in flux', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-12-7',
    name: 'Alternating Current',
    description: 'AC circuits, phasors, resonance, power',
    moduleCount: 5,
    modules: [
      {
        id: 'phy-12-7-m1',
        name: 'AC Basics',
        description: 'RMS value, AC circuits',
        totalTokens: 65,
        levels: [
          {
            id: 'phy-12-7-m1-l1',
            name: 'RMS Value',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('phy-12-7-m1-l1-a1', 'RMS value of AC (peak V₀):', ['V₀/√2', 'V₀√2', 'V₀/2', '2V₀'], 0, 'Vrms = V₀/√2 = 0.707 V₀', 10),
              createTrueFalse('phy-12-7-m1-l1-a2', 'True or False', 'In AC, current and voltage can be out of phase', true, 'Phase difference exists in AC circuits with L or C', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-12-8',
    name: 'Electromagnetic Waves',
    description: 'Maxwell equations, EM wave spectrum, properties',
    moduleCount: 4,
    modules: [
      {
        id: 'phy-12-8-m1',
        name: 'EM Waves',
        description: 'Characteristics of EM waves',
        totalTokens: 60,
        levels: [
          {
            id: 'phy-12-8-m1-l1',
            name: 'EM Wave Properties',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('phy-12-8-m1-l1-a1', 'Speed of light in vacuum:', ['3 × 10⁸ m/s', '3 × 10⁶ m/s', '3 × 10¹⁰ m/s', '3 × 10⁴ m/s'], 0, 'c = 3 × 10⁸ m/s', 10),
              createMatch('phy-12-8-m1-l1-a2', 'Match EM waves', [
                {term: 'Radio waves', definition: 'Longest wavelength'},
                {term: 'Gamma rays', definition: 'Highest energy'},
                {term: 'Visible light', definition: '400-700 nm'},
              ], 15),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-12-9',
    name: 'Ray Optics',
    description: 'Reflection, refraction, lenses, optical instruments',
    moduleCount: 5,
    modules: [
      {
        id: 'phy-12-9-m1',
        name: 'Reflection',
        description: 'Mirrors',
        totalTokens: 65,
        levels: [
          {
            id: 'phy-12-9-m1-l1',
            name: 'Spherical Mirrors',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('phy-12-9-m1-l1-a1', 'Focal length of spherical mirror:', ['R/2', 'R', '2R', 'R/4'], 0, 'f = R/2 for spherical mirrors', 10),
              createFlashcard('phy-12-9-m1-l1-a2', 'Mirror formula', '1/f = 1/v + 1/u', 'Relates focal length, image and object distance', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-12-10',
    name: 'Wave Optics',
    description: 'Interference, diffraction, polarization',
    moduleCount: 5,
    modules: [
      {
        id: 'phy-12-10-m1',
        name: 'Interference',
        description: 'Youngs double slit',
        totalTokens: 65,
        levels: [
          {
            id: 'phy-12-10-m1-l1',
            name: 'Youngs Experiment',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('phy-12-10-m1-l1-a1', 'Fringe width in YDSE:', ['λD/d', 'λd/D', 'D/dλ', 'd/Dλ'], 0, 'β = λD/d (wavelength × distance / slit separation)', 10),
              createTrueFalse('phy-12-10-m1-l1-a2', 'True or False', 'Interference proves wave nature of light', true, 'Interference is a wave phenomenon', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-12-11',
    name: 'Dual Nature of Radiation',
    description: 'Photoelectric effect, matter waves, Davisson-Germer',
    moduleCount: 4,
    modules: [
      {
        id: 'phy-12-11-m1',
        name: 'Photoelectric Effect',
        description: 'Einstein photoelectric equation',
        totalTokens: 60,
        levels: [
          {
            id: 'phy-12-11-m1-l1',
            name: 'Einstein Equation',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('phy-12-11-m1-l1-a1', 'Einstein photoelectric equation:', ['hν = φ + KE', 'hν = φ - KE', 'hν = φ × KE', 'hν = φ/KE'], 0, 'hν = φ + KEmax (photon energy = work function + KE)', 10),
              createFillBlank('phy-12-11-m1-l1-a2', 'De Broglie wavelength', 'λ = h / _____', ['mv'], ['mv', 'm', 'v', 'E'], 10),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-12-12',
    name: 'Atoms',
    description: 'Atomic models, Bohr model, hydrogen spectrum',
    moduleCount: 4,
    modules: [
      {
        id: 'phy-12-12-m1',
        name: 'Bohr Model',
        description: 'Postulates and energy levels',
        totalTokens: 60,
        levels: [
          {
            id: 'phy-12-12-m1-l1',
            name: 'Energy Levels',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('phy-12-12-m1-l1-a1', 'Ground state energy of H atom:', ['-13.6 eV', '+13.6 eV', '-6.8 eV', '+6.8 eV'], 0, 'E₁ = -13.6 eV for hydrogen', 10),
              createFlashcard('phy-12-12-m1-l1-a2', 'Radius of nth orbit', 'rₙ = r₁ × n²', 'Bohr radius × n²', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-12-13',
    name: 'Nuclei',
    description: 'Nuclear structure, radioactivity, nuclear reactions',
    moduleCount: 4,
    modules: [
      {
        id: 'phy-12-13-m1',
        name: 'Radioactivity',
        description: 'Alpha, beta, gamma decay',
        totalTokens: 60,
        levels: [
          {
            id: 'phy-12-13-m1-l1',
            name: 'Decay Laws',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('phy-12-13-m1-l1-a1', 'Half life relation:', ['N = N₀/2ⁿ', 'N = 2N₀ⁿ', 'N = N₀×2ⁿ', 'N = N₀/n²'], 0, 'N = N₀/2^(t/T½) after n half-lives', 10),
              createMatch('phy-12-13-m1-l1-a2', 'Match radiation', [
                {term: 'Alpha', definition: 'Helium nucleus (2p+2n)'},
                {term: 'Beta', definition: 'Fast electrons'},
                {term: 'Gamma', definition: 'High energy photons'},
              ], 15),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-12-14',
    name: 'Semiconductor Electronics',
    description: 'Semiconductors, diodes, transistors, logic gates',
    moduleCount: 5,
    modules: [
      {
        id: 'phy-12-14-m1',
        name: 'Semiconductors',
        description: 'Intrinsic and extrinsic semiconductors',
        totalTokens: 65,
        levels: [
          {
            id: 'phy-12-14-m1-l1',
            name: 'PN Junction',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('phy-12-14-m1-l1-a1', 'Doping increases:', ['Conductivity', 'Resistivity', 'Neither', 'Both'], 0, 'Adding impurities increases charge carriers', 10),
              createTrueFalse('phy-12-14-m1-l1-a2', 'True or False', 'In p-type semiconductor, holes are majority carriers', true, 'Trivalent impurities create holes (p-type)', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'phy-12-15',
    name: 'Communication Systems',
    description: 'Signal propagation, modulation, demodulation',
    moduleCount: 4,
    modules: [
      {
        id: 'phy-12-15-m1',
        name: 'Modulation',
        description: 'Types of modulation',
        totalTokens: 55,
        levels: [
          {
            id: 'phy-12-15-m1-l1',
            name: 'AM and FM',
            order: 1,
            totalTokens: 55,
            activities: [
              createQuiz('phy-12-15-m1-l1-a1', 'In AM, _____ is varied:', ['Amplitude', 'Frequency', 'Phase', 'Speed'], 0, 'AM = Amplitude Modulation', 10),
              createFlashcard('phy-12-15-m1-l1-a2', 'Bandwidth of speech', '3 kHz', '300 Hz to 3100 Hz', 8),
            ]
          }
        ]
      }
    ]
  }
];

// ============ CHEMISTRY CURRICULUM ============
const chemistryPlusOneChapters: Chapter[] = [
  {
    id: 'chem-11-1',
    name: 'Some Basic Concepts',
    description: 'Atoms, molecules, mole concept, stoichiometry',
    moduleCount: 4,
    modules: [
      {
        id: 'chem-11-1-m1',
        name: 'Matter and Measurement',
        description: 'Physical and chemical properties',
        totalTokens: 55,
        levels: [
          {
            id: 'chem-11-1-m1-l1',
            name: 'Properties of Matter',
            order: 1,
            totalTokens: 55,
            activities: [
              createQuiz('chem-11-1-m1-l1-a1', 'Which is a chemical property?', ['Color', 'Density', 'Flammability', 'Melting point'], 2, 'Flammability describes how a substance reacts with fire', 10),
              createMatch('chem-11-1-m1-l1-a2', 'Classify as physical or chemical', [
                {term: 'Boiling point', definition: 'Physical property'},
                {term: 'Rusting', definition: 'Chemical property'},
                {term: 'Solubility', definition: 'Physical property'},
                {term: 'Reactivity', definition: 'Chemical property'},
              ], 15),
            ]
          }
        ]
      },
      {
        id: 'chem-11-1-m2',
        name: 'Mole Concept',
        description: 'Avogadro number and molar mass',
        totalTokens: 70,
        levels: [
          {
            id: 'chem-11-1-m2-l1',
            name: 'The Mole',
            order: 1,
            totalTokens: 70,
            activities: [
              createQuiz('chem-11-1-m2-l1-a1', 'What is Avogadro\'s number?', ['6.022 × 10²³', '6.022 × 10²²', '3.14 × 10²³', '9.8 × 10²³'], 0, 'Avogadro\'s number = 6.022 × 10²³ particles per mole', 10),
              createFillBlank('chem-11-1-m2-l1-a2', 'Fill in', 'One mole of any substance contains _____ particles.', ['Avogadro number', '6.022 × 10²³'], ['Avogadro number', '6.022 × 10²³', '6.023 × 10²²', 'Avogadro constant'], 12),
              createTrueFalse('chem-11-1-m2-l1-a3', 'True or False', 'Molar mass of carbon-12 is exactly 12 g/mol', true, 'By definition, 1 mole of carbon-12 atoms has mass of exactly 12 g', 10),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-11-2',
    name: 'Structure of Atom',
    description: 'Atomic models, quantum mechanics, orbitals',
    moduleCount: 5,
    modules: [
      {
        id: 'chem-11-2-m1',
        name: 'Atomic Models',
        description: 'Rutherford, Bohr models',
        totalTokens: 60,
        levels: [
          {
            id: 'chem-11-2-m1-l1',
            name: 'Early Models',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('chem-11-2-m1-l1-a1', 'Who proposed the nuclear model of atom?', ['Thomson', 'Rutherford', 'Bohr', 'Dalton'], 1, 'Rutherford\'s gold foil experiment led to nuclear model', 10),
              createTrueFalse('chem-11-2-m1-l1-a2', 'True or False', 'Bohr\'s model could explain hydrogen spectrum', true, 'Bohr\'s model successfully explained hydrogen spectrum', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-11-3',
    name: 'Classification of Elements',
    description: 'Periodic table, periodic trends, s,p,d,f blocks',
    moduleCount: 4,
    modules: [
      {
        id: 'chem-11-3-m1',
        name: 'Periodic Law',
        description: 'Mendeleev and modern periodic law',
        totalTokens: 55,
        levels: [
          {
            id: 'chem-11-3-m1-l1',
            name: 'Periodic Table',
            order: 1,
            totalTokens: 55,
            activities: [
              createQuiz('chem-11-3-m1-l1-a1', 'Modern periodic law is based on:', ['Atomic mass', 'Atomic number', 'Electron configuration', 'Neutron number'], 1, 'Modern periodic law: properties are periodic functions of atomic number', 10),
              createMatch('chem-11-3-m1-l1-a2', 'Match blocks', [
                {term: 's-block', definition: 'Groups 1-2'},
                {term: 'p-block', definition: 'Groups 13-18'},
                {term: 'd-block', definition: 'Groups 3-12'},
              ], 15),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-11-4',
    name: 'Chemical Bonding',
    description: 'Ionic, covalent, metallic bonds, VSEPR, hybridization',
    moduleCount: 5,
    modules: [
      {
        id: 'chem-11-4-m1',
        name: 'Types of Bonds',
        description: 'Ionic and covalent bonding',
        totalTokens: 70,
        levels: [
          {
            id: 'chem-11-4-m1-l1',
            name: 'Bond Formation',
            order: 1,
            totalTokens: 70,
            activities: [
              createQuiz('chem-11-4-m1-l1-a1', 'Which bond is formed by electron sharing?', ['Ionic', 'Covalent', 'Metallic', 'Hydrogen'], 1, 'Covalent bonds involve sharing of electron pairs', 10),
              createTrueFalse('chem-11-4-m1-l1-a2', 'True or False', 'Higher bond order means stronger bond', true, 'Triple bond > Double bond > Single bond in strength', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-11-5',
    name: 'States of Matter',
    description: 'Gases, liquids, solids, phase transitions',
    moduleCount: 4,
    modules: [
      {
        id: 'chem-11-5-m1',
        name: 'Gas Laws',
        description: 'Boyle, Charles, Gay-Lussac laws',
        totalTokens: 60,
        levels: [
          {
            id: 'chem-11-5-m1-l1',
            name: 'Ideal Gas',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('chem-11-5-m1-l1-a1', 'Boyle law: P ∝ ?', ['T', 'V', '1/V', 'n'], 2, 'Boyle law: P ∝ 1/V at constant T', 10),
              createFlashcard('chem-11-5-m1-l1-a2', 'Charles Law', 'V ∝ T', 'Volume proportional to temperature at constant P', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-11-6',
    name: 'Thermodynamics',
    description: 'Enthalpy, entropy, Gibbs free energy, equilibrium',
    moduleCount: 5,
    modules: [
      {
        id: 'chem-11-6-m1',
        name: 'First Law',
        description: 'Internal energy and enthalpy',
        totalTokens: 65,
        levels: [
          {
            id: 'chem-11-6-m1-l1',
            name: 'Energy Changes',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('chem-11-6-m1-l1-a1', 'ΔH = ΔU + ?', ['PΔV', 'VΔP', 'ΔPV', '0'], 0, 'ΔH = ΔU + PΔV (at constant pressure)', 10),
              createMatch('chem-11-6-m1-l1-a2', 'Match terms', [
                {term: 'Exothermic', definition: 'Heat released (ΔH < 0)'},
                {term: 'Endothermic', definition: 'Heat absorbed (ΔH > 0)'},
              ], 15),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-11-7',
    name: 'Equilibrium',
    description: 'Chemical and ionic equilibrium, Le Chatelier principle',
    moduleCount: 5,
    modules: [
      {
        id: 'chem-11-7-m1',
        name: 'Chemical Equilibrium',
        description: 'Equilibrium constant, Kc, Kp',
        totalTokens: 70,
        levels: [
          {
            id: 'chem-11-7-m1-l1',
            name: 'Equilibrium Laws',
            order: 1,
            totalTokens: 70,
            activities: [
              createQuiz('chem-11-7-m1-l1-a1', 'Kp = Kc(RT)^?', ['Δn', 'n', '-Δn', '1/Δn'], 0, 'Kp = Kc(RT)^Δn where Δn = moles of gaseous products - reactants', 10),
              createTrueFalse('chem-11-7-m1-l1-a2', 'True or False', 'Catalyst affects equilibrium position', false, 'Catalyst speeds up both forward and reverse reactions equally', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-11-8',
    name: 'Redox Reactions',
    description: 'Oxidation, reduction, balancing redox equations',
    moduleCount: 4,
    modules: [
      {
        id: 'chem-11-8-m1',
        name: 'Redox Concepts',
        description: 'Oxidation numbers, balancing',
        totalTokens: 60,
        levels: [
          {
            id: 'chem-11-8-m1-l1',
            name: 'Oxidation Numbers',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('chem-11-8-m1-l1-a1', 'Oxidation involves:', ['Gain of electrons', 'Loss of electrons', 'No change', 'Sharing'], 1, 'Oxidation = loss of electrons (OIL: Oxidation Is Loss)', 10),
              createFillBlank('chem-11-8-m1-l1-a2', 'Oxidation Number', 'In H₂O, oxidation number of O is _____', ['-2'], ['-2', '+2', '0', '-1'], 10),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-11-9',
    name: 'Hydrogen',
    description: 'Position, preparation, properties, uses of hydrogen',
    moduleCount: 3,
    modules: [
      {
        id: 'chem-11-9-m1',
        name: 'Hydrogen Properties',
        description: 'Preparation and reactions',
        totalTokens: 50,
        levels: [
          {
            id: 'chem-11-9-m1-l1',
            name: 'Hydrogen Basics',
            order: 1,
            totalTokens: 50,
            activities: [
              createQuiz('chem-11-9-m1-l1-a1', 'Hydrogen shows similarity with:', ['Only alkali metals', 'Only halogens', 'Both', 'Neither'], 2, 'Hydrogen resembles both alkali metals (1 e⁻) and halogens (1 e⁻ short)', 10),
              createFlashcard('chem-11-9-m1-l1-a2', 'Heavy water', 'D₂O', 'Deuterium oxide', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-11-10',
    name: 's-Block Elements',
    description: 'Alkali and alkaline earth metals, properties, compounds',
    moduleCount: 4,
    modules: [
      {
        id: 'chem-11-10-m1',
        name: 'Group 1 and 2',
        description: 'Alkali and alkaline earth metals',
        totalTokens: 60,
        levels: [
          {
            id: 'chem-11-10-m1-l1',
            name: 'Properties',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('chem-11-10-m1-l1-a1', 'Which is most reactive metal?', ['Li', 'Na', 'K', 'Cs'], 3, 'Reactivity increases down the group: Cs > Rb > K > Na > Li', 10),
              createMatch('chem-11-10-m1-l1-a2', 'Match compounds', [
                {term: 'Quick lime', definition: 'CaO'},
                {term: 'Slaked lime', definition: 'Ca(OH)₂'},
                {term: 'Washing soda', definition: 'Na₂CO₃·10H₂O'},
              ], 15),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-11-11',
    name: 'p-Block Elements',
    description: 'Groups 13-18, trends, important compounds',
    moduleCount: 6,
    modules: [
      {
        id: 'chem-11-11-m1',
        name: 'Group 13-14',
        description: 'Boron, Carbon families',
        totalTokens: 70,
        levels: [
          {
            id: 'chem-11-11-m1-l1',
            name: 'Boron and Carbon',
            order: 1,
            totalTokens: 70,
            activities: [
              createQuiz('chem-11-11-m1-l1-a1', 'Boron is a:', ['Metal', 'Metalloid', 'Non-metal', 'Noble gas'], 1, 'Boron shows properties intermediate between metals and non-metals', 10),
              createTrueFalse('chem-11-11-m1-l1-a2', 'True or False', 'Graphite conducts electricity', true, 'Graphite has delocalized electrons between layers', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-11-12',
    name: 'Organic Chemistry Basics',
    description: 'Nomenclature, isomerism, reaction mechanisms',
    moduleCount: 5,
    modules: [
      {
        id: 'chem-11-12-m1',
        name: 'Nomenclature',
        description: 'IUPAC naming',
        totalTokens: 65,
        levels: [
          {
            id: 'chem-11-12-m1-l1',
            name: 'Naming',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('chem-11-12-m1-l1-a1', 'IUPAC name of CH₃CH₂OH:', ['Methanol', 'Ethanol', 'Propanol', 'Butanol'], 1, 'Two carbons = eth- + alcohol functional group = ethanol', 10),
              createMatch('chem-11-12-m1-l1-a2', 'Match prefixes', [
                {term: 'Meth-', definition: '1 carbon'},
                {term: 'Eth-', definition: '2 carbons'},
                {term: 'Prop-', definition: '3 carbons'},
                {term: 'But-', definition: '4 carbons'},
              ], 15),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-11-13',
    name: 'Hydrocarbons',
    description: 'Alkanes, alkenes, alkynes, aromatic compounds',
    moduleCount: 5,
    modules: [
      {
        id: 'chem-11-13-m1',
        name: 'Alkanes',
        description: 'Preparation and reactions',
        totalTokens: 65,
        levels: [
          {
            id: 'chem-11-13-m1-l1',
            name: 'Saturated Hydrocarbons',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('chem-11-13-m1-l1-a1', 'General formula of alkanes:', ['CnH₂n', 'CnH₂n₊₂', 'CnH₂n₋₂', 'CnHn'], 1, 'Alkanes: CnH₂n₊₂ (saturated, single bonds only)', 10),
              createFillBlank('chem-11-13-m1-l1-a2', 'Reaction Product', 'Ethane + Cl₂ → _____ (in presence of UV)', ['C₂H₅Cl + HCl'], ['C₂H₅Cl + HCl', 'C₂H₄ + H₂', 'C₂H₆Cl₂', 'C₂H₂ + 2HCl'], 10),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-11-14',
    name: 'Environmental Chemistry',
    description: 'Air, water pollution, greenhouse effect, ozone depletion',
    moduleCount: 3,
    modules: [
      {
        id: 'chem-11-14-m1',
        name: 'Pollution',
        description: 'Types and control of pollution',
        totalTokens: 50,
        levels: [
          {
            id: 'chem-11-14-m1-l1',
            name: 'Environmental Issues',
            order: 1,
            totalTokens: 50,
            activities: [
              createQuiz('chem-11-14-m1-l1-a1', 'Main greenhouse gas is:', ['CO₂', 'O₂', 'N₂', 'H₂'], 0, 'CO₂ is the primary greenhouse gas causing global warming', 10),
              createMatch('chem-11-14-m1-l1-a2', 'Match', [
                {term: 'BOD', definition: 'Biochemical Oxygen Demand'},
                {term: 'CFCs', definition: 'Chlorofluorocarbons'},
                {term: 'Acid rain', definition: 'pH < 5.6'},
              ], 15),
            ]
          }
        ]
      }
    ]
  }
];

const chemistryPlusTwoChapters: Chapter[] = [
  {
    id: 'chem-12-1',
    name: 'Solid State',
    description: 'Crystal structures, unit cells, packing',
    moduleCount: 4,
    modules: [
      {
        id: 'chem-12-1-m1',
        name: 'Crystal Lattices',
        description: 'Types of unit cells',
        totalTokens: 65,
        levels: [
          {
            id: 'chem-12-1-m1-l1',
            name: 'Unit Cells',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('chem-12-1-m1-l1-a1', 'How many atoms are in an FCC unit cell?', ['1', '2', '4', '8'], 2, 'FCC has 8 corner atoms (each 1/8) + 6 face atoms (each 1/2) = 4 atoms', 12),
              createMatch('chem-12-1-m1-l1-a2', 'Match crystal systems', [
                {term: 'Cubic', definition: 'a = b = c, α = β = γ = 90°'},
                {term: 'Tetragonal', definition: 'a = b ≠ c, α = β = γ = 90°'},
                {term: 'Orthorhombic', definition: 'a ≠ b ≠ c, α = β = γ = 90°'},
              ], 15),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-12-2',
    name: 'Solutions',
    description: 'Concentration, colligative properties',
    moduleCount: 4,
    modules: [
      {
        id: 'chem-12-2-m1',
        name: 'Concentration',
        description: 'Molarity, molality, mole fraction',
        totalTokens: 60,
        levels: [
          {
            id: 'chem-12-2-m1-l1',
            name: 'Molarity',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('chem-12-2-m1-l1-a1', 'What is molarity?', ['mol/kg', 'mol/L', 'g/L', 'kg/mol'], 1, 'Molarity = moles of solute / liters of solution', 10),
              createFlashcard('chem-12-2-m1-l1-a2', 'Formula', 'M = n/V', 'Molarity equals moles divided by volume in liters', 5),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-12-3',
    name: 'Electrochemistry',
    description: 'Electrochemical cells, Nernst equation, batteries, corrosion',
    moduleCount: 5,
    modules: [
      {
        id: 'chem-12-3-m1',
        name: 'Electrochemical Cells',
        description: 'Galvanic cells, cell potential',
        totalTokens: 70,
        levels: [
          {
            id: 'chem-12-3-m1-l1',
            name: 'Cell Potential',
            order: 1,
            totalTokens: 70,
            activities: [
              createQuiz('chem-12-3-m1-l1-a1', 'At anode, _____ takes place:', ['Reduction', 'Oxidation', 'Neither', 'Both'], 1, 'Oxidation occurs at anode (An Ox)', 10),
              createTrueFalse('chem-12-3-m1-l1-a2', 'True or False', 'Standard hydrogen electrode has zero potential', true, 'SHE is reference with E° = 0 V', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-3-m2',
        name: 'Nernst Equation',
        description: 'Electrode potential, Nernst equation applications',
        totalTokens: 65,
        levels: [
          {
            id: 'chem-12-3-m2-l1',
            name: 'Nernst Equation',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('chem-12-3-m2-l1-a1', 'Nernst equation relates:', ['E and concentration', 'E and temperature', 'E and pressure', 'All'], 3, 'Nernst equation: E = E° - (RT/nF)lnQ', 10),
              createFlashcard('chem-12-3-m2-l1-a2', 'Nernst Equation', 'E = E° - (0.059/n)logQ', 'At 298K for electrochemical cells', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-3-m3',
        name: 'Batteries',
        description: 'Primary, secondary batteries, fuel cells',
        totalTokens: 60,
        levels: [
          {
            id: 'chem-12-3-m3-l1',
            name: 'Types of Batteries',
            order: 1,
            totalTokens: 60,
            activities: [
              createMatch('chem-12-3-m3-l1-a1', 'Match battery types', [
                {term: 'Primary', definition: 'Non-rechargeable'},
                {term: 'Secondary', definition: 'Rechargeable'},
                {term: 'Fuel cell', definition: 'Converts chemical to electrical energy'},
              ], 15),
              createQuiz('chem-12-3-m3-l1-a2', 'Lead storage battery is:', ['Primary', 'Secondary', 'Fuel cell', 'None'], 1, 'Lead-acid batteries are rechargeable (secondary)', 10),
            ]
          }
        ]
      },
      {
        id: 'chem-12-3-m4',
        name: 'Corrosion',
        description: 'Rusting, prevention of corrosion',
        totalTokens: 55,
        levels: [
          {
            id: 'chem-12-3-m4-l1',
            name: 'Rusting of Iron',
            order: 1,
            totalTokens: 55,
            activities: [
              createQuiz('chem-12-3-m4-l1-a1', 'Corrosion is:', ['Reduction', 'Oxidation', 'Neutralization', 'Precipitation'], 1, 'Corrosion involves oxidation of metal', 10),
              createTrueFalse('chem-12-3-m4-l1-a2', 'True or False', 'Galvanization prevents rusting', true, 'Zinc coating protects iron from corrosion', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-3-m5',
        name: 'Electrolysis',
        description: 'Faradays laws, applications of electrolysis',
        totalTokens: 60,
        levels: [
          {
            id: 'chem-12-3-m5-l1',
            name: 'Faradays Laws',
            order: 1,
            totalTokens: 60,
            activities: [
              createFlashcard('chem-12-3-m5-l1-a1', 'Faraday Constant', '96500 C/mol', 'Charge on 1 mole of electrons', 8),
              createQuiz('chem-12-3-m5-l1-a2', 'During electrolysis, _____ occurs at cathode:', ['Oxidation', 'Reduction', 'Hydrolysis', 'Dissociation'], 1, 'Reduction occurs at cathode (Red Cat)', 10),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-12-4',
    name: 'Chemical Kinetics',
    description: 'Rate of reactions, order, molecularity, activation energy',
    moduleCount: 5,
    modules: [
      {
        id: 'chem-12-4-m1',
        name: 'Reaction Rates',
        description: 'Rate laws, order of reaction',
        totalTokens: 65,
        levels: [
          {
            id: 'chem-12-4-m1-l1',
            name: 'Rate Law',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('chem-12-4-m1-l1-a1', 'Unit of rate constant for first order:', ['s⁻¹', 'mol/L·s', 'L/mol·s', 'L²/mol²·s'], 0, 'For first order: k has units of time⁻¹ (s⁻¹)', 10),
              createFlashcard('chem-12-4-m1-l1-a2', 'Arrhenius equation', 'k = Ae^(-Ea/RT)', 'Rate constant depends on temperature and activation energy', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-4-m2',
        name: 'Order and Molecularity',
        description: 'Zero, first, second order reactions',
        totalTokens: 60,
        levels: [
          {
            id: 'chem-12-4-m2-l1',
            name: 'Reaction Order',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('chem-12-4-m2-l1-a1', 'Half-life of first order reaction is:', ['Independent of concentration', 'Proportional to concentration', 'Inversely proportional', 'None'], 0, 't₁/₂ = ln2/k, independent of initial concentration', 10),
              createTrueFalse('chem-12-4-m2-l1-a2', 'True or False', 'Molecularity can be fractional', false, 'Molecularity is always a whole number', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-4-m3',
        name: 'Integrated Rate Laws',
        description: 'Integrated rate equations, half-life',
        totalTokens: 55,
        levels: [
          {
            id: 'chem-12-4-m3-l1',
            name: 'Integrated Equations',
            order: 1,
            totalTokens: 55,
            activities: [
              createFlashcard('chem-12-4-m3-l1-a1', 'First Order', 'ln[A] = ln[A]₀ - kt', 'Logarithmic form of first order rate law', 8),
              createFillBlank('chem-12-4-m3-l1-a2', 'Zero Order Half-life', 'For zero order, t₁/₂ is proportional to _____', ['[A]₀'], ['concentration', 'initial concentration', '[A]₀', 'rate constant'], 10),
            ]
          }
        ]
      },
      {
        id: 'chem-12-4-m4',
        name: 'Activation Energy',
        description: 'Collision theory, Arrhenius equation',
        totalTokens: 60,
        levels: [
          {
            id: 'chem-12-4-m4-l1',
            name: 'Collision Theory',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('chem-12-4-m4-l1-a1', 'Activation energy is:', ['Energy barrier', 'Total energy', 'Kinetic energy', 'Potential energy'], 0, 'Ea is the minimum energy required for reaction', 10),
              createTrueFalse('chem-12-4-m4-l1-a2', 'True or False', 'Catalyst lowers activation energy', true, 'Catalyst provides alternative pathway with lower Ea', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-4-m5',
        name: 'Complex Reactions',
        description: 'Parallel, consecutive reactions',
        totalTokens: 50,
        levels: [
          {
            id: 'chem-12-4-m5-l1',
            name: 'Complex Kinetics',
            order: 1,
            totalTokens: 50,
            activities: [
              createMatch('chem-12-4-m5-l1-a1', 'Match complex reactions', [
                {term: 'Consecutive', definition: 'A → B → C'},
                {term: 'Parallel', definition: 'A → B and A → C'},
                {term: 'Reversible', definition: 'A ⇌ B'},
              ], 15),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-12-5',
    name: 'Surface Chemistry',
    description: 'Adsorption, catalysis, colloids',
    moduleCount: 4,
    modules: [
      {
        id: 'chem-12-5-m1',
        name: 'Adsorption',
        description: 'Physisorption and chemisorption',
        totalTokens: 55,
        levels: [
          {
            id: 'chem-12-5-m1-l1',
            name: 'Types of Adsorption',
            order: 1,
            totalTokens: 55,
            activities: [
              createMatch('chem-12-5-m1-l1-a1', 'Match adsorption types', [
                {term: 'Physisorption', definition: 'Weak van der Waals forces'},
                {term: 'Chemisorption', definition: 'Strong chemical bonds'},
                {term: 'Reversible', definition: 'Physisorption'},
              ], 15),
              createQuiz('chem-12-5-m1-l1-a2', 'Which catalyst is used in Haber process?', ['Fe', 'Ni', 'Pt', 'V₂O₅'], 0, 'Iron catalyst is used for ammonia synthesis', 10),
            ]
          }
        ]
      },
      {
        id: 'chem-12-5-m2',
        name: 'Catalysis',
        description: 'Types of catalysts and mechanisms',
        totalTokens: 60,
        levels: [
          {
            id: 'chem-12-5-m2-l1',
            name: 'Homogeneous vs Heterogeneous',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('chem-12-5-m2-l1-a1', 'Homogeneous catalyst is in same phase as:', ['Reactants', 'Products', 'Solvent', 'All'], 0, 'Same phase as reactants', 10),
              createTrueFalse('chem-12-5-m2-l1-a2', 'True or False', 'Enzymes are biocatalysts', true, 'Enzymes catalyze biological reactions', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-5-m3',
        name: 'Colloids',
        description: 'Types, properties and preparation',
        totalTokens: 65,
        levels: [
          {
            id: 'chem-12-5-m3-l1',
            name: 'Colloidal Systems',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('chem-12-5-m3-l1-a1', 'Particle size in colloids is:', ['1-10 nm', '1-100 nm', '1-1000 nm', '>1000 nm'], 2, 'Colloidal particles are 1-1000 nm', 10),
              createMatch('chem-12-5-m3-l1-a2', 'Match colloid types', [
                {term: 'Foam', definition: 'Gas in liquid'},
                {term: 'Emulsion', definition: 'Liquid in liquid'},
                {term: 'Aerosol', definition: 'Solid/liquid in gas'},
              ], 15),
            ]
          }
        ]
      },
      {
        id: 'chem-12-5-m4',
        name: 'Emulsions',
        description: 'Types, preparation and applications',
        totalTokens: 50,
        levels: [
          {
            id: 'chem-12-5-m4-l1',
            name: 'Oil and Water',
            order: 1,
            totalTokens: 50,
            activities: [
              createQuiz('chem-12-5-m4-l1-a1', 'Milk is an example of:', ['Oil in water', 'Water in oil', 'Foam', 'Sol'], 0, 'Milk is oil in water emulsion', 10),
              createFlashcard('chem-12-5-m4-l1-a2', 'Emulsifying Agent', 'Stabilizes emulsions', 'Substance that prevents separation of phases', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-12-6',
    name: 'Isolation of Elements',
    description: 'Metallurgy, extraction, refining processes',
    moduleCount: 4,
    modules: [
      {
        id: 'chem-12-6-m1',
        name: 'Concentration of Ores',
        description: 'Methods to enrich ores',
        totalTokens: 60,
        levels: [
          {
            id: 'chem-12-6-m1-l1',
            name: 'Ore Enrichment',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('chem-12-6-m1-l1-a1', 'Froth flotation is used for:', ['Sulphide ores', 'Oxide ores', 'Carbonate ores', 'All ores'], 0, 'Froth flotation separates sulphide ores from gangue', 10),
              createTrueFalse('chem-12-6-m1-l1-a2', 'True or False', 'Magnetic separation is used for non-magnetic ores', false, 'Magnetic separation removes magnetic impurities', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-6-m2',
        name: 'Extraction of Metals',
        description: 'Reduction methods for metal extraction',
        totalTokens: 70,
        levels: [
          {
            id: 'chem-12-6-m2-l1',
            name: 'Reduction Techniques',
            order: 1,
            totalTokens: 70,
            activities: [
              createQuiz('chem-12-6-m2-l1-a1', 'Aluminium is extracted by:', ['Smelting', 'Electrolysis', 'Calcination', 'Roasting'], 1, 'Electrolysis of alumina in cryolite', 10),
              createFlashcard('chem-12-6-m2-l1-a2', 'Ellingham Diagram', 'Plots ΔG vs T for oxides', 'Used to select suitable reducing agent', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-6-m3',
        name: 'Refining of Metals',
        description: 'Purification processes',
        totalTokens: 65,
        levels: [
          {
            id: 'chem-12-6-m3-l1',
            name: 'Purification Methods',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('chem-12-6-m3-l1-a1', 'Zone refining is used for:', ['Copper', 'Aluminium', 'Germanium', 'Iron'], 2, 'Used for semiconductors like Ge, Si', 10),
              createMatch('chem-12-6-m3-l1-a2', 'Match methods', [
                {term: 'Liquation', definition: 'Low melting point metals'},
                {term: 'Distillation', definition: 'Volatile metals'},
                {term: 'Electrolytic', definition: 'High purity copper'},
              ], 15),
            ]
          }
        ]
      },
      {
        id: 'chem-12-6-m4',
        name: 'Thermodynamic Principles',
        description: 'Ellingham diagram applications',
        totalTokens: 55,
        levels: [
          {
            id: 'chem-12-6-m4-l1',
            name: 'Ellingham Diagram',
            order: 1,
            totalTokens: 55,
            activities: [
              createQuiz('chem-12-6-m4-l1-a1', 'Below the curves in Ellingham diagram, ΔG is:', ['Positive', 'Negative', 'Zero', 'Infinite'], 1, 'Negative ΔG means spontaneous reduction', 10),
              createTrueFalse('chem-12-6-m4-l1-a2', 'True or False', 'CO can reduce Fe₂O₃ above 1000K', true, 'Above intersection point, CO becomes better reductant', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-12-7',
    name: 'p-Block Elements',
    description: 'Nitrogen, phosphorus, sulphur, halogens, noble gases',
    moduleCount: 6,
    modules: [
      {
        id: 'chem-12-7-m1',
        name: 'Group 15 Elements',
        description: 'Nitrogen and phosphorus families',
        totalTokens: 70,
        levels: [
          {
            id: 'chem-12-7-m1-l1',
            name: 'Nitrogen Compounds',
            order: 1,
            totalTokens: 70,
            activities: [
              createQuiz('chem-12-7-m1-l1-a1', 'Oxidation state of N in NH₃:', ['-3', '+3', '+5', '0'], 0, 'Nitrogen has -3 oxidation state in ammonia', 10),
              createMatch('chem-12-7-m1-l1-a2', 'Match oxoacids', [
                {term: 'HNO₃', definition: 'Nitric acid'},
                {term: 'HNO₂', definition: 'Nitrous acid'},
                {term: 'H₃PO₄', definition: 'Phosphoric acid'},
              ], 15),
            ]
          }
        ]
      },
      {
        id: 'chem-12-7-m2',
        name: 'Group 16 Elements',
        description: 'Oxygen and sulphur families',
        totalTokens: 65,
        levels: [
          {
            id: 'chem-12-7-m2-l1',
            name: 'Sulphur Compounds',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('chem-12-7-m2-l1-a1', 'Contact process produces:', ['H₂SO₃', 'H₂SO₄', 'SO₂', 'H₂S'], 1, 'Contact process makes sulphuric acid', 10),
              createTrueFalse('chem-12-7-m2-l1-a2', 'True or False', 'Ozone is diamagnetic', false, 'Ozone is paramagnetic due to unpaired electrons', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-7-m3',
        name: 'Group 17 Elements',
        description: 'Halogens and their compounds',
        totalTokens: 70,
        levels: [
          {
            id: 'chem-12-7-m3-l1',
            name: 'Halogen Properties',
            order: 1,
            totalTokens: 70,
            activities: [
              createQuiz('chem-12-7-m3-l1-a1', 'Most electronegative element is:', ['Cl', 'F', 'Br', 'I'], 1, 'Fluorine is the most electronegative', 10),
              createFlashcard('chem-12-7-m3-l1-a2', 'Interhalogen', 'Compounds like ClF₃, IF₇', 'Formed between different halogens', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-7-m4',
        name: 'Group 18 Elements',
        description: 'Noble gases and their compounds',
        totalTokens: 55,
        levels: [
          {
            id: 'chem-12-7-m4-l1',
            name: 'Noble Gas Compounds',
            order: 1,
            totalTokens: 55,
            activities: [
              createQuiz('chem-12-7-m4-l1-a1', 'First noble gas compound made:', ['XeF₂', 'XeF₄', 'XeF₆', 'XePtF₆'], 3, 'Neil Bartlett made XePtF₆ in 1962', 10),
              createTrueFalse('chem-12-7-m4-l1-a2', 'True or False', 'Helium forms compounds easily', false, 'Helium is the least reactive noble gas', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-7-m5',
        name: 'Allotropes',
        description: 'Different forms of p-block elements',
        totalTokens: 60,
        levels: [
          {
            id: 'chem-12-7-m5-l1',
            name: 'Phosphorus Allotropes',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('chem-12-7-m5-l1-a1', 'White phosphorus is stored under:', ['Water', 'Kerosene', 'Acid', 'Alcohol'], 0, 'Stored under water to prevent oxidation', 10),
              createMatch('chem-12-7-m5-l1-a2', 'Match allotropes', [
                {term: 'White P', definition: 'Tetrahedral, poisonous'},
                {term: 'Red P', definition: 'Polymeric, less toxic'},
                {term: 'Black P', definition: 'Graphite-like layers'},
              ], 15),
            ]
          }
        ]
      },
      {
        id: 'chem-12-7-m6',
        name: 'Important Compounds',
        description: 'Industrial and biological compounds',
        totalTokens: 65,
        levels: [
          {
            id: 'chem-12-7-m6-l1',
            name: 'Industrial Chemicals',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('chem-12-7-m6-l1-a1', 'Oleum is:', ['H₂SO₄', 'H₂S₂O₇', 'SO₃', 'H₂SO₃'], 1, 'Oleum is pyrosulphuric acid H₂S₂O₇', 10),
              createFillBlank('chem-12-7-m6-l1-a2', 'Aqua regia', 'HNO₃ + _____', ['HCl', '3HCl'], ['HCl', '3HCl', 'H₂SO₄', 'H₃PO₄'], 10),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-12-8',
    name: 'd and f Block Elements',
    description: 'Transition and inner transition elements, properties',
    moduleCount: 5,
    modules: [
      {
        id: 'chem-12-8-m1',
        name: 'Transition Elements',
        description: 'Properties of d-block',
        totalTokens: 65,
        levels: [
          {
            id: 'chem-12-8-m1-l1',
            name: 'd-Block Properties',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('chem-12-8-m1-l1-a1', 'Maximum oxidation state of Cr:', ['+3', '+6', '+2', '+7'], 1, 'Chromium shows +6 in K₂Cr₂O₇', 10),
              createTrueFalse('chem-12-8-m1-l1-a2', 'True or False', 'Transition elements show variable oxidation states', true, 'Due to incomplete d-subshell, they show multiple oxidation states', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-8-m2',
        name: 'Oxidation States',
        description: 'Variable oxidation states of transition metals',
        totalTokens: 60,
        levels: [
          {
            id: 'chem-12-8-m2-l1',
            name: 'Common Oxidation States',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('chem-12-8-m2-l1-a1', 'Most stable oxidation state of Mn:', ['+2', '+4', '+7', '+6'], 0, '+2 is most stable for Mn', 10),
              createFlashcard('chem-12-8-m2-l1-a2', 'Oxidation state stability', 'Lower oxidation states more stable', 'Down the group, lower oxidation states become more stable', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-8-m3',
        name: 'Magnetic Properties',
        description: 'Paramagnetism and diamagnetism',
        totalTokens: 55,
        levels: [
          {
            id: 'chem-12-8-m3-l1',
            name: 'Magnetic Behavior',
            order: 1,
            totalTokens: 55,
            activities: [
              createQuiz('chem-12-8-m3-l1-a1', 'Sc³⁺ is:', ['Paramagnetic', 'Diamagnetic', 'Ferromagnetic', 'Antiferromagnetic'], 1, 'Sc³⁺ has no unpaired electrons', 10),
              createMatch('chem-12-8-m3-l1-a2', 'Match ions with magnetism', [
                {term: 'Cu²⁺', definition: 'Paramagnetic (1 unpaired)'},
                {term: 'Zn²⁺', definition: 'Diamagnetic (0 unpaired)'},
                {term: 'Fe²⁺', definition: 'Paramagnetic (4 unpaired)'},
              ], 15),
            ]
          }
        ]
      },
      {
        id: 'chem-12-8-m4',
        name: 'Color and Spectra',
        description: 'Colored compounds and d-d transitions',
        totalTokens: 60,
        levels: [
          {
            id: 'chem-12-8-m4-l1',
            name: 'Color in Complexes',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('chem-12-8-m4-l1-a1', 'Color of transition compounds is due to:', ['d-d transitions', 'Charge transfer', 'Both', 'None'], 2, 'Both d-d transitions and charge transfer cause color', 10),
              createTrueFalse('chem-12-8-m4-l1-a2', 'True or False', '[Ti(H₂O)₆]³⁺ is purple', true, 'Ti³⁺ has one d electron causing purple color', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-8-m5',
        name: 'Lanthanides and Actinides',
        description: 'f-block elements and their properties',
        totalTokens: 65,
        levels: [
          {
            id: 'chem-12-8-m5-l1',
            name: 'f-Block Elements',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('chem-12-8-m5-l1-a1', 'Lanthanide contraction affects:', ['Atomic size', 'Ionic size', 'Both', 'None'], 2, 'Both atomic and ionic sizes decrease across lanthanides', 10),
              createFillBlank('chem-12-8-m5-l1-a2', 'Lanthanide', '4f series _____ elements', ['15'], ['14', '15', '16', '17'], 10),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-12-9',
    name: 'Coordination Compounds',
    description: 'Werner theory, nomenclature, bonding, applications',
    moduleCount: 5,
    modules: [
      {
        id: 'chem-12-9-m1',
        name: 'Werner Theory',
        description: 'Coordination theory basics',
        totalTokens: 70,
        levels: [
          {
            id: 'chem-12-9-m1-l1',
            name: 'Primary and Secondary Valency',
            order: 1,
            totalTokens: 70,
            activities: [
              createQuiz('chem-12-9-m1-l1-a1', 'Coordination number of [Co(NH₃)₆]³⁺:', ['3', '6', '9', '12'], 1, '6 ammonia ligands, each monodentate: CN = 6', 10),
              createFlashcard('chem-12-9-m1-l1-a2', 'Primary valency', 'Ionization sphere', 'Counter ions that can be precipitated', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-9-m2',
        name: 'Nomenclature',
        description: 'IUPAC naming of complexes',
        totalTokens: 60,
        levels: [
          {
            id: 'chem-12-9-m2-l1',
            name: 'Naming Rules',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('chem-12-9-m2-l1-a1', 'Ligands are named alphabetically before:', ['Metal', 'Anion', 'Cation', 'Charge'], 0, 'Ligands come alphabetically before metal name', 10),
              createTrueFalse('chem-12-9-m2-l1-a2', 'True or False', 'en is ethylenediamine', true, 'en is abbreviation for ethylenediamine (bidentate)', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-9-m3',
        name: 'Isomerism',
        description: 'Geometrical and optical isomerism',
        totalTokens: 75,
        levels: [
          {
            id: 'chem-12-9-m3-l1',
            name: 'Types of Isomerism',
            order: 1,
            totalTokens: 75,
            activities: [
              createQuiz('chem-12-9-m3-l1-a1', '[Co(NH₃)₄Cl₂]⁺ shows:', ['Only optical', 'Only geometrical', 'Both', 'Neither'], 1, 'MA₄B₂ shows geometrical (cis/trans) isomerism', 10),
              createMatch('chem-12-9-m3-l1-a2', 'Match complexes with isomerism', [
                {term: '[Co(en)₃]³⁺', definition: 'Optical isomerism'},
                {term: '[Co(NH₃)₅Cl]²⁺', definition: 'Ionization isomerism'},
                {term: '[Cr(H₂O)₆]³⁺', definition: 'No isomerism'},
              ], 15),
            ]
          }
        ]
      },
      {
        id: 'chem-12-9-m4',
        name: 'Bonding Theories',
        description: 'VBT and CFT',
        totalTokens: 80,
        levels: [
          {
            id: 'chem-12-9-m4-l1',
            name: 'Crystal Field Theory',
            order: 1,
            totalTokens: 80,
            activities: [
              createQuiz('chem-12-9-m4-l1-a1', 'In octahedral field, d orbitals split into:', ['2 sets', '3 sets', '4 sets', 'No splitting'], 0, 't₂g and eg sets in octahedral field', 10),
              createFlashcard('chem-12-9-m4-l1-a2', 'CFSE', 'Crystal Field Stabilization Energy', 'Energy difference between t₂g and eg occupancy', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-9-m5',
        name: 'Organometallics',
        description: 'Metal-carbon bonds and applications',
        totalTokens: 65,
        levels: [
          {
            id: 'chem-12-9-m5-l1',
            name: 'Metal Carbonyls',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('chem-12-9-m5-l1-a1', 'EAN rule is also called:', ['18-electron rule', '16-electron rule', 'Octet rule', 'None'], 0, 'Effective atomic number rule = 18-electron rule', 10),
              createTrueFalse('chem-12-9-m5-l1-a2', 'True or False', 'Metal carbonyls are colored', true, 'Due to MLCT or d-d transitions', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-12-10',
    name: 'Haloalkanes and Haloarenes',
    description: 'Preparation, reactions, uses of organic halides',
    moduleCount: 5,
    modules: [
      {
        id: 'chem-12-10-m1',
        name: 'Nucleophilic Substitution',
        description: 'SN1 and SN2 mechanisms',
        totalTokens: 70,
        levels: [
          {
            id: 'chem-12-10-m1-l1',
            name: 'SN1 vs SN2',
            order: 1,
            totalTokens: 70,
            activities: [
              createMatch('chem-12-10-m1-l1-a1', 'Match mechanisms', [
                {term: 'SN1', definition: 'Unimolecular, carbocation intermediate'},
                {term: 'SN2', definition: 'Bimolecular, inversion of configuration'},
                {term: '3° alkyl halide', definition: 'Prefers SN1'},
              ], 15),
              createQuiz('chem-12-10-m1-l1-a2', 'SN1 reactions are favored by:', ['Polar protic solvents', 'Polar aprotic solvents', 'Non-polar solvents', 'All solvents'], 0, 'Polar protic solvents stabilize carbocation intermediate', 10),
            ]
          }
        ]
      },
      {
        id: 'chem-12-10-m2',
        name: 'Elimination Reactions',
        description: 'E1 and E2 mechanisms',
        totalTokens: 65,
        levels: [
          {
            id: 'chem-12-10-m2-l1',
            name: 'E1 vs E2',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('chem-12-10-m2-l1-a1', 'Zaitsev rule predicts:', ['Major product', 'Minor product', 'Intermediate', 'Transition state'], 0, 'More substituted alkene is major product', 10),
              createTrueFalse('chem-12-10-m2-l1-a2', 'True or False', 'E2 requires anti-periplanar geometry', true, 'Hydrogen and leaving group must be anti-periplanar', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-10-m3',
        name: 'Aryl Halides',
        description: 'Preparation and reactions of haloarenes',
        totalTokens: 60,
        levels: [
          {
            id: 'chem-12-10-m3-l1',
            name: 'Haloarene Reactions',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('chem-12-10-m3-l1-a1', 'Chlorobenzene is prepared by:', ['Wurtz reaction', 'Fittig reaction', 'Sandmeyer reaction', 'Gattermann reaction'], 1, 'Fittig reaction: aryl halide + Na/dry ether', 10),
              createFlashcard('chem-12-10-m3-l1-a2', 'Dow process', 'Chlorobenzene from phenol', 'Uses anhydrous ZnCl₂ and HCl', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-10-m4',
        name: 'Polyhalogen Compounds',
        description: 'Dihalides and trihalides',
        totalTokens: 55,
        levels: [
          {
            id: 'chem-12-10-m4-l1',
            name: 'Geminal and Vicinal',
            order: 1,
            totalTokens: 55,
            activities: [
              createQuiz('chem-12-12-m4-l1-a1', 'Freon is:', ['CCl₄', 'CHCl₃', 'CCl₂F₂', 'CH₂Cl₂'], 2, 'Dichlorodifluoromethane used as refrigerant', 10),
              createMatch('chem-12-10-m4-l1-a2', 'Match compounds', [
                {term: 'CHCl₃', definition: 'Chloroform (anesthetic)'},
                {term: 'CCl₄', definition: 'Carbon tetrachloride (solvent)'},
                {term: 'DDT', definition: 'Insecticide'},
              ], 15),
            ]
          }
        ]
      },
      {
        id: 'chem-12-10-m5',
        name: 'Grignard Reagents',
        description: 'Preparation and synthetic uses',
        totalTokens: 70,
        levels: [
          {
            id: 'chem-12-10-m5-l1',
            name: 'RMgX Reactions',
            order: 1,
            totalTokens: 70,
            activities: [
              createQuiz('chem-12-10-m5-l1-a1', 'Grignard reagent reacts with CO₂ to give:', ['Alcohol', 'Carboxylic acid', 'Ketone', 'Alkane'], 1, 'RMgX + CO₂ → RCOOH after hydrolysis', 10),
              createTrueFalse('chem-12-10-m5-l1-a2', 'True or False', 'Grignard reagents react with water', true, 'They are hydrolyzed by water to give alkanes', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-12-11',
    name: 'Alcohols, Phenols and Ethers',
    description: 'Preparation, properties, reactions',
    moduleCount: 5,
    modules: [
      {
        id: 'chem-12-11-m1',
        name: 'Alcohols',
        description: 'Classification and reactions',
        totalTokens: 65,
        levels: [
          {
            id: 'chem-12-11-m1-l1',
            name: 'Alcohol Reactions',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('chem-12-11-m1-l1-a1', 'Reagent to distinguish 1° and 2° alcohol:', ['Lucas reagent', 'Fehling solution', 'Tollens reagent', 'NaOH'], 0, 'Lucas test: turbidity appears immediately for 3°, 5-10 min for 2°', 10),
              createTrueFalse('chem-12-11-m1-l1-a2', 'True or False', 'Phenol is more acidic than alcohol', true, 'Phenoxide ion is stabilized by resonance', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-11-m2',
        name: 'Preparation of Alcohols',
        description: 'Hydration, reduction methods',
        totalTokens: 60,
        levels: [
          {
            id: 'chem-12-11-m2-l1',
            name: 'Synthesis Methods',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('chem-12-11-m2-l1-a1', 'Alcohols are prepared from alkenes by:', ['Hydroboration-oxidation', 'Ozonolysis', 'Halogenation', 'Nitration'], 0, 'Hydroboration-oxidation gives anti-Markovnikov alcohol', 10),
              createFlashcard('chem-12-11-m2-l1-a2', 'Grignard synthesis', 'RMgX + carbonyl → alcohol', 'Grignard reagents react with aldehydes/ketones', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-11-m3',
        name: 'Phenols',
        description: 'Properties and electrophilic substitution',
        totalTokens: 70,
        levels: [
          {
            id: 'chem-12-11-m3-l1',
            name: 'Phenol Reactions',
            order: 1,
            totalTokens: 70,
            activities: [
              createQuiz('chem-12-11-m3-l1-a1', 'Phenol reacts with Br₂ water to give:', ['o-bromophenol', 'p-bromophenol', '2,4,6-tribromophenol', 'No reaction'], 2, 'White precipitate of 2,4,6-tribromophenol', 10),
              createMatch('chem-12-11-m3-l1-a2', 'Match phenol tests', [
                {term: 'FeCl₃', definition: 'Violet color (enol test)'},
                {term: 'Libermann', definition: 'Red then blue'},
                {term: 'Phthalein', definition: 'Phenolphthalein dye'},
              ], 15),
            ]
          }
        ]
      },
      {
        id: 'chem-12-11-m4',
        name: 'Ethers',
        description: 'Preparation and cleavage',
        totalTokens: 55,
        levels: [
          {
            id: 'chem-12-11-m4-l1',
            name: 'Ether Reactions',
            order: 1,
            totalTokens: 55,
            activities: [
              createQuiz('chem-12-11-m4-l1-a1', 'Williamson synthesis produces:', ['Alcohols', 'Ethers', 'Aldehydes', 'Ketones'], 1, 'SN2 reaction of alkoxide with alkyl halide', 10),
              createTrueFalse('chem-12-11-m4-l1-a2', 'True or False', 'Ethers are cleaved by HI', true, 'Ether cleavage gives alkyl iodide and alcohol', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-11-m5',
        name: 'Industrial Applications',
        description: 'Methanol, ethanol production and uses',
        totalTokens: 60,
        levels: [
          {
            id: 'chem-12-11-m5-l1',
            name: 'Commercial Production',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('chem-12-11-m5-l1-a1', 'Methanol is produced from:', ['Coal', 'Petroleum', 'Natural gas', 'Biomass'], 2, 'Steam reforming of natural gas (methane)', 10),
              createFillBlank('chem-12-11-m5-l1-a2', 'Denatured alcohol', 'Ethanol + _____', ['methanol', 'pyridine'], ['methanol', 'pyridine', 'acetone', 'water'], 10),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-12-12',
    name: 'Aldehydes, Ketones and Carboxylic Acids',
    description: 'Carbonyl compounds, preparation, reactions',
    moduleCount: 6,
    modules: [
      {
        id: 'chem-12-12-m1',
        name: 'Aldehydes and Ketones',
        description: 'Nucleophilic addition reactions',
        totalTokens: 70,
        levels: [
          {
            id: 'chem-12-12-m1-l1',
            name: 'Nucleophilic Addition',
            order: 1,
            totalTokens: 70,
            activities: [
              createQuiz('chem-12-12-m1-l1-a1', 'Which gives positive Tollen test?', ['Acetone', 'Acetaldehyde', 'Benzophenone', 'Acetophenone'], 1, 'Only aldehydes reduce Tollen reagent to silver mirror', 10),
              createMatch('chem-12-12-m1-l1-a2', 'Match reactions', [
                {term: 'Aldol condensation', definition: 'Aldehydes with α-H'},
                {term: 'Cannizzaro', definition: 'Aldehydes without α-H'},
                {term: 'Crossed aldol', definition: 'Two different carbonyls'},
              ], 15),
            ]
          }
        ]
      },
      {
        id: 'chem-12-12-m2',
        name: 'Preparation Methods',
        description: 'Synthesis of carbonyl compounds',
        totalTokens: 65,
        levels: [
          {
            id: 'chem-12-12-m2-l1',
            name: 'Oxidation and Reduction',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('chem-12-12-m2-l1-a1', 'PCC oxidizes alcohols to:', ['Aldehydes', 'Ketones', 'Carboxylic acids', 'Both A and B'], 3, 'PCC oxidizes 1° alcohols to aldehydes, 2° to ketones', 10),
              createFlashcard('chem-12-12-m2-l1-a2', 'Rosenmund reduction', 'Acid chloride + H₂/Pd-BaSO₄', 'Gives aldehyde (stops at aldehyde stage)', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-12-m3',
        name: 'Carboxylic Acids',
        description: 'Properties and reactions',
        totalTokens: 70,
        levels: [
          {
            id: 'chem-12-12-m3-l1',
            name: 'Acidity and Reactions',
            order: 1,
            totalTokens: 70,
            activities: [
              createQuiz('chem-12-12-m3-l1-a1', 'Order of acidity:', ['Formic > Acetic > Benzoic', 'Benzoic > Formic > Acetic', 'Formic > Benzoic > Acetic', 'Acetic > Formic > Benzoic'], 2, 'Formic acid is strongest due to no electron-donating group', 10),
              createTrueFalse('chem-12-12-m3-l1-a2', 'True or False', 'Hell-Volhard-Zelinsky reaction introduces α-halogen', true, 'HVZ reaction brominates α-carbon of acids', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-12-m4',
        name: 'Derivatives of Acids',
        description: 'Acid chlorides, anhydrides, esters, amides',
        totalTokens: 75,
        levels: [
          {
            id: 'chem-12-12-m4-l1',
            name: 'Acid Derivatives',
            order: 1,
            totalTokens: 75,
            activities: [
              createQuiz('chem-12-12-m4-l1-a1', 'Most reactive acid derivative:', ['Acid chloride', 'Anhydride', 'Ester', 'Amide'], 0, 'Acid chlorides are most reactive (best leaving group)', 10),
              createMatch('chem-12-12-m4-l1-a2', 'Match reactivity order', [
                {term: 'Acid chloride', definition: 'Most reactive'},
                {term: 'Ester', definition: 'Less reactive than anhydride'},
                {term: 'Amide', definition: 'Least reactive'},
              ], 15),
            ]
          }
        ]
      },
      {
        id: 'chem-12-12-m5',
        name: 'Tests for Carbonyls',
        description: 'Identification reactions',
        totalTokens: 55,
        levels: [
          {
            id: 'chem-12-12-m5-l1',
            name: 'Distinguishing Tests',
            order: 1,
            totalTokens: 55,
            activities: [
              createQuiz('chem-12-12-m5-l1-a1', 'Fehling solution test is positive for:', ['Aldehydes', 'Ketones', 'Both', 'Neither'], 0, 'Only aliphatic aldehydes reduce Fehling solution', 10),
              createFlashcard('chem-12-12-m5-l1-a2', 'Iodoform test', 'Positive for CH₃CO- group', 'Yellow precipitate of CHI₃', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-12-m6',
        name: 'Polymers from Monomers',
        description: 'Polymerization reactions',
        totalTokens: 60,
        levels: [
          {
            id: 'chem-12-12-m6-l1',
            name: 'Polymer Chemistry',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('chem-12-12-m6-l1-a1', 'Nylon-6,6 is made from:', ['One monomer', 'Two monomers', 'Three monomers', 'No monomers'], 1, 'Adipic acid + hexamethylenediamine', 10),
              createTrueFalse('chem-12-12-m6-l1-a2', 'True or False', 'Bakelite is a condensation polymer', true, 'Formed from phenol and formaldehyde', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-12-13',
    name: 'Amines',
    description: 'Classification, preparation, properties, diazonium salts',
    moduleCount: 5,
    modules: [
      {
        id: 'chem-12-13-m1',
        name: 'Classification of Amines',
        description: 'Primary, secondary, tertiary amines',
        totalTokens: 60,
        levels: [
          {
            id: 'chem-12-13-m1-l1',
            name: 'Basic Character',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('chem-12-13-m1-l1-a1', 'Most basic amine in gas phase:', ['NH₃', 'CH₃NH₂', '(CH₃)₂NH', '(CH₃)₃N'], 2, 'In gas phase, steric factors absent, 2° amine most basic', 10),
              createTrueFalse('chem-12-13-m1-l1-a2', 'True or False', 'Aniline is less basic than ammonia', true, 'Lone pair on N delocalized into benzene ring', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-13-m2',
        name: 'Preparation of Amines',
        description: 'Reduction and other methods',
        totalTokens: 65,
        levels: [
          {
            id: 'chem-12-13-m2-l1',
            name: 'Synthesis Methods',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('chem-12-13-m2-l1-a1', 'Nitrobenzene is reduced to aniline by:', ['Sn/HCl', 'NaBH₄', 'LiAlH₄', 'Zn/HCl'], 0, 'Sn/HCl or Fe/HCl reduces nitro to amine', 10),
              createFlashcard('chem-12-13-m2-l1-a2', 'Gabriel phthalimide', 'Primary amine synthesis', 'Phthalimide + RX then hydrolysis gives 1° amine', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-13-m3',
        name: 'Reactions of Amines',
        description: 'Alkylation, acylation, diazotization',
        totalTokens: 70,
        levels: [
          {
            id: 'chem-12-13-m3-l1',
            name: 'Chemical Reactions',
            order: 1,
            totalTokens: 70,
            activities: [
              createQuiz('chem-12-13-m3-l1-a1', 'Carbylamine test gives:', ['Amine', 'Isocyanide', 'Alcohol', 'Ether'], 1, '1° amine + CHCl₃ + KOH gives foul-smelling isocyanide', 10),
              createMatch('chem-12-13-m3-l1-a2', 'Match amine reactions', [
                {term: 'Acylation', definition: 'Formation of amide'},
                {term: 'Alkylation', definition: 'Increase carbon chain'},
                {term: 'Diazotization', definition: 'NaNO₂ + HCl at 0-5°C'},
              ], 15),
            ]
          }
        ]
      },
      {
        id: 'chem-12-13-m4',
        name: 'Diazonium Salts',
        description: 'Preparation and synthetic uses',
        totalTokens: 75,
        levels: [
          {
            id: 'chem-12-13-m4-l1',
            name: 'Arenediazonium Chemistry',
            order: 1,
            totalTokens: 75,
            activities: [
              createQuiz('chem-12-13-m4-l1-a1', 'Diazonium salts are stable at:', ['High temp', 'Low temp (0-5°C)', 'Room temp', 'All temps'], 1, 'Stable only at 0-5°C, decomposes at higher temps', 10),
              createMatch('chem-12-13-m4-l1-a2', 'Match diazonium reactions', [
                {term: 'Sandmeyer', definition: 'CuCl/CuBr/CuCN catalyst'},
                {term: 'Gattermann', definition: 'Cu powder catalyst'},
                {term: 'Baldwin', definition: 'Replacement by -OH'},
              ], 15),
            ]
          }
        ]
      },
      {
        id: 'chem-12-13-m5',
        name: 'Important Amines',
        description: 'Aniline, derivatives and uses',
        totalTokens: 55,
        levels: [
          {
            id: 'chem-12-13-m5-l1',
            name: 'Commercial Applications',
            order: 1,
            totalTokens: 55,
            activities: [
              createQuiz('chem-12-13-m5-l1-a1', 'Methylamine is used in:', ['Pharmaceuticals', 'Dyes', 'Both', 'Neither'], 2, 'Used in making pharmaceuticals and dyes', 10),
              createTrueFalse('chem-12-13-m5-l1-a2', 'True or False', 'Aniline is used to make sulfa drugs', true, 'Aniline derivatives are used in pharmaceuticals', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-12-14',
    name: 'Biomolecules',
    description: 'Carbohydrates, proteins, nucleic acids, enzymes',
    moduleCount: 5,
    modules: [
      {
        id: 'chem-12-14-m1',
        name: 'Carbohydrates',
        description: 'Monosaccharides and polysaccharides',
        totalTokens: 60,
        levels: [
          {
            id: 'chem-12-14-m1-l1',
            name: 'Glucose Structure',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('chem-12-14-m1-l1-a1', 'Glucose is a:', ['Aldohexose', 'Ketohexose', 'Aldopentose', 'Ketopentose'], 0, 'Glucose has aldehyde group and 6 carbons', 10),
              createMatch('chem-12-14-m1-l1-a2', 'Match biomolecules', [
                {term: 'Starch', definition: 'Storage polysaccharide'},
                {term: 'Cellulose', definition: 'Structural polysaccharide'},
                {term: 'Glycogen', definition: 'Animal starch'},
              ], 15),
            ]
          }
        ]
      },
      {
        id: 'chem-12-14-m2',
        name: 'Proteins',
        description: 'Amino acids, peptide bonds, structure',
        totalTokens: 70,
        levels: [
          {
            id: 'chem-12-14-m2-l1',
            name: 'Protein Structure',
            order: 1,
            totalTokens: 70,
            activities: [
              createQuiz('chem-12-14-m2-l1-a1', 'α-helix is stabilized by:', ['Ionic bonds', 'Hydrogen bonds', 'Disulfide bonds', 'Peptide bonds'], 1, 'H-bonds between N-H and C=O groups', 10),
              createFlashcard('chem-12-14-m2-l1-a2', 'Zwitterion', 'Dipolar ion', 'Amino acid with + and - charges at isoelectric point', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-14-m3',
        name: 'Enzymes',
        description: 'Biocatalysts, mechanism, factors',
        totalTokens: 65,
        levels: [
          {
            id: 'chem-12-14-m3-l1',
            name: 'Enzyme Kinetics',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('chem-12-14-m3-l1-a1', 'Lock and key model was proposed by:', ['Koshland', 'Fischer', 'Michaelis', 'Menten'], 1, 'Emil Fischer proposed lock and key model', 10),
              createTrueFalse('chem-12-14-m3-l1-a2', 'True or False', 'Enzymes are specific to substrates', true, 'Enzymes have specific active sites for specific substrates', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-14-m4',
        name: 'Nucleic Acids',
        description: 'DNA, RNA structure and functions',
        totalTokens: 70,
        levels: [
          {
            id: 'chem-12-14-m4-l1',
            name: 'DNA Structure',
            order: 1,
            totalTokens: 70,
            activities: [
              createQuiz('chem-12-14-m4-l1-a1', 'Nucleotide contains:', ['Sugar + Base', 'Sugar + Phosphate', 'Base + Phosphate', 'All three'], 3, 'Nucleotide = base + sugar + phosphate', 10),
              createMatch('chem-12-14-m4-l1-a2', 'Match nitrogen bases', [
                {term: 'Adenine', definition: 'Pairs with thymine'},
                {term: 'Guanine', definition: 'Pairs with cytosine'},
                {term: 'Uracil', definition: 'In RNA only'},
              ], 15),
            ]
          }
        ]
      },
      {
        id: 'chem-12-14-m5',
        name: 'Vitamins and Hormones',
        description: 'Classification and biological roles',
        totalTokens: 55,
        levels: [
          {
            id: 'chem-12-14-m5-l1',
            name: 'Micronutrients',
            order: 1,
            totalTokens: 55,
            activities: [
              createQuiz('chem-12-14-m5-l1-a1', 'Vitamin C deficiency causes:', ['Scurvy', 'Rickets', 'Beriberi', 'Night blindness'], 0, 'Scurvy is caused by vitamin C deficiency', 10),
              createFlashcard('chem-12-14-m5-l1-a2', 'Steroid hormones', 'Derived from cholesterol', 'Testosterone, estrogen, cortisol are steroid hormones', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-12-15',
    name: 'Polymers',
    description: 'Natural and synthetic polymers, rubber, plastics',
    moduleCount: 4,
    modules: [
      {
        id: 'chem-12-15-m1',
        name: 'Polymerization',
        description: 'Addition and condensation polymerization',
        totalTokens: 60,
        levels: [
          {
            id: 'chem-12-15-m1-l1',
            name: 'Polymer Types',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('chem-12-15-m1-l1-a1', 'Teflon is:', ['Addition polymer', 'Condensation polymer', 'Natural polymer', 'Biodegradable'], 0, 'Teflon (PTFE) is addition polymer of tetrafluoroethylene', 10),
              createMatch('chem-12-15-m1-l1-a2', 'Match polymers with monomers', [
                {term: 'PVC', definition: 'Vinyl chloride'},
                {term: 'Nylon-6,6', definition: 'Adipic acid + hexamethylenediamine'},
                {term: 'Bakelite', definition: 'Phenol + formaldehyde'},
              ], 15),
            ]
          }
        ]
      },
      {
        id: 'chem-12-15-m2',
        name: 'Natural Polymers',
        description: 'Proteins, starch, cellulose, rubber',
        totalTokens: 55,
        levels: [
          {
            id: 'chem-12-15-m2-l1',
            name: 'Biopolymers',
            order: 1,
            totalTokens: 55,
            activities: [
              createQuiz('chem-12-15-m2-l1-a1', 'Natural rubber is polymer of:', ['Isoprene', 'Styrene', 'Propylene', 'Vinyl chloride'], 0, 'Natural rubber is cis-polyisoprene', 10),
              createTrueFalse('chem-12-15-m2-l1-a2', 'True or False', 'Vulcanization improves rubber properties', true, 'Sulfur cross-linking makes rubber more elastic', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-15-m3',
        name: 'Synthetic Polymers',
        description: 'Plastics and fibers',
        totalTokens: 65,
        levels: [
          {
            id: 'chem-12-15-m3-l1',
            name: 'Commercial Polymers',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('chem-12-15-m3-l1-a1', 'Thermosetting polymers:', ['Can be remelted', 'Cannot be remelted', 'Soft on heating', 'Dissolve in water'], 1, 'Thermosets have cross-linked structure, cannot be remelted', 10),
              createFlashcard('chem-12-15-m3-l1-a2', 'Buna-N', 'Nitrile rubber', 'Copolymer of butadiene and acrylonitrile', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-15-m4',
        name: 'Biodegradable Polymers',
        description: 'Environmentally friendly polymers',
        totalTokens: 50,
        levels: [
          {
            id: 'chem-12-15-m4-l1',
            name: 'Green Polymers',
            order: 1,
            totalTokens: 50,
            activities: [
              createQuiz('chem-12-15-m4-l1-a1', 'PHBV is a:', ['Biodegradable polymer', 'Synthetic fiber', 'Natural rubber', 'Plasticizer'], 0, 'PHBV is poly(β-hydroxybutyrate-co-β-hydroxyvalerate)', 10),
              createTrueFalse('chem-12-15-m4-l1-a2', 'True or False', 'Nylon-2-nylon-6 is biodegradable', true, 'It is a biodegradable polyamide', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chem-12-16',
    name: 'Chemistry in Everyday Life',
    description: 'Drugs, food additives, cleansers, environmental chemistry',
    moduleCount: 4,
    modules: [
      {
        id: 'chem-12-16-m1',
        name: 'Drugs and Medicine',
        description: 'Classification and uses of drugs',
        totalTokens: 50,
        levels: [
          {
            id: 'chem-12-16-m1-l1',
            name: 'Drug Classification',
            order: 1,
            totalTokens: 50,
            activities: [
              createQuiz('chem-12-16-m1-l1-a1', 'Aspirin is used as:', ['Analgesic', 'Antibiotic', 'Antacid', 'Antiseptic'], 0, 'Aspirin (acetylsalicylic acid) is analgesic and antipyretic', 10),
              createMatch('chem-12-16-m1-l1-a2', 'Match drugs', [
                {term: 'Saccharin', definition: 'Artificial sweetener'},
                {term: 'Paracetamol', definition: 'Antipyretic'},
                {term: 'Penicillin', definition: 'Antibiotic'},
              ], 15),
            ]
          }
        ]
      },
      {
        id: 'chem-12-16-m2',
        name: 'Food Additives',
        description: 'Preservatives, sweeteners, antioxidants',
        totalTokens: 45,
        levels: [
          {
            id: 'chem-12-16-m2-l1',
            name: 'Food Chemistry',
            order: 1,
            totalTokens: 45,
            activities: [
              createQuiz('chem-12-16-m2-l1-a1', 'Sodium benzoate is used as:', ['Sweetener', 'Preservative', 'Color', 'Flavor'], 1, 'Sodium benzoate prevents microbial growth in foods', 10),
              createTrueFalse('chem-12-16-m2-l1-a2', 'True or False', 'BHA and BHT are antioxidants', true, 'Butylated hydroxyanisole/toluene prevent food oxidation', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-16-m3',
        name: 'Cleansing Agents',
        description: 'Soaps and detergents',
        totalTokens: 50,
        levels: [
          {
            id: 'chem-12-16-m3-l1',
            name: 'Soap and Detergents',
            order: 1,
            totalTokens: 50,
            activities: [
              createQuiz('chem-12-16-m3-l1-a1', 'Soap does not work in:', ['Soft water', 'Hard water', 'Acidic water', 'Both B and C'], 3, 'Hard water forms insoluble Ca/Mg soaps', 10),
              createFlashcard('chem-12-16-m3-l1-a2', 'Synthetic detergent', 'Works in hard water', 'Sulfonate group does not precipitate with Ca²⁺/Mg²⁺', 8),
            ]
          }
        ]
      },
      {
        id: 'chem-12-16-m4',
        name: 'Environmental Chemistry',
        description: 'Pollution, green chemistry',
        totalTokens: 55,
        levels: [
          {
            id: 'chem-12-16-m4-l1',
            name: 'Pollution Control',
            order: 1,
            totalTokens: 55,
            activities: [
              createQuiz('chem-12-16-m4-l1-a1', 'Main component of photochemical smog:', ['SO₂', 'NO₂', 'CO₂', 'O₃'], 1, 'Nitrogen oxides + sunlight → photochemical smog', 10),
              createTrueFalse('chem-12-16-m4-l1-a2', 'True or False', 'Green chemistry reduces waste at source', true, 'Prevention is better than treatment in green chemistry', 8),
            ]
          }
        ]
      }
    ]
  }
];

// ============ BIOLOGY CURRICULUM ============
const biologyPlusOneChapters: Chapter[] = [
  {
    id: 'bio-11-1',
    name: 'The Living World',
    description: 'Characteristics of living organisms, diversity, taxonomy, nomenclature, taxonomic aids',
    moduleCount: 5,
    modules: [
      // ============ MODULE 1: Characteristics of Living Organisms ============
      {
        id: 'bio-11-1-m1',
        name: 'Module 1: What is Life?',
        description: 'Key characteristics that distinguish living from non-living',
        totalTokens: 150,
        levels: [
          {
            id: 'bio-11-1-m1-l1',
            name: '1.1 Living vs Non-Living 🔥',
            order: 1,
            totalTokens: 30,
            activities: [
              createQuiz('bio-l1-1-a1', 'Which is NOT a characteristic of living organisms?', ['Metabolism', 'Reproduction', 'Growth', 'Crystallization'], 3, 'Crystallization is a physical process, not a life characteristic', 10),
              createMatch('bio-l1-1-a2', '🎮 Match: Living vs Non-living traits', [
                {term: 'Metabolism', definition: 'Living: Chemical reactions for energy'},
                {term: 'Growth', definition: 'Living: Increase in mass/number of cells'},
                {term: 'Crystallization', definition: 'Non-living: Physical structure formation'},
                {term: 'Responsiveness', definition: 'Living: Response to stimuli'},
              ], 15),
              createTrueFalse('bio-l1-1-a3', 'True or False', 'Viruses are considered living organisms', false, 'Viruses are acellular and can only reproduce inside host cells - borderline case', 8),
            ]
          },
          {
            id: 'bio-11-1-m1-l2',
            name: '1.2 Metabolism',
            order: 2,
            totalTokens: 30,
            activities: [
              createQuiz('bio-l1-2-a1', 'Anabolic reactions involve:', ['Breaking down molecules', 'Building up molecules', 'Releasing energy', 'Oxidation'], 1, 'Anabolism builds complex molecules from simpler ones (e.g., protein synthesis)', 10),
              createMatch('bio-l1-2-a2', 'Match metabolic process with type', [
                {term: 'Photosynthesis', definition: 'Anabolic - builds glucose'},
                {term: 'Respiration', definition: 'Catabolic - breaks glucose'},
                {term: 'Protein synthesis', definition: 'Anabolic - builds proteins'},
                {term: 'Digestion', definition: 'Catabolic - breaks food'},
              ], 15),
              createFillBlank('bio-l1-2-a3', 'Metabolism definition', 'Metabolism is the sum of all _____ and _____ reactions in an organism.', ['anabolic', 'catabolic'], ['anabolic', 'catabolic', 'synthetic', 'breakdown'], 8),
              createFlashcard('bio-l1-2-a4', 'Key Term', 'Metabolism', 'Sum total of all chemical reactions occurring in living organisms', 5),
            ]
          },
          {
            id: 'bio-11-1-m1-l3',
            name: '1.3 Cellular Organization',
            order: 3,
            totalTokens: 25,
            activities: [
              createQuiz('bio-l1-3-a1', 'Cellular organization level: Tissue is made of:', ['Cells', 'Organs', 'Organ systems', 'Organelles'], 0, 'Tissue = group of similar cells performing same function', 10),
              createTrueFalse('bio-l1-3-a2', 'True or False', 'All living organisms are made of one or more cells', true, 'Cell theory: Cell is the basic unit of life', 8),
              createMatch('bio-l1-3-a3', 'Hierarchy of organization', [
                {term: 'Cell', definition: 'Basic unit of life'},
                {term: 'Tissue', definition: 'Group of similar cells'},
                {term: 'Organ', definition: 'Different tissues working together'},
                {term: 'Organ system', definition: 'Multiple organs cooperating'},
              ], 12),
            ]
          },
          {
            id: 'bio-11-1-m1-l4',
            name: '1.4 Growth in Living Organisms',
            order: 4,
            totalTokens: 25,
            activities: [
              createQuiz('bio-l1-4-a1', 'Growth in living organisms is:', ['Only increase in size', 'Increase in mass and cell number', 'Permanent increase', 'All of these'], 3, 'Living organisms show internal growth by cell division', 10),
              createTrueFalse('bio-l1-4-a2', 'True or False', 'Growth in plants is indeterminate and unlimited', true, 'Plants have meristems that allow continuous growth', 8),
              createFillBlank('bio-l1-4-a3', 'Growth characteristics', 'Living organisms show _____ growth (internal) while non-living objects show _____ growth (external addition).', ['intrinsic', 'extrinsic'], ['intrinsic', 'extrinsic', 'internal', 'external'], 10),
            ]
          },
          {
            id: 'bio-11-1-m1-l5',
            name: '1.5 Reproduction & Consciousness',
            order: 5,
            totalTokens: 30,
            activities: [
              createQuiz('bio-l1-5-a1', 'Reproduction is essential for:', ['Individual survival', 'Species continuity', 'Growth', 'Metabolism'], 1, 'Reproduction ensures continuation of species, not individual', 10),
              createMatch('bio-l1-5-a2', 'Types of reproduction', [
                {term: 'Binary fission', definition: 'Asexual - Amoeba'},
                {term: 'Budding', definition: 'Asexual - Hydra'},
                {term: 'Sexual', definition: 'Involves gametes and fertilization'},
                {term: 'Vegetative', definition: 'Asexual - Plants by cuttings/runners'},
              ], 15),
              createTrueFalse('bio-l1-5-a3', 'True or False', 'Consciousness is the defining property of living organisms', true, 'All living organisms have awareness of surroundings', 8),
              createFlashcard('bio-l1-5-a4', 'Key Term', 'Irritability', 'Ability to respond to stimuli - characteristic of all living things', 5),
            ]
          },
          {
            id: 'bio-11-1-m1-l6',
            name: '1.6 Adaptation & Homeostasis',
            order: 6,
            totalTokens: 25,
            activities: [
              createQuiz('bio-l1-6-a1', 'Homeostasis refers to:', ['Growth', 'Constant internal environment', 'Reproduction', 'Movement'], 1, 'Maintenance of stable internal conditions despite external changes', 10),
              createTrueFalse('bio-l1-6-a2', 'True or False', 'Sweating is a homeostatic response to maintain body temperature', true, 'Thermoregulation maintains constant body temperature', 8),
              createMatch('bio-l1-6-a3', 'Match adaptation with environment', [
                {term: 'Camouflage', definition: 'Avoiding predators by blending in'},
                {term: 'Migration', definition: 'Seasonal movement for resources'},
                {term: 'Hibernation', definition: 'Winter dormancy to save energy'},
              ], 10),
            ]
          }
        ]
      },
      // ============ MODULE 2: Diversity in the Living World ============
      {
        id: 'bio-11-1-m2',
        name: 'Module 2: Diversity of Life',
        description: 'Species richness, nomenclature basics, scientific names',
        totalTokens: 140,
        levels: [
          {
            id: 'bio-11-1-m2-l1',
            name: '2.1 Biological Diversity',
            order: 1,
            totalTokens: 30,
            activities: [
              createQuiz('bio-l2-1-a1', 'Approximately how many species have been described?', ['1 million', '1.7-2 million', '10 million', '50 million'], 1, 'About 1.7-2 million species described, but estimated 10-50 million exist', 10),
              createMatch('bio-l2-1-a2', 'Diversity categories', [
                {term: 'Species diversity', definition: 'Variety of species in an area'},
                {term: 'Genetic diversity', definition: 'Variety of genes within species'},
                {term: 'Ecosystem diversity', definition: 'Variety of habitats/ecosystems'},
              ], 15),
              createTrueFalse('bio-l2-1-a3', 'True or False', 'India is one of the 12 mega-biodiversity countries', true, 'India has about 8.1% of global species diversity', 8),
            ]
          },
          {
            id: 'bio-11-1-m2-l2',
            name: '2.2 Need for Classification',
            order: 2,
            totalTokens: 25,
            activities: [
              createQuiz('bio-l2-2-a1', 'Classification helps us to:', ['Create new species', 'Organize and study organisms systematically', 'Avoid naming organisms', 'Eliminate diversity'], 1, 'Taxonomy organizes living world for systematic study', 10),
              createMatch('bio-l2-2-a2', 'Why classify?', [
                {term: 'Organize diversity', definition: 'Group similar organisms together'},
                {term: 'Easy identification', definition: 'Unique name for each organism'},
                {term: 'Evolutionary relationships', definition: 'Understand ancestry and descent'},
              ], 12),
            ]
          },
          {
            id: 'bio-11-1-m2-l3',
            name: '2.3 Binomial Nomenclature 🔥',
            order: 3,
            totalTokens: 35,
            activities: [
              createQuiz('bio-l2-3-a1', 'Who proposed binomial nomenclature?', ['Darwin', 'Carolus Linnaeus', 'Aristotle', 'Whittaker'], 1, 'Linnaeus (Father of Taxonomy) proposed two-part naming system', 10),
              createFillBlank('bio-l2-3-a2', '🎮 Build scientific name', 'Scientific name = _____ (genus, capital) + _____ (species, small) e.g., _____ _____', ['Panthera', 'leo', 'Panthera', 'leo'], ['Panthera', 'leo', 'Tigris', 'pardus'], 15),
              createTrueFalse('bio-l2-3-a3', 'True or False', 'Scientific names are universally accepted and used worldwide', true, 'Latin names ensure universal understanding', 8),
              createMatch('bio-l2-3-a4', 'Match common name with scientific name', [
                {term: 'Man', definition: 'Homo sapiens'},
                {term: 'Tiger', definition: 'Panthera tigris'},
                {term: 'Lion', definition: 'Panthera leo'},
                {term: 'Domestic cat', definition: 'Felis catus'},
              ], 10),
            ]
          },
          {
            id: 'bio-11-1-m2-l4',
            name: '2.4 Rules of Nomenclature',
            order: 4,
            totalTokens: 25,
            activities: [
              createQuiz('bio-l2-4-a1', 'In scientific names, the genus name should be:', ['Small letters', 'Capitalized', 'Italicized only', 'Underlined only'], 1, 'Genus first letter capital, species all small - both italicized (or underlined)', 10),
              createTrueFalse('bio-l2-4-a2', 'True or False', 'The same scientific name can be used for different organisms in different countries', false, 'Each species has only one valid scientific name worldwide', 8),
              createMatch('bio-l2-4-a3', 'Nomenclature rules', [
                {term: 'Latin/Greek', definition: 'Scientific names are in Latin or Latinized'},
                {term: 'Italics', definition: 'Names are printed in italics'},
                {term: 'Underline', definition: 'When handwritten, names are underlined'},
              ], 12),
            ]
          },
          {
            id: 'bio-11-1-m2-l5',
            name: '2.5 Common vs Scientific Names',
            order: 5,
            totalTokens: 25,
            activities: [
              createQuiz('bio-l2-5-a1', 'Problem with common names:', ['They are too short', 'They vary by region/language', 'They are scientific', 'They are universal'], 1, 'Common names create confusion - same organism has different names in different regions', 10),
              createMatch('bio-l2-5-a2', 'Regional name variations', [
                {term: 'Makoi (India)', definition: 'Solanum nigrum (Black nightshade)'},
                {term: 'Mango', definition: 'Mangifera indica'},
                {term: 'Jamun', definition: 'Syzygium cumini'},
              ], 12),
              createFlashcard('bio-l2-5-a3', 'Key Term', 'Nomenclature', 'System of naming organisms using scientific method', 5),
            ]
          }
        ]
      },
      // ============ MODULE 3: Taxonomic Categories ============
      {
        id: 'bio-11-1-m3',
        name: 'Module 3: Taxonomic Hierarchy',
        description: 'Kingdom, Phylum, Class, Order, Family, Genus, Species',
        totalTokens: 200,
        levels: [
          {
            id: 'bio-11-1-m3-l1',
            name: '3.1 Taxonomic Categories 🔥',
            order: 1,
            totalTokens: 30,
            activities: [
              createFillBlank('bio-l3-1-a1', '🎮 Taxonomic hierarchy (acronym: KPCOFGS)', 'Kingdom → _____ → _____ → Order → _____ → Genus → _____', ['Phylum', 'Class', 'Family', 'Species'], ['Phylum', 'Class', 'Order', 'Family', 'Genus', 'Species'], 15),
              createQuiz('bio-l3-1-a2', 'The largest taxonomic category is:', ['Species', 'Genus', 'Kingdom', 'Phylum'], 2, 'Kingdom is the highest/broadest category', 10),
              createTrueFalse('bio-l3-1-a3', 'True or False', 'Species is the basic unit of classification', true, 'Species is the lowest/smallest taxonomic category', 8),
            ]
          },
          {
            id: 'bio-11-1-m3-l2',
            name: '3.2 Species & Genus',
            order: 2,
            totalTokens: 35,
            activities: [
              createQuiz('bio-l3-2-a1', 'A species is defined as:', ['Group of different organisms', 'Group of similar organisms that can interbreed', 'All organisms in a habitat', 'Physical appearance'], 1, 'Species concept: populations capable of interbreeding to produce fertile offspring', 10),
              createMatch('bio-l3-2-a2', 'Examples of same/different genus', [
                {term: 'Panthera leo', definition: 'Lion - same genus as tiger'},
                {term: 'Panthera tigris', definition: 'Tiger - same genus as lion'},
                {term: 'Felis catus', definition: 'Cat - different genus'},
                {term: 'Panthera pardus', definition: 'Leopard - same Panthera genus'},
              ], 15),
              createFillBlank('bio-l3-2-a3', 'Genus definition', 'A genus contains one or more related _____.', ['species'], ['species', 'families', 'orders', 'classes'], 10),
              createFlashcard('bio-l3-2-a4', 'Key Term', 'Taxon', 'A particular level/taxonomic category in classification hierarchy', 5),
            ]
          },
          {
            id: 'bio-11-1-m3-l3',
            name: '3.3 Family to Phylum',
            order: 3,
            totalTokens: 30,
            activities: [
              createQuiz('bio-l3-3-a1', 'Related genera are grouped into:', ['Species', 'Families', 'Orders', 'Classes'], 1, 'Family contains related genera (e.g., Felidae includes Felis and Panthera)', 10),
              createMatch('bio-l3-3-a2', 'Taxonomic categories', [
                {term: 'Family', definition: 'Group of related genera'},
                {term: 'Order', definition: 'Group of related families'},
                {term: 'Class', definition: 'Group of related orders'},
                {term: 'Phylum/Division', definition: 'Group of related classes'},
              ], 15),
              createTrueFalse('bio-l3-3-a3', 'True or False', 'In plants, Phylum is called Division', true, 'Same taxonomic rank but different terminology for plants', 8),
            ]
          },
          {
            id: 'bio-11-1-m3-l4',
            name: '3.4 Kingdom Classification',
            order: 4,
            totalTokens: 35,
            activities: [
              createQuiz('bio-l3-4-a1', 'Five kingdom classification was proposed by:', ['Linnaeus', 'Whittaker', 'Haeckel', 'Copeland'], 1, 'R.H. Whittaker (1969) proposed 5 kingdom system: Monera, Protista, Fungi, Plantae, Animalia', 10),
              createMatch('bio-l3-4-a2', 'Five kingdoms and their features', [
                {term: 'Monera', definition: 'Prokaryotes, unicellular'},
                {term: 'Protista', definition: 'Eukaryotes, mostly unicellular'},
                {term: 'Fungi', definition: 'Eukaryotes, heterotrophic, cell wall'},
                {term: 'Plantae', definition: 'Eukaryotes, autotrophic, cell wall'},
                {term: 'Animalia', definition: 'Eukaryotes, heterotrophic, no cell wall'},
              ], 20),
              createTrueFalse('bio-l3-4-a3', 'True or False', 'Five kingdom system is based on cell structure, nutrition and body organization', true, 'Three criteria: complexity of cell structure, mode of nutrition, body organization', 8),
            ]
          },
          {
            id: 'bio-11-1-m3-l5',
            name: '3.5 Classification Example: Human',
            order: 5,
            totalTokens: 35,
            activities: [
              createFillBlank('bio-l3-5-a1', '🎮 Human classification hierarchy', 'Kingdom: _____ → Phylum: Chordata → Class: Mammalia → Order: _____ → Family: Hominidae → Genus: _____ → Species: sapiens', ['Animalia', 'Primates', 'Homo'], ['Animalia', 'Vertebrata', 'Primates', 'Hominidae', 'Homo', 'Human'], 15),
              createQuiz('bio-l3-5-a2', 'Humans belong to the order:', ['Carnivora', 'Primates', 'Rodentia', 'Artiodactyla'], 1, 'Primates include monkeys, apes, and humans', 10),
              createMatch('bio-l3-5-a3', 'Human classification levels', [
                {term: 'Animalia', definition: 'Heterotrophic, multicellular'},
                {term: 'Chordata', definition: 'Notochord present at some stage'},
                {term: 'Mammalia', definition: 'Hair, mammary glands'},
                {term: 'Homo sapiens', definition: 'Wise man - modern humans'},
              ], 10),
            ]
          },
          {
            id: 'bio-11-1-m3-l6',
            name: '3.6 Classification Example: Tiger',
            order: 6,
            totalTokens: 35,
            activities: [
              createFillBlank('bio-l3-6-a1', '🎮 Tiger classification', 'Kingdom: Animalia → Phylum: _____ → Class: Mammalia → Order: _____ → Family: Felidae → Genus: Panthera → Species: _____', ['Chordata', 'Carnivora', 'tigris'], ['Chordata', 'Vertebrata', 'Carnivora', 'Felidae', 'Panthera', 'tigris'], 15),
              createQuiz('bio-l3-6-a2', 'Tiger and lion share the same:', ['Species', 'Genus', 'Family only', 'Order only'], 1, 'Both Panthera leo and Panthera tigris belong to genus Panthera', 10),
              createTrueFalse('bio-l3-6-a3', 'True or False', 'Lion and tiger can interbreed but offspring (liger) is sterile', true, 'Closely related species can hybridize but hybrids are often sterile', 8),
              createMatch('bio-l3-6-a4', 'Big cats classification', [
                {term: 'Panthera leo', definition: 'Lion'},
                {term: 'Panthera tigris', definition: 'Tiger'},
                {term: 'Panthera pardus', definition: 'Leopard'},
                {term: 'Felis catus', definition: 'Domestic cat - different genus'},
              ], 10),
            ]
          },
          {
            id: 'bio-11-1-m3-l7',
            name: '3.7 Taxonomic Hierarchy Quiz',
            order: 7,
            totalTokens: 35,
            activities: [
              createQuiz('bio-l3-7-a1', 'Which category has the most number of organisms?', ['Species', 'Genus', 'Family', 'Kingdom'], 3, 'Higher categories include more organisms but share fewer characteristics', 10),
              createQuiz('bio-l3-7-a2', 'Related families are grouped into:', ['Genera', 'Orders', 'Classes', 'Phyla'], 1, 'Order is the taxonomic category containing related families', 10),
              createMatch('bio-l3-7-a3', '🎮 Match the hierarchy', [
                {term: 'Kingdom Animalia', definition: 'Includes all animals'},
                {term: 'Phylum Chordata', definition: 'Includes vertebrates'},
                {term: 'Class Mammalia', definition: 'Includes mammals'},
                {term: 'Species sapiens', definition: 'Only modern humans'},
              ], 15),
              createFillBlank('bio-l3-7-a4', 'Hierarchy principle', 'As we move up the hierarchy from species to kingdom, the number of organisms _____ while shared characteristics _____.', ['increases', 'decrease'], ['increases', 'decrease', 'reduce', 'expand'], 10),
            ]
          }
        ]
      },
      // ============ MODULE 4: Taxonomic Aids ============
      {
        id: 'bio-11-1-m4',
        name: 'Module 4: Taxonomic Aids',
        description: 'Herbarium, museums, botanical gardens, zoological parks, keys',
        totalTokens: 170,
        levels: [
          {
            id: 'bio-11-1-m4-l1',
            name: '4.1 Herbarium 🔥',
            order: 1,
            totalTokens: 30,
            activities: [
              createQuiz('bio-l4-1-a1', 'A herbarium is a:', ['Garden of medicinal plants', 'Collection of preserved plant specimens', 'Book on plant classification', 'Laboratory for plant research'], 1, 'Herbarium sheets contain dried, pressed, mounted plants with complete information', 10),
              createMatch('bio-l4-1-a2', 'Herbarium features', [
                {term: 'Dried plants', definition: 'Pressed and mounted on sheets'},
                {term: 'Label information', definition: 'Date, place, collector, family'},
                {term: 'Preservation', definition: 'Treated to prevent decay'},
              ], 15),
              createTrueFalse('bio-l4-1-a3', 'True or False', 'Herbarium sheets are arranged according to classification system', true, 'Plants are organized family-wise for easy reference', 8),
            ]
          },
          {
            id: 'bio-11-1-m4-l2',
            name: '4.2 Botanical Gardens',
            order: 2,
            totalTokens: 30,
            activities: [
              createQuiz('bio-l4-2-a1', 'Famous Indian botanical garden at Kolkata is:', ['Lal Bagh', 'Sunderbans', 'Indian Botanic Garden (Howrah)', 'National Botanical Garden'], 2, 'Indian Botanic Garden, Howrah has the Great Banyan Tree', 10),
              createMatch('bio-l4-2-a2', 'Famous botanical gardens', [
                {term: 'Kew Gardens', definition: 'London, England - largest collection'},
                {term: 'Indian Botanic Garden', definition: 'Howrah, India'},
                {term: 'Lal Bagh', definition: 'Bangalore, India'},
              ], 12),
              createTrueFalse('bio-l4-2-a3', 'True or False', 'Botanical gardens serve as centers for scientific study and conservation', true, 'They maintain living plant collections and conduct research', 8),
            ]
          },
          {
            id: 'bio-11-1-m4-l3',
            name: '4.3 Museums',
            order: 3,
            totalTokens: 30,
            activities: [
              createQuiz('bio-l4-3-a1', 'Museums preserve:', ['Only living animals', 'Only plants', 'Preserved animal specimens and fossils', 'Only rocks'], 2, 'Museums preserve dead/preserved specimens of animals and plants', 10),
              createMatch('bio-l4-3-a2', 'Museum collections', [
                {term: 'Preserved specimens', definition: 'In jars with formalin/alcohol'},
                {term: 'Skeletons', definition: 'Bone structure displays'},
                {term: 'Fossils', definition: 'Ancient preserved remains'},
              ], 12),
              createTrueFalse('bio-l4-3-a3', 'True or False', 'The National Museum of Natural History is in New Delhi, India', true, 'It shows India\'s rich natural heritage', 8),
            ]
          },
          {
            id: 'bio-11-1-m4-l4',
            name: '4.4 Zoological Parks',
            order: 4,
            totalTokens: 25,
            activities: [
              createQuiz('bio-l4-4-a1', 'Zoological parks provide:', ['Only entertainment', 'Habitat for wild animals and public education', 'Hunting grounds', 'Animal markets'], 1, 'Zoos maintain animals in protected, near-natural conditions for study and conservation', 10),
              createMatch('bio-l4-4-a2', 'Purpose of zoos', [
                {term: 'Conservation', definition: 'Protect endangered species'},
                {term: 'Education', definition: 'Public awareness about wildlife'},
                {term: 'Research', definition: 'Study animal behavior and biology'},
              ], 12),
            ]
          },
          {
            id: 'bio-11-1-m4-l5',
            name: '4.5 Taxonomic Keys',
            order: 5,
            totalTokens: 30,
            activities: [
              createQuiz('bio-l4-5-a1', 'A taxonomic key is a:', ['Physical key to unlock specimens', 'Device for identifying organisms based on choices', 'List of all species', 'Type of herbarium'], 1, 'Keys use contrasting characters (couplets) for identification', 10),
              createFillBlank('bio-l4-5-a2', 'Key types', 'Keys can be _____ (sequential) or _____ (branched diagram).', ['Indented', 'Bracketed'], ['Indented', 'Bracketed', 'Branching', 'Tree'], 12),
              createTrueFalse('bio-l4-5-a3', 'True or False', 'In a dichotomous key, each step has two contrasting choices', true, 'Dichotomous means divided into two parts', 8),
            ]
          },
          {
            id: 'bio-11-1-m4-l6',
            name: '4.6 Other Taxonomic Aids',
            order: 6,
            totalTokens: 25,
            activities: [
              createMatch('bio-l4-6-a1', 'Taxonomic aids', [
                {term: 'Flora', definition: 'Book describing plants of a region'},
                {term: 'Manuals', definition: 'Information for identifying species'},
                {term: 'Monographs', definition: 'Detailed study of one taxonomic group'},
                {term: 'Catalogues', definition: 'Alphabetical listing of species'},
              ], 15),
              createQuiz('bio-l4-6-a2', 'Which taxonomic aid contains information about all plants in a particular area?', ['Manual', 'Flora', 'Monograph', 'Catalogue'], 1, 'Flora is a comprehensive account of plant species of a region', 10),
            ]
          }
        ]
      },
      // ============ MODULE 5: Master Review ============
      {
        id: 'bio-11-1-m5',
        name: 'Module 5: The Living World - Master Quiz',
        description: 'Comprehensive review of all topics',
        totalTokens: 120,
        levels: [
          {
            id: 'bio-11-1-m5-l1',
            name: '5.1 Characteristics Review',
            order: 1,
            totalTokens: 40,
            activities: [
              createQuiz('bio-l5-1-a1', 'All living organisms share all these EXCEPT:', ['Metabolism', 'Growth', 'Consciousness', 'Immortality'], 3, 'All living things eventually die; immortality is not a characteristic', 10),
              createMatch('bio-l5-1-a2', 'Living characteristics match', [
                {term: 'Metabolism', definition: 'Anabolism + Catabolism'},
                {term: 'Reproduction', definition: 'Production of progeny'},
                {term: 'Homeostasis', definition: 'Steady internal state'},
                {term: 'Adaptation', definition: 'Favorable adjustments to environment'},
              ], 15),
              createFillBlank('bio-l5-1-a3', 'Complete the sentence', '_____ is considered as the defining property of living organisms because all living things _____ to environmental stimuli.', ['Consciousness', 'respond'], ['Consciousness', 'Irritability', 'adapt', 'respond'], 10),
              createTrueFalse('bio-l5-1-a4', 'True or False', 'Growth in living organisms is intrinsic while in non-living it is extrinsic', true, 'Living: internal cell division; Non-living: accumulation of material outside', 8),
            ]
          },
          {
            id: 'bio-11-1-m5-l2',
            name: '5.2 Taxonomy Review',
            order: 2,
            totalTokens: 40,
            activities: [
              createQuiz('bio-l5-2-a1', 'The correct order of taxonomic hierarchy from top to bottom is:', ['Species → Genus → Family → Order → Class → Phylum → Kingdom', 'Kingdom → Phylum → Class → Order → Family → Genus → Species', 'Kingdom → Class → Phylum → Order → Family → Genus → Species', 'Kingdom → Phylum → Order → Class → Family → Genus → Species'], 1, 'KPCOFGS: Kingdom, Phylum, Class, Order, Family, Genus, Species', 10),
              createMatch('bio-l5-2-a2', '🎮 Match taxonomic categories', [
                {term: 'Homo', definition: 'Genus of humans'},
                {term: 'Hominidae', definition: 'Family of great apes and humans'},
                {term: 'Primates', definition: 'Order including monkeys and apes'},
                {term: 'Animalia', definition: 'Kingdom of animals'},
              ], 15),
              createFillBlank('bio-l5-2-a3', 'Scientific name format', 'Scientific name = _____ (capitalized) + _____ (small letters), both written in _____ or underlined.', ['Genus', 'species', 'italics'], ['Genus', 'species', 'italics', 'Latin'], 12),
              createTrueFalse('bio-l5-2-a4', 'True or False', 'Taxonomic categories are distinct biological entities, not arbitrary man-made groups', false, 'Taxonomic categories are tools for classification created by humans', 8),
            ]
          },
          {
            id: 'bio-11-1-m5-l3',
            name: '5.3 Taxonomic Aids Review',
            order: 3,
            totalTokens: 40,
            activities: [
              createQuiz('bio-l5-3-a1', 'Which is NOT a taxonomic aid?', ['Herbarium', 'Botanical garden', 'Museum', 'Shopping mall'], 3, 'Taxonomic aids help in identification, classification and preservation', 10),
              createMatch('bio-l5-3-a2', 'Match aid with purpose', [
                {term: 'Herbarium', definition: 'Preserved plant specimens'},
                {term: 'Botanical garden', definition: 'Living plant collection'},
                {term: 'Zoological park', definition: 'Living animals in captivity'},
                {term: 'Museum', definition: 'Preserved animal specimens'},
              ], 15),
              createFillBlank('bio-l5-3-a3', 'Key terminology', 'A _____ is a taxonomic aid used for identifying organisms based on contrasting characters.', ['key'], ['key', 'flora', 'manual', 'catalogue'], 10),
              createTrueFalse('bio-l5-3-a4', 'True or False', 'Monographs contain information about only one taxonomic group in detail', true, 'Monographs are detailed studies of a single taxon', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-11-2',
    name: 'Biological Classification',
    description: 'Five kingdom system, Monera, Protista, Fungi, Viruses, Lichens',
    moduleCount: 5,
    modules: [
      {
        id: 'bio-11-2-m1',
        name: 'Five Kingdoms',
        description: 'Whittaker\'s classification',
        totalTokens: 65,
        levels: [
          {
            id: 'bio-11-2-m1-l1',
            name: 'Kingdoms Overview',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('bio-11-2-m1-l1-a1', 'Which kingdom includes bacteria?', ['Monera', 'Protista', 'Fungi', 'Plantae'], 0, 'Monera includes all prokaryotes like bacteria', 10),
              createTrueFalse('bio-11-2-m1-l1-a2', 'True or False', 'Fungi are autotrophs', false, 'Fungi are heterotrophs (decomposers/saprophytes)', 8),
              createMatch('bio-11-2-m1-l1-a3', 'Match kingdoms with characteristics', [
                {term: 'Monera', definition: 'Prokaryotic, unicellular'},
                {term: 'Protista', definition: 'Eukaryotic, mostly unicellular'},
                {term: 'Fungi', definition: 'Eukaryotic, heterotrophic'},
                {term: 'Plantae', definition: 'Eukaryotic, autotrophic'},
                {term: 'Animalia', definition: 'Eukaryotic, heterotrophic, motile'},
              ], 20),
            ]
          }
        ]
      },
      // ============ MODULE 2: Kingdom Monera ============
      {
        id: 'bio-11-2-m2',
        name: 'Kingdom Monera 🔥',
        description: 'Bacteria, archaea, cyanobacteria - prokaryotic kingdom',
        totalTokens: 80,
        levels: [
          {
            id: 'bio-11-2-m2-l1',
            name: '2.1 Bacteria Structure',
            order: 1,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-2-m2-l1-a1', 'Bacterial cell wall contains:', ['Cellulose', 'Peptidoglycan/murein', 'Chitin', 'Lignin'], 1, 'Peptidoglycan (murein) is the unique bacterial cell wall component', 10),
              createMatch('bio-11-2-m2-l1-a2', 'Match bacterial structure with function', [
                {term: 'Pilli', definition: 'Attachment to surfaces'},
                {term: 'Flagella', definition: 'Locomotion'},
                {term: 'Mesosomes', definition: 'Cell wall formation, respiration'},
                {term: 'Plasmids', definition: 'Extra-chromosomal DNA'},
              ], 15),
              createTrueFalse('bio-11-2-m2-l1-a3', 'True or False', 'Bacteria have membrane-bound organelles', false, 'Prokaryotes lack membrane-bound nucleus and organelles', 8),
            ]
          },
          {
            id: 'bio-11-2-m2-l2',
            name: '2.2 Bacterial Shapes 🔥',
            order: 2,
            totalTokens: 20,
            activities: [
              createMatch('bio-11-2-m2-l2-a1', '🎮 Match shape with example', [
                {term: 'Coccus', definition: 'Spherical - Streptococcus'},
                {term: 'Bacillus', definition: 'Rod-shaped - E. coli'},
                {term: 'Spirillum', definition: 'Spiral - Treponema'},
                {term: 'Vibrio', definition: 'Comma-shaped - Vibrio cholerae'},
              ], 12),
              createQuiz('bio-11-2-m2-l2-a2', 'Streptococcus is named for its:', ['Spiral shape', 'Chain arrangement', 'Single cells', 'Spores'], 1, 'Strepto- means chain; cocci in chains = Streptococcus', 8),
            ]
          },
          {
            id: 'bio-11-2-m2-l3',
            name: '2.3 Cyanobacteria (Blue-green Algae)',
            order: 3,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-2-m2-l3-a1', 'Cyanobacteria are:', ['Eukaryotic algae', 'Photosynthetic bacteria', 'Fungi', 'Protists'], 1, 'Cyanobacteria are photosynthetic prokaryotes (oxygenic)', 8),
              createFillBlank('bio-11-2-m2-l3-a2', 'Cyanobacterial pigments', 'Cyanobacteria contain chlorophyll _____, phycobilins, and carotenoids.', ['a'], ['a', 'b', 'c', 'd'], 8),
              createMatch('bio-11-2-m2-l3-a3', 'Match cyanobacteria with feature', [
                {term: 'Nostoc', definition: 'Nitrogen-fixing, colonial'},
                {term: 'Oscillatoria', definition: 'Filamentous, oscillating movement'},
                {term: 'Anabaena', definition: 'Heterocysts for nitrogen fixation'},
              ], 12),
            ]
          },
          {
            id: 'bio-11-2-m2-l4',
            name: '2.4 Archaebacteria vs Eubacteria',
            order: 4,
            totalTokens: 15,
            activities: [
              createQuiz('bio-11-2-m2-l4-a1', 'Archaebacteria live in:', ['Normal conditions', 'Extreme/harsh environments', 'Only in water', 'Only in soil'], 1, 'Archaea are extremophiles - halophiles, thermophiles, methanogens', 8),
              createMatch('bio-11-2-m2-l4-a2', 'Match archaebacteria type with habitat', [
                {term: 'Halophiles', definition: 'Salt-loving (Dead Sea)'},
                {term: 'Thermophiles', definition: 'Heat-loving (hot springs)'},
                {term: 'Methanogens', definition: 'Produce methane (swamps, gut)'},
              ], 10),
            ]
          }
        ]
      },
      // ============ MODULE 3: Kingdom Protista ============
      {
        id: 'bio-11-2-m3',
        name: 'Kingdom Protista 🔥',
        description: 'Diverse group of unicellular eukaryotes - algae, protozoa, slime moulds',
        totalTokens: 90,
        levels: [
          {
            id: 'bio-11-2-m3-l1',
            name: '3.1 Chrysophytes & Dinoflagellates',
            order: 1,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-2-m3-l1-a1', 'Diatoms have cell walls made of:', ['Cellulose', 'Silica', 'Calcium carbonate', 'Chitin'], 1, 'Diatoms have silica cell walls (frustules) with intricate patterns', 10),
              createMatch('bio-11-2-m3-l1-a2', 'Match chrysophyte with characteristic', [
                {term: 'Diatoms', definition: 'Silica cell walls, marine/freshwater'},
                {term: 'Golden algae', definition: 'Fucoxanthin pigment, flagellated'},
                {term: 'Dinoflagellates', definition: 'Red tide, two flagella'},
              ], 15),
              createTrueFalse('bio-11-2-m3-l1-a3', 'True or False', 'Dinoflagellates cause red tides that are toxic', true, 'Red tides (algal blooms) can produce toxins harmful to marine life', 8),
            ]
          },
          {
            id: 'bio-11-2-m3-l2',
            name: '3.2 Euglenoids',
            order: 2,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-2-m3-l2-a1', 'Euglena has which unique feature?', ['Only plant characteristics', 'Only animal characteristics', 'Both plant and animal features', 'No pigments'], 2, 'Euglena is mixotrophic - photosynthetic like plants but can ingest food like animals', 10),
              createFillBlank('bio-11-2-m3-l2-a2', 'Euglena storage', 'Euglena stores carbohydrates as _____ (paramylon bodies).', ['paramylum'], ['paramylum', 'starch', 'glycogen', 'cellulose'], 8),
              createTrueFalse('bio-11-2-m3-l2-a3', 'True or False', 'Euglena lacks a cell wall', true, 'Euglena has protein-rich pellicle instead of cell wall', 8),
            ]
          },
          {
            id: 'bio-11-2-m3-l3',
            name: '3.3 Slime Moulds 🔥',
            order: 3,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-2-m3-l3-a1', 'Slime moulds exhibit:', ['Only plant features', 'Only animal features', 'Both plant and animal features', 'No movement'], 2, 'Slime moulds are saprophytic protists that crawl like amoeba (animal) and form spores (plant)', 10),
              createMatch('bio-11-2-m3-l3-a2', 'Match slime mould with characteristic', [
                {term: 'Plasmodium', definition: 'Vegetative phase, slimy mass'},
                {term: 'Fruiting bodies', definition: 'Reproductive structures with spores'},
                {term: 'Physarum', definition: 'Common slime mould genus'},
              ], 12),
              createTrueFalse('bio-11-2-m3-l3-a3', 'True or False', 'Slime moulds were once classified as fungi', true, 'Slime moulds were previously placed in Kingdom Fungi due to spore formation', 8),
            ]
          },
          {
            id: 'bio-11-2-m3-l4',
            name: '3.4 Protozoans',
            order: 4,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-2-m3-l4-a1', 'Amoeba moves using:', ['Cilia', 'Flagella', 'Pseudopodia', 'No locomotion'], 2, 'Amoeba forms temporary projections called pseudopodia (false feet) for movement', 10),
              createMatch('bio-11-2-m3-l4-a2', 'Match protozoan with locomotion', [
                {term: 'Amoeba', definition: 'Pseudopodia'},
                {term: 'Paramecium', definition: 'Cilia'},
                {term: 'Trypanosoma', definition: 'Flagella'},
                {term: 'Plasmodium', definition: 'No locomotion in blood'},
              ], 15),
              createFillBlank('bio-11-2-m3-l4-a3', 'Disease vectors', 'Plasmodium causes _____ (transmitted by female Anopheles mosquito).', ['malaria'], ['malaria', 'typhoid', 'cholera', 'tuberculosis'], 10),
            ]
          }
        ]
      },
      // ============ MODULE 4: Kingdom Fungi ============
      {
        id: 'bio-11-2-m4',
        name: 'Kingdom Fungi 🔥🔥',
        description: 'Heterotrophic eukaryotes - mushrooms, molds, yeasts',
        totalTokens: 100,
        levels: [
          {
            id: 'bio-11-2-m4-l1',
            name: '4.1 Fungi Characteristics',
            order: 1,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-2-m4-l1-a1', 'Fungi cell walls contain:', ['Cellulose', 'Peptidoglycan', 'Chitin', 'Lignin'], 2, 'Fungal cell walls are made of chitin (also found in insect exoskeletons)', 10),
              createTrueFalse('bio-11-2-m4-l1-a2', 'True or False', 'Fungi are autotrophic organisms', false, 'Fungi are heterotrophic (saprophytes, parasites, symbionts)', 8),
              createMatch('bio-11-2-m4-l1-a3', 'Match fungal structure with function', [
                {term: 'Hyphae', definition: 'Thread-like filaments'},
                {term: 'Mycelium', definition: 'Network of hyphae'},
                {term: 'Spores', definition: 'Asexual reproduction units'},
              ], 10),
            ]
          },
          {
            id: 'bio-11-2-m4-l2',
            name: '4.2 Phycomycetes (Lower Fungi)',
            order: 2,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-2-m4-l2-a1', 'Albugo causes:', ['Rust disease', 'White rust of crucifers', 'Late blight of potato', 'Wheat smut'], 1, 'Albugo candida causes white rust disease in mustard and cabbage family', 10),
              createMatch('bio-11-2-m4-l2-a2', 'Match phycomycete with feature', [
                {term: 'Rhizopus', definition: 'Bread mould, zygospores'},
                {term: 'Mucor', definition: 'Spores in sporangia'},
                {term: 'Albugo', definition: 'Parasitic, white rust'},
              ], 12),
              createTrueFalse('bio-11-2-m4-l2-a3', 'True or False', 'Phycomycetes have coenocytic hyphae (multinucleate, no septa)', true, 'Lower fungi lack cross-walls (septa) in hyphae', 8),
            ]
          },
          {
            id: 'bio-11-2-m4-l3',
            name: '4.3 Ascomycetes (Sac Fungi)',
            order: 3,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-2-m4-l3-a1', 'Ascomycetes produce spores in:', ['Basidia', 'Asci (sac-like)', 'Zygosporangia', 'Conidiophores only'], 1, 'Asci are sac-like structures containing ascospores (usually 8)', 10),
              createMatch('bio-11-2-m4-l3-a2', 'Match ascomycete with importance', [
                {term: 'Saccharomyces', definition: 'Baker\'s/Brewer\'s yeast'},
                {term: 'Penicillium', definition: 'Antibiotic production'},
                {term: 'Aspergillus', definition: 'Source of citric acid'},
                {term: 'Neurospora', definition: 'Genetic research'},
                {term: 'Morels', definition: 'Edible mushrooms'},
              ], 15),
              createFillBlank('bio-11-2-m4-l3-a3', 'Fruiting bodies', 'Ascomycete fruiting bodies called _____ (cup/saddle shapes).', ['ascocarps'], ['ascocarps', 'basidiocarps', 'zygosporangia', 'conidia'], 10),
            ]
          },
          {
            id: 'bio-11-2-m4-l4',
            name: '4.4 Basidiomycetes (Club Fungi)',
            order: 4,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-2-m4-l4-a1', 'Basidiomycetes produce spores on:', ['Asci', 'Basidia (club-shaped)', 'Conidia', 'Zygospores'], 1, 'Basidia are club-shaped structures bearing 4 basidiospores externally', 10),
              createMatch('bio-11-2-m4-l4-a2', 'Match basidiomycete with example', [
                {term: 'Agaricus', definition: 'Common mushroom'},
                {term: 'Puccinia', definition: 'Rust fungus (wheat)'},
                {term: 'Ustilago', definition: 'Smut fungus (cereals)'},
                {term: 'Bracket fungi', definition: 'Shelf-like on trees'},
              ], 15),
              createTrueFalse('bio-11-2-m4-l4-a3', 'True or False', 'Puccinia is a basidiomycete causing rust disease', true, 'Puccinia graminis tritici causes black stem rust in wheat', 8),
            ]
          },
          {
            id: 'bio-11-2-m4-l5',
            name: '4.5 Deuteromycetes (Fungi Imperfecti)',
            order: 5,
            totalTokens: 10,
            activities: [
              createQuiz('bio-11-2-m4-l5-a1', 'Deuteromycetes are called fungi imperfecti because:', ['They lack cell walls', 'Sexual stage is unknown', 'They are not eukaryotic', 'They don\'t form spores'], 1, 'Only asexual/conidial stage known; sexual stage undiscovered', 10),
              createMatch('bio-11-2-m4-l5-a2', 'Match deuteromycete with importance', [
                {term: 'Alternaria', definition: 'Leaf spot diseases'},
                {term: 'Colletotrichum', definition: 'Anthracnose disease'},
                {term: 'Trichoderma', definition: 'Biocontrol agent'},
              ], 8),
            ]
          }
        ]
      },
      // ============ MODULE 5: Viruses, Viroids, Lichens ============
      {
        id: 'bio-11-2-m5',
        name: 'Viruses, Viroids & Lichens 🔥',
        description: 'Acellular entities and symbiotic associations',
        totalTokens: 60,
        levels: [
          {
            id: 'bio-11-2-m5-l1',
            name: '5.1 Viruses 🔥',
            order: 1,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-2-m5-l1-a1', 'Viruses are considered:', ['Living organisms', 'Non-living entities', 'Borderline between living and non-living', 'Bacteria'], 2, 'Viruses are acellular; show living features only inside host cells', 10),
              createMatch('bio-11-2-m5-l1-a2', 'Match virus component with function', [
                {term: 'Protein coat (capsid)', definition: 'Protects genetic material'},
                {term: 'Genetic material', definition: 'DNA or RNA (not both)'},
                {term: 'Envelope', definition: 'Outer membrane (some viruses)'},
              ], 12),
              createTrueFalse('bio-11-2-m5-l1-a3', 'True or False', 'TMV (Tobacco Mosaic Virus) was the first virus discovered', true, 'Dmitri Ivanovsky discovered TMV in 1892; first virus crystalized', 8),
            ]
          },
          {
            id: 'bio-11-2-m5-l2',
            name: '5.2 Viroids & Prions',
            order: 2,
            totalTokens: 15,
            activities: [
              createQuiz('bio-11-2-m5-l2-a1', 'Viroids are:', ['Small viruses with protein coat', 'Infectious RNA without protein coat', 'Bacteria', 'Fungi'], 1, 'Viroids are free infectious RNA molecules (smaller than viruses)', 10),
              createFillBlank('bio-11-2-m5-l2-a2', 'Prions', 'Prions are _____ proteins that cause neurodegenerative diseases.', ['infectious', 'misfolded', 'abnormal'], ['infectious', 'normal', 'functional', 'structural'], 10),
              createMatch('bio-11-2-m5-l2-a3', 'Match disease with cause', [
                {term: 'Mad cow disease', definition: 'Prion (BSE)'},
                {term: 'Potato spindle tuber', definition: 'Viroid (PSTVd)'},
                {term: 'Citrus exocortis', definition: 'Viroid (CEVd)'},
              ], 8),
            ]
          },
          {
            id: 'bio-11-2-m5-l3',
            name: '5.3 Lichens 🔥',
            order: 3,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-2-m5-l3-a1', 'Lichens are:', ['Single organism', 'Symbiotic association', 'Parasitic relationship', 'Competitive relationship'], 1, 'Lichens = fungus (mycobiont) + algae/cyanobacteria (photobiont)', 10),
              createMatch('bio-11-2-m5-l3-a2', 'Match lichen component with contribution', [
                {term: 'Fungus (mycobiont)', definition: 'Provides shelter, absorbs water/minerals'},
                {term: 'Algae (photobiont)', definition: 'Photosynthesis, provides food'},
              ], 12),
              createFillBlank('bio-11-2-m5-l3-a3', 'Lichens as bioindicators', 'Lichens are sensitive to _____ pollution and used as bioindicators of air quality.', ['air', 'SO2', 'sulfur dioxide'], ['air', 'water', 'soil', 'noise'], 10),
              createTrueFalse('bio-11-2-m5-l3-a4', 'True or False', 'Crustose lichens grow on rocks and tree bark', true, 'Crustose = crust-like, tightly attached to substrate', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-11-3',
    name: 'Plant Kingdom',
    description: 'Algae, Bryophytes, Pteridophytes, Gymnosperms, Angiosperms',
    moduleCount: 5,
    modules: [
      // ============ MODULE 1: Algae ============
      {
        id: 'bio-11-3-m1',
        name: 'Algae 🔥',
        description: 'Chlorophyceae, Phaeophyceae, Rhodophyceae - Thallophytes',
        totalTokens: 80,
        levels: [
          {
            id: 'bio-11-3-m1-l1',
            name: '1.1 Chlorophyceae (Green Algae)',
            order: 1,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-3-m1-l1-a1', 'Green algae contain which pigments?', ['Chlorophyll a & b', 'Fucoxanthin', 'Phycoerythrin', 'Carotenoids only'], 0, 'Chlorophyceae contain chlorophyll a and b stored in chloroplasts', 10),
              createMatch('bio-11-3-m1-l1-a2', 'Match green algae with features', [
                {term: 'Chlamydomonas', definition: 'Unicellular, flagellated'},
                {term: 'Volvox', definition: 'Colonial, hollow ball'},
                {term: 'Ulothrix', definition: 'Filamentous, unbranched'},
                {term: 'Spirogyra', definition: 'Filamentous, spiral chloroplast'},
              ], 15),
              createFillBlank('bio-11-3-m1-l1-a3', 'Storage products', 'Green algae store carbohydrates as _____ and _____ in pyrenoids.', ['starch', 'proteins'], ['starch', 'glycogen', 'proteins', 'oils'], 8),
              createTrueFalse('bio-11-3-m1-l1-a4', 'True or False', 'Green algae are found in freshwater, brackish water and marine environments', true, 'Chlorophyceae are cosmopolitan - found in diverse habitats', 8),
            ]
          },
          {
            id: 'bio-11-3-m1-l2',
            name: '1.2 Phaeophyceae (Brown Algae)',
            order: 2,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-3-m1-l2-a1', 'Brown algae get their color from:', ['Chlorophyll b', 'Fucoxanthin', 'Phycoerythrin', 'Anthocyanin'], 1, 'Fucoxanthin is a brown pigment that masks chlorophyll a', 10),
              createMatch('bio-11-3-m1-l2-a2', 'Match brown algae with features', [
                {term: 'Ectocarpus', definition: 'Filamentous branched'},
                {term: 'Dictyota', definition: 'Dichotomously branched'},
                {term: 'Laminaria', definition: 'Kelps, large size'},
                {term: 'Sargassum', definition: 'Floating brown algae'},
                {term: 'Fucus', definition: 'Rockweeds, air bladders'},
              ], 15),
              createFillBlank('bio-11-3-m1-l2-a3', 'Storage products', 'Brown algae store carbohydrates as _____ (laminarin) and _____ (mannitol).', ['laminarin', 'mannitol'], ['starch', 'glycogen', 'laminarin', 'mannitol'], 8),
              createTrueFalse('bio-11-3-m1-l2-a4', 'True or False', 'Brown algae are mostly marine and found in colder regions', true, 'Phaeophyceae are almost exclusively marine', 8),
            ]
          },
          {
            id: 'bio-11-3-m1-l3',
            name: '1.3 Rhodophyceae (Red Algae)',
            order: 3,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-3-m1-l3-a1', 'Red algae appear red due to:', ['Phycoerythrin', 'Phycocyanin', 'Chlorophyll b', 'Carotene'], 0, 'Phycoerythrin is a red pigment that masks chlorophyll a', 10),
              createMatch('bio-11-3-m1-l3-a2', 'Match red algae with importance', [
                {term: 'Porphyra', definition: 'Edible (nori), used in sushi'},
                {term: 'Gracilaria', definition: 'Source of agar'},
                {term: 'Gelidium', definition: 'Best source of agar'},
                {term: 'Chondrus', definition: 'Irish moss, carrageenan'},
              ], 15),
              createFillBlank('bio-11-3-m1-l3-a3', 'Commercial products', 'Agar is obtained from _____ and used as a _____ medium in labs.', ['Gelidium', 'culture'], ['Gelidium', 'Gracilaria', 'culture', 'food'], 8),
              createTrueFalse('bio-11-3-m1-l3-a4', 'True or False', 'Red algae can grow at great depths in ocean because phycoerythrin can absorb blue light', true, 'Phycoerythrin absorbs blue light that penetrates deep water', 8),
              createQuiz('bio-11-3-m1-l3-a5', 'Red algae lack:', ['Chlorophyll a', 'Flagella', 'Phycobilins', 'Thallus'], 1, 'Rhodophyceae lack flagella in all stages of life', 8),
            ]
          }
        ]
      },
      // ============ MODULE 2: Bryophytes ============
      {
        id: 'bio-11-3-m2',
        name: 'Bryophytes 🔥',
        description: 'Amphibians of plant kingdom - Liverworts, Hornworts, Mosses',
        totalTokens: 70,
        levels: [
          {
            id: 'bio-11-3-m2-l1',
            name: '2.1 Bryophytes Overview',
            order: 1,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-3-m2-l1-a1', 'Bryophytes are called amphibians of plant kingdom because:', ['They live in water', 'They need water for fertilization', 'They can swim', 'They have lungs'], 1, 'Sperm needs water to swim to archegonium for fertilization', 10),
              createMatch('bio-11-3-m2-l1-a2', 'Match bryophyte group with example', [
                {term: 'Liverworts', definition: 'Marchantia, Riccia'},
                {term: 'Hornworts', definition: 'Anthoceros'},
                {term: 'Mosses', definition: 'Funaria, Sphagnum'},
              ], 12),
              createTrueFalse('bio-11-3-m2-l1-a3', 'True or False', 'Bryophytes have vascular tissues (xylem and phloem)', false, 'Bryophytes are non-vascular plants (avascular)', 8),
            ]
          },
          {
            id: 'bio-11-3-m2-l2',
            name: '2.2 Liverworts',
            order: 2,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-3-m2-l2-a1', 'Marchantia reproduces asexually by:', ['Fragmentation', 'Gemmae cups', 'Spores only', 'Binary fission'], 1, 'Gemmae cups contain gemmae that disperse and grow into new plants', 10),
              createMatch('bio-11-3-m2-l2-a2', 'Match structure with function in Marchantia', [
                {term: 'Thallus', definition: 'Flattened, dichotomously branched body'},
                {term: 'Rhizoids', definition: 'Anchor and absorb water'},
                {term: 'Gemma cups', definition: 'Asexual reproduction'},
                {term: 'Archegoniophore', definition: 'Female reproductive structure'},
              ], 15),
              createFillBlank('bio-11-3-m2-l2-a3', 'Male structure', 'Marchantia has _____ bearing antheridia for producing male gametes.', ['antheridiophore'], ['antheridiophore', 'archegoniophore', 'gemma cup', 'thallus'], 10),
            ]
          },
          {
            id: 'bio-11-3-m2-l3',
            name: '2.3 Mosses (Funaria) 🔥',
            order: 3,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-3-m2-l3-a1', 'In mosses, the main plant body (gametophyte) is:', ['Sporophyte', 'Gametophyte - green and independent', 'Rhizome', 'Protonema'], 1, 'Moss gametophyte is dominant, green, leafy and photosynthetic', 10),
              createMatch('bio-11-3-m2-l3-a2', 'Match moss structure with description', [
                {term: 'Protonema', definition: 'First stage, creeping, green filaments'},
                {term: 'Leafy stage', definition: 'Second stage with rhizoids'},
                {term: 'Sporophyte', definition: 'Foot, seta, capsule - depends on gametophyte'},
                {term: 'Operculum', definition: 'Lid of capsule'},
                {term: 'Peristome', definition: 'Teeth-like structures for spore dispersal'},
              ], 15),
              createTrueFalse('bio-11-3-m2-l3-a3', 'True or False', 'Sphagnum (peat moss) is used as packing material and fuel', true, 'Peat is partially carbonized Sphagnum used as fuel', 8),
            ]
          }
        ]
      },
      // ============ MODULE 3: Pteridophytes ============
      {
        id: 'bio-11-3-m3',
        name: 'Pteridophytes 🔥🔥',
        description: 'First vascular plants - Ferns, Horsetails, Club mosses',
        totalTokens: 75,
        levels: [
          {
            id: 'bio-11-3-m3-l1',
            name: '3.1 Pteridophytes Overview',
            order: 1,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-3-m3-l1-a1', 'Pteridophytes are called vascular cryptogams because:', ['They have seeds but no vascular tissue', 'They have vascular tissue but no seeds', 'They have flowers', 'They are aquatic'], 1, 'Pteridophytes have xylem and phloem but reproduce by spores, not seeds', 10),
              createMatch('bio-11-3-m3-l1-a2', 'Match pteridophyte group with example', [
                {term: 'Psilopsida', definition: 'Psilotum (whisk ferns)'},
                {term: 'Lycopsida', definition: 'Selaginella, Lycopodium (club mosses)'},
                {term: 'Sphenopsida', definition: 'Equisetum (horsetails)'},
                {term: 'Pteropsida', definition: 'Dryopteris, Pteris (true ferns)'},
              ], 15),
              createTrueFalse('bio-11-3-m3-l1-a3', 'True or False', 'Pteridophytes show heteromorphic alternation of generations', true, 'Sporophyte is dominant, independent; gametophyte is small (prothallus)', 8),
            ]
          },
          {
            id: 'bio-11-3-m3-l2',
            name: '3.2 Selaginella (Spike Moss) 🔥',
            order: 2,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-3-m3-l2-a1', 'Selaginella shows:', ['Homospory', 'Heterospory', 'No spores', 'Seeds'], 1, 'Selaginella produces two types of spores - microspores and megaspores', 10),
              createMatch('bio-11-3-m3-l2-a2', 'Match heterospory terms', [
                {term: 'Megaspore', definition: 'Female gametophyte inside'},
                {term: 'Microspore', definition: 'Male gametophyte inside'},
                {term: 'Strobilus', definition: 'Cone-like structure bearing sporangia'},
                {term: 'Ligule', definition: 'Small tongue-like outgrowth near sporangium'},
              ], 15),
              createFillBlank('bio-11-3-m3-l2-a3', 'Evolutionary significance', 'Heterospory is the precursor to the evolution of _____ in plants.', ['seeds'], ['seeds', 'flowers', 'fruits', 'roots'], 10),
            ]
          },
          {
            id: 'bio-11-3-m3-l3',
            name: '3.3 Ferns (Dryopteris)',
            order: 3,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-3-m3-l3-a1', 'The young fern leaf is called:', ['Prothallus', 'Fiddlehead/circinate vernation', 'Sporophyll', 'Ramenta'], 1, 'Young fern leaves show circinate vernation - coiled like a fiddlehead', 10),
              createMatch('bio-11-3-m3-l3-a2', 'Match fern structure with description', [
                {term: 'Rhizome', definition: 'Underground stem, horizontal'},
                {term: 'Fronds', definition: 'Large divided leaves'},
                {term: 'Sori', definition: 'Clusters of sporangia on frond undersides'},
                {term: 'Indusium', definition: 'Protective covering over sorus'},
                {term: 'Prothallus', definition: 'Gametophyte, heart-shaped'},
              ], 15),
              createFillBlank('bio-11-3-m3-l3-a3', 'Sporangium structure', 'Fern sporangia have _____ cells which help in spore dispersal.', ['annulus', 'jacket'], ['annulus', 'jacket', 'spores', 'tapetum'], 10),
              createTrueFalse('bio-11-3-m3-l3-a4', 'True or False', 'Fern gametophyte (prothallus) is independent, photosynthetic and bears sex organs', true, 'Prothallus is green, free-living, has rhizoids and antheridia/archegonia', 8),
            ]
          }
        ]
      },
      // ============ MODULE 4: Gymnosperms ============
      {
        id: 'bio-11-3-m4',
        name: 'Gymnosperms 🔥',
        description: 'Naked seeded plants - Conifers, Cycads, Ginkgo',
        totalTokens: 65,
        levels: [
          {
            id: 'bio-11-3-m4-l1',
            name: '4.1 Gymnosperms Overview',
            order: 1,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-3-m4-l1-a1', 'Gymnosperms are called naked seeded because:', ['Seeds are exposed on sporophylls', 'They have no seeds', 'Seeds are covered by fruit', 'They have spores only'], 0, 'Seeds are not enclosed in an ovary/fruit; they lie naked on sporophylls', 10),
              createMatch('bio-11-3-m4-l1-a2', 'Match gymnosperm group with example', [
                {term: 'Cycadopsida', definition: 'Cycas (sago palm)'},
                {term: 'Coniferopsida', definition: 'Pinus, Cedrus (conifers)'},
                {term: 'Ginkgopsida', definition: 'Ginkgo biloba (living fossil)'},
                {term: 'Gnetopsida', definition: 'Ephedra, Gnetum'},
              ], 15),
              createTrueFalse('bio-11-3-m4-l1-a3', 'True or False', 'Gymnosperms are perennial, evergreen and woody', true, 'Most gymnosperms are evergreen trees/shrubs with needle-like leaves', 8),
            ]
          },
          {
            id: 'bio-11-3-m4-l2',
            name: '4.2 Pinus (Pine) 🔥',
            order: 2,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-3-m4-l2-a1', 'Pinus leaves are:', ['Broad and flat', 'Needle-like/acicular', 'Compound', 'Reduced scales'], 1, 'Pine needles are modified leaves to reduce water loss', 10),
              createMatch('bio-11-3-m4-l2-a2', 'Match Pinus cone with description', [
                {term: 'Male cone', definition: 'Small, short-lived, clustered'},
                {term: 'Female cone', definition: 'Large, woody, persistent'},
                {term: 'Scales', definition: 'Ovuliferous scales bear ovules'},
                {term: 'Winged seeds', definition: 'For wind dispersal'},
              ], 15),
              createFillBlank('bio-11-3-m4-l2-a3', 'Leaf modification', 'Pine needles have _____ to reduce water loss and _____ for gas exchange.', ['thick cuticle', 'sunken stomata'], ['thick cuticle', 'sunken stomata', 'stomata', 'vascular bundles'], 10),
            ]
          },
          {
            id: 'bio-11-3-m4-l3',
            name: '4.3 Cycas (Sago Palm)',
            order: 3,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-3-m4-l3-a1', 'Cycas is considered a living fossil because:', ['It is extinct', 'It has remained unchanged for millions of years', 'It grows fast', 'It has flowers'], 1, 'Cycas has retained primitive features and existed since Mesozoic era', 10),
              createMatch('bio-11-3-m4-l3-a2', 'Match Cycas features', [
                {term: 'Coralloid roots', definition: 'Roots with N2-fixing cyanobacteria'},
                {term: 'Megasporophyll', definition: 'Leaf-like, not organized as cone'},
                {term: 'Pinnate leaves', definition: 'Feather-like, compound'},
                {term: 'Microsporangiate', definition: 'Male cone, compact'},
              ], 12),
            ]
          }
        ]
      },
      // ============ MODULE 5: Angiosperms ============
      {
        id: 'bio-11-3-m5',
        name: 'Angiosperms 🔥🔥',
        description: 'Flowering plants - Monocots vs Dicots',
        totalTokens: 70,
        levels: [
          {
            id: 'bio-11-3-m5-l1',
            name: '5.1 Angiosperms Overview',
            order: 1,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-3-m5-l1-a1', 'Angiosperms are called flowering plants because:', ['They produce flowers and fruits', 'They have no flowers', 'They are seedless', 'They are aquatic'], 0, 'Seeds are enclosed within fruits which develop from ovary', 10),
              createMatch('bio-11-3-m5-l1-a2', 'Match angiosperm feature with description', [
                {term: 'Double fertilization', definition: 'One sperm + egg = zygote; one sperm + polar nuclei = endosperm'},
                {term: 'Endosperm', definition: 'Triploid (3n) nutritive tissue'},
                {term: 'Ovary', definition: 'Develops into fruit after fertilization'},
                {term: 'Ovule', definition: 'Develops into seed after fertilization'},
              ], 15),
              createTrueFalse('bio-11-3-m5-l1-a3', 'True or False', 'Double fertilization is unique to angiosperms', true, 'This process produces both zygote and endosperm simultaneously', 8),
            ]
          },
          {
            id: 'bio-11-3-m5-l2',
            name: '5.2 Monocots vs Dicots 🔥',
            order: 2,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-3-m5-l2-a1', 'Monocot embryos have how many cotyledons?', ['One', 'Two', 'Three', 'None'], 0, 'Monocots = one cotyledon; Dicots = two cotyledons', 10),
              createMatch('bio-11-3-m5-l2-a2', '🎮 Match feature with plant type', [
                {term: 'Parallel venation', definition: 'Monocots (grass, banana)'},
                {term: 'Reticulate venation', definition: 'Dicots (rose, mango)'},
                {term: 'Fibrous roots', definition: 'Monocots (wheat, rice)'},
                {term: 'Tap root system', definition: 'Dicots (carrot, radish)'},
                {term: 'Vascular bundles scattered', definition: 'Monocot stem'},
                {term: 'Vascular bundles in ring', definition: 'Dicot stem'},
              ], 15),
              createFillBlank('bio-11-3-m5-l2-a3', 'Floral parts', 'Monocot flowers typically have parts in _____ or multiples of _____.', ['three', 'three'], ['two', 'three', 'four', 'five'], 8),
            ]
          },
          {
            id: 'bio-11-3-m5-l3',
            name: '5.3 Plant Life Cycles',
            order: 3,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-3-m5-l3-a1', 'In angiosperms, the dominant phase is:', ['Gametophyte', 'Sporophyte', 'Both equal', 'Protonema'], 1, 'Sporophyte is the main plant body - trees, herbs, shrubs', 10),
              createMatch('bio-11-3-m5-l3-a2', 'Match plant group with dominant phase', [
                {term: 'Bryophytes', definition: 'Gametophyte dominant'},
                {term: 'Pteridophytes', definition: 'Sporophyte dominant'},
                {term: 'Gymnosperms', definition: 'Sporophyte dominant'},
                {term: 'Angiosperms', definition: 'Sporophyte dominant'},
              ], 12),
              createTrueFalse('bio-11-3-m5-l3-a3', 'True or False', 'In bryophytes, the sporophyte is dependent on gametophyte', true, 'Sporophyte is attached to and dependent on gametophyte for nutrition', 8),
              createFillBlank('bio-11-3-m5-l3-a4', 'Evolutionary trend', 'Evolution in plant kingdom shows progressive reduction of _____ and dominance of _____ phase.', ['gametophyte', 'sporophyte'], ['gametophyte', 'sporophyte', 'spores', 'zygote'], 10),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-11-4',
    name: '🧬 Digestion & Absorption',
    description: 'Complete digestive system, enzymes, absorption mechanisms — NEET HIGH PRIORITY',
    moduleCount: 10,
    modules: [
      // ============ MODULE 1: Basics of Digestion ============
      {
        id: 'bio-11-4-m1',
        name: 'Module 1: Basics of Digestion',
        description: 'Definition, mechanical vs chemical, intra vs extracellular',
        totalTokens: 135,
        levels: [
          {
            id: 'bio-11-4-m1-l1',
            name: '1.1 Definition & Need',
            order: 1,
            totalTokens: 20,
            activities: [
              createQuiz('bio-m1-l1-a1', 'What is the primary purpose of digestion?', ['To absorb water', 'To convert complex food into absorbable nutrients', 'To produce enzymes', 'To eliminate waste'], 1, 'Digestion breaks down complex food molecules into simple absorbable nutrients', 10),
              createTrueFalse('bio-m1-l1-a2', 'True or False', 'Digestion is necessary because large food molecules cannot cross cell membranes', true, 'Cell membranes allow only small molecules to pass through', 10),
            ]
          },
          {
            id: 'bio-11-4-m1-l2',
            name: '1.2 Mechanical vs Chemical',
            order: 2,
            totalTokens: 25,
            activities: [
              createMatch('bio-m1-l2-a1', '🎮 Drag examples to correct category', [
                {term: 'Chewing food', definition: 'Mechanical digestion'},
                {term: 'Amylase breaking starch', definition: 'Chemical digestion'},
                {term: 'Churning in stomach', definition: 'Mechanical digestion'},
                {term: 'Pepsin digesting protein', definition: 'Chemical digestion'},
                {term: 'Teeth grinding', definition: 'Mechanical digestion'},
                {term: 'Lipase acting on fats', definition: 'Chemical digestion'},
              ], 15),
              createQuiz('bio-m1-l2-a2', 'Mastication is an example of:', ['Chemical digestion', 'Mechanical digestion', 'Absorption', 'Secretion'], 1, 'Chewing (mastication) physically breaks food — mechanical digestion', 10),
            ]
          },
          {
            id: 'bio-11-4-m1-l3',
            name: '1.3 Intra vs Extracellular',
            order: 3,
            totalTokens: 25,
            activities: [
              createMatch('bio-m1-l3-a1', '🎮 Match organism → digestion type', [
                {term: 'Amoeba', definition: 'Intracellular digestion'},
                {term: 'Paramecium', definition: 'Intracellular digestion'},
                {term: 'Hydra', definition: 'Extracellular digestion'},
                {term: 'Humans', definition: 'Extracellular digestion'},
                {term: 'Sponges', definition: 'Intracellular digestion'},
                {term: 'Earthworms', definition: 'Extracellular digestion'},
              ], 15),
              createQuiz('bio-m1-l3-a2', 'Which organism shows intracellular digestion?', ['Human', 'Amoeba', 'Cow', 'Dog'], 1, 'Amoeba digests food inside food vacuoles — intracellular', 10),
            ]
          },
          {
            id: 'bio-11-4-m1-l4',
            name: '1.4 Digestive System Overview',
            order: 4,
            totalTokens: 30,
            activities: [
              createQuiz('bio-m1-l4-a1', 'What is the approximate total length of the alimentary canal?', ['3 meters', '6 meters', '9 meters', '12 meters'], 2, 'The alimentary canal is approximately 9 meters long in adults', 8),
              createFlashcard('bio-m1-l4-a2', 'Key Term', 'Alimentary Canal', 'The entire passage through which food passes, from mouth to anus', 5),
              createTrueFalse('bio-m1-l4-a3', 'True or False', 'The digestive system includes only the alimentary canal', false, 'It includes both alimentary canal AND accessory organs', 8),
              createFillBlank('bio-m1-l4-a4', 'Quick Review', 'The digestive system is divided into _____ canal and _____ organs.', ['alimentary', 'accessory'], ['alimentary', 'accessory', 'primary', 'secondary'], 8),
            ]
          },
          {
            id: 'bio-11-4-m1-l5',
            name: '1.5 Quiz Challenge',
            order: 5,
            totalTokens: 35,
            activities: [
              createQuiz('bio-m1-l5-a1', 'Where does protein digestion begin?', ['Mouth', 'Stomach', 'Small intestine', 'Large intestine'], 1, 'Protein digestion begins in the stomach with pepsin', 8),
              createQuiz('bio-m1-l5-a2', 'Which enzyme digests carbohydrates in the mouth?', ['Pepsin', 'Trypsin', 'Amylase', 'Lipase'], 2, 'Salivary amylase (ptyalin) starts carbohydrate digestion', 8),
              createTrueFalse('bio-m1-l5-a3', 'True or False', 'Villi are present in the large intestine', false, 'Villi are only in the small intestine for absorption', 8),
              createMatch('bio-m1-l5-a4', 'Match the organ with its function', [
                {term: 'Esophagus', definition: 'Transports food via peristalsis'},
                {term: 'Stomach', definition: 'Stores and churns food'},
                {term: 'Small intestine', definition: 'Major site of digestion and absorption'},
                {term: 'Large intestine', definition: 'Water absorption and feces formation'},
              ], 10),
            ]
          }
        ]
      },
      // ============ MODULE 2: Digestive System Overview ============
      {
        id: 'bio-11-4-m2',
        name: 'Module 2: Digestive System Overview',
        description: 'Alimentary canal, accessory organs, tissue layers',
        totalTokens: 135,
        levels: [
          {
            id: 'bio-11-4-m2-l1',
            name: '2.1 Alimentary Canal',
            order: 1,
            totalTokens: 30,
            activities: [
              createFillBlank('bio-m2-l1-a1', '🎮 Label the digestive tract parts', 'The alimentary canal is _____ meters long in humans, starting from the _____ and ending at the _____.', ['9', 'mouth', 'anus'], ['9', 'mouth', 'anus', 'stomach', '9.5', 'esophagus'], 15),
              createMatch('bio-m2-l1-a2', '🎮 Match part → length/description', [
                {term: 'Esophagus', definition: '~25 cm long tube'},
                {term: 'Small intestine', definition: '~6 meters (longest part)'},
                {term: 'Large intestine', definition: '~1.5 meters'},
                {term: 'Stomach', definition: 'J-shaped, ~25 cm'},
              ], 15),
            ]
          },
          {
            id: 'bio-11-4-m2-l2',
            name: '2.2 Accessory Organs',
            order: 2,
            totalTokens: 25,
            activities: [
              createMatch('bio-m2-l2-a1', '🎮 Tap organ → reveal function', [
                {term: 'Liver', definition: 'Produces bile for fat emulsification'},
                {term: 'Gall bladder', definition: 'Stores and concentrates bile'},
                {term: 'Pancreas', definition: 'Secretes digestive enzymes and bicarbonate'},
                {term: 'Salivary glands', definition: 'Secrete saliva with amylase'},
              ], 15),
              createQuiz('bio-m2-l2-a2', 'Which is NOT an accessory organ?', ['Liver', 'Pancreas', 'Stomach', 'Gall bladder'], 2, 'Stomach is part of the alimentary canal, not accessory', 10),
            ]
          },
          {
            id: 'bio-11-4-m2-l3',
            name: '2.3 Tissue Layers',
            order: 3,
            totalTokens: 25,
            activities: [
              createFillBlank('bio-m2-l3-a1', '🎮 Layer stacking puzzle', 'The alimentary canal layers from inside out: _____ → _____ → _____ → _____.', ['Mucosa', 'Submucosa', 'Muscularis', 'Serosa'], ['Mucosa', 'Submucosa', 'Muscularis', 'Serosa', 'Adventitia'], 15),
              createMatch('bio-m2-l3-a2', 'Match layer with function', [
                {term: 'Mucosa', definition: 'Inner lining, secretion, absorption'},
                {term: 'Submucosa', definition: 'Connective tissue, blood vessels, nerves'},
                {term: 'Muscularis', definition: 'Smooth muscle for peristalsis'},
                {term: 'Serosa', definition: 'Outer protective covering'},
              ], 10),
            ]
          },
          {
            id: 'bio-11-4-m2-l4',
            name: '2.4 Digestive Pathway',
            order: 4,
            totalTokens: 30,
            activities: [
              createFillBlank('bio-m2-l4-a1', 'Food journey', 'Food enters through _____ → passes _____ → enters _____ → moves to _____ → exits through _____.', ['mouth', 'esophagus', 'stomach', 'small intestine', 'anus'], ['mouth', 'esophagus', 'stomach', 'small intestine', 'large intestine', 'anus', 'rectum'], 10),
              createQuiz('bio-m2-l4-a2', 'Which structure prevents food from entering the trachea?', ['Epiglottis', 'Uvula', 'Tonsils', 'Vocal cords'], 0, 'The epiglottis closes the larynx during swallowing', 8),
              createTrueFalse('bio-m2-l4-a3', 'True or False', 'The esophagus has a sphincter at both ends', true, 'Upper and lower esophageal sphincters control food passage', 8),
              createFlashcard('bio-m2-l4-a4', 'Key Term', 'Peristalsis', 'Wave-like muscular contractions that move food through the digestive tract', 5),
            ]
          },
          {
            id: 'bio-11-4-m2-l5',
            name: '2.5 Gastrointestinal Motility',
            order: 5,
            totalTokens: 25,
            activities: [
              createMatch('bio-m2-l5-a1', 'Match motility type with description', [
                {term: 'Peristalsis', definition: 'Propulsive movement pushing food forward'},
                {term: 'Segmentation', definition: 'Mixing contractions in small intestine'},
                {term: 'Mass peristalsis', definition: 'Strong contractions moving contents to colon'},
                {term: 'Haustral churning', definition: 'Mixing in large intestine haustra'},
              ], 12),
              createQuiz('bio-m2-l5-a2', 'Receptive relaxation occurs in the:', ['Esophagus', 'Stomach', 'Small intestine', 'Colon'], 1, 'Stomach relaxes to accommodate incoming food', 8),
              createTrueFalse('bio-m2-l5-a3', 'True or False', 'The stomach churns food into a semi-liquid called chyme', true, 'Chyme is the acidic mixture leaving the stomach', 5),
            ]
          }
        ]
      },
      // ============ MODULE 3: Buccal Cavity ============
      {
        id: 'bio-11-4-m3',
        name: 'Module 3: Buccal Cavity',
        description: 'Teeth, dental formula, salivary glands, tongue',
        totalTokens: 170,
        levels: [
          {
            id: 'bio-11-4-m3-l1',
            name: '3.1 Teeth & Dental Formula 🔥',
            order: 1,
            totalTokens: 30,
            activities: [
              createFillBlank('bio-m3-l1-a1', '🎮 Build dental formula (Adult human)', 'Adult dental formula: I_____C_____PM_____M_____ = _____ teeth per quadrant', ['2', '1', '2', '3', '8'], ['2', '1', '2', '3', '8', '20', '32'], 15),
              createQuiz('bio-m3-l1-a2', 'What does 2-1-2-3 represent?', ['Types of teeth', 'Dental formula', 'Age of teeth eruption', 'Number of roots'], 1, 'Dental formula: Incisors-Canines-Premolars-Molars', 10),
              createTrueFalse('bio-m3-l1-a3', 'True or False', 'Adult humans have 32 permanent teeth', true, '4 quadrants × 8 teeth = 32 permanent teeth', 5),
            ]
          },
          {
            id: 'bio-11-4-m3-l2',
            name: '3.2 Salivary Glands',
            order: 2,
            totalTokens: 30,
            activities: [
              createMatch('bio-m3-l2-a1', '🎮 Match gland → secretion & location', [
                {term: 'Parotid gland', definition: 'Largest, serous, near ear'},
                {term: 'Submaxillary/submandibular', definition: 'Mixed secretion, under jaw'},
                {term: 'Sublingual gland', definition: 'Mucous, under tongue'},
              ], 15),
              createQuiz('bio-m3-l2-a2', 'The largest salivary gland is:', ['Submandibular', 'Sublingual', 'Parotid', 'Buccal'], 2, 'Parotid gland is the largest salivary gland', 10),
              createFillBlank('bio-m3-l2-a3', 'Daily saliva production', 'Humans produce approximately _____ to _____ liters of saliva per day.', ['1', '1.5'], ['1', '1.5', '2', '0.5'], 5),
            ]
          },
          {
            id: 'bio-11-4-m3-l3',
            name: '3.3 Salivary Amylase',
            order: 3,
            totalTokens: 15,
            activities: [
              createQuiz('bio-m3-l3-a1', 'What does salivary amylase convert?', ['Glucose to starch', 'Starch to maltose', 'Protein to peptides', 'Fats to fatty acids'], 1, 'Ptyalin (salivary amylase) converts starch → maltose', 10),
              createTrueFalse('bio-m3-l3-a2', 'True or False', 'Carbohydrate digestion begins in the mouth', true, 'Salivary amylase starts starch digestion in the buccal cavity', 5),
            ]
          },
          {
            id: 'bio-11-4-m3-l4',
            name: '3.4 Tongue Functions',
            order: 4,
            totalTokens: 15,
            activities: [
              createMatch('bio-m3-l4-a1', '🎮 Drag roles → tongue zones', [
                {term: 'Sweet detection', definition: 'Tip of tongue'},
                {term: 'Sour detection', definition: 'Sides of tongue'},
                {term: 'Salty detection', definition: 'Sides and tip'},
                {term: 'Bitter detection', definition: 'Back of tongue'},
              ], 10),
              createQuiz('bio-m3-l4-a2', 'The tongue is attached to the floor by:', ['Frenulum', 'Ligament', 'Tendon', 'Muscle'], 0, 'Frenulum is the thin fold attaching tongue to floor', 5),
            ]
          },
          {
            id: 'bio-11-4-m3-l5',
            name: '3.5 Mastication & Swallowing',
            order: 5,
            totalTokens: 25,
            activities: [
              createQuiz('bio-m3-l5-a1', 'How many pairs of salivary glands are present in humans?', ['1', '2', '3', '4'], 2, 'There are 3 pairs: parotid, submandibular, and sublingual', 8),
              createTrueFalse('bio-m3-l5-a2', 'True or False', 'Deciduous teeth are also called milk teeth', true, 'Primary teeth are temporary and replaced by permanent teeth', 8),
              createFlashcard('bio-m3-l5-a3', 'Key Term', 'Deglutition', 'The process of swallowing food from mouth to stomach', 5),
              createFillBlank('bio-m3-l5-a4', 'Swallowing stages', 'Swallowing involves _____ phases: _____, _____, and _____.', ['three', 'buccal', 'pharyngeal', 'esophageal'], ['three', 'buccal', 'pharyngeal', 'esophageal', 'gastric'], 5),
            ]
          },
          {
            id: 'bio-11-4-m3-l6',
            name: '3.6 Buccal Cavity Master Quiz',
            order: 6,
            totalTokens: 30,
            activities: [
              createQuiz('bio-m3-l6-a1', 'The hardest substance in the human body is:', ['Bone', 'Enamel', 'Dentin', 'Cartilage'], 1, 'Tooth enamel is the hardest substance in the body', 8),
              createQuiz('bio-m3-l6-a2', 'Which salivary gland produces the most mucous secretion?', ['Parotid', 'Submandibular', 'Sublingual', 'Buccal'], 2, 'Sublingual gland produces mainly mucous saliva', 8),
              createMatch('bio-m3-l6-a3', 'Match teeth types with their functions', [
                {term: 'Incisors', definition: 'Cutting and biting food'},
                {term: 'Canines', definition: 'Tearing food'},
                {term: 'Premolars', definition: 'Grinding and crushing'},
                {term: 'Molars', definition: 'Chewing and grinding'},
              ], 10),
              createTrueFalse('bio-m3-l6-a4', 'True or False', 'Lysozyme in saliva has antibacterial properties', true, 'Lysozyme destroys bacterial cell walls', 5),
            ]
          },
          {
            id: 'bio-11-4-m3-l7',
            name: '3.7 Oral Health & Diseases',
            order: 7,
            totalTokens: 25,
            activities: [
              createQuiz('bio-m3-l7-a1', 'Dental caries is caused by:', ['Bacteria fermenting sugars', 'Vitamin deficiency', 'Viral infection', 'Fungal growth'], 0, 'Streptococcus mutans produces acid from sugars', 8),
              createFlashcard('bio-m3-l7-a2', 'Key Term', 'Dental Plaque', 'A sticky biofilm of bacteria that forms on teeth', 5),
              createTrueFalse('bio-m3-l7-a3', 'True or False', 'Fluoride helps prevent tooth decay', true, 'Fluoride strengthens enamel and makes it acid-resistant', 8),
              createFillBlank('bio-m3-l7-a4', 'Oral hygiene', 'Brushing teeth removes _____ and prevents _____.', ['plaque', 'caries/cavities'], ['plaque', 'caries', 'calculus', 'gingivitis'], 5),
            ]
          }
        ]
      },
      // ============ MODULE 4: Swallowing & Esophagus ============
      {
        id: 'bio-11-4-m4',
        name: 'Module 4: Swallowing & Esophagus',
        description: 'Deglutition phases, peristalsis mechanism',
        totalTokens: 105,
        levels: [
          {
            id: 'bio-11-4-m4-l1',
            name: '4.1 Deglutition Phases',
            order: 1,
            totalTokens: 30,
            activities: [
              createFillBlank('bio-m4-l1-a1', '🎮 Sequence ordering: Deglutition phases', 'The correct order: _____ phase → _____ phase → _____ phase.', ['Buccal/Oral', 'Pharyngeal', 'Esophageal'], ['Buccal/Oral', 'Pharyngeal', 'Esophageal', 'Gastric'], 15),
              createQuiz('bio-m4-l1-a2', 'Which phase is voluntary?', ['Buccal phase', 'Pharyngeal phase', 'Esophageal phase', 'All are involuntary'], 0, 'Only the buccal (oral) phase of swallowing is voluntary', 10),
              createTrueFalse('bio-m4-l1-a3', 'True or False', 'The pharyngeal phase triggers the epiglottis to close the larynx', true, 'This prevents food from entering the trachea', 5),
            ]
          },
          {
            id: 'bio-11-4-m4-l2',
            name: '4.2 Peristalsis',
            order: 2,
            totalTokens: 30,
            activities: [
              createQuiz('bio-m4-l2-a1', 'Peristalsis is:', ['Voluntary contraction', 'Wave-like involuntary muscle contraction', 'Chemical digestion', 'Segmentation'], 1, 'Peristalsis is rhythmic, wave-like smooth muscle contraction', 10),
              createTrueFalse('bio-m4-l2-a2', 'True or False', 'Peristalsis is responsible for moving food through the entire GI tract', true, 'Peristalsis propels food from esophagus to rectum', 10),
              createMatch('bio-m4-l2-a3', 'Match mechanism → description', [
                {term: 'Peristalsis', definition: 'Progressive wave pushing food forward'},
                {term: 'Segmentation', definition: 'Mixing contraction in small intestine'},
              ], 10),
            ]
          },
          {
            id: 'bio-11-4-m4-l3',
            name: '4.3 Esophagus Anatomy',
            order: 3,
            totalTokens: 25,
            activities: [
              createQuiz('bio-m4-l3-a1', 'The esophagus passes through which opening in the diaphragm?', ['Esophageal hiatus', 'Vena caval foramen', 'Aortic hiatus', 'Inguinal canal'], 0, 'The esophageal hiatus allows the esophagus to pass through the diaphragm', 8),
              createTrueFalse('bio-m4-l3-a2', 'True or False', 'The esophagus has striated muscle in its upper third', true, 'Upper esophagus has skeletal muscle for voluntary control', 8),
              createFlashcard('bio-m4-l3-a3', 'Key Term', 'LES', 'Lower Esophageal Sphincter prevents reflux of stomach contents', 5),
              createFillBlank('bio-m4-l3-a4', 'Sphincter function', 'The lower esophageal sphincter prevents _____ from entering the _____.', ['acid', 'esophagus'], ['acid', 'esophagus', 'food', 'stomach'], 5),
            ]
          },
          {
            id: 'bio-11-4-m4-l4',
            name: '4.4 Swallowing Disorders',
            order: 4,
            totalTokens: 20,
            activities: [
              createQuiz('bio-m4-l4-a1', 'Difficulty in swallowing is called:', ['Dysphagia', 'Aphagia', 'Dyspepsia', 'Aerophagia'], 0, 'Dysphagia refers to difficulty or discomfort in swallowing', 8),
              createTrueFalse('bio-m4-l4-a2', 'True or False', 'GERD is caused by weakness of the lower esophageal sphincter', true, 'LES weakness allows stomach acid to reflux into esophagus', 8),
              createMatch('bio-m4-l4-a3', 'Match condition with symptom', [
                {term: 'Achalasia', definition: 'Failure of LES to relax during swallowing'},
                {term: 'GERD', definition: 'Heartburn and acid regurgitation'},
                {term: 'Dysphagia', definition: 'Difficulty swallowing food'},
                {term: 'Esophageal stricture', definition: 'Narrowing of esophagus'},
              ], 5),
            ]
          }
        ]
      },
      // ============ MODULE 5: Stomach ============
      {
        id: 'bio-11-4-m5',
        name: 'Module 5: Stomach 🔥',
        description: 'Structure, gastric glands, HCl role, protein digestion',
        totalTokens: 180,
        levels: [
            {
            id: 'bio-11-4-m5-l1',
            name: '5.1 Stomach Structure',
            order: 1,
            totalTokens: 20,
            activities: [
              createFillBlank('bio-m5-l1-a1', '🎮 Label stomach regions', 'Stomach regions: _____ (upper), _____ (middle), _____ (lower), and pyloric _____.', ['Fundus', 'Body', 'Antrum', 'Canal'], ['Fundus', 'Body', 'Antrum', 'Canal', 'Cardiac'], 10),
              createQuiz('bio-m5-l1-a2', 'The cardiac region of stomach is near:', ['Pylorus', 'Esophagus opening', 'Duodenum', 'Spleen'], 1, 'Cardiac region surrounds the esophageal opening', 10),
            ]
          },
          {
            id: 'bio-11-4-m5-l2',
            name: '5.2 Gastric Glands 🔥',
            order: 2,
            totalTokens: 30,
            activities: [
              createMatch('bio-m5-l2-a1', '🎮 Match cell → secretion', [
                {term: 'Chief cells (Pepsinogen)', definition: 'Inactive enzyme → Pepsin'},
                {term: 'Parietal/Oxyntic cells', definition: 'HCl and Intrinsic factor'},
                {term: 'Mucous neck cells', definition: 'Mucus for protection'},
                {term: 'G-cells', definition: 'Hormone Gastrin'},
              ], 20),
              createQuiz('bio-m5-l2-a2', 'Which cells secrete HCl?', ['Chief cells', 'Parietal/Oxyntic cells', 'Mucous cells', 'Goblet cells'], 1, 'Parietal (oxyntic) cells produce HCl and intrinsic factor', 10),
            ]
          },
          {
            id: 'bio-11-4-m5-l3',
            name: '5.3 Role of HCl',
            order: 3,
            totalTokens: 15,
            activities: [
              createMatch('bio-m5-l3-a1', '🎮 Activate enzyme simulation', [
                {term: 'Pepsinogen + HCl', definition: '→ Active Pepsin'},
                {term: 'Optimal pH for pepsin', definition: '1.8 - 2.0'},
                {term: 'HCl kills bacteria', definition: 'Sterilization function'},
                {term: 'HCl denatures proteins', definition: 'Unfolds protein structure'},
              ], 10),
              createQuiz('bio-m5-l3-a2', 'HCl activates:', ['Trypsin', 'Pepsinogen', 'Amylase', 'Lipase'], 1, 'HCl converts inactive pepsinogen → active pepsin', 5),
            ]
          },
          {
            id: 'bio-11-4-m5-l4',
            name: '5.4 Protein Digestion 🔥',
            order: 4,
            totalTokens: 25,
            activities: [
              createFillBlank('bio-m5-l4-a1', '🎮 Protein → peptides flow', 'In stomach: _____ breaks proteins into _____. In infants: _____ curdles milk.', ['Pepsin', 'peptones/proteoses', 'Rennin'], ['Pepsin', 'peptones', 'Rennin', 'Trypsin', 'amino acids'], 15),
              createQuiz('bio-m5-l4-a2', 'Rennin is active in:', ['Adults', 'Infants only', 'Elderly', 'All ages'], 1, 'Rennin (chymosin) is active only in infants to curdle milk', 10),
            ]
          },
          {
            id: 'bio-11-4-m5-l5',
            name: '5.5 Mucus Protection',
            order: 5,
            totalTokens: 10,
            activities: [
              createQuiz('bio-m5-l5-a1', 'Mucus in stomach protects by:', ['Speeding digestion', 'Preventing HCl from damaging stomach wall', 'Activating enzymes', 'Killing bacteria'], 1, 'Mucus layer prevents auto-digestion by HCl', 5),
              createTrueFalse('bio-m5-l5-a2', 'True or False', 'The stomach has a mucus-bicarbonate barrier', true, 'This barrier neutralizes acid near the epithelium', 5),
            ]
          },
          {
            id: 'bio-11-4-m5-l6',
            name: '5.6 Gastric Secretion Phases',
            order: 6,
            totalTokens: 25,
            activities: [
              createQuiz('bio-m5-l6-a1', 'Which phase of gastric secretion occurs when food is in the mouth?', ['Cephalic phase', 'Gastric phase', 'Intestinal phase', 'Basal phase'], 0, 'Cephalic phase is triggered by sight, smell, or taste of food', 8),
              createMatch('bio-m5-l6-a2', 'Match phase with trigger', [
                {term: 'Cephalic phase', definition: 'Sight/smell of food (vagus nerve)'},
                {term: 'Gastric phase', definition: 'Distension of stomach walls'},
                {term: 'Intestinal phase', definition: 'Food entering small intestine'},
              ], 10),
              createFlashcard('bio-m5-l6-a3', 'Key Term', 'Gastrin', 'Hormone secreted by G-cells that stimulates HCl and pepsinogen release', 5),
              createTrueFalse('bio-m5-l6-a4', 'True or False', 'The intestinal phase inhibits gastric secretion', true, 'Enterogastric reflex slows stomach emptying when intestine is full', 5),
            ]
          },
          {
            id: 'bio-11-4-m5-l7',
            name: '5.7 Stomach Disorders',
            order: 7,
            totalTokens: 25,
            activities: [
              createQuiz('bio-m5-l7-a1', 'Which bacterium causes most gastric ulcers?', ['E. coli', 'Helicobacter pylori', 'Streptococcus', 'Salmonella'], 1, 'H. pylori breaks down mucus barrier allowing acid damage', 8),
              createTrueFalse('bio-m5-l7-a2', 'True or False', 'Gastric ulcers are caused by spicy food', false, 'Most ulcers are caused by H. pylori or NSAIDs, not spicy food', 8),
              createMatch('bio-m5-l7-a3', 'Match disorder with cause', [
                {term: 'Gastric ulcer', definition: 'H. pylori or NSAID damage'},
                {term: 'Gastritis', definition: 'Inflammation of stomach lining'},
                {term: 'Achlorhydria', definition: 'Absence of HCl production'},
                {term: 'Zollinger-Ellison syndrome', definition: 'Excess gastrin causing acid overproduction'},
              ], 10),
              createFillBlank('bio-m5-l7-a4', 'Treatment', 'Gastric ulcers caused by H. pylori are treated with _____ therapy.', ['triple/quadruple', 'antibiotic'], ['triple', 'quadruple', 'antibiotic', 'proton pump inhibitor'], 5),
            ]
          },
          {
            id: 'bio-11-4-m5-l8',
            name: '5.8 Stomach Master Review',
            order: 8,
            totalTokens: 30,
            activities: [
              createQuiz('bio-m5-l8-a1', 'The capacity of an adult human stomach is approximately:', ['0.5 L', '1-1.5 L', '3 L', '5 L'], 1, 'Stomach can expand to hold 1-1.5 liters of food', 8),
              createQuiz('bio-m5-l8-a2', 'What is the primary function of intrinsic factor?', ['Protein digestion', 'Vitamin B12 absorption', 'Acid secretion', 'Mucus production'], 1, 'Intrinsic factor is essential for B12 absorption in ileum', 8),
              createTrueFalse('bio-m5-l8-a3', 'True or False', 'The stomach has three muscle layers instead of two', true, 'Stomach has oblique, circular, and longitudinal muscle layers', 8),
              createFlashcard('bio-m5-l8-a4', 'Key Concept', 'Rugae', 'Folds in stomach lining that allow expansion when food enters', 5),
            ]
          }
        ]
      },
      // ============ MODULE 6: Small Intestine ============
      {
        id: 'bio-11-4-m6',
        name: 'Module 6: Small Intestine 🔥 CORE',
        description: 'Parts, bile, pancreatic juice, intestinal juice, complete digestion',
        totalTokens: 195,
        levels: [
          {
            id: 'bio-11-4-m6-l1',
            name: '6.1 Parts of Small Intestine',
            order: 1,
            totalTokens: 15,
            activities: [
              createFillBlank('bio-m6-l1-a1', '🎮 Arrange sections', 'Small intestine parts in order: _____ → _____ → _____.', ['Duodenum', 'Jejunum', 'Ileum'], ['Duodenum', 'Jejunum', 'Ileum', 'Caecum'], 10),
              createQuiz('bio-m6-l1-a2', 'Which part receives bile and pancreatic juice?', ['Jejunum', 'Duodenum', 'Ileum', 'Caecum'], 1, 'Duodenum (C-shaped) receives secretions from liver and pancreas', 5),
            ]
          },
          {
            id: 'bio-11-4-m6-l2',
            name: '6.2 Bile (NO enzymes!) 🔥',
            order: 2,
            totalTokens: 25,
            activities: [
              createTrueFalse('bio-m6-l2-a1', 'True or False — NEET TRICKY!', 'Bile contains digestive enzymes', false, 'Bile has NO enzymes! It only emulsifies fats.', 10),
              createQuiz('bio-m6-l2-a2', 'Bile is stored in:', ['Liver', 'Gall bladder', 'Pancreas', 'Duodenum'], 1, 'Liver produces bile; gall bladder stores and concentrates it', 10),
              createMatch('bio-m6-l2-a3', '🎮 Emulsification animation concepts', [
                {term: 'Bile salts', definition: 'Emulsify fats into micelles'},
                {term: 'Bile pigments', definition: 'Bilirubin (yellow), biliverdin (green)'},
                {term: 'Emulsification', definition: 'Breaks large fat droplets → tiny droplets'},
              ], 5),
            ]
          },
          {
            id: 'bio-11-4-m6-l3',
            name: '6.3 Pancreatic Juice 🔥',
            order: 3,
            totalTokens: 30,
            activities: [
              createMatch('bio-m6-l3-a1', '🎮 Match enzyme → function', [
                {term: 'Trypsin', definition: 'Digests proteins → peptides'},
                {term: 'Lipase', definition: 'Digests fats → fatty acids + glycerol'},
                {term: 'Amylase', definition: 'Digests starch → maltose'},
                {term: 'Carboxypeptidase', definition: 'Removes terminal amino acids'},
              ], 20),
              createQuiz('bio-m6-l3-a2', 'Which pancreatic enzyme acts on fats?', ['Trypsin', 'Pancreatic lipase', 'Amylase', 'Pepsin'], 1, 'Pancreatic lipase breaks down emulsified fats', 10),
            ]
          },
          {
            id: 'bio-11-4-m6-l4',
            name: '6.4 Intestinal Juice (Succus Entericus)',
            order: 4,
            totalTokens: 20,
            activities: [
              createMatch('bio-m6-l4-a1', '🎮 Unlock enzymes step-by-step', [
                {term: 'Enterokinase', definition: 'Activates trypsinogen → trypsin'},
                {term: 'Maltase', definition: 'Maltose → Glucose + Glucose'},
                {term: 'Lactase', definition: 'Lactose → Glucose + Galactose'},
                {term: 'Sucrase', definition: 'Sucrose → Glucose + Fructose'},
                {term: 'Dipeptidase', definition: 'Peptides → Amino acids'},
                {term: 'Nucleosidase', definition: 'Nucleotides → Sugars + Bases'},
              ], 15),
              createFillBlank('bio-m6-l4-a2', 'Succus Entericus is secreted by:', '_____ glands (_____ of Lieberkühn) and _____ glands.', ['Intestinal', 'crypts', 'Brunner\'s'], ['Intestinal', 'crypts', 'Brunner\'s', 'Gastric'], 5),
            ]
          },
          {
            id: 'bio-11-4-m6-l5',
            name: '6.5 Carb Digestion 🔥',
            order: 5,
            totalTokens: 15,
            activities: [
              createFillBlank('bio-m6-l5-a1', '🎮 Path: starch → glucose', 'Starch → _____ (by amylase) → _____ (by maltase) → Glucose', ['Maltose', 'Glucose'], ['Maltose', 'Glucose', 'Fructose'], 10),
              createQuiz('bio-m6-l5-a2', 'Final carbohydrate digestion products:', ['Maltose', 'Glucose, fructose, galactose', 'Starch', 'Sucrose'], 1, 'Carbohydrates are ultimately digested into monosaccharides', 5),
            ]
          },
          {
            id: 'bio-11-4-m6-l6',
            name: '6.6 Protein Digestion 🔥',
            order: 6,
            totalTokens: 15,
            activities: [
              createFillBlank('bio-m6-l6-a1', '🎮 Chain breakdown simulation', 'Protein → _____ (by pepsin) → _____ (by trypsin) → _____ (by dipeptidase) → Amino acids', ['Peptones', 'Peptides', 'Dipeptides'], ['Peptones', 'Peptides', 'Dipeptides', 'Polypeptides'], 10),
              createQuiz('bio-m6-l6-a2', 'Protein digestion ends with:', ['Peptides', 'Amino acids', 'Polypeptides', 'Proteoses'], 1, 'Final products are amino acids absorbed into blood', 5),
            ]
          },
          {
            id: 'bio-11-4-m6-l7',
            name: '6.7 Fat Digestion 🔥',
            order: 7,
            totalTokens: 15,
            activities: [
              createFillBlank('bio-m6-l7-a1', '🎮 Fat → fatty acids + glycerol', 'Fats (triglycerides) → Emulsification by _____ → _____ (by lipase) → Fatty acids + Glycerol', ['Bile', 'Monoglycerides'], ['Bile', 'Monoglycerides', 'Micelles', 'Chylomicrons'], 10),
              createQuiz('bio-m6-l7-a2', 'Fat digestion products are absorbed into:', ['Blood directly', 'Lacteals (lymph)', 'Stomach wall', 'Colon'], 1, 'Fatty acids and glycerol enter lymphatic lacteals first', 5),
            ]
          },
          {
            id: 'bio-11-4-m6-l8',
            name: '6.8 Microvilli & Brush Border',
            order: 8,
            totalTokens: 20,
            activities: [
              createFlashcard('bio-m6-l8-a1', 'Key Term', 'Microvilli', 'Tiny projections on enterocytes that increase surface area for absorption', 5),
              createQuiz('bio-m6-l8-a2', 'The brush border refers to:', ['Hair in small intestine', 'Microvilli on intestinal cells', 'Villi projections', 'Plicae circulares'], 1, 'Microvilli form a brush-like border on enterocytes', 8),
              createTrueFalse('bio-m6-l8-a3', 'True or False', 'Microvilli increase surface area about 20-fold', true, 'Microvilli dramatically increase absorptive surface area', 8),
              createFillBlank('bio-m6-l8-a4', 'Surface area', 'The small intestine has a surface area of approximately _____ square meters due to villi and microvilli.', ['200-250', '200'], ['200', '250', '100', '50'], 5),
            ]
          },
          {
            id: 'bio-11-4-m6-l9',
            name: '6.9 Digestive Hormones',
            order: 9,
            totalTokens: 25,
            activities: [
              createMatch('bio-m6-l9-a1', 'Match hormone with source and function', [
                {term: 'Secretin', definition: 'Duodenum → stimulates bicarbonate from pancreas'},
                {term: 'CCK (Cholecystokinin)', definition: 'Duodenum → stimulates bile release and pancreatic enzymes'},
                {term: 'GIP', definition: 'Duodenum → stimulates insulin release'},
                {term: 'Motilin', definition: 'Small intestine → stimulates migrating motor complex'},
              ], 12),
              createQuiz('bio-m6-l9-a2', 'Which hormone stimulates gall bladder contraction?', ['Secretin', 'Gastrin', 'CCK', 'GIP'], 2, 'CCK (Cholecystokinin) causes gall bladder to release bile', 8),
              createTrueFalse('bio-m6-l9-a3', 'True or False', 'Secretin mainly stimulates enzyme secretion from pancreas', false, 'Secretin stimulates bicarbonate (watery) secretion, not enzymes', 8),
            ]
          },
          {
            id: 'bio-11-4-m6-l10',
            name: '6.10 Small Intestine Master Quiz',
            order: 10,
            totalTokens: 30,
            activities: [
              createQuiz('bio-m6-l10-a1', 'The ileocecal valve is located between:', ['Stomach and duodenum', 'Ileum and caecum', 'Jejunum and ileum', 'Colon and rectum'], 1, 'Ileocecal valve controls passage from small to large intestine', 8),
              createQuiz('bio-m6-l10-a2', 'Which part of small intestine is longest?', ['Duodenum', 'Jejunum', 'Ileum', 'All equal'], 2, 'The ileum constitutes about 60% of small intestine length', 8),
              createTrueFalse('bio-m6-l10-a3', 'True or False', 'Brunner glands are found in the duodenum', true, 'Brunner glands secrete alkaline mucus in the duodenum', 8),
              createMatch('bio-m6-l10-a4', 'Match feature with location', [
                {term: 'Plicae circulares', definition: 'Permanent circular folds in small intestine'},
                {term: 'Peyer patches', definition: 'Lymphoid tissue in ileum'},
                {term: 'Brunner glands', definition: 'Submucosal glands in duodenum'},
                {term: 'Crypts of Lieberkühn', definition: 'Intestinal glands throughout small intestine'},
              ], 10),
            ]
          }
        ]
      },
      // ============ MODULE 7: Absorption ============
      {
        id: 'bio-11-4-m7',
        name: 'Module 7: Absorption 🔥',
        description: 'Villi, absorption mechanisms, nutrient routes',
        totalTokens: 90,
        levels: [
          {
            id: 'bio-11-4-m7-l1',
            name: '7.1 Villi Structure',
            order: 1,
            totalTokens: 25,
            activities: [
              createMatch('bio-m7-l1-a1', '🎮 Zoom-in exploration', [
                {term: 'Villi', definition: 'Finger-like projections of mucosa'},
                {term: 'Microvilli', definition: 'Brush border cells (enterocytes)'},
                {term: 'Crypts of Lieberkühn', definition: 'Intestinal glands at villi base'},
                {term: 'Blood capillaries', definition: 'Absorb glucose, amino acids'},
                {term: 'Lacteal', definition: 'Lymph vessel absorbing fats'},
              ], 15),
              createQuiz('bio-m7-l1-a2', 'Villi increase surface area by about:', ['2x', '10x', '100x', '8x'], 1, 'Villi and microvilli increase surface area ~10-fold', 10),
            ]
          },
          {
            id: 'bio-11-4-m7-l2',
            name: '7.2 Absorption Mechanisms 🔥',
            order: 2,
            totalTokens: 25,
            activities: [
              createMatch('bio-m7-l2-a1', '🎮 Sort mechanism → nutrient', [
                {term: 'Simple diffusion', definition: 'Water, some minerals, fatty acids'},
                {term: 'Facilitated diffusion', definition: 'Fructose'},
                {term: 'Active transport', definition: 'Glucose, amino acids, Na+'},
                {term: 'Pinocytosis', definition: 'Some large molecules'},
              ], 15),
              createQuiz('bio-m7-l2-a2', 'Glucose absorption uses:', ['Simple diffusion', 'Facilitated diffusion', 'Active transport (with Na+)', 'Osmosis'], 2, 'Glucose is absorbed via active transport coupled with sodium', 10),
            ]
          },
          {
            id: 'bio-11-4-m7-l3',
            name: '7.3 Carbs & Proteins Absorption',
            order: 3,
            totalTokens: 20,
            activities: [
              createQuiz('bio-m7-l3-a1', 'Carbs and proteins enter:', ['Lacteals', 'Blood capillaries', 'Lymph', 'Bile duct'], 1, 'Monosaccharides and amino acids enter blood circulation', 10),
              createTrueFalse('bio-m7-l3-a2', 'True or False', 'Amino acids are absorbed by active transport', true, 'Amino acids require energy-dependent active transport', 10),
            ]
          },
          {
            id: 'bio-11-4-m7-l4',
            name: '7.4 Fat Absorption (Lacteals) 🔥',
            order: 4,
            totalTokens: 20,
            activities: [
              createFillBlank('bio-m7-l4-a1', '🎮 Route fats → lymph', 'Fatty acids + glycerol → Enterocytes → Triglycerides → _____ → Lacteal → _____.', ['Chylomicrons', 'Thoracic duct'], ['Chylomicrons', 'Thoracic duct', 'Blood', 'Villi'], 15),
              createQuiz('bio-m7-l4-a2', 'Chylomicrons enter the:', ['Blood directly', 'Lacteals (lymphatic system)', 'Portal vein', 'Hepatic vein'], 1, 'Chylomicrons first enter lymphatic lacteals before blood', 5),
            ]
          }
        ]
      },
      // ============ MODULE 8: Large Intestine ============
      {
        id: 'bio-11-4-m8',
        name: 'Module 8: Large Intestine',
        description: 'Structure, water absorption, gut bacteria',
        totalTokens: 60,
        levels: [
          {
            id: 'bio-11-4-m8-l1',
            name: '8.1 Structure & Function',
            order: 1,
            totalTokens: 20,
            activities: [
              createFillBlank('bio-m8-l1-a1', '🎮 Label colon parts', 'Parts of colon: Caecum → _____ colon → _____ colon → _____ colon → _____ → Rectum → Anus.', ['Ascending', 'Transverse', 'Descending', 'Sigmoid'], ['Ascending', 'Transverse', 'Descending', 'Sigmoid', 'Rectum'], 10),
              createMatch('bio-m8-l1-a2', 'Match part → feature', [
                {term: 'Caecum', definition: 'Vermiform appendix attached'},
                {term: 'Colon', definition: 'Water absorption, no villi'},
                {term: 'Rectum', definition: 'Temporary feces storage'},
              ], 10),
            ]
          },
          {
            id: 'bio-11-4-m8-l2',
            name: '8.2 Water Absorption',
            order: 2,
            totalTokens: 20,
            activities: [
              createQuiz('bio-m8-l2-a1', 'How much water is absorbed daily by the large intestine?', ['~0.5 L', '~1.5 L', '~5 L', '~0.1 L'], 1, 'Large intestine absorbs ~1.5 L of water daily', 10),
              createTrueFalse('bio-m8-l2-a2', 'True or False', 'The large intestine has villi for absorption', false, 'Large intestine lacks villi; has flat mucosa', 10),
            ]
          },
          {
            id: 'bio-11-4-m8-l3',
            name: '8.3 Gut Bacteria',
            order: 3,
            totalTokens: 20,
            activities: [
              createMatch('bio-m8-l3-a1', '🎮 Match bacteria → vitamin', [
                {term: 'E. coli', definition: 'Produces Vitamin K'},
                {term: 'Bacteroides', definition: 'Fiber fermentation'},
                {term: 'Bifidobacteria', definition: 'B vitamins, immune support'},
              ], 10),
              createQuiz('bio-m8-l3-a2', 'Gut bacteria synthesize:', ['Vitamin C', 'Vitamin K and some B vitamins', 'Vitamin D', 'Vitamin A'], 1, 'E. coli in colon synthesizes Vitamin K and B-complex', 10),
            ]
          }
        ]
      },
      // ============ MODULE 9: Enzyme Master Table ============
      {
        id: 'bio-11-4-m9',
        name: 'Module 9: Enzyme Master Table 🔥',
        description: 'Complete enzyme table — MUST MEMORIZE for NEET',
        totalTokens: 80,
        levels: [
          {
            id: 'bio-11-4-m9-l1',
            name: '9.1 Carbohydrate Enzymes',
            order: 1,
            totalTokens: 25,
            activities: [
              createMatch('bio-m9-l1-a1', '🎮 Rapid-fire flashcards', [
                {term: 'Salivary amylase', definition: 'Starch → Maltose (mouth)'},
                {term: 'Pancreatic amylase', definition: 'Starch → Maltose (small intestine)'},
                {term: 'Maltase', definition: 'Maltose → Glucose + Glucose'},
                {term: 'Lactase', definition: 'Lactose → Glucose + Galactose'},
                {term: 'Sucrase', definition: 'Sucrose → Glucose + Fructose'},
              ], 15),
              createQuiz('bio-m9-l1-a2', 'Which enzyme completes starch digestion?', ['Amylase', 'Maltase', 'Sucrase', 'Lactase'], 1, 'Amylase produces maltose; maltase converts it to glucose', 10),
            ]
          },
          {
            id: 'bio-11-4-m9-l2',
            name: '9.2 Protein Enzymes',
            order: 2,
            totalTokens: 25,
            activities: [
              createMatch('bio-m9-l2-a1', 'Master the protein enzymes', [
                {term: 'Pepsin (stomach)', definition: 'Protein → Peptones + Proteoses'},
                {term: 'Trypsin', definition: 'Protein/Peptones → Peptides'},
                {term: 'Chymotrypsin', definition: 'Peptides → Smaller peptides'},
                {term: 'Carboxypeptidase', definition: 'Peptides → Amino acids (from COOH end)'},
                {term: 'Dipeptidase', definition: 'Dipeptides → Amino acids'},
              ], 15),
              createFillBlank('bio-m9-l2-a2', 'Complete the pathway', 'Protein → _____ (pepsin) → _____ (trypsin) → _____ (carboxypeptidase/dipeptidase) → _____', ['Peptones', 'Peptides', 'Amino acids', 'Amino acids'], ['Peptones', 'Peptides', 'Amino acids', 'Amino acids', 'Proteoses'], 10),
            ]
          },
          {
            id: 'bio-11-4-m9-l3',
            name: '9.3 Fat Enzymes & Nucleases',
            order: 3,
            totalTokens: 15,
            activities: [
              createMatch('bio-m9-l3-a1', '🎮 Timed matching game', [
                {term: 'Lingual lipase', definition: 'Minor fat digestion in mouth'},
                {term: 'Gastric lipase', definition: 'Some fat digestion in stomach'},
                {term: 'Pancreatic lipase', definition: 'Main fat digestion in intestine'},
                {term: 'Nuclease', definition: 'Nucleic acids → Nucleotides'},
                {term: 'Nucleosidase', definition: 'Nucleotides → Sugars + Nitrogen bases'},
              ], 10),
              createQuiz('bio-m9-l3-a2', 'Main enzyme for fat digestion:', ['Gastric lipase', 'Pancreatic lipase', 'Bile lipase', 'Lingual lipase'], 1, 'Pancreatic lipase is the primary enzyme for fat digestion', 5),
            ]
          },
          {
            id: 'bio-11-4-m9-l4',
            name: '9.4 Substrate → Product Mapping',
            order: 4,
            totalTokens: 15,
            activities: [
              createMatch('bio-m9-l4-a1', '🎮 Final revision: Match substrate → product', [
                {term: 'Starch', definition: 'Glucose (final)'},
                {term: 'Protein', definition: 'Amino acids (final)'},
                {term: 'Fats (Triglycerides)', definition: 'Fatty acids + Glycerol'},
                {term: 'Sucrose', definition: 'Glucose + Fructose'},
                {term: 'Lactose', definition: 'Glucose + Galactose'},
              ], 10),
              createQuiz('bio-m9-l4-a2', 'The end products of complete digestion are:', ['Disaccharides, peptides, emulsified fats', 'Monosaccharides, amino acids, fatty acids + glycerol', 'Starch, proteins, fats', 'Maltose, peptones, micelles'], 1, 'Final absorption-ready products: monosaccharides, amino acids, fatty acids & glycerol', 5),
            ]
          }
        ]
      },
      // ============ MODULE 10: PYQ Integration ============
      {
        id: 'bio-11-4-m10',
        name: 'Module 10: PYQ Mode 🔥',
        description: 'Full integration, mixed questions, assertion-reason, time attack',
        totalTokens: 100,
        levels: [
          {
            id: 'bio-11-4-m10-l1',
            name: '10.1 Full Digestion Pathway',
            order: 1,
            totalTokens: 15,
            activities: [
              createFillBlank('bio-m10-l1-a1', '🎮 Drag food across organs simulation', 'Complete pathway: Mouth → _____ → Stomach → _____ → _____ → Large intestine → _____.', ['Esophagus', 'Small intestine', 'Caecum/Colon', 'Rectum/Anus'], ['Esophagus', 'Small intestine', 'Caecum', 'Rectum', 'Pharynx'], 10),
              createQuiz('bio-m10-l1-a2', 'Food stays in stomach for about:', ['1-2 hours', '2-4 hours', '6-8 hours', '30 minutes'], 1, 'Gastric emptying takes 2-4 hours depending on food type', 5),
            ]
          },
          {
            id: 'bio-11-4-m10-l2',
            name: '10.2 Mixed MCQ Battle',
            order: 2,
            totalTokens: 25,
            activities: [
              createQuiz('bio-m10-l2-a1', 'PYQ: Which enzyme is active at pH 2.0?', ['Trypsin', 'Pepsin', 'Amylase', 'Lipase'], 1, 'Pepsin works optimally at pH 1.8-2.0 in stomach', 10),
              createQuiz('bio-m10-l2-a2', 'PYQ: Bile is necessary for digestion of:', ['Carbohydrates', 'Proteins', 'Fats', 'Nucleic acids'], 2, 'Bile emulsifies fats for lipase action', 10),
              createTrueFalse('bio-m10-l2-a3', 'PYQ: Assertion-Reason style', 'Statement: Trypsinogen is secreted by pancreas. Reason: It is activated by enterokinase in intestine.', true, 'Both statements are correct and related', 5),
            ]
          },
          {
            id: 'bio-11-4-m10-l3',
            name: '10.3 Assertion-Reason Mode',
            order: 3,
            totalTokens: 25,
            activities: [
              createTrueFalse('bio-m10-l3-a1', 'Assertion-Reason Check', 'Assertion: Pepsin digests proteins in stomach. Reason: Stomach has alkaline pH.', false, 'Assertion true but reason false — stomach has acidic pH (HCl)', 10),
              createTrueFalse('bio-m10-l3-a2', 'Assertion-Reason Check', 'Assertion: Villi increase absorption surface. Reason: They contain blood vessels and lacteals.', true, 'Both true and correctly explains — lacteals and blood vessels absorb nutrients', 10),
              createQuiz('bio-m10-l3-a3', 'Choose logic correctness:', ['Both true, R explains A', 'Both true, R does NOT explain A', 'A true, R false', 'A false, R true'], 2, 'Practice all assertion-reason patterns', 5),
            ]
          },
          {
            id: 'bio-11-4-m10-l4',
            name: '10.4 Time Attack Revision',
            order: 4,
            totalTokens: 35,
            activities: [
              createMatch('bio-m10-l4-a1', '⚡ Rapid match: 10 questions in 60 sec', [
                {term: 'HCl source', definition: 'Parietal cells'},
                {term: 'Pepsinogen → Pepsin', definition: 'HCl activates'},
                {term: 'No enzymes', definition: 'Bile'},
                {term: 'Fat absorption', definition: 'Lacteals'},
                {term: 'Villi location', definition: 'Small intestine'},
                {term: 'Trypsin activates', definition: 'Enterokinase'},
                {term: 'Dental formula', definition: '2-1-2-3'},
                {term: 'Mucus secreting', definition: 'Goblet cells'},
                {term: 'B12 absorption', definition: 'Intrinsic factor'},
                {term: 'Chylomicrons', definition: 'Lymph → Blood'},
              ], 25),
              createQuiz('bio-m10-l4-a2', '⚡ Quick: Intrinsic factor is secreted by:', ['Chief cells', 'Parietal cells', 'G-cells', 'D-cells'], 1, 'Parietal cells secrete HCl AND intrinsic factor (for B12)', 10),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-11-5',
    name: 'Breathing & Exchange of Gases',
    description: 'Respiratory organs, breathing mechanisms, gas exchange, transport of gases, regulation of respiration, disorders',
    moduleCount: 6,
    modules: [
      // ============ MODULE 1: Respiratory Organs ============
      {
        id: 'bio-11-5-m1',
        name: 'Respiratory Organs 🔥',
        description: 'Human respiratory system - conducting and respiratory zones',
        totalTokens: 75,
        levels: [
          {
            id: 'bio-11-5-m1-l1',
            name: '1.1 Respiratory System Overview',
            order: 1,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-5-m1-l1-a1', 'The respiratory system is divided into:', ['Upper and lower', 'Conducting and respiratory zones', 'Internal and external', 'A and B only'], 3, 'Both divisions apply: anatomical (upper/lower) and functional (conducting/respiratory)', 10),
              createMatch('bio-11-5-m1-l1-a2', 'Match respiratory zone components', [
                {term: 'Conducting zone', definition: 'Transports air, no gas exchange'},
                {term: 'Respiratory zone', definition: 'Site of gas exchange'},
                {term: 'Nasal chambers', definition: 'Filter, warm, humidify air'},
                {term: 'Alveoli', definition: 'Gas exchange units'},
              ], 15),
              createTrueFalse('bio-11-5-m1-l1-a3', 'True or False', 'The conducting zone includes respiratory bronchioles', false, 'Respiratory bronchioles mark the beginning of respiratory zone', 8),
            ]
          },
          {
            id: 'bio-11-5-m1-l2',
            name: '1.2 Upper Respiratory Tract 🔥',
            order: 2,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-5-m1-l2-a1', 'Which structure prevents food from entering the trachea?', ['Epiglottis', 'Glottis', 'Larynx', 'Pharynx'], 0, 'Epiglottis is a leaf-shaped cartilage that closes during swallowing', 10),
              createMatch('bio-11-5-m1-l2-a2', 'Match structure with function', [
                {term: 'External nares', definition: 'Nostrils - entry of air'},
                {term: 'Nasal conchae', definition: 'Turbinate bones - increase surface'},
                {term: 'Pharynx', definition: 'Common passage for air and food'},
                {term: 'Larynx', definition: 'Voice box, prevents food entry'},
              ], 15),
              createFillBlank('bio-11-5-m1-l2-a3', 'Nasal cavity features', 'The nasal cavity has _____ which trap dust particles and _____ which warm and humidify air.', ['hairs', 'mucous glands'], ['hairs', 'cilia', 'mucous glands', 'taste buds'], 10),
              createTrueFalse('bio-11-5-m1-l2-a4', 'True or False', 'The pharynx connects nasal cavity to larynx and mouth to esophagus', true, 'Pharynx serves as common passage - nasopharynx, oropharynx, laryngopharynx', 8),
            ]
          },
          {
            id: 'bio-11-5-m1-l3',
            name: '1.3 Lower Respiratory Tract 🔥',
            order: 3,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-5-m1-l3-a1', 'The trachea is supported by:', ['Bony rings', 'C-shaped cartilage rings', 'Smooth muscle only', 'Elastic fibers'], 1, 'C-shaped hyaline cartilage rings prevent collapse but allow esophageal expansion', 10),
              createMatch('bio-11-5-m1-l3-a2', 'Match respiratory structure with feature', [
                {term: 'Trachea', definition: 'Windpipe, 12 cm long, C-rings'},
                {term: 'Bronchi', definition: 'Two primary branches from trachea'},
                {term: 'Bronchioles', definition: 'No cartilage, smooth muscle'},
                {term: 'Terminal bronchioles', definition: 'End of conducting zone'},
              ], 15),
              createFillBlank('bio-11-5-m1-l3-a3', 'Bronchial tree', 'The right lung has _____ lobes and the left lung has _____ lobes.', ['three', 'two'], ['three', 'two', 'four', 'one'], 10),
              createQuiz('bio-11-5-m1-l3-a4', 'The last part of conducting zone is:', ['Respiratory bronchiole', 'Terminal bronchiole', 'Alveolar duct', 'Bronchiole'], 1, 'Terminal bronchiole is the end of conducting zone - no gas exchange occurs here', 8),
              createTrueFalse('bio-11-5-m1-l3-a5', 'True or False', 'The left lung has a cardiac notch to accommodate the heart', true, 'Cardiac notch is a concavity on left lung surface for heart placement', 8),
            ]
          }
        ]
      },
      // ============ MODULE 2: Alveoli & Gas Exchange ============
      {
        id: 'bio-11-5-m2',
        name: 'Alveoli & Gas Exchange 🔥🔥',
        description: 'Respiratory unit, alveolar structure, diffusion membrane',
        totalTokens: 70,
        levels: [
          {
            id: 'bio-11-5-m2-l1',
            name: '2.1 Alveoli Structure 🔥',
            order: 1,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-5-m2-l1-a1', 'Each lung contains approximately how many alveoli?', ['100 million', '300 million', '10 million', '1 billion'], 1, 'Human lungs contain ~300-500 million alveoli', 10),
              createMatch('bio-11-5-m2-l1-a2', 'Match alveolar cell with function', [
                {term: 'Type I pneumocytes', definition: 'Squamous cells - gas exchange surface'},
                {term: 'Type II pneumocytes', definition: 'Secrete surfactant'},
                {term: 'Alveolar macrophages', definition: 'Dust cells - phagocytosis'},
                {term: 'Surfactant', definition: 'Reduces surface tension'},
              ], 15),
              createFillBlank('bio-11-5-m2-l1-a3', 'Respiratory membrane', 'The respiratory membrane consists of _____ layer, basement membrane, and _____ epithelium.', ['alveolar squamous', 'capillary endothelial'], ['alveolar squamous', 'ciliated columnar', 'capillary endothelial', 'stratified'], 10),
              createTrueFalse('bio-11-5-m2-l1-a4', 'True or False', 'Type II pneumocytes are more abundant but do not participate in gas exchange', true, 'Type II cells secrete surfactant; Type I cells form 95% of gas exchange surface', 8),
            ]
          },
          {
            id: 'bio-11-5-m2-l2',
            name: '2.2 Gas Exchange Mechanism 🔥',
            order: 2,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-5-m2-l2-a1', 'Gas exchange across alveoli occurs by:', ['Active transport', 'Simple diffusion', 'Facilitated diffusion', 'Osmosis'], 1, 'O2 and CO2 move by simple diffusion down partial pressure gradients', 10),
              createMatch('bio-11-5-m2-l2-a2', 'Match gas with partial pressure', [
                {term: 'PO2 in alveoli', definition: '104 mmHg'},
                {term: 'PO2 in venous blood', definition: '40 mmHg'},
                {term: 'PCO2 in alveoli', definition: '40 mmHg'},
                {term: 'PCO2 in venous blood', definition: '45 mmHg'},
              ], 15),
              createFillBlank('bio-11-5-m2-l2-a3', 'Diffusion gradient', 'O2 diffuses from alveoli (_____ mmHg) to blood (_____ mmHg).', ['104', '40'], ['104', '95', '40', '45'], 10),
              createTrueFalse('bio-11-5-m2-l2-a4', 'True or False', 'The respiratory membrane is extremely thin - only 0.2-0.5 micrometers thick', true, 'Thin membrane allows rapid gas exchange by diffusion', 8),
            ]
          },
          {
            id: 'bio-11-5-m2-l3',
            name: '2.3 Lung Volumes & Capacities',
            order: 3,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-5-m2-l3-a1', 'Tidal volume in normal breathing is approximately:', ['500 mL', '3000 mL', '1200 mL', '6000 mL'], 0, 'Tidal volume (TV) = ~500 mL - air moved during normal quiet breathing', 10),
              createMatch('bio-11-5-m2-l3-a2', 'Match lung volume with definition', [
                {term: 'Tidal volume (TV)', definition: 'Normal breathing - 500 mL'},
                {term: 'Inspiratory reserve (IRV)', definition: 'Additional intake - 2500-3000 mL'},
                {term: 'Expiratory reserve (ERV)', definition: 'Additional exhalation - 1000-1200 mL'},
                {term: 'Residual volume (RV)', definition: 'Air remaining - 1000-1200 mL'},
              ], 15),
              createFillBlank('bio-11-5-m2-l3-a3', 'Vital capacity', 'Vital capacity = _____ + _____ + ERV', ['TV', 'IRV'], ['TV', 'IRV', 'RV', 'ERV'], 10),
            ]
          }
        ]
      },
      // ============ MODULE 3: Breathing Mechanism ============
      {
        id: 'bio-11-5-m3',
        name: 'Mechanism of Breathing 🔥',
        description: 'Inspiration, expiration, respiratory muscles, pressure changes',
        totalTokens: 65,
        levels: [
          {
            id: 'bio-11-5-m3-l1',
            name: '3.1 Inspiration (Inhalation) 🔥',
            order: 1,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-5-m3-l1-a1', 'During inspiration, intrapulmonary pressure:', ['Increases', 'Decreases below atmospheric', 'Remains same', 'Equals atmospheric'], 1, 'Thoracic volume increases → pressure drops below atmospheric → air rushes in', 10),
              createMatch('bio-11-5-m3-l1-a2', 'Match muscle with action during inspiration', [
                {term: 'Diaphragm', definition: 'Contracts and flattens'},
                {term: 'External intercostals', definition: 'Contract - elevate ribs'},
                {term: 'Sternocleidomastoid', definition: 'Accessory - forced inspiration'},
                {term: 'Scalenes', definition: 'Accessory - forced inspiration'},
              ], 15),
              createFillBlank('bio-11-5-m3-l1-a3', 'Pressure changes', 'During inspiration: Thoracic volume _____ → Intrapulmonary pressure _____.', ['increases', 'decreases'], ['increases', 'decreases', 'stays same', 'equals'], 10),
              createTrueFalse('bio-11-5-m3-l1-a4', 'True or False', 'Normal inspiration is an active process requiring muscle contraction', true, 'Contraction of diaphragm and external intercostals creates negative pressure', 8),
            ]
          },
          {
            id: 'bio-11-5-m3-l2',
            name: '3.2 Expiration (Exhalation)',
            order: 2,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-5-m3-l2-a1', 'Normal expiration is:', ['Active process', 'Passive process', 'Requires muscle contraction', 'Both active and passive'], 1, 'Normal quiet expiration is passive - elastic recoil of lungs and relaxation of muscles', 10),
              createMatch('bio-11-5-m3-l2-a2', 'Match process with muscle activity', [
                {term: 'Normal expiration', definition: 'Passive - diaphragm relaxes'},
                {term: 'Forced expiration', definition: 'Active - abdominal muscles contract'},
                {term: 'Internal intercostals', definition: 'Contract during forced expiration'},
                {term: 'Latissimus dorsi', definition: 'Accessory expiration muscle'},
              ], 12),
              createFillBlank('bio-11-5-m3-l2-a3', 'Expiration mechanics', 'During expiration: Thoracic volume _____ → Intrapulmonary pressure _____.', ['decreases', 'increases'], ['increases', 'decreases', 'stays same', 'equals'], 10),
              createTrueFalse('bio-11-5-m3-l2-a4', 'True or False', 'During forced expiration, abdominal muscles contract and push the diaphragm upward', true, 'Abdominal muscle contraction increases intra-abdominal pressure', 8),
            ]
          },
          {
            id: 'bio-11-5-m3-l3',
            name: '3.3 Spirometry & Respiratory Cycle',
            order: 3,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-5-m3-l3-a1', 'Spirometry measures:', ['Heart rate', 'Lung volumes and capacities', 'Blood pressure', 'Oxygen saturation'], 1, 'Spirometer measures volumes of air inspired and expired', 10),
              createMatch('bio-11-5-m3-l3-a2', 'Match spirometry term with definition', [
                {term: 'Tidal volume', definition: 'Normal breath - ~500 mL'},
                {term: 'Vital capacity', definition: 'Maximum forceful expiration after inspiration'},
                {term: 'Total lung capacity', definition: 'Vital capacity + Residual volume'},
                {term: 'Dead space', definition: 'Conducting zone - 150 mL (no gas exchange)'},
              ], 15),
              createFillBlank('bio-11-5-m3-l3-a3', 'Alveolar ventilation', 'Alveolar ventilation = (_____ - _____) × Respiratory rate', ['Tidal volume', 'Dead space'], ['Tidal volume', 'Dead space', 'Vital capacity', 'Residual volume'], 10),
              createTrueFalse('bio-11-5-m3-l3-a4', 'True or False', 'Dead space volume is about 150 mL - air in conducting zone that does not participate in gas exchange', true, 'Anatomical dead space = ~150 mL - nasal chambers to terminal bronchioles', 8),
            ]
          }
        ]
      },
      // ============ MODULE 4: Transport of Gases ============
      {
        id: 'bio-11-5-m4',
        name: 'Transport of Gases 🔥🔥',
        description: 'Oxygen and carbon dioxide transport in blood',
        totalTokens: 80,
        levels: [
          {
            id: 'bio-11-5-m4-l1',
            name: '4.1 Oxygen Transport 🔥',
            order: 1,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-5-m4-l1-a1', 'Most oxygen is transported in blood as:', ['Dissolved in plasma', 'Oxyhemoglobin', 'Carbaminohemoglobin', 'Bicarbonate'], 1, '97% of O2 binds to hemoglobin forming oxyhemoglobin; 3% dissolves in plasma', 10),
              createMatch('bio-11-5-m4-l1-a2', 'Match O2 transport factor with description', [
                {term: 'Hemoglobin', definition: '4 heme groups, each binds 1 O2'},
                {term: 'Oxyhemoglobin', definition: 'Bright red, formed in lungs'},
                {term: 'Deoxyhemoglobin', definition: 'Dark red, releases O2 in tissues'},
                {term: 'Oxygen capacity', definition: '~20 mL O2 per 100 mL blood'},
              ], 15),
              createFillBlank('bio-11-5-m4-l1-a3', 'Hemoglobin saturation', 'Each hemoglobin can bind _____ oxygen molecules, carrying them from lungs to _____.', ['four', 'tissues'], ['one', 'four', 'tissues', 'alveoli'], 10),
              createTrueFalse('bio-11-5-m4-l1-a4', 'True or False', 'Hemoglobin releases oxygen more readily in acidic conditions and higher temperatures', true, 'Bohr effect: low pH (high H+) and high temp favor O2 release in active tissues', 8),
            ]
          },
          {
            id: 'bio-11-5-m4-l2',
            name: '4.2 Carbon Dioxide Transport 🔥',
            order: 2,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-5-m4-l2-a1', 'Most CO2 is transported as:', ['Carbaminohemoglobin', 'Dissolved in plasma', 'Bicarbonate (HCO3-)', 'Free CO2'], 2, '70% as bicarbonate, 20-23% as carbaminohemoglobin, 7-10% dissolved', 10),
              createMatch('bio-11-5-m4-l2-a2', 'Match CO2 transport mechanism', [
                {term: 'Bicarbonate (70%)', definition: 'CO2 + H2O → H2CO3 → H+ + HCO3-'},
                {term: 'Carbaminohemoglobin (23%)', definition: 'CO2 binds to Hb globin'},
                {term: 'Dissolved (7%)', definition: 'As free CO2 in plasma'},
                {term: 'Chloride shift', definition: 'Cl- enters RBC as HCO3- leaves'},
              ], 15),
              createFillBlank('bio-11-5-m4-l2-a3', 'Carbonic anhydrase', 'CO2 combines with water in RBCs to form carbonic acid, catalyzed by enzyme _____ in _____ cells.', ['carbonic anhydrase', 'red blood'], ['carbonic anhydrase', 'carboxypeptidase', 'red blood', 'white blood'], 10),
              createTrueFalse('bio-11-5-m4-l2-a4', 'True or False', 'The chloride shift (Hamburger phenomenon) maintains electrical neutrality during CO2 transport', true, 'As HCO3- leaves RBC, Cl- enters to maintain ionic balance', 8),
            ]
          },
          {
            id: 'bio-11-5-m4-l3',
            name: '4.3 Oxygen Dissociation Curve 🔥',
            order: 3,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-5-m4-l3-a1', 'The oxygen-hemoglobin dissociation curve is:', ['Linear', 'Sigmoid (S-shaped)', 'Hyperbolic', 'Parabolic'], 1, 'Sigmoid curve due to cooperative binding - as O2 binds, affinity for more O2 increases', 10),
              createMatch('bio-11-5-m4-l3-a2', 'Match factor with effect on O2 binding', [
                {term: 'High pO2 in lungs', definition: '100% saturation - left side'},
                {term: 'Low pO2 in tissues', definition: 'O2 released - right side'},
                {term: 'High pCO2 (Bohr effect)', definition: 'Shifts curve right - favors release'},
                {term: 'High temperature', definition: 'Shifts curve right - favors release'},
                {term: 'High pH (alkaline)', definition: 'Shifts curve left - favors binding'},
              ], 15),
              createFillBlank('bio-11-5-m4-l3-a3', 'Bohr effect', 'The Bohr effect states that increased CO2 or decreased pH _____ hemoglobins affinity for oxygen.', ['decreases'], ['increases', 'decreases', 'eliminates', 'enhances'], 10),
              createQuiz('bio-11-5-m4-l3-a4', 'P50 represents:', ['O2 capacity', 'Partial pressure at which Hb is 50% saturated', 'CO2 pressure', 'Normal atmospheric pressure'], 1, 'P50 is ~26.6 mmHg - the pO2 where hemoglobin is 50% saturated', 8),
              createTrueFalse('bio-11-5-m4-l3-a5', 'True or False', 'Fetal hemoglobin has a higher affinity for oxygen than adult hemoglobin', true, 'Fetal Hb shifts curve left, allowing O2 transfer from maternal to fetal blood', 8),
            ]
          }
        ]
      },
      // ============ MODULE 5: Regulation & Disorders ============
      {
        id: 'bio-11-5-m5',
        name: 'Regulation & Disorders 🔥',
        description: 'Neural and chemical regulation, respiratory disorders',
        totalTokens: 60,
        levels: [
          {
            id: 'bio-11-5-m5-l1',
            name: '5.1 Regulation of Respiration',
            order: 1,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-5-m5-l1-a1', 'The respiratory rhythm center is located in:', ['Cerebrum', 'Medulla oblongata', 'Pons', 'Cerebellum'], 1, 'Medulla contains the respiratory rhythm center that maintains basic breathing rhythm', 10),
              createMatch('bio-11-5-m5-l1-a2', 'Match respiratory center with function', [
                {term: 'Medulla (Dorsal RC)', definition: 'Inspiration control'},
                {term: 'Medulla (Ventral RC)', definition: 'Expiration control (forced)'},
                {term: 'Pneumotaxic center (Pons)', definition: 'Limits inspiration duration'},
                {term: 'Apneustic center (Pons)', definition: 'Promotes inspiration'},
                {term: 'Chemoreceptors', definition: 'Detect pCO2, pO2, pH changes'},
              ], 15),
              createTrueFalse('bio-11-5-m5-l1-a3', 'True or False', 'Peripheral chemoreceptors in carotid and aortic bodies primarily detect changes in blood pO2', true, 'Peripheral chemoreceptors respond to low O2; central respond to pCO2/pH', 8),
            ]
          },
          {
            id: 'bio-11-5-m5-l2',
            name: '5.2 Respiratory Disorders 🔥',
            order: 2,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-5-m5-l2-a1', 'Asthma is characterized by:', ['Excess mucus production', 'Inflammation and bronchospasm', 'Destruction of alveolar walls', 'Fluid accumulation in lungs'], 1, 'Asthma involves inflammation, bronchoconstriction, and excess mucus - allergic reaction', 10),
              createMatch('bio-11-5-m5-l2-a2', 'Match disorder with characteristic', [
                {term: 'Emphysema', definition: 'Alveolar wall destruction - low elasticity'},
                {term: 'Chronic bronchitis', definition: 'Excess mucus, inflamed bronchi'},
                {term: 'Pneumonia', definition: 'Alveoli filled with fluid/pus'},
                {term: 'Tuberculosis', definition: 'Mycobacterium infection - granulomas'},
                {term: 'COVID-19', definition: 'SARS-CoV-2 - ARDS, cytokine storm'},
              ], 15),
              createFillBlank('bio-11-5-m5-l2-a3', 'COPD', 'COPD includes _____ and _____ - both associated with smoking.', ['emphysema', 'chronic bronchitis'], ['emphysema', 'asthma', 'chronic bronchitis', 'pneumonia'], 10),
              createTrueFalse('bio-11-5-m5-l2-a4', 'True or False', 'Emphysema involves destruction of alveolar walls leading to decreased surface area for gas exchange', true, 'Smoking destroys alveolar septa, reducing elastic recoil and surface area', 8),
            ]
          },
          {
            id: 'bio-11-5-m5-l3',
            name: '5.3 Hypoxia & Mountain Sickness',
            order: 3,
            totalTokens: 15,
            activities: [
              createQuiz('bio-11-5-m5-l3-a1', 'At high altitudes, hypoxia occurs due to:', ['Low temperature', 'Decreased atmospheric pressure and pO2', 'High humidity', 'Less oxygen in air'], 1, 'Total oxygen percentage remains 21%, but lower atmospheric pressure reduces pO2', 10),
              createMatch('bio-11-5-m5-l3-a2', 'Match altitude response with effect', [
                {term: 'Immediate response', definition: 'Hyperventilation'},
                {term: 'Long-term adaptation', definition: 'Increased RBC production'},
                {term: 'Mountain sickness', definition: 'Nausea, fatigue, headache'},
                {term: 'High altitude acclimatization', definition: 'Increased 2,3-DPG production'},
              ], 12),
            ]
          }
        ]
      },
      // ============ MODULE 6: PYQ & Master Review ============
      {
        id: 'bio-11-5-m6',
        name: 'PYQ Master 🔥🔥',
        description: 'Assertion-reason, previous year questions, rapid revision',
        totalTokens: 85,
        levels: [
          {
            id: 'bio-11-5-m6-l1',
            name: '6.1 Assertion-Reason Practice',
            order: 1,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-5-m6-l1-a1', 'Assertion-Reason: Inspiration is an active process BECAUSE Diaphragm contracts and flattens during inspiration.', ['Both true, R explains A', 'Both true, R does NOT explain A', 'A true, R false', 'A false, R true'], 0, 'Both assertion and reason are true, and reason correctly explains assertion - diaphragm contraction is the mechanism', 10),
              createQuiz('bio-11-5-m6-l1-a2', 'Assertion-Reason: CO2 is transported mainly as carbaminohemoglobin BECAUSE Carbonic anhydrase catalyzes CO2 transport.', ['Both true, R explains A', 'Both true, R does NOT explain A', 'A false, R true', 'A false, R false'], 2, 'Assertion is FALSE (70% is bicarbonate, 23% carbaminohemoglobin), but reason is TRUE about carbonic anhydrase', 10),
              createQuiz('bio-11-5-m6-l1-a3', 'Assertion-Reason: Vital capacity is less than total lung capacity BECAUSE Residual volume is included in TLC but not VC.', ['Both true, R explains A', 'Both true, R does NOT explain A', 'A true, R false', 'A false, R true'], 0, 'Both true and reason correctly explains - VC = TV+IRV+ERV; TLC = VC+RV', 10),
              createQuiz('bio-11-5-m6-l1-a4', 'Assertion-Reason: Emphysema destroys alveolar walls BECAUSE This increases surface area for gas exchange.', ['Both true, R explains A', 'Both true, R does NOT explain A', 'A true, R false', 'A false, R false'], 2, 'Assertion TRUE (destruction occurs) but Reason FALSE - surface area DECREASES, not increases', 8),
              createMatch('bio-11-5-m6-l1-a5', 'Match PYQ facts', [
                {term: 'Residual volume', definition: 'Cannot be measured by spirometry'},
                {term: 'Tidal volume', definition: '~500 mL, normal breathing'},
                {term: 'Dead space', definition: '~150 mL, no gas exchange'},
                {term: 'P50', definition: '26.6 mmHg, 50% Hb saturation'},
              ], 12),
            ]
          },
          {
            id: 'bio-11-5-m6-l2',
            name: '6.2 Mixed MCQ Battle',
            order: 2,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-5-m6-l2-a1', 'PYQ: The partial pressure of oxygen in alveoli is:', ['40 mmHg', '104 mmHg', '95 mmHg', '45 mmHg'], 1, 'pO2 in alveoli = 104 mmHg; in venous blood = 40 mmHg; difference drives diffusion', 10),
              createQuiz('bio-11-5-m6-l2-a2', 'PYQ: Which center decreases the duration of inspiration?', ['Apneustic', 'Pneumotaxic', 'Medullary', 'Chemoreceptor'], 1, 'Pneumotaxic center in pons sends signals to switch off inspiration', 10),
              createQuiz('bio-11-5-m6-l2-a3', 'PYQ: Oxygen dissociation curve shifts to the right when:', ['pH increases', 'Temperature decreases', 'pCO2 increases', 'O2 affinity increases'], 2, 'Bohr effect: High pCO2, low pH, high temp shift curve right → O2 release', 10),
              createMatch('bio-11-5-m6-l2-a4', '🎮 Rapid matching', [
                {term: 'Epiglottis', definition: 'Prevents food entry'},
                {term: 'Type II pneumocytes', definition: 'Surfactant secretion'},
                {term: 'Chloride shift', definition: 'HCO3- out, Cl- in'},
                {term: 'Bicarbonate', definition: '70% of CO2 transport'},
              ], 15),
              createFillBlank('bio-11-5-m6-l2-a5', 'NCERT fact', 'The diffusion membrane consists of _____ layers at its thinnest point.', ['three'], ['one', 'two', 'three', 'four'], 10),
            ]
          },
          {
            id: 'bio-11-5-m6-l3',
            name: '6.3 Rapid Revision - 60 Seconds',
            order: 3,
            totalTokens: 30,
            activities: [
              createMatch('bio-11-5-m6-l3-a1', '⚡ Lightning round: Match in 60 seconds', [
                {term: 'Tidal volume', definition: '500 mL'},
                {term: 'Dead space', definition: '150 mL'},
                {term: 'Alveoli count', definition: '300-500 million'},
                {term: 'Hemoglobin heme groups', definition: '4'},
                {term: 'pO2 in arterial blood', definition: '95 mmHg'},
                {term: 'pCO2 in venous blood', definition: '45 mmHg'},
                {term: 'Inspiratory reserve', definition: '2500-3000 mL'},
                {term: 'Residual volume', definition: '1000-1200 mL'},
              ], 20),
              createQuiz('bio-11-5-m6-l3-a2', '⚡ Quick: What prevents tracheal collapse?', ['Smooth muscle', 'C-shaped cartilage', 'Ciliated epithelium', 'Goblet cells'], 1, 'C-shaped hyaline cartilage rings provide structural support', 10),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-11-6',
    name: 'Body Fluids and Circulation',
    description: 'Blood composition, blood groups, clotting, heart, blood vessels, lymphatic system',
    moduleCount: 6,
    modules: [
      // ============ MODULE 1: Blood Composition ============
      {
        id: 'bio-11-6-m1',
        name: 'Blood Composition 🔥',
        description: 'Plasma, RBC, WBC, Platelets - formed elements',
        totalTokens: 90,
        levels: [
          {
            id: 'bio-11-6-m1-l1',
            name: '1.1 Blood Overview & Plasma',
            order: 1,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-6-m1-l1-a1', 'Blood is a type of:', ['Epithelial tissue', 'Connective tissue', 'Muscular tissue', 'Nervous tissue'], 1, 'Blood is a fluid connective tissue - has matrix (plasma) and cells', 10),
              createMatch('bio-11-6-m1-l1-a2', 'Match blood component with percentage', [
                {term: 'Plasma', definition: '55% of blood volume'},
                {term: 'RBCs', definition: '45% (hematocrit)'},
                {term: 'WBCs & Platelets', definition: '<1% (buffy coat)'},
              ], 12),
              createFillBlank('bio-11-6-m1-l1-a3', 'Plasma composition', 'Plasma is about _____% water and contains proteins like _____, globulins, and fibrinogen.', ['90-92', 'albumin'], ['90-92', '85', 'albumin', 'hemoglobin'], 10),
              createTrueFalse('bio-11-6-m1-l1-a4', 'True or False', 'Serum is plasma without clotting factors', true, 'Serum = Plasma - fibrinogen and other clotting factors', 8),
            ]
          },
          {
            id: 'bio-11-6-m1-l2',
            name: '1.2 Erythrocytes (RBCs) 🔥',
            order: 2,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-6-m1-l2-a1', 'RBCs are shaped as:', ['Spherical', 'Biconcave discs', 'Biconvex', 'Cuboidal'], 1, 'Biconcave shape increases surface area for oxygen exchange', 10),
              createMatch('bio-11-6-m1-l2-a2', 'Match RBC feature with significance', [
                {term: 'No nucleus', definition: 'More space for hemoglobin'},
                {term: 'No mitochondria', definition: 'Anaerobic respiration - no O2 consumption'},
                {term: 'Biconcave shape', definition: 'Increases surface area/volume ratio'},
                {term: 'Life span 120 days', definition: 'Destroyed in spleen (graveyard)'},
              ], 15),
              createFillBlank('bio-11-6-m1-l2-a3', 'Hemoglobin structure', 'Each hemoglobin has _____ polypeptide chains (2 alpha, 2 beta) and _____ heme groups with iron.', ['four', 'four'], ['two', 'four', 'six', 'eight'], 10),
              createQuiz('bio-11-6-m1-l2-a4', 'Erythropoietin (EPO) is produced by:', ['Liver', 'Kidneys', 'Bone marrow', 'Spleen'], 1, 'EPO stimulates RBC production in bone marrow', 8),
            ]
          },
          {
            id: 'bio-11-6-m1-l3',
            name: '1.3 Leukocytes (WBCs) 🔥',
            order: 3,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-6-m1-l3-a1', 'Which WBC is most abundant?', ['Lymphocytes', 'Neutrophils', 'Monocytes', 'Eosinophils'], 1, 'Neutrophils are 60-65% of WBCs - first responders to infection', 10),
              createMatch('bio-11-6-m1-l3-a2', 'Match WBC type with function', [
                {term: 'Neutrophils', definition: 'Phagocytosis - bacterial infection'},
                {term: 'Eosinophils', definition: 'Allergies, parasitic infections'},
                {term: 'Basophils', definition: 'Release histamine - inflammation'},
                {term: 'Lymphocytes', definition: 'Immunity - B cells, T cells'},
                {term: 'Monocytes', definition: 'Become macrophages - phagocytosis'},
              ], 15),
              createFillBlank('bio-11-6-m1-l3-a3', 'WBC count', 'Normal WBC count is _____ to _____ cells per cubic mm of blood.', ['4000', '11000'], ['2000', '4000', '8000', '11000'], 10),
              createTrueFalse('bio-11-6-m1-l3-a4', 'True or False', 'Leukemia is characterized by abnormally high WBC count', true, 'Leukemia = cancer of blood-forming tissues, excessive WBCs', 8),
            ]
          },
          {
            id: 'bio-11-6-m1-l4',
            name: '1.4 Platelets (Thrombocytes)',
            order: 4,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-6-m1-l4-a1', 'Platelets are fragments of:', ['RBCs', 'Megakaryocytes', 'Lymphocytes', 'Monocytes'], 1, 'Platelets bud off from megakaryocytes in bone marrow', 10),
              createMatch('bio-11-6-m1-l4-a2', 'Match platelet feature with function', [
                {term: '150,000-350,000 per μL', definition: 'Normal count range'},
                {term: 'No nucleus', definition: 'Cell fragments, not complete cells'},
                {term: 'Granules', definition: 'Contain clotting factors'},
                {term: 'Thrombopoietin', definition: 'Hormone stimulating platelet production'},
              ], 12),
              createTrueFalse('bio-11-6-m1-l4-a3', 'True or False', 'Thrombocytopenia is a condition with abnormally low platelet count', true, 'Low platelets cause bleeding tendency and bruising', 8),
            ]
          }
        ]
      },
      // ============ MODULE 2: Blood Groups & Clotting ============
      {
        id: 'bio-11-6-m2',
        name: 'Blood Groups & Clotting 🔥🔥',
        description: 'ABO system, Rh factor, blood coagulation cascade',
        totalTokens: 85,
        levels: [
          {
            id: 'bio-11-6-m2-l1',
            name: '2.1 ABO Blood Group System 🔥',
            order: 1,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-6-m2-l1-a1', 'ABO blood groups are determined by:', ['RBC surface proteins', 'Antigens on RBC surface', 'Antibodies in plasma', 'Genes on X chromosome'], 1, 'ABO groups based on presence of A and/or B antigens on RBC surface', 10),
              createMatch('bio-11-6-m2-l1-a2', 'Match blood group with antigens/antibodies', [
                {term: 'Type A', definition: 'A antigen, anti-B antibodies'},
                {term: 'Type B', definition: 'B antigen, anti-A antibodies'},
                {term: 'Type AB', definition: 'Both antigens, no antibodies (universal recipient)'},
                {term: 'Type O', definition: 'No antigens, both antibodies (universal donor)'},
              ], 15),
              createFillBlank('bio-11-6-m2-l1-a3', 'Blood typing', 'A person with A blood type has _____ antigens on RBCs and _____ antibodies in plasma.', ['A', 'anti-B'], ['A', 'B', 'anti-A', 'anti-B'], 10),
              createTrueFalse('bio-11-6-m2-l1-a4', 'True or False', 'Type AB+ is the universal recipient for blood transfusions', true, 'AB+ has all antigens (A, B, Rh+) and no antibodies against them', 8),
            ]
          },
          {
            id: 'bio-11-6-m2-l2',
            name: '2.2 Rh Factor 🔥',
            order: 2,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-6-m2-l2-a1', 'Rh factor is named after:', ['Rhesus monkey', 'Rhodesia', 'Rheumatoid factor', 'Rhodopsin'], 0, 'Discovered in Rhesus monkeys - D antigen on RBC surface', 10),
              createMatch('bio-11-6-m2-l2-a2', 'Match Rh status with description', [
                {term: 'Rh+', definition: 'Has D antigen on RBCs'},
                {term: 'Rh-', definition: 'No D antigen on RBCs'},
                {term: 'Erythroblastosis fetalis', definition: 'Hemolytic disease of newborn'},
                {term: 'Anti-D injection', definition: 'Given to Rh- mothers after delivery'},
              ], 12),
              createTrueFalse('bio-11-6-m2-l2-a3', 'True or False', 'Erythroblastosis fetalis occurs when Rh- mother carries second Rh+ fetus', true, 'First pregnancy sensitizes mother; second pregnancy causes antibody attack on fetal RBCs', 8),
            ]
          },
          {
            id: 'bio-11-6-m2-l3',
            name: '2.3 Blood Coagulation 🔥',
            order: 3,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-6-m2-l3-a1', 'The final step in clotting converts fibrinogen to:', ['Thrombin', 'Fibrin', 'Prothrombin', 'Calcium'], 1, 'Thrombin enzyme converts soluble fibrinogen to insoluble fibrin mesh', 10),
              createMatch('bio-11-6-m2-l3-a2', 'Match clotting factor with role', [
                {term: 'Factor I', definition: 'Fibrinogen - converted to fibrin'},
                {term: 'Factor II', definition: 'Prothrombin - converted to thrombin'},
                {term: 'Thromboplastin', definition: 'Released from injured tissue'},
                {term: 'Calcium ions', definition: 'Factor IV - essential for clotting'},
                {term: 'Vitamin K', definition: 'Required for prothrombin synthesis'},
              ], 15),
              createFillBlank('bio-11-6-m2-l3-a3', 'Clotting cascade', 'Blood clotting involves a cascade where _____ activates prothrombin to _____.', ['thromboplastin', 'thrombin'], ['fibrin', 'thromboplastin', 'thrombin', 'fibrinogen'], 10),
              createTrueFalse('bio-11-6-m2-l3-a4', 'True or False', 'Hemophilia is a genetic disorder affecting blood clotting factors', true, 'Hemophilia A (Factor VIII deficiency) and B (Factor IX deficiency) are X-linked recessive', 8),
            ]
          },
          {
            id: 'bio-11-6-m2-l4',
            name: '2.4 Anticoagulants & Disorders',
            order: 4,
            totalTokens: 15,
            activities: [
              createQuiz('bio-11-6-m2-l4-a1', 'Heparin is produced by:', ['Liver', 'Basophils and mast cells', 'Platelets', 'Kidneys'], 1, 'Heparin is a natural anticoagulant preventing blood clotting in vessels', 10),
              createMatch('bio-11-6-m2-l4-a2', 'Match disorder with description', [
                {term: 'Thrombosis', definition: 'Clot formation in blood vessels'},
                {term: 'Embolism', definition: 'Clot travels and blocks vessel'},
                {term: 'Hemophilia', definition: 'Delayed blood clotting'},
                {term: 'Thrombocytopenia', definition: 'Low platelet count'},
              ], 12),
            ]
          }
        ]
      },
      // ============ MODULE 3: Heart Anatomy ============
      {
        id: 'bio-11-6-m3',
        name: 'Human Heart 🔥🔥',
        description: 'Structure, chambers, valves, cardiac muscle',
        totalTokens: 80,
        levels: [
          {
            id: 'bio-11-6-m3-l1',
            name: '3.1 Heart Overview 🔥',
            order: 1,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-6-m3-l1-a1', 'The heart is located in:', ['Abdominal cavity', 'Thoracic cavity - mediastinum', 'Pleural cavity', 'Pericardial cavity only'], 1, 'Heart is in mediastinum between lungs, enclosed in pericardium', 10),
              createMatch('bio-11-6-m3-l1-a2', 'Match heart structure with description', [
                {term: 'Pericardium', definition: 'Double-walled protective sac'},
                {term: 'Myocardium', definition: 'Cardiac muscle - heart wall'},
                {term: 'Endocardium', definition: 'Inner endothelial lining'},
                {term: 'Septum', definition: 'Wall separating left and right sides'},
              ], 15),
              createFillBlank('bio-11-6-m3-l1-a3', 'Heart size', 'Human heart is about the size of a _____ and weighs approximately _____ grams.', ['fist', '300'], ['fist', 'head', '300', '500'], 8),
              createTrueFalse('bio-11-6-m3-l1-a4', 'True or False', 'The heart is myogenic - can generate its own electrical impulses', true, 'Cardiac muscle is self-excitable; SA node initiates heartbeat', 8),
            ]
          },
          {
            id: 'bio-11-6-m3-l2',
            name: '3.2 Heart Chambers & Valves 🔥',
            order: 2,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-6-m3-l2-a1', 'Which chamber has the thickest wall?', ['Right atrium', 'Left ventricle', 'Right ventricle', 'Left atrium'], 1, 'Left ventricle pumps blood to entire body - needs more force', 10),
              createMatch('bio-11-6-m3-l2-a2', 'Match valve with location and function', [
                {term: 'Tricuspid valve', definition: 'Between right atrium and ventricle'},
                {term: 'Bicuspid/Mitral valve', definition: 'Between left atrium and ventricle'},
                {term: 'Pulmonary semilunar', definition: 'At exit of right ventricle'},
                {term: 'Aortic semilunar', definition: 'At exit of left ventricle'},
              ], 15),
              createFillBlank('bio-11-6-m3-l2-a3', 'Valve sounds', 'The "lub" sound is caused by closure of _____ valves; "dub" by closure of _____ valves.', ['AV/atrioventricular', 'semilunar'], ['AV', 'semilunar', 'tricuspid', 'mitral'], 10),
              createQuiz('bio-11-6-m3-l2-a4', 'The foramen ovale in fetal heart becomes _____ in adults.', ['Fossa ovalis', 'Ligamentum arteriosum', 'Septum primum', 'Septum secundum'], 0, 'Foramen ovale closes at birth and becomes fossa ovalis (depression in interatrial septum)', 8),
            ]
          },
          {
            id: 'bio-11-6-m3-l3',
            name: '3.3 Blood Flow Pathway',
            order: 3,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-6-m3-l3-a1', 'Blood entering the right atrium comes from:', ['Lungs', 'Systemic circulation/Superior & inferior vena cava', 'Left ventricle', 'Pulmonary veins'], 1, 'Deoxygenated blood returns from body via venae cavae to right atrium', 10),
              createMatch('bio-11-6-m3-l3-a2', 'Match pathway with blood type', [
                {term: 'Pulmonary artery', definition: 'Carries deoxygenated blood to lungs'},
                {term: 'Pulmonary veins', definition: 'Carry oxygenated blood to heart'},
                {term: 'Aorta', definition: 'Carries oxygenated blood to body'},
                {term: 'Vena cava', definition: 'Carries deoxygenated blood to heart'},
              ], 15),
              createFillBlank('bio-11-6-m3-l3-a3', 'Double circulation', 'Humans have _____ circulation - pulmonary (lungs) and _____ (body).', ['double', 'systemic'], ['single', 'double', 'open', 'systemic'], 10),
              createTrueFalse('bio-11-6-m3-l3-a4', 'True or False', 'Pulmonary veins are the only veins that carry oxygenated blood', true, 'All other veins carry deoxygenated blood; all arteries carry oxygenated except pulmonary', 8),
            ]
          },
          {
            id: 'bio-11-6-m3-l4',
            name: '3.4 Cardiac Muscle Tissue',
            order: 4,
            totalTokens: 15,
            activities: [
              createQuiz('bio-11-6-m3-l4-a1', 'Cardiac muscle cells are connected by:', ['Tight junctions', 'Intercalated discs', 'Gap junctions only', 'Desmosomes only'], 1, 'Intercalated discs contain desmosomes and gap junctions for synchronized contraction', 10),
              createMatch('bio-11-6-m3-l4-a2', 'Match cardiac muscle feature with significance', [
                {term: 'Striated', definition: 'Similar to skeletal muscle - sarcomeres'},
                {term: 'Branched fibers', definition: 'Form network for coordinated contraction'},
                {term: 'Intercalated discs', definition: 'Allow rapid spread of action potentials'},
                {term: 'Single nucleus', definition: 'Each cell has one central nucleus'},
              ], 12),
              createTrueFalse('bio-11-6-m3-l4-a3', 'True or False', 'Cardiac muscle never fatigues because it relies on aerobic respiration', true, 'Rich in mitochondria (30% of cell volume) - continuous ATP production', 8),
            ]
          }
        ]
      },
      // ============ MODULE 4: Cardiac Cycle & ECG ============
      {
        id: 'bio-11-6-m4',
        name: 'Cardiac Cycle & ECG 🔥🔥',
        description: 'Heart contraction phases, electrical activity, ECG waves',
        totalTokens: 75,
        levels: [
          {
            id: 'bio-11-6-m4-l1',
            name: '4.1 Conducting System of Heart 🔥',
            order: 1,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-6-m4-l1-a1', 'The pacemaker of the heart is:', ['AV node', 'SA node/Sinoatrial node', 'Bundle of His', 'Purkinje fibers'], 1, 'SA node in right atrium initiates heartbeat at 70-80 beats/min', 10),
              createMatch('bio-11-6-m4-l1-a2', 'Match conduction structure with function', [
                {term: 'SA node', definition: 'Pacemaker - generates impulse'},
                {term: 'AV node', definition: 'Delays impulse to allow atrial contraction'},
                {term: 'Bundle of His', definition: 'Conducts impulse to ventricles'},
                {term: 'Purkinje fibers', definition: 'Distribute impulse to ventricular muscle'},
              ], 15),
              createFillBlank('bio-11-6-m4-l1-a3', 'Heart rate', 'Normal heart rate is _____-_____ beats per minute at rest.', ['70', '80'], ['50', '60', '70', '80'], 8),
              createTrueFalse('bio-11-6-m4-l1-a4', 'True or False', 'The AV node delays the electrical impulse to allow complete ventricular filling', true, 'AV nodal delay = 0.1 sec - allows atria to empty before ventricles contract', 8),
            ]
          },
          {
            id: 'bio-11-6-m4-l2',
            name: '4.2 Cardiac Cycle 🔥',
            order: 2,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-6-m4-l2-a1', 'During ventricular systole:', ['AV valves open', 'AV valves close, semilunar valves open', 'All valves closed', 'All valves open'], 1, 'Ventricles contract → pressure rises → AV valves close → semilunar valves open', 10),
              createMatch('bio-11-6-m4-l2-a2', 'Match cardiac phase with events', [
                {term: 'Atrial systole', definition: 'Atria contract - ventricular filling'},
                {term: 'Ventricular systole', definition: 'Ventricles contract - blood ejected'},
                {term: 'Joint diastole', definition: 'All chambers relaxed - filling'},
                {term: 'Isovolumetric contraction', definition: 'All valves closed - pressure builds'},
              ], 15),
              createFillBlank('bio-11-6-m4-l2-a3', 'Stroke volume', 'One cardiac cycle takes about _____ seconds; stroke volume is approximately _____ mL.', ['0.8', '70'], ['0.5', '0.8', '50', '70'], 10),
              createQuiz('bio-11-6-m4-l2-a4', 'Cardiac output equals:', ['Heart rate × Stroke volume', 'Blood pressure × Heart rate', 'Stroke volume ÷ Heart rate', 'Heart rate only'], 0, 'Cardiac output = HR × SV = ~5 L/min at rest', 8),
            ]
          },
          {
            id: 'bio-11-6-m4-l3',
            name: '4.3 ECG (Electrocardiogram) 🔥',
            order: 3,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-6-m4-l3-a1', 'The P wave in ECG represents:', ['Ventricular depolarization', 'Atrial depolarization', 'Ventricular repolarization', 'Atrial repolarization'], 1, 'P wave = atrial depolarization (contraction); hidden by QRS in repolarization', 10),
              createMatch('bio-11-6-m4-l3-a2', 'Match ECG wave with event', [
                {term: 'P wave', definition: 'Atrial depolarization'},
                {term: 'QRS complex', definition: 'Ventricular depolarization (atrial repolarization hidden)'},
                {term: 'T wave', definition: 'Ventricular repolarization'},
                {term: 'PQ interval', definition: 'Atrial contraction time'},
              ], 15),
              createFillBlank('bio-11-6-m4-l3-a3', 'ECG intervals', 'The _____ segment represents the time when ventricles are fully depolarized and contracting.', ['ST'], ['PQ', 'ST', 'QR', 'T'], 8),
              createTrueFalse('bio-11-6-m4-l3-a4', 'True or False', 'An abnormal ECG can detect arrhythmias, myocardial infarction, and conduction defects', true, 'ECG is a valuable diagnostic tool for heart conditions', 8),
            ]
          },
          {
            id: 'bio-11-6-m4-l4',
            name: '4.4 Heart Sounds & Murmurs',
            order: 4,
            totalTokens: 10,
            activities: [
              createQuiz('bio-11-6-m4-l4-a1', 'The "lubb" sound is produced by closure of:', ['Semilunar valves', 'AV valves (tricuspid and bicuspid)', 'Pulmonary valve', 'Aortic valve'], 1, 'Lubb (S1) = AV valve closure at start of ventricular systole', 10),
              createMatch('bio-11-6-m4-l4-a2', 'Match heart sound with cause', [
                {term: 'Lubb (S1)', definition: 'Closure of AV valves'},
                {term: 'Dup (S2)', definition: 'Closure of semilunar valves'},
                {term: 'Heart murmur', definition: 'Turbulent blood flow through valves'},
                {term: 'S3 gallop', definition: 'Rapid ventricular filling'},
              ], 12),
            ]
          }
        ]
      },
      // ============ MODULE 5: Blood Vessels & Blood Pressure ============
      {
        id: 'bio-11-6-m5',
        name: 'Blood Vessels & Pressure 🔥',
        description: 'Arteries, veins, capillaries, blood pressure regulation',
        totalTokens: 70,
        levels: [
          {
            id: 'bio-11-6-m5-l1',
            name: '5.1 Types of Blood Vessels 🔥',
            order: 1,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-6-m5-l1-a1', 'Which blood vessel has the thickest wall?', ['Capillary', 'Artery', 'Vein', 'Venule'], 1, 'Arteries have thick muscular walls to withstand high pressure', 10),
              createMatch('bio-11-6-m5-l1-a2', 'Match vessel type with feature', [
                {term: 'Arteries', definition: 'Thick walls, small lumen, carry blood away from heart'},
                {term: 'Veins', definition: 'Thin walls, large lumen, valves present'},
                {term: 'Capillaries', definition: 'Single layer endothelium - exchange'},
                {term: 'Arterioles', definition: 'Small arteries - control blood flow'},
              ], 15),
              createFillBlank('bio-11-6-m5-l1-a3', 'Capillary exchange', 'Capillaries form a network called _____ between arterioles and venules.', ['capillary bed'], ['venous pool', 'capillary bed', 'arterial network'], 8),
              createTrueFalse('bio-11-6-m5-l1-a4', 'True or False', 'Veins have valves to prevent backflow of blood against gravity', true, 'Skeletal muscle contraction and valves help venous return', 8),
            ]
          },
          {
            id: 'bio-11-6-m5-l2',
            name: '5.2 Blood Pressure 🔥',
            order: 2,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-6-m5-l2-a1', 'Normal blood pressure is about:', ['120/80 mmHg', '80/120 mmHg', '140/90 mmHg', '100/60 mmHg'], 0, '120 mmHg systolic (contraction) / 80 mmHg diastolic (relaxation)', 10),
              createMatch('bio-11-6-m5-l2-a2', 'Match BP term with definition', [
                {term: 'Systolic pressure', definition: 'Maximum pressure during ventricular contraction'},
                {term: 'Diastolic pressure', definition: 'Minimum pressure during ventricular relaxation'},
                {term: 'Pulse pressure', definition: 'Systolic - Diastolic (~40 mmHg)'},
                {term: 'Mean arterial pressure', definition: 'Diastolic + 1/3 pulse pressure'},
              ], 15),
              createFillBlank('bio-11-6-m5-l2-a3', 'BP measurement', 'Blood pressure is measured using a _____ and recorded as _____/_____ mmHg.', ['sphygmomanometer', 'systolic', 'diastolic'], ['sphygmomanometer', 'stethoscope', 'systolic', 'diastolic'], 10),
              createQuiz('bio-11-6-m5-l2-a4', 'Hypertension is defined as BP above:', ['120/80', '140/90', '160/100', '100/60'], 1, '140/90 mmHg or higher is considered high blood pressure', 8),
            ]
          },
          {
            id: 'bio-11-6-m5-l3',
            name: '5.3 Blood Pressure Regulation',
            order: 3,
            totalTokens: 15,
            activities: [
              createQuiz('bio-11-6-m5-l3-a1', 'Baroreceptors detect changes in:', ['Blood oxygen', 'Blood pressure', 'Blood pH', 'Blood glucose'], 1, 'Baroreceptors in carotid sinus and aortic arch detect stretch/pressure changes', 10),
              createMatch('bio-11-6-m5-l3-a2', 'Match regulatory mechanism with effect', [
                {term: 'Neural regulation', definition: 'ANS controls heart rate and vasoconstriction'},
                {term: 'Hormonal regulation', definition: 'Adrenaline, ADH, aldosterone affect BP'},
                {term: 'Renal regulation', definition: 'Kidneys control blood volume'},
                {term: 'Chemoreceptors', definition: 'Detect O2, CO2, H+ levels'},
              ], 12),
            ]
          },
          {
            id: 'bio-11-6-m5-l4',
            name: '5.4 Microcirculation',
            order: 4,
            totalTokens: 10,
            activities: [
              createQuiz('bio-11-6-m5-l4-a1', 'Blood flow through capillaries is regulated by:', ['Sphincters', 'Precapillary sphincters', 'Valves', 'Pacemaker cells'], 1, 'Precapillary sphincters control blood entry into capillary beds', 10),
              createMatch('bio-11-6-m5-l4-a2', 'Match capillary mechanism with function', [
                {term: 'Bulk flow', definition: 'Fluid movement by pressure gradient'},
                {term: 'Diffusion', definition: 'Gas and solute exchange'},
                {term: 'Pinocytosis', definition: 'Vesicular transport of large molecules'},
                {term: 'Osmotic pressure', definition: 'Albumin draws fluid back'},
              ], 12),
            ]
          }
        ]
      },
      // ============ MODULE 6: Lymphatic System & PYQ ============
      {
        id: 'bio-11-6-m6',
        name: 'Lymphatic System & PYQ 🔥',
        description: 'Lymph, lymph nodes, immunity, previous year questions',
        totalTokens: 65,
        levels: [
          {
            id: 'bio-11-6-m6-l1',
            name: '6.1 Lymphatic System 🔥',
            order: 1,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-6-m6-l1-a1', 'Lymph is:', ['Blood plasma', 'Blood minus large proteins and RBCs', 'Interstitial fluid in lymph vessels', 'Both B and C'], 3, 'Lymph is interstitial fluid that enters lymphatic vessels - clear, pale', 10),
              createMatch('bio-11-6-m6-l1-a2', 'Match lymphatic structure with function', [
                {term: 'Lymph capillaries', definition: 'Blind-ended, pick up tissue fluid'},
                {term: 'Lymph nodes', definition: 'Filter lymph, contain lymphocytes'},
                {term: 'Lymph ducts', definition: 'Return lymph to bloodstream'},
                {term: 'Thoracic duct', definition: 'Drains left side and lower body'},
              ], 15),
              createFillBlank('bio-11-6-m6-l1-a3', 'Lymph composition', 'Lymph contains _____, lymphocytes, and transports _____ from tissues.', ['proteins', 'fats'], ['RBCs', 'proteins', 'WBCs', 'fats'], 8),
              createTrueFalse('bio-11-6-m6-l1-a4', 'True or False', 'The lymphatic system returns excess tissue fluid to blood and transports fats from intestine', true, 'Lymph maintains fluid balance and absorbs dietary fats (chylomicrons)', 8),
            ]
          },
          {
            id: 'bio-11-6-m6-l2',
            name: '6.2 Spleen & Thymus',
            order: 2,
            totalTokens: 15,
            activities: [
              createQuiz('bio-11-6-m6-l2-a1', 'The spleen is called the graveyard of RBCs because:', ['It produces RBCs', 'It destroys old RBCs', 'It stores blood', 'It filters lymph'], 1, 'Spleen phagocytoses old/damaged RBCs and removes them from circulation', 10),
              createMatch('bio-11-6-m6-l2-a2', 'Match lymphoid organ with function', [
                {term: 'Spleen', definition: 'Blood filtration, immune response'},
                {term: 'Thymus', definition: 'T-cell maturation (T = thymus)'},
                {term: 'Tonsils', definition: 'Trap pathogens entering throat'},
                {term: 'Peyer patches', definition: 'Lymphoid tissue in intestine'},
              ], 12),
            ]
          },
          {
            id: 'bio-11-6-m6-l3',
            name: '6.3 PYQ Master 🔥',
            order: 3,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-6-m6-l3-a1', 'PYQ: Which granulocyte is most abundant?', ['Basophils', 'Neutrophils', 'Eosinophils', 'Lymphocytes'], 1, 'Neutrophils = 60-65% of WBCs - most abundant', 10),
              createQuiz('bio-11-6-m6-l3-a2', 'PYQ: Erythropoietin is produced by:', ['Liver', 'Kidneys', 'Bone marrow', 'Spleen'], 1, 'EPO is produced by kidneys in response to low oxygen', 10),
              createQuiz('bio-11-6-m6-l3-a3', 'PYQ: The pacemaker of the heart is:', ['AV node', 'SA node', 'Purkinje fibers', 'Bundle of His'], 1, 'SA (Sinoatrial) node is the natural pacemaker', 10),
              createQuiz('bio-11-6-m6-l3-a4', 'PYQ: Which blood group is the universal donor?', ['A+', 'AB+', 'O-', 'B+'], 2, 'O- has no A, B, or Rh antigens - can donate to anyone', 10),
              createMatch('bio-11-6-m6-l3-a5', '🎮 Match the concepts', [
                {term: 'Universal donor', definition: 'O negative'},
                {term: 'Universal recipient', definition: 'AB positive'},
                {term: 'Cardiac output', definition: 'Heart rate × Stroke volume'},
                {term: 'Hematocrit', definition: '% of RBCs in blood (~45%)'},
                {term: 'Thrombin', definition: 'Converts fibrinogen to fibrin'},
              ], 15),
              createFillBlank('bio-11-6-m6-l3-a6', 'Quick facts', 'Cardiac output at rest is about _____ L/min; blood volume in adult is _____ L.', ['5', '5'], ['3', '5', '5', '7'], 10),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-11-7',
    name: 'Excretory Products and Their Elimination',
    description: 'Human excretory system, nephron, urine formation, osmoregulation, disorders',
    moduleCount: 6,
    modules: [
      // ============ MODULE 1: Human Excretory System ============
      {
        id: 'bio-11-7-m1',
        name: 'Human Excretory System 🔥',
        description: 'Kidneys, ureters, urinary bladder, urethra - anatomy and location',
        totalTokens: 75,
        levels: [
          {
            id: 'bio-11-7-m1-l1',
            name: '1.1 Excretory Organs Overview',
            order: 1,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-7-m1-l1-a1', 'The primary excretory organs in humans are:', ['Liver and skin', 'Lungs and kidneys', 'Kidneys', 'Skin only'], 2, 'Kidneys are the main excretory organs producing urine', 10),
              createMatch('bio-11-7-m1-l1-a2', 'Match organ with excretory product', [
                {term: 'Kidneys', definition: 'Urea, creatinine, uric acid'},
                {term: 'Lungs', definition: 'CO2 and water vapor'},
                {term: 'Liver', definition: 'Bile pigments, urea synthesis'},
                {term: 'Skin', definition: 'Sweat (water, salts, urea)'},
                {term: 'Sebaceous glands', definition: 'Sebum'},
              ], 15),
              createFillBlank('bio-11-7-m1-l1-a3', 'Ammonotelism types', 'Fish are _____, amphibians are _____, and birds are uricotelic.', ['ammoniotelic', 'ureotelic'], ['ammoniotelic', 'ureotelic', 'uricotelic', 'guanotelic'], 10),
              createTrueFalse('bio-11-7-m1-l1-a4', 'True or False', 'Ammonia is the most toxic nitrogenous waste requiring dilute urine for excretion', true, 'Ammonia requires maximum water; uric acid requires minimum water', 8),
            ]
          },
          {
            id: 'bio-11-7-m1-l2',
            name: '1.2 Kidney Structure 🔥',
            order: 2,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-7-m1-l2-a1', 'Each kidney contains approximately:', ['1000 nephrons', '1 million nephrons', '100,000 nephrons', '10,000 nephrons'], 1, 'Each kidney has ~1 million (10 lakh) nephrons', 10),
              createMatch('bio-11-7-m1-l2-a2', 'Match kidney structure with location/feature', [
                {term: 'Renal cortex', definition: 'Outer region - contains glomeruli'},
                {term: 'Renal medulla', definition: 'Inner region - contains pyramids'},
                {term: 'Renal pelvis', definition: 'Funnel-shaped cavity leading to ureter'},
                {term: 'Renal artery', definition: 'Supplies oxygenated blood to kidney'},
                {term: 'Renal vein', definition: 'Drains deoxygenated blood from kidney'},
              ], 15),
              createFillBlank('bio-11-7-m1-l2-a3', 'Kidney dimensions', 'Human kidney is about _____-_____ cm long, _____-_____ cm wide, and weighs about _____ g.', ['10', '12', '5', '6', '150'], ['10', '5', '150', '8', '12'], 10),
              createQuiz('bio-11-7-m1-l2-a4', 'The functional unit of kidney is:', ['Nephron', 'Glomerulus', 'Bowmans capsule', 'Collecting duct'], 0, 'Nephron is the structural and functional unit of kidney', 10),
              createTrueFalse('bio-11-7-m1-l2-a5', 'True or False', 'The right kidney is slightly lower than the left due to the presence of liver', true, 'Liver occupies more space on right side, pushing right kidney down', 8),
            ]
          },
          {
            id: 'bio-11-7-m1-l3',
            name: '1.3 Urinary Passages',
            order: 3,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-7-m1-l3-a1', 'Urine is carried from kidney to bladder by:', ['Urethra', 'Ureter', 'Renal vein', 'Renal artery'], 1, 'Two ureters - one from each kidney - carry urine to urinary bladder', 10),
              createMatch('bio-11-7-m1-l3-a2', 'Match urinary passage with feature', [
                {term: 'Ureter', definition: 'Muscular tube, peristaltic movements'},
                {term: 'Urinary bladder', definition: 'Muscular sac, stores urine'},
                {term: 'Urethra', definition: 'Carries urine to exterior'},
                {term: 'Urinary meatus', definition: 'External opening of urethra'},
              ], 15),
              createFillBlank('bio-11-7-m1-l3-a3', 'Bladder capacity', 'The urinary bladder can hold about _____-_____ mL of urine comfortably.', ['300', '400'], ['300', '500', '400', '600'], 8),
              createTrueFalse('bio-11-7-m1-l3-a4', 'True or False', 'The urethra in females is shorter than in males', true, 'Female urethra ~4 cm, male ~20 cm - females more prone to UTIs', 8),
            ]
          }
        ]
      },
      // ============ MODULE 2: Nephron Structure ============
      {
        id: 'bio-11-7-m2',
        name: 'Nephron Structure 🔥🔥',
        description: 'Renal corpuscle, tubule segments, juxtaglomerular apparatus',
        totalTokens: 70,
        levels: [
          {
            id: 'bio-11-7-m2-l1',
            name: '2.1 Nephron Overview 🔥',
            order: 1,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-7-m2-l1-a1', 'Nephrons are classified based on location into:', ['Cortical and juxtamedullary', 'Proximal and distal', 'Superficial and deep', 'A and B only'], 0, 'Cortical nephrons (85%) in outer cortex; juxtamedullary (15%) near medulla', 10),
              createMatch('bio-11-7-m2-l1-a2', 'Match nephron type with feature', [
                {term: 'Cortical nephron', definition: '85%, short loop of Henle'},
                {term: 'Juxtamedullary nephron', definition: '15%, long loop of Henle'},
                {term: 'Loop of Henle', definition: 'Hairpin loop in medulla'},
                {term: 'Vasa recta', definition: 'Capillary loop alongside long nephrons'},
              ], 15),
              createFillBlank('bio-11-7-m2-l1-a3', 'Nephron parts', 'Each nephron has a _____ corpuscle and a renal _____.', ['renal', 'tubule'], ['renal', 'tubule', 'medulla', 'pyramid'], 10),
              createTrueFalse('bio-11-7-m2-l1-a4', 'True or False', 'Juxtamedullary nephrons are essential for producing concentrated urine', true, 'Long loop of Henle extends deep into medulla for water conservation', 8),
            ]
          },
          {
            id: 'bio-11-7-m2-l2',
            name: '2.2 Renal Corpuscle 🔥',
            order: 2,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-7-m2-l2-a1', 'The glomerulus is formed by:', ['Afferent arteriole', 'Efferent arteriole', 'Afferent arteriole branching into capillaries', 'Renal vein'], 2, 'Afferent arteriole enters, branches into glomerular capillaries, exits as efferent arteriole', 10),
              createMatch('bio-11-7-m2-l2-a2', 'Match structure with description', [
                {term: 'Bowmans capsule', definition: 'Double-walled cup surrounding glomerulus'},
                {term: 'Podocytes', definition: 'Cells with foot processes on capillaries'},
                {term: 'Glomerular filtrate', definition: 'Plasma minus proteins and cells'},
                {term: 'Mesangial cells', definition: 'Support glomerular capillaries'},
              ], 15),
              createFillBlank('bio-11-7-m2-l2-a3', 'Filtration barrier', 'The filtration membrane includes fenestrated _____, basement membrane, and _____ slit pores.', ['endothelium', 'podocyte'], ['endothelium', 'epithelium', 'podocyte', 'mesangial'], 10),
              createQuiz('bio-11-7-m2-l2-a4', 'Glomerular filtration rate (GFR) is approximately:', ['75 mL/min', '125 mL/min', '180 L/day', 'Both B and C'], 3, 'GFR = ~125 mL/min = 180 L/day - total volume filtered', 10),
              createTrueFalse('bio-11-7-m2-l2-a5', 'True or False', 'The efferent arteriole is narrower than the afferent arteriole creating high pressure in glomerulus', true, 'Constriction of efferent arteriole maintains glomerular hydrostatic pressure', 8),
            ]
          },
          {
            id: 'bio-11-7-m2-l3',
            name: '2.3 Renal Tubule 🔥',
            order: 3,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-7-m2-l3-a1', 'The proximal convoluted tubule (PCT) is lined by:', ['Simple squamous', 'Simple cuboidal with microvilli', 'Simple columnar', 'Stratified squamous'], 1, 'PCT has brush border (microvilli) for maximum reabsorption', 10),
              createMatch('bio-11-7-m2-l3-a2', 'Match tubule segment with function', [
                {term: 'PCT', definition: 'Reabsorbs 65-70% of filtrate'},
                {term: 'Descending limb', definition: 'Permeable to water, impermeable to solutes'},
                {term: 'Ascending limb', definition: 'Impermeable to water, pumps out NaCl'},
                {term: 'DCT', definition: 'Conditional reabsorption of water and Na+'},
                {term: 'Collecting duct', definition: 'Water reabsorption under ADH control'},
              ], 15),
              createFillBlank('bio-11-7-m2-l3-a3', 'Counter-current', 'The loop of Henle creates a _____ gradient in the medulla essential for _____ urine formation.', ['osmotic', 'concentrated'], ['osmotic', 'concentrated', 'hydrostatic', 'dilute'], 10),
              createTrueFalse('bio-11-7-m2-l3-a4', 'True or False', 'The ascending limb of loop of Henle is impermeable to water but actively transports Na+ and Cl-', true, 'This creates the osmotic gradient in medullary interstitium', 8),
            ]
          }
        ]
      },
      // ============ MODULE 3: Urine Formation ============
      {
        id: 'bio-11-7-m3',
        name: 'Urine Formation 🔥🔥',
        description: 'Glomerular filtration, selective reabsorption, tubular secretion',
        totalTokens: 85,
        levels: [
          {
            id: 'bio-11-7-m3-l1',
            name: '3.1 Glomerular Filtration 🔥',
            order: 1,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-7-m3-l1-a1', 'Glomerular filtrate is similar to blood plasma except it lacks:', ['Glucose', 'Proteins and cells', 'Amino acids', 'Electrolytes'], 1, 'Filtration barrier prevents proteins (albumin) and cells from passing', 10),
              createMatch('bio-11-7-m3-l1-a2', 'Match filtration factor with effect', [
                {term: 'Glomerular hydrostatic pressure', definition: 'Favors filtration (~55 mmHg)'},
                {term: 'Capsular hydrostatic pressure', definition: 'Opposes filtration (~15 mmHg)'},
                {term: 'Colloid osmotic pressure', definition: 'Opposes filtration (~30 mmHg)'},
                {term: 'Net filtration pressure', definition: '~10 mmHg (favors filtration)'},
              ], 15),
              createFillBlank('bio-11-7-m3-l1-a3', 'Filtration equation', 'Net filtration pressure = Glomerular HP - (Capsular HP + _____ _____ pressure)', ['blood colloid', 'osmotic'], ['blood colloid', 'capsular', 'osmotic', 'hydrostatic'], 10),
              createQuiz('bio-11-7-m3-l1-a4', 'The filtration fraction is approximately:', ['5%', '20%', '50%', '100%'], 1, '~20% of plasma entering kidney is filtered; 80% exits via efferent arteriole', 10),
              createTrueFalse('bio-11-7-m3-l1-a5', 'True or False', 'Glomerular filtration is a passive process driven by hydrostatic pressure', true, 'No ATP required - physical pressure forces fluid through filtration membrane', 8),
            ]
          },
          {
            id: 'bio-11-7-m3-l2',
            name: '3.2 Tubular Reabsorption 🔥',
            order: 2,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-7-m3-l2-a1', 'Maximum reabsorption occurs in:', ['DCT', 'PCT', 'Collecting duct', 'Loop of Henle'], 1, 'PCT reabsorbs 65-70% of filtered water, all glucose, amino acids, most ions', 10),
              createMatch('bio-11-7-m3-l2-a2', 'Match substance with reabsorption mechanism', [
                {term: 'Glucose', definition: 'Secondary active transport with Na+'},
                {term: 'Amino acids', definition: 'Secondary active transport'},
                {term: 'Na+', definition: 'Active transport (Na+/K+ pump)'},
                {term: 'Water', definition: 'Osmosis (follows solutes)'},
                {term: 'Urea', definition: 'Passive diffusion (50% reabsorbed)'},
              ], 15),
              createFillBlank('bio-11-7-m3-l2-a3', 'Glucose transport', 'Glucose is reabsorbed by _____ _____ transport using SGLT proteins with Na+.', ['secondary', 'active'], ['secondary', 'active', 'primary', 'facilitated'], 10),
              createQuiz('bio-11-7-m3-l2-a4', 'Transport maximum (Tm) for glucose is about:', ['100 mg/min', '375 mg/min', '180 g/day', 'Both B and C'], 3, 'Tm = ~375 mg/min; if blood glucose exceeds 180 mg/dL, glucose appears in urine', 10),
              createTrueFalse('bio-11-7-m3-l2-a5', 'True or False', 'Glucosuria (glucose in urine) occurs when blood glucose exceeds renal threshold (~180 mg/dL)', true, 'Diabetes mellitus causes hyperglycemia exceeding reabsorption capacity', 8),
            ]
          },
          {
            id: 'bio-11-7-m3-l3',
            name: '3.3 Tubular Secretion',
            order: 3,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-7-m3-l3-a1', 'Tubular secretion mainly occurs in:', ['PCT only', 'DCT and PCT', 'Loop of Henle only', 'Collecting duct only'], 1, 'Secretion of H+, K+, NH3, drugs, toxins occurs mainly in PCT and DCT', 10),
              createMatch('bio-11-7-m3-l3-a2', 'Match secreted substance with purpose', [
                {term: 'H+ ions', definition: 'Acid-base balance (pH regulation)'},
                {term: 'K+ ions', definition: 'Electrolyte balance'},
                {term: 'NH3/NH4+', definition: 'Buffering H+, excreting acid'},
                {term: 'Drugs/toxins', definition: 'Removal of foreign substances'},
                {term: 'Creatinine', definition: 'Metabolic waste excretion'},
              ], 15),
              createFillBlank('bio-11-7-m3-l3-a3', 'Acid-base balance', 'The kidneys regulate pH by secreting _____ and reabsorbing _____ ions.', ['H+', 'bicarbonate'], ['H+', 'Na+', 'K+', 'bicarbonate'], 10),
              createQuiz('bio-11-7-m3-l3-a4', 'The ammonia buffer system:', ['Is in the blood only', 'Traps H+ in tubules as NH4+', 'Is not related to kidneys', 'Regulates Na+ only'], 1, 'Ammonia diffuses into tubules, combines with H+ to form NH4+ which cannot diffuse back', 10),
              createTrueFalse('bio-11-7-m3-l3-a5', 'True or False', 'Tubular secretion allows kidneys to actively eliminate substances not filtered at glomerulus', true, 'Organic ions, drugs, and toxins can be actively transported into tubule', 8),
            ]
          }
        ]
      },
      // ============ MODULE 4: Counter-Current Mechanism ============
      {
        id: 'bio-11-7-m4',
        name: 'Counter-Current Mechanism 🔥🔥',
        description: 'Concentration gradient, hypertonic medulla, dilute vs concentrated urine',
        totalTokens: 70,
        levels: [
          {
            id: 'bio-11-7-m4-l1',
            name: '4.1 Counter-Current Multiplier 🔥',
            order: 1,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-7-m4-l1-a1', 'The counter-current multiplier system involves:', ['Only loop of Henle', 'Loop of Henle and vasa recta', 'Only collecting duct', 'Only PCT'], 1, 'Loop creates gradient; vasa recta maintains it without washing away solutes', 10),
              createMatch('bio-11-7-m4-l1-a2', 'Match limb with permeability', [
                {term: 'Descending limb', definition: 'Permeable to water, impermeable to NaCl'},
                {term: 'Ascending limb thick', definition: 'Active NaCl transport, impermeable to water'},
                {term: 'Ascending limb thin', definition: 'Passive NaCl diffusion, impermeable to water'},
                {term: 'Medullary interstitium', definition: 'Hypertonic - up to 1200 mOsm/L'},
              ], 15),
              createFillBlank('bio-11-7-m4-l1-a3', 'Gradient formation', 'The osmolarity of interstitial fluid increases from _____ mOsm/L in cortex to _____ mOsm/L in inner medulla.', ['300', '1200'], ['300', '400', '900', '1200'], 10),
              createQuiz('bio-11-7-m4-l1-a4', 'The single effect refers to:', ['Single nephron filtration', 'Small osmotic difference between ascending and descending limbs', 'One-time urine formation', 'Single hormone action'], 1, 'Single effect creates small gradient that is multiplied by counter-current flow', 10),
              createTrueFalse('bio-11-7-m4-l1-a5', 'True or False', 'The loop of Henle multiplies the osmotic gradient created by the single effect', true, 'Multiple segments of loop create progressive osmotic gradient in medulla', 8),
            ]
          },
          {
            id: 'bio-11-7-m4-l2',
            name: '4.2 Counter-Current Exchange (Vasa Recta) 🔥',
            order: 2,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-7-m4-l2-a1', 'Vasa recta function is to:', ['Produce urine', 'Maintain medullary osmotic gradient', 'Filter blood', 'Secrete hormones'], 1, 'Vasa recta removes water and returns solutes to maintain gradient', 10),
              createMatch('bio-11-7-m4-l2-a2', 'Match vasa recta feature with function', [
                {term: 'Descending limb', definition: 'Water leaves, solutes enter'},
                {term: 'Ascending limb', definition: 'Water enters, solutes leave'},
                {term: 'U-shaped capillary', definition: 'Parallel to loop of Henle'},
                {term: 'Slow blood flow', definition: 'Prevents rapid solute removal'},
              ], 15),
              createFillBlank('bio-11-7-m4-l2-a3', 'Vasa recta purpose', 'Vasa recta acts as a _____-_____ exchanger maintaining the medullary gradient.', ['counter-current', 'exchange'], ['counter-current', 'exchange', 'concurrent', 'flow'], 10),
              createQuiz('bio-11-7-m4-l2-a4', 'If vasa recta did not exist, the medullary gradient would:', ['Increase', 'Be washed away', 'Remain same', 'Double'], 1, 'Normal capillaries would wash away the solutes destroying the gradient', 10),
              createTrueFalse('bio-11-7-m4-l2-a5', 'True or False', 'Blood leaving vasa recta has nearly normal osmolarity (~300 mOsm/L) despite passing through hypertonic medulla', true, 'Counter-current exchange allows blood to enter and leave with same osmolarity', 8),
            ]
          },
          {
            id: 'bio-11-7-m4-l3',
            name: '4.3 Urine Concentration',
            order: 3,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-7-m4-l3-a1', 'Maximum concentrating ability of human kidney is:', ['300 mOsm/L', '600 mOsm/L', '900 mOsm/L', '1200 mOsm/L'], 3, 'Human kidneys can concentrate urine up to ~1200 mOsm/L (4x plasma osmolarity)', 10),
              createMatch('bio-11-7-m4-l3-a2', 'Match urine type with condition', [
                {term: 'Dilute urine', definition: 'ADH absent, collecting duct impermeable'},
                {term: 'Concentrated urine', definition: 'ADH present, water reabsorbed'},
                {term: 'Isosthenuric urine', definition: 'Same as plasma (300 mOsm/L)'},
                {term: 'Diabetes insipidus', definition: 'No ADH, copious dilute urine'},
              ], 15),
              createFillBlank('bio-11-7-m4-l3-a3', 'Daily urine volume', 'Normal daily urine volume is about _____-_____ L, but can vary from _____ to _____ L.', ['1', '1.5', '0.5', '20'], ['1', '1.5', '0.5', '20'], 10),
              createTrueFalse('bio-11-7-m4-l3-a4', 'True or False', 'Desert animals like kangaroo rats can concentrate urine up to 3000-4000 mOsm/L', true, 'They have extremely long loops of Henle extending deep into medulla', 8),
            ]
          }
        ]
      },
      // ============ MODULE 5: Regulation of Kidney Function ============
      {
        id: 'bio-11-7-m5',
        name: 'Regulation of Kidney Function 🔥🔥',
        description: 'ADH, RAAS, ANF, micturition reflex',
        totalTokens: 80,
        levels: [
          {
            id: 'bio-11-7-m5-l1',
            name: '5.1 Antidiuretic Hormone (ADH) 🔥',
            order: 1,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-7-m5-l1-a1', 'ADH is secreted from:', ['Anterior pituitary', 'Posterior pituitary (stored)', 'Hypothalamus (produced)', 'Both B and C'], 3, 'Produced in hypothalamus (supraoptic/paraventricular nuclei), stored in posterior pituitary', 10),
              createMatch('bio-11-7-m5-l1-a2', 'Match ADH factor with effect', [
                {term: 'Increased plasma osmolarity', definition: 'Stimulates ADH release'},
                {term: 'Decreased blood volume', definition: 'Stimulates ADH release'},
                {term: 'ADH action', definition: 'Inserts aquaporin-2 channels in DCT/CD'},
                {term: 'Result', definition: 'Water reabsorption, concentrated urine'},
              ], 15),
              createFillBlank('bio-11-7-m5-l1-a3', 'ADH mechanism', 'ADH makes the _____ _____ tubule and _____ duct permeable to water via _____.', ['distal', 'convoluted', 'collecting', 'aquaporins'], ['distal', 'convoluted', 'collecting', 'aquaporins'], 10),
              createQuiz('bio-11-7-m5-l1-a4', 'Diabetes insipidus is caused by:', ['Excess insulin', 'ADH deficiency or insensitivity', 'Excess aldosterone', 'Glucose excess'], 1, 'No ADH action → cannot reabsorb water → 10-20 L/day dilute urine', 10),
              createTrueFalse('bio-11-7-m5-l1-a5', 'True or False', 'Alcohol inhibits ADH release causing increased urine output (diuresis)', true, 'Alcohol suppresses ADH → more water excreted → dehydration', 8),
            ]
          },
          {
            id: 'bio-11-7-m5-l2',
            name: '5.2 RAAS and Aldosterone 🔥',
            order: 2,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-7-m5-l2-a1', 'Renin is secreted by:', ['Adrenal cortex', 'Juxtaglomerular (JG) cells', 'Posterior pituitary', 'Hypothalamus'], 1, 'JG cells in afferent arteriole wall sense decreased BP and secrete renin', 10),
              createMatch('bio-11-7-m5-l2-a2', 'Match RAAS component with action', [
                {term: 'Renin', definition: 'Converts angiotensinogen to angiotensin I'},
                {term: 'ACE (lungs)', definition: 'Converts AI to angiotensin II'},
                {term: 'Angiotensin II', definition: 'Vasoconstriction, stimulates aldosterone'},
                {term: 'Aldosterone', definition: 'Na+ reabsorption, K+ secretion in DCT'},
              ], 15),
              createFillBlank('bio-11-7-m5-l2-a3', 'RAAS pathway', 'Angiotensinogen → Angiotensin I → Angiotensin II → Stimulates _____ release from adrenal _____.', ['aldosterone', 'cortex'], ['aldosterone', 'cortex', 'medulla', 'renin'], 10),
              createQuiz('bio-11-7-m5-l2-a4', 'Aldosterone causes:', ['Na+ reabsorption and K+ secretion', 'Water excretion only', 'Glucose reabsorption', 'H+ secretion only'], 0, 'Aldosterone acts on DCT and collecting duct for Na+/K+ exchange', 10),
              createTrueFalse('bio-11-7-m5-l2-a5', 'True or False', 'The macula densa cells of DCT sense NaCl delivery and regulate JG cell renin secretion', true, 'Tubuloglomerular feedback - macula densa monitors filtrate composition', 8),
            ]
          },
          {
            id: 'bio-11-7-m5-l3',
            name: '5.3 Other Regulators & Micturition',
            order: 3,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-7-m5-l3-a1', 'ANF (Atrial Natriuretic Factor) is released when:', ['Blood pressure drops', 'Atrial wall is stretched (volume overload)', 'Blood osmolarity increases', 'Aldosterone is high'], 1, 'ANF released from atria during volume expansion → causes vasodilation and Na+ excretion', 10),
              createMatch('bio-11-7-m5-l3-a2', 'Match regulator with action', [
                {term: 'ANF', definition: 'Vasodilation, Na+ excretion (diuresis)'},
                {term: 'Prostaglandins', definition: 'Vasodilation of afferent arteriole'},
                {term: 'Parathyroid hormone', definition: 'Ca2+ reabsorption, PO4 excretion'},
                {term: 'Erythropoietin', definition: 'RBC production stimulation'},
              ], 15),
              createFillBlank('bio-11-7-m5-l3-a3', 'Micturition', 'Micturition is the process of _____ and involves the _____ sphincter and _____ sphincter.', ['urination', 'internal', 'external'], ['urination', 'internal', 'external', 'detrusor'], 10),
              createQuiz('bio-11-7-m5-l3-a4', 'The micturition reflex is controlled by:', ['Only spinal cord', 'Spinal reflex + voluntary cortical control', 'Only cerebral cortex', 'Only hypothalamus'], 1, 'Spinal reflex (S2-S4) initiates; cortex provides voluntary control (can override)', 10),
              createTrueFalse('bio-11-7-m5-l3-a5', 'True or False', 'The detrusor muscle contracts and both sphincters relax during micturition', true, 'Detrusor muscle contraction increases bladder pressure; sphincters open to allow flow', 8),
            ]
          }
        ]
      },
      // ============ MODULE 6: Disorders & PYQ ============
      {
        id: 'bio-11-7-m6',
        name: 'Disorders & PYQ 🔥',
        description: 'Kidney disorders, dialysis, transplants, previous year questions',
        totalTokens: 70,
        levels: [
          {
            id: 'bio-11-7-m6-l1',
            name: '6.1 Kidney Disorders 🔥',
            order: 1,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-7-m6-l1-a1', 'Uremia refers to:', ['Excess urea in urine', 'Urea accumulation in blood', 'Lack of urea', 'Normal urea levels'], 1, 'Uremia = elevated blood urea due to kidney failure - toxic to CNS', 10),
              createMatch('bio-11-7-m6-l1-a2', 'Match disorder with description', [
                {term: 'Uremia', definition: 'Urea accumulation in blood'},
                {term: 'Renal calculi', definition: 'Kidney stones (oxalate, phosphate, urate)'},
                {term: 'Glomerulonephritis', definition: 'Inflammation of glomeruli'},
                {term: 'Pyelonephritis', definition: 'Bacterial infection of kidneys'},
                {term: 'Nephrotic syndrome', definition: 'Proteinuria, edema, hyperlipidemia'},
              ], 15),
              createFillBlank('bio-11-7-m6-l1-a3', 'Kidney stones', 'Renal calculi (kidney stones) are formed by precipitation of calcium _____, calcium _____, or uric acid.', ['oxalate', 'phosphate'], ['oxalate', 'phosphate', 'carbonate', 'chloride'], 10),
              createQuiz('bio-11-7-m6-l1-a4', 'Hemodialysis is based on:', ['Active transport', 'Diffusion across semipermeable membrane', 'Osmosis only', 'Filtration only'], 1, 'Blood flows past dialyzing fluid; wastes diffuse out along concentration gradient', 10),
              createTrueFalse('bio-11-7-m6-l1-a5', 'True or False', 'In peritoneal dialysis, the peritoneum acts as a semipermeable membrane', true, 'Dialyzing fluid introduced into peritoneal cavity; wastes diffuse into it', 8),
            ]
          },
          {
            id: 'bio-11-7-m6-l2',
            name: '6.2 Artificial Kidney & Transplant',
            order: 2,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-7-m6-l2-a1', 'The dialyzing fluid in hemodialysis contains:', ['Urea and creatinine', 'Glucose and electrolytes (no urea)', 'Only water', 'Only glucose'], 1, 'Dialyzate composition mimics normal plasma without waste products', 10),
              createMatch('bio-11-7-m6-l2-a2', 'Match treatment with mechanism', [
                {term: 'Hemodialysis', definition: 'Machine filters blood externally'},
                {term: 'Peritoneal dialysis', definition: 'Uses peritoneum as filter'},
                {term: 'Kidney transplant', definition: 'Replaces failed kidney'},
                {term: 'Immunosuppressants', definition: 'Prevent transplant rejection'},
              ], 12),
              createFillBlank('bio-11-7-m6-l2-a3', 'Dialysis frequency', 'Hemodialysis is typically needed _____ times per week for _____ hours each session.', ['2-3', '3-4'], ['2-3', '3-4', '1-2', '4-5'], 8),
              createTrueFalse('bio-11-7-m6-l2-a4', 'True or False', 'Kidney transplantation is the permanent solution for end-stage renal disease', true, 'Transplant replaces non-functioning kidneys but requires lifelong immunosuppression', 8),
            ]
          },
          {
            id: 'bio-11-7-m6-l3',
            name: '6.3 PYQ Master 🔥',
            order: 3,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-7-m6-l3-a1', 'PYQ: The process of urine formation includes:', ['Filtration only', 'Filtration, reabsorption, secretion', 'Reabsorption only', 'Secretion only'], 1, 'Three processes: glomerular filtration, tubular reabsorption, tubular secretion', 10),
              createQuiz('bio-11-7-m6-l3-a2', 'PYQ: GFR in a healthy adult is approximately:', ['75 mL/min', '125 mL/min', '180 L/day', 'Both B and C'], 3, '~125 mL/min = ~180 L/day', 10),
              createQuiz('bio-11-7-m6-l3-a3', 'PYQ: Maximum urine concentration in humans is:', ['300 mOsm/L', '600 mOsm/L', '900 mOsm/L', '1200 mOsm/L'], 3, 'Can concentrate up to ~1200 mOsm/L (4x plasma)', 10),
              createMatch('bio-11-7-m6-l3-a4', '🎮 Match PYQ facts', [
                {term: 'PCT', definition: 'Reabsorbs 65-70% of filtrate'},
                {term: 'ADH', definition: 'Increases water permeability in DCT/CD'},
                {term: 'Aldosterone', definition: 'Na+ reabsorption, K+ excretion'},
                {term: 'Renin', definition: 'Converts angiotensinogen to AI'},
                {term: 'Juxtaglomerular apparatus', definition: 'Regulates GFR via macula densa'},
              ], 15),
              createFillBlank('bio-11-7-m6-l3-a5', 'Quick revision', 'Ammonia is converted to urea by the _____ cycle in the _____.', ['ornithine/urea', 'liver'], ['ornithine/urea', 'kidney', 'liver', 'ornithine'], 10),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-11-8',
    name: 'Locomotion and Movement',
    description: 'Types of movement, muscle types, skeletal system, joints, muscle contraction',
    moduleCount: 6,
    modules: [
      // ============ MODULE 1: Types of Movement ============
      {
        id: 'bio-11-8-m1',
        name: 'Types of Movement 🔥',
        description: 'Amoeboid, ciliary, flagellar, and muscular movement',
        totalTokens: 55,
        levels: [
          {
            id: 'bio-11-8-m1-l1',
            name: '1.1 Movement in Organisms',
            order: 1,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-8-m1-l1-a1', 'Locomotion refers to:', ['Any movement', 'Movement of body parts only', 'Movement of organism from place to place', 'Internal movement'], 2, 'Locomotion = voluntary movement from one place to another, not just body parts', 10),
              createMatch('bio-11-8-m1-l1-a2', 'Match movement type with example', [
                {term: 'Amoeboid', definition: 'Amoeba, macrophages, leucocytes'},
                {term: 'Ciliary', definition: 'Paramecium, respiratory tract cilia'},
                {term: 'Flagellar', definition: 'Sperm, Euglena'},
                {term: 'Muscular', definition: 'Most multicellular animals'},
              ], 15),
              createFillBlank('bio-11-8-m1-l1-a3', 'Amoeboid movement', 'Amoeboid movement involves formation of _____-like pseudopodia using _____.', ['finger', 'pseudopodia'], ['finger', 'lobe', 'pseudopodia', 'cilia'], 10),
              createTrueFalse('bio-11-8-m1-l1-a4', 'True or False', 'Cilia and flagella are structurally identical but differ in length, number, and beating pattern', true, 'Both have 9+2 microtubule arrangement; flagella are longer, fewer, undulate; cilia are shorter, numerous, beat synchronously', 8),
            ]
          },
          {
            id: 'bio-11-8-m1-l2',
            name: '1.2 Ciliary and Flagellar Movement',
            order: 2,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-8-m1-l2-a1', 'The core of cilia and flagella contains:', ['9+0 microtubule arrangement', '9+2 microtubule arrangement', 'Actin filaments only', 'Myosin filaments only'], 1, 'Axoneme has 9 peripheral doublets + 2 central singlets (9+2 pattern)', 10),
              createMatch('bio-11-8-m1-l2-a2', 'Match structure with function in cilia/flagella', [
                {term: 'Axoneme', definition: 'Core with 9+2 microtubules'},
                {term: 'Dynein arms', definition: 'Motor proteins causing bending'},
                {term: 'Basal body', definition: 'Anchors to cell, has 9+0 triplet'},
                {term: 'Radial spokes', definition: 'Connect outer doublets to central pair'},
                {term: 'Nexin links', definition: 'Maintain doublet spacing'},
              ], 15),
              createFillBlank('bio-11-8-m1-l2-a3', 'Cilia beating', 'Ciliary movement in respiratory tract moves _____ toward the _____.', ['mucus', 'pharynx'], ['mucus', 'pharynx', 'food', 'stomach'], 10),
              createTrueFalse('bio-11-8-m1-l2-a4', 'True or False', 'Dynein arms use ATP to slide microtubule doublets past each other causing bending', true, 'ATP hydrolysis by dynein generates force for microtubule sliding and bending', 8),
            ]
          },
          {
            id: 'bio-11-8-m1-l3',
            name: '1.3 Skeletal Muscle Overview',
            order: 3,
            totalTokens: 15,
            activities: [
              createQuiz('bio-11-8-m1-l3-a1', 'Skeletal muscles constitute approximately what percentage of body weight?', ['10%', '20%', '40-50%', '70%'], 2, 'Skeletal muscles make up 40-50% of total body weight', 10),
              createMatch('bio-11-8-m1-l3-a2', 'Match muscle characteristic with skeletal muscle', [
                {term: 'Voluntary control', definition: 'Skeletal only'},
                {term: 'Striated appearance', definition: 'Skeletal and cardiac'},
                {term: 'Multinucleated', definition: 'Skeletal (syncytium)'},
                {term: 'Attached to bones', definition: 'Skeletal by tendons'},
              ], 12),
              createFillBlank('bio-11-8-m1-l3-a3', 'Muscle functions', 'Muscles help in _____ (body position), _____ (heat production), and _____ of substances.', ['locomotion', 'thermogenesis', 'movement'], ['locomotion', 'thermogenesis', 'digestion', 'movement'], 8),
            ]
          }
        ]
      },
      // ============ MODULE 2: Muscle Types & Structure ============
      {
        id: 'bio-11-8-m2',
        name: 'Muscle Types & Structure 🔥🔥',
        description: 'Skeletal, smooth, cardiac muscles - histology and features',
        totalTokens: 80,
        levels: [
          {
            id: 'bio-11-8-m2-l1',
            name: '2.1 Skeletal Muscle 🔥',
            order: 1,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-8-m2-l1-a1', 'Skeletal muscle fibers are:', ['Uninucleated', 'Multinucleated', 'Binucleated', 'Anucleated'], 1, 'Skeletal muscle fibers are syncytium (multinucleated) formed by fusion of myoblasts', 10),
              createMatch('bio-11-8-m2-l1-a2', 'Match skeletal muscle feature with description', [
                {term: 'Striations', definition: 'Alternating dark and light bands'},
                {term: 'Multinucleated', definition: 'Multiple nuclei peripherally located'},
                {term: 'Long cylindrical fibers', definition: 'Unbranched, parallel arrangement'},
                {term: 'Voluntary', definition: 'Under conscious control'},
                {term: 'Sarcoplasmic reticulum', definition: 'Stores and releases Ca2+'},
              ], 15),
              createFillBlank('bio-11-8-m2-l1-a3', 'Muscle hierarchy', 'Muscle → Fasciculus (bundle of _____) → Muscle fiber (_____) → Myofibril → Sarcomere.', ['fibers', 'cell'], ['fibers', 'cells', 'myofibrils', 'sarcomeres'], 10),
              createQuiz('bio-11-8-m2-l1-a4', 'The connective tissue covering individual muscle fibers is called:', ['Epimysium', 'Perimysium', 'Endomysium', 'Sarcolemma'], 2, 'Endomysium covers individual fibers; perimysium covers fasciculi; epimysium covers whole muscle', 10),
              createTrueFalse('bio-11-8-m2-l1-a5', 'True or False', 'Sarcolemma is the plasma membrane of muscle fibers and is excitable like neuronal membrane', true, 'Sarcolemma generates and conducts action potentials during muscle stimulation', 8),
            ]
          },
          {
            id: 'bio-11-8-m2-l2',
            name: '2.2 Smooth and Cardiac Muscle 🔥',
            order: 2,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-8-m2-l2-a1', 'Smooth muscle is found in:', ['Only GI tract', 'Hollow visceral organs (GI, blood vessels, ureters, uterus)', 'Only heart', 'Only skeletal attachments'], 1, 'Smooth muscle lines walls of hollow internal organs and tubes', 10),
              createMatch('bio-11-8-m2-l2-a2', 'Match muscle type with feature', [
                {term: 'Smooth muscle', definition: 'Spindle-shaped, uninucleated, non-striated'},
                {term: 'Cardiac muscle', definition: 'Branched, uninucleated/cenucleated, striated, intercalated discs'},
                {term: 'Both smooth and cardiac', definition: 'Involuntary control'},
                {term: 'Skeletal only', definition: 'Voluntary, multinucleated'},
              ], 15),
              createFillBlank('bio-11-8-m2-l2-a3', 'Cardiac features', 'Cardiac muscle has _____ discs containing _____ and gap junctions for synchronized contraction.', ['intercalated', 'desmosomes'], ['intercalated', 'desmosomes', 'tight', 'adherens'], 10),
              createQuiz('bio-11-8-m2-l2-a4', 'Which muscle type is most fatigue-resistant?', ['Skeletal', 'Smooth', 'Cardiac', 'All same'], 2, 'Cardiac muscle never fatigues due to rich mitochondria and continuous blood supply', 10),
              createTrueFalse('bio-11-8-m2-l2-a5', 'True or False', 'Smooth muscle contracts slowly but can maintain contraction for long periods with low energy cost', true, 'Latch mechanism allows smooth muscle to sustain contraction without continuous ATP consumption', 8),
            ]
          },
          {
            id: 'bio-11-8-m2-l3',
            name: '2.3 Muscle Proteins 🔥',
            order: 3,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-8-m2-l3-a1', 'Thick filaments are composed of:', ['Actin', 'Myosin', 'Troponin', 'Tropomyosin'], 1, 'Thick filaments contain myosin; thin filaments contain actin, troponin, tropomyosin', 10),
              createMatch('bio-11-8-m2-l3-a2', 'Match protein with function/location', [
                {term: 'Myosin', definition: 'Thick filament - motor protein with head'},
                {term: 'Actin', definition: 'Thin filament - binding site for myosin'},
                {term: 'Tropomyosin', definition: 'Blocks myosin binding sites on actin'},
                {term: 'Troponin', definition: 'Ca2+ binding - moves tropomyosin'},
                {term: 'Titin', definition: 'Elastic protein connecting Z-line to M-line'},
              ], 15),
              createFillBlank('bio-11-8-m2-l3-a3', 'Contractile proteins', 'The two contractile proteins are _____ (thin filament) and _____ (thick filament).', ['actin', 'myosin'], ['actin', 'myosin', 'troponin', 'tropomyosin'], 10),
              createQuiz('bio-11-8-m2-l3-a4', 'Regulatory proteins in muscle include:', ['Only actin', 'Troponin and tropomyosin', 'Only myosin', 'Titin only'], 1, 'Troponin and tropomyosin regulate contraction by controlling actin-myosin interaction', 10),
              createTrueFalse('bio-11-8-m2-l3-a5', 'True or False', 'Meromyosin heads contain ATPase activity and binding sites for actin and ATP', true, 'Myosin head hydrolyzes ATP to ADP + Pi, providing energy for power stroke', 8),
            ]
          }
        ]
      },
      // ============ MODULE 3: Skeletal System ============
      {
        id: 'bio-11-8-m3',
        name: 'Skeletal System 🔥🔥',
        description: 'Bones, cartilage, types of joints, axial and appendicular skeleton',
        totalTokens: 90,
        levels: [
          {
            id: 'bio-11-8-m3-l1',
            name: '3.1 Skeletal System Overview 🔥',
            order: 1,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-8-m3-l1-a1', 'The human skeleton has approximately:', ['106 bones', '206 bones', '306 bones', '180 bones'], 1, 'Adult human skeleton has 206 bones (300+ at birth, many fuse)', 10),
              createMatch('bio-11-8-m3-l1-a2', 'Match skeleton division with components', [
                {term: 'Axial skeleton', definition: 'Skull, vertebral column, ribs, sternum (80 bones)'},
                {term: 'Appendicular skeleton', definition: 'Limbs, girdles (126 bones)'},
                {term: 'Cranium', definition: 'Brain case (8 bones)'},
                {term: 'Face', definition: '14 bones including mandible'},
              ], 15),
              createFillBlank('bio-11-8-m3-l1-a3', 'Bone functions', 'Bones provide _____ (support), _____ (leverage for muscles), and _____ of internal organs.', ['support', 'protection', 'leverage'], ['support', 'protection', 'leverage', 'movement'], 10),
              createQuiz('bio-11-8-m3-l1-a4', 'Which is NOT a function of the skeletal system?', ['Support', 'Blood cell production', 'Protein digestion', 'Mineral storage'], 2, 'Skeletal functions: support, protection, locomotion, blood production, mineral storage - NOT digestion', 10),
              createTrueFalse('bio-11-8-m3-l1-a5', 'True or False', 'Yellow bone marrow in adults is mainly adipose tissue that stores fat', true, 'Red marrow produces blood cells; yellow marrow stores fat and can convert back to red if needed', 8),
            ]
          },
          {
            id: 'bio-11-8-m3-l2',
            name: '3.2 Bone Structure 🔥',
            order: 2,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-8-m3-l2-a1', 'The shaft of long bone is called:', ['Epiphysis', 'Diaphysis', 'Metaphysis', 'Periosteum'], 1, 'Diaphysis = central shaft; Epiphysis = ends; Metaphysis = growth plate region between', 10),
              createMatch('bio-11-8-m3-l2-a2', 'Match bone structure with description', [
                {term: 'Periosteum', definition: 'Outer fibrous covering with blood vessels'},
                {term: 'Endosteum', definition: 'Lines internal cavity (medullary)'},
                {term: 'Compact bone', definition: 'Dense, outer layer with Haversian systems'},
                {term: 'Spongy bone', definition: 'Cancellous, trabecular, contains red marrow'},
                {term: 'Medullary cavity', definition: 'Contains yellow bone marrow'},
              ], 15),
              createFillBlank('bio-11-8-m3-l2-a3', 'Bone cells', 'Osteo_____ builds bone, osteo_____ breaks down bone, osteo_____ are mature bone cells.', ['blasts', 'clasts', 'cytes'], ['blasts', 'clasts', 'cytes', 'gens'], 10),
              createQuiz('bio-11-8-m3-l2-l4', 'Haversian systems (osteons) are found in:', ['Spongy bone only', 'Compact bone only', 'Both types', 'Cartilage'], 1, 'Compact bone is organized into osteons with central Haversian canal and concentric lamellae', 10),
              createTrueFalse('bio-11-8-m3-l2-a5', 'True or False', 'Cartilage lacks blood vessels and nerves, receiving nutrients by diffusion from surrounding fluid', true, 'Avascular cartilage relies on diffusion; this limits repair capacity compared to bone', 8),
            ]
          },
          {
            id: 'bio-11-8-m3-l3',
            name: '3.3 Types of Joints 🔥',
            order: 3,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-8-m3-l3-a1', 'Which joint allows the greatest range of motion?', ['Fibrous', 'Cartilaginous', 'Synovial', 'Suture'], 2, 'Synovial (diarthrotic) joints have joint cavity with synovial fluid allowing free movement', 10),
              createMatch('bio-11-8-m3-l3-a2', 'Match joint type with example', [
                {term: 'Fibrous (synarthrosis)', definition: 'Sutures of skull, teeth in sockets'},
                {term: 'Cartilaginous (amphiarthrosis)', definition: 'Intervertebral discs, pubic symphysis'},
                {term: 'Synovial (diarthrosis)', definition: 'Knee, shoulder, hip, elbow'},
                {term: 'Ball and socket', definition: 'Hip, shoulder'},
                {term: 'Hinge', definition: 'Elbow, knee (modified)'},
                {term: 'Pivot', definition: 'Atlantoaxial joint'},
              ], 15),
              createFillBlank('bio-11-8-m3-l3-a3', 'Synovial joint', 'Synovial joints have a _____ cavity containing _____ fluid for lubrication.', ['joint', 'synovial'], ['joint', 'bursa', 'synovial', 'serous'], 10),
              createQuiz('bio-11-8-m3-l3-a4', 'Cartilage found at ends of long bones is:', ['Fibrocartilage', 'Hyaline cartilage', 'Elastic cartilage', 'Calcified cartilage'], 1, 'Articular cartilage is hyaline cartilage providing smooth, low-friction surface', 10),
              createTrueFalse('bio-11-8-m3-l3-a5', 'True or False', 'Bursae are fluid-filled sacs that reduce friction between tendons and bones', true, 'Bursae act as cushions reducing friction in areas like shoulder, elbow, knee', 8),
            ]
          },
          {
            id: 'bio-11-8-m3-l4',
            name: '3.4 Disorders of Muscular and Skeletal System',
            order: 4,
            totalTokens: 15,
            activities: [
              createQuiz('bio-11-8-m3-l4-a1', 'Myasthenia gravis is an autoimmune disorder affecting:', ['Bones', 'Neuromuscular junction', 'Tendons', 'Cartilage'], 1, 'Antibodies attack acetylcholine receptors at neuromuscular junction causing muscle weakness', 10),
              createMatch('bio-11-8-m3-l4-a2', 'Match disorder with description', [
                {term: 'Muscular dystrophy', definition: 'Genetic, progressive muscle degeneration'},
                {term: 'Tetany', definition: 'Rapid spasms due to low Ca2+'},
                {term: 'Osteoporosis', definition: 'Low bone density, porous bones'},
                {term: 'Arthritis', definition: 'Joint inflammation'},
                {term: 'Gout', definition: 'Uric acid crystals in joints'},
                {term: 'Sprain', definition: 'Ligament injury'},
              ], 12),
              createFillBlank('bio-11-8-m3-l4-a3', 'Tetany cause', 'Tetany is caused by low levels of _____ in the blood.', ['calcium'], ['calcium', 'sodium', 'potassium', 'magnesium'], 8),
            ]
          }
        ]
      },
      // ============ MODULE 4: Muscle Contraction Mechanism ============
      {
        id: 'bio-11-8-m4',
        name: 'Muscle Contraction 🔥🔥',
        description: 'Sliding filament theory, neuromuscular junction, excitation-contraction coupling',
        totalTokens: 85,
        levels: [
          {
            id: 'bio-11-8-m4-l1',
            name: '4.1 Sarcomere Structure 🔥',
            order: 1,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-8-m4-l1-a1', 'The sarcomere is the region between:', ['Two M-lines', 'Two Z-lines', 'One Z and one M line', 'Two A-bands'], 1, 'Sarcomere = contractile unit between two successive Z-lines (Z-discs)', 10),
              createMatch('bio-11-8-m4-l1-a2', 'Match sarcomere band with composition', [
                {term: 'A-band (Anisotropic)', definition: 'Contains entire thick filament + parts of thin filament'},
                {term: 'I-band (Isotropic)', definition: 'Contains only thin filaments'},
                {term: 'H-zone', definition: 'Only thick filaments (center of A-band)'},
                {term: 'M-line', definition: 'Middle of sarcomere - holds thick filaments'},
                {term: 'Z-line/Z-disc', definition: 'Anchors thin filaments, defines sarcomere ends'},
              ], 15),
              createFillBlank('bio-11-8-m4-l1-a3', 'Band changes', 'During contraction, the _____-zone and _____-bands shorten, but the A-band remains constant.', ['H', 'I'], ['H', 'I', 'A', 'M'], 10),
              createQuiz('bio-11-8-m4-l1-a4', 'During muscle contraction:', ['A-band shortens', 'I-band shortens, H-zone shortens', 'All bands shorten', 'No bands change'], 1, 'Thin filaments slide past thick filaments; I-band and H-zone narrow, A-band constant', 10),
              createTrueFalse('bio-11-8-m4-l1-a5', 'True or False', 'The M-line contains proteins like myomesin that hold thick filaments in place', true, 'M-line proteins provide structural support for thick filaments during contraction', 8),
            ]
          },
          {
            id: 'bio-11-8-m4-l2',
            name: '4.2 Neuromuscular Junction 🔥',
            order: 2,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-8-m4-l2-a1', 'The neurotransmitter at neuromuscular junction is:', ['Dopamine', 'Acetylcholine', 'GABA', 'Serotonin'], 1, 'Motor neuron releases acetylcholine (ACh) which binds to receptors on sarcolemma', 10),
              createMatch('bio-11-8-m4-l2-a2', 'Match NMJ structure with function', [
                {term: 'Synaptic knob', definition: 'Motor neuron terminal with vesicles'},
                {term: 'Synaptic cleft', definition: 'Gap between neuron and muscle (20-50 nm)'},
                {term: 'Motor end plate', definition: 'Folded sarcolemma with receptors'},
                {term: 'Acetylcholinesterase', definition: 'Breaks down ACh in cleft'},
                {term: 'Junctional folds', definition: 'Increase surface area for receptors'},
              ], 15),
              createFillBlank('bio-11-8-m4-l2-a3', 'Action potential', 'ACh binding opens _____-gated channels causing depolarization and _____ potential.', ['ligand', 'end-plate'], ['ligand', 'voltage', 'end-plate', 'action'], 10),
              createQuiz('bio-11-8-m4-l2-a4', 'Acetylcholinesterase function is to:', ['Synthesize ACh', 'Break down ACh to stop stimulation', 'Release ACh', 'Store ACh'], 1, 'AChE in synaptic cleft hydrolyzes ACh to choline + acetate, ending muscle stimulation', 10),
              createTrueFalse('bio-11-8-m4-l2-a5', 'True or False', 'One action potential in motor neuron causes one action potential in muscle fiber (all-or-none)', true, 'Each nerve impulse reliably triggers a muscle action potential within milliseconds', 8),
            ]
          },
          {
            id: 'bio-11-8-m4-l3',
            name: '4.3 Sliding Filament Theory 🔥',
            order: 3,
            totalTokens: 35,
            activities: [
              createQuiz('bio-11-8-m4-l3-a1', 'The power stroke occurs when:', ['ATP binds to myosin', 'ADP + Pi are released from myosin head', 'Ca2+ binds troponin', 'Tropomyosin blocks actin'], 1, 'Release of ADP and Pi triggers conformational change - myosin head pivots pulling thin filament', 10),
              createMatch('bio-11-8-m4-l3-a2', 'Match contraction step with event', [
                {term: 'Rest', definition: 'Tropomyosin blocks myosin sites, low Ca2+'},
                {term: 'Excitation', definition: 'Action potential spreads down T-tubule'},
                {term: 'Ca2+ release', definition: 'SR releases Ca2+ into cytosol'},
                {term: 'Cross-bridge formation', definition: 'Myosin binds exposed actin'},
                {term: 'Power stroke', definition: 'Myosin head pivots, thin filament slides'},
                {term: 'Detachment', definition: 'ATP binds, myosin releases actin'},
              ], 20),
              createFillBlank('bio-11-8-m4-l3-a3', 'Cross-bridge cycle', 'ATP binding to myosin head causes _____ from actin; ATP hydrolysis _____ the head.', ['detachment', 'cocks'], ['detachment', 'binding', 'cocks', 'relaxes'], 10),
              createQuiz('bio-11-8-m4-l3-a4', 'During muscle relaxation, Ca2+ is:', ['Released from SR', 'Pumped back into SR by Ca2+-ATPase', 'Bound to troponin', 'Exported from cell'], 1, 'Ca2+-ATPase actively transports Ca2+ back into sarcoplasmic reticulum for relaxation', 10),
              createQuiz('bio-11-8-m4-l3-a5', 'The T-tubule (transverse tubule) function is to:', ['Store Ca2+', 'Transmit action potential into muscle fiber interior', 'Synthesize ATP', 'Break down glycogen'], 1, 'T-tubules conduct action potential from sarcolemma to interior, triggering SR Ca2+ release', 10),
              createTrueFalse('bio-11-8-m4-l3-a6', 'True or False', 'Tropomyosin moves to expose myosin-binding sites when Ca2+ binds to troponin C', true, 'Ca2+-troponin complex pulls tropomyosin away, unblocking actin sites for cross-bridge formation', 8),
            ]
          }
        ]
      },
      // ============ MODULE 5: Energy for Contraction & Fatigue ============
      {
        id: 'bio-11-8-m5',
        name: 'Muscle Energetics 🔥',
        description: 'ATP sources, muscle fatigue, oxygen debt, types of muscle fibers',
        totalTokens: 60,
        levels: [
          {
            id: 'bio-11-8-m5-l1',
            name: '5.1 Energy Sources for Muscle 🔥',
            order: 1,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-8-m5-l1-a1', 'The immediate energy source for muscle contraction is:', ['Glucose', 'Fatty acids', 'ATP', 'Creatine phosphate'], 2, 'ATP is direct energy source; creatine phosphate regenerates ATP quickly', 10),
              createMatch('bio-11-8-m5-l1-a2', 'Match energy system with duration', [
                {term: 'ATP already in muscle', definition: 'Immediate - few seconds'},
                {term: 'Creatine phosphate', definition: 'Short bursts - 15-30 seconds'},
                {term: 'Anaerobic glycolysis', definition: '1-2 minutes (lactic acid)'},
                {term: 'Aerobic respiration', definition: 'Sustained activity (Krebs, ETC)'},
              ], 15),
              createFillBlank('bio-11-8-m5-l1-a3', 'Creatine phosphate', 'Creatine phosphate + _____ → Creatine + _____.', ['ADP', 'ATP'], ['ADP', 'ATP', 'AMP', 'glucose'], 8),
              createTrueFalse('bio-11-8-m5-l1-a4', 'True or False', 'Aerobic respiration in mitochondria provides most ATP during prolonged exercise', true, 'Fatty acids and glucose are oxidized to produce 36-38 ATP per glucose molecule', 8),
            ]
          },
          {
            id: 'bio-11-8-m5-l2',
            name: '5.2 Muscle Fatigue & Oxygen Debt',
            order: 2,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-8-m5-l2-a1', 'Muscle fatigue during intense exercise is primarily due to:', ['Lack of Ca2+', 'Accumulation of lactic acid and H+', 'Too much ATP', 'Excessive oxygen'], 1, 'Anaerobic glycolysis produces lactic acid lowering pH, inhibiting enzyme function', 10),
              createMatch('bio-11-8-m5-l2-a2', 'Match fatigue factor with effect', [
                {term: 'Lactic acid accumulation', definition: 'Lowers pH, inhibits enzymes'},
                {term: 'ATP depletion', definition: 'Cannot detach cross-bridges (rigor)'},
                {term: 'Oxygen debt', definition: 'Extra O2 needed post-exercise'},
                {term: 'Creatine depletion', definition: 'Limited phosphate reservoir'},
              ], 12),
              createFillBlank('bio-11-8-m5-l2-a3', 'Oxygen debt', 'Oxygen debt is the extra _____ needed after exercise to convert _____ to glucose and oxidize it.', ['oxygen', 'lactate'], ['oxygen', 'ATP', 'lactate', 'pyruvate'], 10),
              createTrueFalse('bio-11-8-m5-l2-a4', 'True or False', 'Rigor mortis is muscle stiffness after death due to lack of ATP for cross-bridge detachment', true, 'Without ATP, myosin stays bound to actin; muscles relax later as proteins degrade', 8),
            ]
          },
          {
            id: 'bio-11-8-m5-l3',
            name: '5.3 Muscle Fiber Types',
            order: 3,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-8-m5-l3-a1', 'Red muscle fibers are characterized by:', ['Fast contraction, fatigue quickly', 'Slow contraction, fatigue-resistant, high mitochondria', 'No mitochondria', 'No myoglobin'], 1, 'Slow-oxidative (Type I) fibers are red due to myoglobin and rich blood supply', 10),
              createMatch('bio-11-8-m5-l3-a2', 'Match fiber type with feature', [
                {term: 'Slow-oxidative (Type I)', definition: 'Red, endurance, many mitochondria'},
                {term: 'Fast-oxidative (Type IIa)', definition: 'Intermediate, fatigue-resistant'},
                {term: 'Fast-glycolytic (Type IIb)', definition: 'White, powerful, fatigue quickly'},
                {term: 'Myoglobin', definition: 'Oxygen storage protein in red fibers'},
              ], 12),
              createFillBlank('bio-11-8-m5-l3-a3', 'White muscle', 'White muscle fibers have less _____, fewer _____, and depend more on glycolysis.', ['myoglobin', 'mitochondria'], ['myoglobin', 'mitochondria', 'glycogen', 'nuclei'], 8),
              createTrueFalse('bio-11-8-m5-l3-a4', 'True or False', 'Marathon runners have more slow-oxidative (Type I) fibers, while sprinters have more fast-glycolytic (Type II) fibers', true, 'Fiber composition varies with training and genetic factors for different activities', 8),
            ]
          }
        ]
      },
      // ============ MODULE 6: PYQ & Master Review ============
      {
        id: 'bio-11-8-m6',
        name: 'PYQ Master 🔥🔥',
        description: 'Assertion-reason, previous year questions, rapid revision',
        totalTokens: 75,
        levels: [
          {
            id: 'bio-11-8-m6-l1',
            name: '6.1 Assertion-Reason Practice',
            order: 1,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-8-m6-l1-a1', 'Assertion-Reason: Thin filaments slide over thick filaments during muscle contraction BECAUSE Myosin head pulls actin toward the M-line.', ['Both true, R explains A', 'Both true, R does NOT explain A', 'A true, R false', 'A false, R false'], 0, 'Both true and reason correctly explains sliding filament theory', 10),
              createQuiz('bio-11-8-m6-l1-a2', 'Assertion-Reason: Human skeleton has 206 bones at birth BECAUSE Many bones fuse during development.', ['Both true, R explains A', 'Both true, R does NOT explain A', 'A false, R true', 'A false, R false'], 2, 'Assertion FALSE - baby has ~300 bones; reason TRUE - many fuse to become 206 in adult', 10),
              createQuiz('bio-11-8-m6-l1-a3', 'Assertion-Reason: Cardiac muscle is striated BECAUSE It contains organized sarcomeres.', ['Both true, R explains A', 'Both true, R does NOT explain A', 'A true, R false', 'A false, R true'], 0, 'Both true - striations come from organized actin-myosin arrangement in sarcomeres', 10),
              createMatch('bio-11-8-m6-l1-a4', 'Match PYQ facts', [
                {term: '9+2 arrangement', definition: 'Cilia and flagella'},
                {term: 'Multinucleated', definition: 'Skeletal muscle'},
                {term: 'Intercalated discs', definition: 'Cardiac muscle'},
                {term: 'Sarcomere', definition: 'Between two Z-lines'},
                {term: 'Synovial joint', definition: 'Freely movable joint'},
              ], 15),
            ]
          },
          {
            id: 'bio-11-8-m6-l2',
            name: '6.2 Mixed MCQ Battle',
            order: 2,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-8-m6-l2-a1', 'PYQ: Axial skeleton includes all EXCEPT:', ['Skull', 'Vertebral column', 'Pelvic girdle', 'Rib cage'], 2, 'Pelvic girdle is appendicular; axial = skull, vertebral column, sternum, ribs (80 bones)', 10),
              createQuiz('bio-11-8-m6-l2-a2', 'PYQ: The contractile protein of muscle is:', ['Tropomyosin', 'Actin and myosin', 'Troponin', 'Titin'], 1, 'Actin and myosin are contractile; troponin/tropomyosin are regulatory', 10),
              createQuiz('bio-11-8-m6-l2-a3', 'PYQ: What is the functional unit of contraction?', ['Myofibril', 'Sarcomere', 'Muscle fiber', 'Z-line'], 1, 'Sarcomere is functional unit between Z-lines containing complete apparatus', 10),
              createQuiz('bio-11-8-m6-l2-a4', 'PYQ: Neostigmine increases muscle contraction by:', ['Increasing acetylcholine synthesis', 'Inhibiting acetylcholinesterase', 'Blocking receptors', 'Increasing calcium'], 1, 'Neostigmine inhibits AChE → ACh accumulates → sustained stimulation', 10),
              createMatch('bio-11-8-m6-l2-a5', '🎮 Match the concepts', [
                {term: 'I-band', definition: 'Contains only actin'},
                {term: 'A-band', definition: 'Contains myosin + actin overlap'},
                {term: 'H-zone', definition: 'Only myosin'},
                {term: 'Z-line', definition: 'Actin attachment'},
                {term: 'M-line', definition: 'Myosin attachment'},
              ], 15),
            ]
          },
          {
            id: 'bio-11-8-m6-l3',
            name: '6.3 Rapid Revision - 60 Seconds',
            order: 3,
            totalTokens: 25,
            activities: [
              createMatch('bio-11-8-m6-l3-a1', '⚡ Lightning round: Match in 60 seconds', [
                {term: '206', definition: 'Bones in adult'},
                {term: '9+2', definition: 'Cilia axoneme'},
                {term: 'Myosin', definition: 'Thick filament'},
                {term: 'Actin', definition: 'Thin filament'},
                {term: 'ACh', definition: 'Neuromuscular transmitter'},
                {term: 'Z-line', definition: 'Sarcomere boundary'},
                {term: 'Red fiber', definition: 'Slow-oxidative'},
                {term: 'White fiber', definition: 'Fast-glycolytic'},
                {term: 'Haversian canal', definition: 'Compact bone'},
                {term: 'Synovial fluid', definition: 'Joint lubricant'},
              ], 20),
              createQuiz('bio-11-8-m6-l3-a2', '⚡ Quick: Which protein moves to expose binding sites when Ca2+ binds?', ['Tropomyosin', 'Troponin', 'Myosin', 'Actin'], 0, 'Tropomyosin blocks sites; troponin C binds Ca2+ and moves tropomyosin', 10),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-11-9',
    name: 'Neural Control and Coordination',
    description: 'Neural system, neuron, synapse, CNS, PNS, reflex action, sensory organs',
    moduleCount: 6,
    modules: [
      // ============ MODULE 1: Neural System & Neuron Structure ============
      {
        id: 'bio-11-9-m1',
        name: 'Neural System 🔥🔥',
        description: 'Neuron structure, types, and neural organization',
        totalTokens: 85,
        levels: [
          {
            id: 'bio-11-9-m1-l1',
            name: '1.1 Neural System Organization 🔥',
            order: 1,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-9-m1-l1-a1', 'The neural system detects changes in the:', ['Internal environment only', 'External environment only', 'Both internal and external environment', 'Neither environment'], 2, 'Neural system monitors changes in both internal and external environment', 10),
              createMatch('bio-11-9-m1-l1-a2', 'Match division with components', [
                {term: 'CNS', definition: 'Brain and spinal cord'},
                {term: 'PNS', definition: 'Cranial nerves (12 pairs), spinal nerves (31 pairs)'},
                {term: 'Somatic neural system', definition: 'Voluntary control of skeletal muscles'},
                {term: 'Autonomic neural system', definition: 'Involuntary control of smooth/cardiac muscles, glands'},
                {term: 'Sympathetic division', definition: 'Fight or flight, emergencies'},
                {term: 'Parasympathetic division', definition: 'Rest and digest, normal function'},
              ], 18),
              createFillBlank('bio-11-9-m1-l1-a3', 'ANS divisions', 'The sympathetic division is _____, while the parasympathetic is _____.', ['thoracolumbar', 'craniosacral'], ['thoracolumbar', 'craniosacral', 'sacral', 'lumbar'], 10),
              createQuiz('bio-11-9-m1-l1-a4', 'Which statement is CORRECT about neural organization?', ['All vertebrates have identical brains', 'Brain is dorsally located in all vertebrates', 'Complexity increases from lower to higher vertebrates', 'Fish have more complex brains than mammals'], 2, 'Complexity increases: fish → amphibians → reptiles → birds → mammals', 10),
              createTrueFalse('bio-11-9-m1-l1-a5', 'True or False', 'Invertebrates like Hydra have a nerve net with neurons diffused throughout the body', true, 'Hydra lacks brain; has simple nerve net for basic coordination', 8),
            ]
          },
          {
            id: 'bio-11-9-m1-l2',
            name: '1.2 Neuron Structure 🔥',
            order: 2,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-9-m1-l2-a1', 'Which part of the neuron contains Nissl granules?', ['Axon', 'Dendrites', 'Cell body (cyton/soma)', 'Axon terminals'], 2, 'Nissl granules (rough ER + ribosomes) are found only in cell body and dendrites, NOT in axon', 10),
              createMatch('bio-11-9-m1-l2-a2', 'Match neuron part with feature', [
                {term: 'Dendrites', definition: 'Short, branched, receive impulses'},
                {term: 'Cell body', definition: 'Contains nucleus, Nissl granules'},
                {term: 'Axon', definition: 'Long, unbranched initially, transmits impulses away'},
                {term: 'Axon terminals', definition: 'Release neurotransmitters'},
                {term: 'Synaptic vesicles', definition: 'Contain neurotransmitters'},
                {term: 'Myelin sheath', definition: 'Insulating layer around axon'},
              ], 20),
              createFillBlank('bio-11-9-m1-l2-a3', 'Axon hillock', 'The _____ is the conical projection where axon arises from cell body and is free of _____.', ['axon hillock', 'Nissl granules'], ['axon hillock', 'dendrites', 'Nissl granules', 'mitochondria'], 10),
              createQuiz('bio-11-9-m1-l2-a4', 'Nissl granules are composed of:', ['Smooth ER', 'Rough ER and free ribosomes', 'Golgi apparatus', 'Mitochondria only'], 1, 'Nissl bodies = RER + ribosomes for protein synthesis', 10),
              createQuiz('bio-11-9-m1-l2-a5', 'The axon divides into:', ['More dendrites', 'Axon terminals/branches with synaptic knobs', 'Another axon', 'Nothing'], 1, 'Axon ends in fine branches called axon terminals with synaptic knobs containing vesicles', 10),
              createTrueFalse('bio-11-9-m1-l2-a6', 'True or False', 'Myelin sheath is produced by Schwann cells in PNS and oligodendrocytes in CNS', true, 'Schwann cells (PNS) and oligodendrocytes (CNS) form myelin; gaps are nodes of Ranvier', 8),
            ]
          },
          {
            id: 'bio-11-9-m1-l3',
            name: '1.3 Types of Neurons',
            order: 3,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-9-m1-l3-a1', 'A neuron with one axon and one dendrite is called:', ['Unipolar', 'Bipolar', 'Multipolar', 'Pseudounipolar'], 1, 'Bipolar = 1 axon + 1 dendrite (found in retina, olfactory epithelium)', 10),
              createMatch('bio-11-9-m1-l3-a2', 'Match neuron type with location/function', [
                {term: 'Multipolar', definition: 'One axon, many dendrites - motor neurons'},
                {term: 'Bipolar', definition: 'One axon, one dendrite - retina, olfactory'},
                {term: 'Unipolar/pseudounipolar', definition: 'Single process dividing - sensory neurons'},
                {term: 'Afferent/sensory', definition: 'Carry impulses to CNS'},
                {term: 'Efferent/motor', definition: 'Carry impulses from CNS to effectors'},
                {term: 'Interneuron', definition: 'Connect neurons within CNS'},
              ], 20),
              createFillBlank('bio-11-9-m1-l3-a3', 'Sensory and motor', 'Sensory neurons carry impulses _____ the CNS; motor neurons carry impulses _____ the CNS.', ['towards', 'away from'], ['towards', 'away from', 'within', 'against'], 10),
              createQuiz('bio-11-9-m1-l3-a4', 'Association neurons (interneurons) are found:', ['Only in PNS', 'Only in CNS', 'In both CNS and PNS', 'Only in ganglia'], 1, 'Interneurons connect sensory and motor neurons entirely within CNS', 10),
              createTrueFalse('bio-11-9-m1-l3-a5', 'True or False', 'The cell body of sensory neurons is located outside the CNS in dorsal root ganglia', true, 'Sensory neuron cell bodies are in dorsal root ganglia; motor neuron cell bodies are in CNS', 8),
            ]
          }
        ]
      },
      // ============ MODULE 2: Generation & Conduction of Nerve Impulse ============
      {
        id: 'bio-11-9-m2',
        name: 'Nerve Impulse 🔥🔥',
        description: 'Resting potential, action potential, impulse conduction',
        totalTokens: 90,
        levels: [
          {
            id: 'bio-11-9-m2-l1',
            name: '2.1 Resting Membrane Potential 🔥',
            order: 1,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-9-m2-l1-a1', 'Resting membrane potential is approximately:', ['0 mV', '-70 mV', '+70 mV', '-90 mV'], 1, 'Resting potential is negative at about -70 mV (polarized state)', 10),
              createMatch('bio-11-9-m2-l1-a2', 'Match factor with contribution to resting potential', [
                {term: 'Na+-K+ pump (3Na+ out, 2K+ in)', definition: 'Electrogenic, maintains gradient'},
                {term: 'Leak channels (K+ mostly)', definition: 'K+ efflux makes interior negative'},
                {term: 'Impermeable anions (A-)', definition: 'Negatively charged proteins, phosphate trapped inside'},
                {term: 'Higher K+ inside', definition: 'Chemical gradient for K+ efflux'},
                {term: 'Higher Na+ outside', definition: 'Chemical gradient for Na+ influx'},
              ], 20),
              createFillBlank('bio-11-9-m2-l1-a3', 'Sodium-potassium pump', 'The Na+-K+ pump moves ____ Na+ out and ____ K+ in, using ATP.', ['3', '2'], ['3', '2', '1', '4'], 10),
              createQuiz('bio-11-9-m2-l1-a4', 'The resting membrane is most permeable to:', ['Na+', 'K+', 'Cl-', 'Ca2+'], 1, 'Resting membrane has more K+ leak channels; K+ efflux dominates resting potential', 10),
              createTrueFalse('bio-11-9-m2-l1-a5', 'True or False', 'The inside of a resting neuron is negatively charged relative to outside due to unequal ion distribution', true, 'Polarized state: interior negative (-70mV), exterior positive', 8),
            ]
          },
          {
            id: 'bio-11-9-m2-l2',
            name: '2.2 Action Potential 🔥🔥',
            order: 2,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-9-m2-l2-a1', 'During depolarization:', ['K+ rushes in', 'Na+ rushes in', 'Cl- rushes out', 'Only leak channels open'], 1, 'Depolarization: voltage-gated Na+ channels open → Na+ influx → inside becomes positive (+30mV)', 10),
              createMatch('bio-11-9-m2-l2-a2', 'Match phase with ion movement', [
                {term: 'Depolarization', definition: 'Na+ influx through open Na+ channels'},
                {term: 'Repolarization', definition: 'Na+ channels close, K+ channels open, K+ efflux'},
                {term: 'Hyperpolarization', definition: 'K+ efflux continues, briefly below -70mV'},
                {term: 'Restoration', definition: 'Na+-K+ pump restores ion gradients'},
              ], 15),
              createFillBlank('bio-11-9-m2-l2-a3', 'Action potential', 'Action potential threshold is approximately _____ mV; peak depolarization reaches about _____ mV.', ['-55', '+30 to +40'], ['-55', '-70', '+30 to +40', '0'], 10),
              createQuiz('bio-11-9-m2-l2-a4', 'The falling phase of action potential is due to:', ['Na+ influx continuing', 'K+ efflux (voltage-gated K+ channels open)', 'Na+-K+ pump stopping', 'Cl- influx'], 1, 'Repolarization: Na+ channels inactivate, K+ channels open → K+ efflux → potential returns to negative', 10),
              createQuiz('bio-11-9-m2-l2-a5', 'All-or-none law means:', ['Graded response based on stimulus strength', 'Either full action potential or none at all', 'Action potential only in dendrites', 'Action potential travels slowly'], 1, 'Action potential is all-or-none; once threshold is reached, it fires completely', 10),
              createTrueFalse('bio-11-9-m2-l2-a6', 'True or False', 'During the absolute refractory period, another action potential cannot be triggered no matter how strong the stimulus', true, 'Na+ channels are inactivated; this prevents backward propagation and ensures one-way transmission', 8),
            ]
          },
          {
            id: 'bio-11-9-m2-l3',
            name: '2.3 Conduction of Impulse 🔥',
            order: 3,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-9-m2-l3-a1', 'Saltatory conduction occurs in:', ['Unmyelinated axons', 'Myelinated axons between nodes of Ranvier', 'Dendrites', 'Cell bodies'], 1, 'Action potential jumps from node to node in myelinated fibers, increasing conduction speed', 10),
              createMatch('bio-11-9-m2-l3-a2', 'Match conduction feature with effect', [
                {term: 'Myelination', definition: 'Increases conduction speed, saves energy'},
                {term: 'Saltatory conduction', definition: 'Jumping between nodes of Ranvier'},
                {term: 'Larger axon diameter', definition: 'Faster conduction (less resistance)'},
                {term: 'Continuous conduction', definition: 'Unmyelinated - step by step depolarization'},
                {term: 'Axon hillock', definition: 'Trigger zone for action potential'},
              ], 15),
              createFillBlank('bio-11-9-m2-l3-a3', 'Myelin function', 'Myelin acts as an _____ preventing current _____ through the membrane.', ['insulator', 'leak'], ['insulator', 'conductor', 'leak', 'flow'], 10),
              createQuiz('bio-11-9-m2-l3-a4', 'Conduction velocity is fastest in:', ['Thin unmyelinated axons', 'Thick myelinated axons', 'Dendrites', 'Cell body'], 1, 'Thick myelinated axons conduct fastest (e.g., motor neurons to skeletal muscles)', 10),
              createTrueFalse('bio-11-9-m2-l3-a5', 'True or False', 'In unmyelinated axons, the action potential propagates continuously along the entire membrane', true, 'Continuous conduction is slower as each segment must depolarize sequentially', 8),
            ]
          }
        ]
      },
      // ============ MODULE 3: Synapse and Neurotransmission ============
      {
        id: 'bio-11-9-m3',
        name: 'Synapse 🔥🔥',
        description: 'Synaptic transmission, types of synapses, neurotransmitters',
        totalTokens: 80,
        levels: [
          {
            id: 'bio-11-9-m3-l1',
            name: '3.1 Synapse Structure 🔥',
            order: 1,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-9-m3-l1-a1', 'A synapse is a junction between:', ['Two dendrites', 'Neuron and effector cell or another neuron', 'Two cell bodies', 'Two axons'], 1, 'Synapse = junction between two neurons or neuron and effector (muscle/gland)', 10),
              createMatch('bio-11-9-m3-l1-a2', 'Match synapse component with description', [
                {term: 'Presynaptic neuron', definition: 'Transmits impulse toward synapse'},
                {term: 'Postsynaptic neuron', definition: 'Receives impulse after synapse'},
                {term: 'Synaptic cleft', definition: '20-40 nm gap between neurons'},
                {term: 'Synaptic vesicles', definition: 'Store neurotransmitters'},
                {term: 'Synaptic knob/button', definition: 'Swollen axon terminal presynaptically'},
              ], 15),
              createFillBlank('bio-11-9-m3-l1-a3', 'Synaptic cleft', 'The synaptic cleft is approximately _____ nm wide and contains _____ fluid.', ['20-40', 'interstitial'], ['20-40', '10-20', 'interstitial', 'synovial'], 10),
              createQuiz('bio-11-9-m3-l1-a4', 'Electrical synapses are characterized by:', ['Synaptic cleft and chemical transmission', 'Gap junctions with direct cytoplasmic connection', 'Slow transmission', 'Unidirectional only'], 1, 'Electrical synapses have gap junctions (connexons) allowing direct ion flow; fast, bidirectional', 10),
              createTrueFalse('bio-11-9-m3-l1-a5', 'True or False', 'Chemical synapses are unidirectional and have a synaptic delay of about 0.3-0.5 ms', true, 'Chemical synapses: vesicle release, diffusion, receptor binding cause delay; rare in humans', 8),
            ]
          },
          {
            id: 'bio-11-9-m3-l2',
            name: '3.2 Synaptic Transmission 🔥🔥',
            order: 2,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-9-m3-l2-a1', 'Neurotransmitter release is triggered by:', ['K+ influx', 'Ca2+ influx through voltage-gated channels', 'Na+ efflux', 'Cl- influx'], 1, 'Depolarization opens Ca2+ channels; Ca2+ triggers vesicle fusion and exocytosis', 10),
              createMatch('bio-11-9-m3-l2-a2', 'Match transmission step with event', [
                {term: 'Action potential arrives', definition: 'Depolarizes presynaptic membrane'},
                {term: 'Ca2+ influx', definition: 'Triggers vesicle fusion with membrane'},
                {term: 'Exocytosis', definition: 'Neurotransmitters released into cleft'},
                {term: 'Binding to receptors', definition: 'Opens ion channels postsynaptically'},
                {term: 'Inactivation', definition: 'Enzyme degradation or reuptake'},
              ], 18),
              createFillBlank('bio-11-9-m3-l2-a3', 'Excitatory vs inhibitory', 'Excitatory PSPs _____ the membrane (Na+ influx); Inhibitory PSPs _____ the membrane (Cl- influx, K+ efflux).', ['depolarize', 'hyperpolarize'], ['depolarize', 'hyperpolarize', 'polarize', 'repolarize'], 10),
              createQuiz('bio-11-9-m3-l2-a4', 'EPSP and IPSP summation occurs at:', ['Axon terminals', 'Axon hillock (trigger zone)', 'Dendrites only', 'Synaptic cleft'], 1, 'Spatial and temporal summation of graded potentials occurs at axon hillock to reach threshold', 10),
              createQuiz('bio-11-9-m3-l2-a5', 'Which terminates acetylcholine action at synapses?', ['Acetylcholinesterase', 'Monoamine oxidase', 'COMT', 'Reuptake transporters'], 0, 'AChE in synaptic cleft hydrolyzes ACh to choline and acetate', 10),
              createTrueFalse('bio-11-9-m3-l2-a6', 'True or False', 'One action potential in presynaptic neuron always causes action potential in postsynaptic neuron', false, 'Single EPSP is subthreshold; temporal or spatial summation needed to reach threshold', 8),
            ]
          },
          {
            id: 'bio-11-9-m3-l3',
            name: '3.3 Neurotransmitters 🔥',
            order: 3,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-9-m3-l3-a1', 'Acetylcholine is released at:', ['All synapses in brain only', 'Neuromuscular junctions, parasympathetic synapses, some brain synapses', 'Only sympathetic synapses', 'Only sensory neurons'], 1, 'Cholinergic synapses: neuromuscular junction, parasympathetic ANS, basal forebrain', 10),
              createMatch('bio-11-9-m3-l3-a2', 'Match neurotransmitter with effect', [
                {term: 'Acetylcholine', definition: 'Excitatory at NMJ, various effects in CNS'},
                {term: 'GABA', definition: 'Major inhibitory neurotransmitter in brain'},
                {term: 'Glutamate', definition: 'Major excitatory neurotransmitter'},
                {term: 'Norepinephrine', definition: 'Sympathetic fight or flight'},
                {term: 'Dopamine', definition: 'Reward, movement coordination'},
                {term: 'Serotonin', definition: 'Mood, sleep regulation'},
              ], 15),
              createFillBlank('bio-11-9-m3-l3-a3', 'Neurotransmitter recycling', 'After release, neurotransmitters may be degraded by _____, taken back by _____, or diffuse away.', ['enzymes', 'reuptake'], ['enzymes', 'hormones', 'reuptake', 'diffusion'], 10),
              createTrueFalse('bio-11-9-m3-l3-a4', 'True or False', 'Parkinsons disease is associated with dopamine deficiency in the substantia nigra', true, 'Loss of dopaminergic neurons causes tremors, rigidity, bradykinesia', 8),
            ]
          }
        ]
      },
      // ============ MODULE 4: Central Nervous System ============
      {
        id: 'bio-11-9-m4',
        name: 'CNS - Brain 🔥🔥',
        description: 'Brain parts - forebrain, midbrain, hindbrain, their functions',
        totalTokens: 95,
        levels: [
          {
            id: 'bio-11-9-m4-l1',
            name: '4.1 Brain Organization & Forebrain 🔥',
            order: 1,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-9-m4-l1-a1', 'The brain is protected by:', ['Only skull', 'Skull and CSF', 'Skull, meninges, CSF, and blood-brain barrier', 'Only meninges'], 2, 'Brain protection: cranium (skull), meninges (3 layers), CSF, blood-brain barrier', 10),
              createMatch('bio-11-9-m4-l1-a2', 'Match brain division with structures', [
                {term: 'Forebrain (prosencephalon)', definition: 'Cerebrum, thalamus, hypothalamus, limbic system'},
                {term: 'Midbrain (mesencephalon)', definition: 'Corpora quadrigemina, cerebral peduncles'},
                {term: 'Hindbrain (rhombencephalon)', definition: 'Cerebellum, pons, medulla oblongata'},
                {term: 'Cerebrum', definition: 'Largest part, cerebral cortex, 4 lobes'},
              ], 15),
              createFillBlank('bio-11-9-m4-l1-a3', 'Meninges', 'The three meninges from outer to inner are: _____ mater, _____ mater, and _____ mater.', ['dura', 'arachnoid', 'pia'], ['dura', 'arachnoid', 'pia', 'cerebrospinal'], 10),
              createQuiz('bio-11-9-m4-l1-a4', 'CSF (cerebrospinal fluid) is formed by:', ['Arachnoid villi', 'Choroid plexus in ventricles', 'Pia mater', 'Blood-brain barrier'], 1, 'Choroid plexus (capillary network) in ventricles produces CSF from blood plasma', 10),
              createTrueFalse('bio-11-9-m4-l1-a5', 'True or False', 'The cerebrum is divided into two hemispheres by the longitudinal fissure', true, 'Cerebral hemispheres connected by corpus callosum; each has 4 lobes', 8),
            ]
          },
          {
            id: 'bio-11-9-m4-l2',
            name: '4.2 Cerebrum & Functions 🔥🔥',
            order: 2,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-9-m4-l2-a1', 'The cerebral cortex is divided into how many lobes?', ['2', '4', '6', '8'], 1, '4 lobes: frontal, parietal, temporal, occipital', 10),
              createMatch('bio-11-9-m4-l2-a2', 'Match lobe with major function', [
                {term: 'Frontal lobe', definition: 'Motor, speech (Broca\'s), personality, planning'},
                {term: 'Parietal lobe', definition: 'Sensory, spatial awareness, language (Wernicke\'s)'},
                {term: 'Temporal lobe', definition: 'Hearing, memory, emotion'},
                {term: 'Occipital lobe', definition: 'Vision processing'},
                {term: 'Motor area', definition: 'Frontal lobe - initiates voluntary movement'},
                {term: 'Sensory area', definition: 'Parietal lobe - processes somatic sensations'},
              ], 20),
              createFillBlank('bio-11-9-m4-l2-a3', 'Association areas', 'Association areas connect sensory and motor areas for _____, memory, and communication.', ['learning'], ['learning', 'reflexes', 'breathing', 'circulation'], 10),
              createQuiz('bio-11-9-m4-l2-a4', 'Broca\'s area (motor speech) is located in:', ['Parietal lobe', 'Frontal lobe', 'Temporal lobe', 'Occipital lobe'], 1, 'Broca\'s area: frontal lobe; damage causes expressive aphasia (cant speak but understand)', 10),
              createQuiz('bio-11-9-m4-l2-a5', 'Wernicke\'s area (language comprehension) is in:', ['Frontal lobe', 'Parietal-temporal junction', 'Occipital lobe', 'Cerebellum'], 1, 'Wernicke\'s area: left temporal-parietal; damage causes receptive aphasia (fluent nonsense)', 10),
              createTrueFalse('bio-11-9-m4-l2-a6', 'True or False', 'The right cerebral hemisphere controls the left side of the body and vice versa (contralateral control)', true, 'Motor and sensory pathways cross in medulla; left brain controls right body', 8),
            ]
          },
          {
            id: 'bio-11-9-m4-l3',
            name: '4.3 Thalamus, Hypothalamus & Limbic System 🔥',
            order: 3,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-9-m4-l3-a1', 'Thalamus functions as the:', ['Master endocrine gland', 'Relay station for sensory information', 'Temperature control center', 'Coordination of movement'], 1, 'Thalamus: sensory relay to cortex (except smell); also involved in consciousness', 10),
              createMatch('bio-11-9-m4-l3-a2', 'Match structure with function', [
                {term: 'Hypothalamus', definition: 'Temperature, hunger, thirst, sleep, ANS control'},
                {term: 'Thalamus', definition: 'Sensory relay station to cortex'},
                {term: 'Limbic system', definition: 'Emotion, memory, olfaction'},
                {term: 'Hippocampus', definition: 'Memory formation, consolidation'},
                {term: 'Amygdala', definition: 'Fear, aggression, emotion processing'},
              ], 15),
              createFillBlank('bio-11-9-m4-l3-a3', 'Hypothalamus control', 'The hypothalamus controls the pituitary gland through _____ and _____ release hormones.', ['releasing', 'inhibiting'], ['releasing', 'stimulating', 'inhibiting', 'regulating'], 8),
              createTrueFalse('bio-11-9-m4-l3-a4', 'True or False', 'The limbic system includes the hippocampus, amygdala, and parts of the hypothalamus', true, 'Limbic system = emotional brain; hippocampus converts short-term to long-term memory', 8),
            ]
          },
          {
            id: 'bio-11-9-m4-l4',
            name: '4.4 Midbrain, Hindbrain & Cerebellum 🔥',
            order: 4,
            totalTokens: 20,
            activities: [
              createQuiz('bio-11-9-m4-l4-a1', 'Corpora quadrigemina in midbrain consists of:', ['Two colliculi', 'Four colliculi (2 superior, 2 inferior)', 'Six colliculi', 'None'], 1, '4 colliculi: superior (visual reflexes), inferior (auditory reflexes)', 10),
              createMatch('bio-11-9-m4-l4-a2', 'Match hindbrain structure with function', [
                {term: 'Cerebellum', definition: 'Coordination, balance, posture (motor learning)'},
                {term: 'Medulla oblongata', definition: 'Vital centers (cardiac, vasomotor, respiratory)'},
                {term: 'Pons', definition: 'Relays signals, breathing regulation, connects cerebellum'},
                {term: 'Midbrain', definition: 'Visual/auditory reflexes, motor control'},
              ], 12),
              createFillBlank('bio-11-9-m4-l4-a3', 'Vital centers', 'The cardiac, vasomotor, and respiratory centers are located in the _____.', ['medulla oblongata'], ['medulla oblongata', 'pons', 'cerebellum', 'hypothalamus'], 10),
              createTrueFalse('bio-11-9-m4-l4-a4', 'True or False', 'The cerebellum is called the \'little brain\' and is responsible for coordination and precision of voluntary movements', true, 'Cerebellum compares motor commands with sensory feedback; ataxia results from damage', 8),
            ]
          }
        ]
      },
      // ============ MODULE 5: PNS and Reflex Action ============
      {
        id: 'bio-11-9-m5',
        name: 'PNS & Reflexes 🔥🔥',
        description: 'Peripheral nervous system, reflex arc, autonomic nervous system',
        totalTokens: 75,
        levels: [
          {
            id: 'bio-11-9-m5-l1',
            name: '5.1 Reflex Action & Reflex Arc 🔥',
            order: 1,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-9-m5-l1-a1', 'A reflex action is:', ['Conscious response to stimulus', 'Rapid, automatic, involuntary response', 'Only somatic response', 'Only learned response'], 1, 'Reflex: quick, involuntary, innate response to stimulus without conscious thought', 10),
              createMatch('bio-11-9-m5-l1-a2', 'Match reflex arc component with description', [
                {term: 'Receptor', definition: 'Detects stimulus (sensory ending)'},
                {term: 'Afferent/sensory neuron', definition: 'Carries impulse to CNS'},
                {term: 'Integration center', definition: 'Spinal cord (usually) or brain'},
                {term: 'Efferent/motor neuron', definition: 'Carries impulse to effector'},
                {term: 'Effector', definition: 'Muscle or gland that responds'},
              ], 15),
              createFillBlank('bio-11-9-m5-l1-a3', 'Reflex types', 'Knee jerk is a _____ reflex; salivation is a _____ reflex.', ['monosynaptic stretch', 'conditioned'], ['monosynaptic stretch', 'polysynaptic', 'conditioned', 'unconditioned'], 10),
              createQuiz('bio-11-9-m5-l1-a4', 'Withdrawal reflex (from pain) is:', ['Monosynaptic', 'Polysynaptic with interneurons', 'Only cranial reflex', 'Only somatic'], 1, 'Withdrawal involves interneurons in spinal cord; knee jerk is monosynaptic', 10),
              createTrueFalse('bio-11-9-m5-l1-a5', 'True or False', 'Reflexes allow quick protective responses before the brain even processes the sensation', true, 'Reflex arc bypasses brain for speed; brain learns about it after response occurs', 8),
            ]
          },
          {
            id: 'bio-11-9-m5-l2',
            name: '5.2 Autonomic Nervous System 🔥',
            order: 2,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-9-m5-l2-a1', 'The autonomic nervous system controls:', ['Voluntary skeletal muscles', 'Involuntary smooth muscle, cardiac muscle, glands', 'Only brain functions', 'Only spinal cord functions'], 1, 'ANS: involuntary control of visceral functions', 10),
              createMatch('bio-11-9-m5-l2-a2', 'Match ANS division with function/location', [
                {term: 'Sympathetic', definition: 'Thoracolumbar origin, fight or flight'},
                {term: 'Parasympathetic', definition: 'Craniosacral origin, rest and digest'},
                {term: 'Sympathetic ganglia', definition: 'Near spinal cord (chain)'},
                {term: 'Parasympathetic ganglia', definition: 'Near/in target organs'},
                {term: 'Sympathetic neurotransmitter', definition: 'Acetylcholine (preganglionic), norepinephrine (postganglionic)'},
                {term: 'Parasympathetic neurotransmitter', definition: 'Acetylcholine (both)'},
              ], 18),
              createFillBlank('bio-11-9-m5-l2-a3', 'ANS effects', 'Sympathetic: heart rate _____, pupils _____, digestion _____.', ['increases', 'dilate', 'decreases'], ['increases', 'decreases', 'dilate', 'constrict'], 10),
              createQuiz('bio-11-9-m5-l2-a4', 'The "fight or flight" response includes all EXCEPT:', ['Increased heart rate', 'Pupil constriction', 'Increased blood glucose', 'Increased breathing rate'], 1, 'Sympathetic: pupil DILATION for better vision; parasympathetic causes constriction', 10),
              createTrueFalse('bio-11-9-m5-l2-a5', 'True or False', 'Parasympathetic stimulation decreases heart rate, stimulates digestion, and causes pupil constriction', true, 'Rest and digest: conserves energy, promotes digestion and recovery', 8),
            ]
          },
          {
            id: 'bio-11-9-m5-l3',
            name: '5.3 Cranial and Spinal Nerves',
            order: 3,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-9-m5-l3-a1', 'How many pairs of cranial nerves are there?', ['10', '12', '31', '62'], 1, '12 pairs of cranial nerves (I-XII); some sensory, some motor, some mixed', 10),
              createMatch('bio-11-9-m5-l3-a2', 'Match cranial nerve with number/function', [
                {term: 'I - Olfactory', definition: 'Smell (sensory)'},
                {term: 'II - Optic', definition: 'Vision (sensory)'},
                {term: 'V - Trigeminal', definition: 'Face sensation, chewing (mixed)'},
                {term: 'VII - Facial', definition: 'Face expression, taste (mixed)'},
                {term: 'X - Vagus', definition: 'Parasympathetic to viscera (mixed)'},
                {term: 'XII - Hypoglossal', definition: 'Tongue movement (motor)'},
              ], 15),
              createFillBlank('bio-11-9-m5-l3-a3', 'Spinal nerves', 'There are _____ pairs of spinal nerves ( _____ cervical, _____ thoracic).', ['31', '8', '12'], ['31', '8', '12', '5', '7'], 10),
              createQuiz('bio-11-9-m5-l3-a4', 'The vagus nerve (X) is special because it:', ['Only sensory', 'Only motor', 'Longest cranial nerve with parasympathetic to viscera', 'Only in head'], 2, 'Vagus: extensive parasympathetic innervation to thoracic and abdominal viscera', 10),
              createTrueFalse('bio-11-9-m5-l3-a5', 'True or False', 'Some cranial nerves are purely sensory (I, II, VIII), some purely motor (III, IV, VI, XI, XII), and some mixed (V, VII, IX, X)', true, 'Cranial nerves vary in function: olfactory/optic purely sensory; oculomotor/trochlear purely motor', 8),
            ]
          }
        ]
      },
      // ============ MODULE 6: Sensory Organs and PYQ ============
      {
        id: 'bio-11-9-m6',
        name: 'Sensory & PYQ Master 🔥🔥',
        description: 'Eye, ear, sensory reception, previous year questions',
        totalTokens: 80,
        levels: [
          {
            id: 'bio-11-9-m6-l1',
            name: '6.1 Eye - Structure 🔥',
            order: 1,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-9-m6-l1-a1', 'The external layer of eyeball consists of:', ['Only cornea', 'Only sclera', 'Cornea (anterior transparent) and sclera (posterior white)', 'Only choroid'], 2, 'Fibrous tunic: cornea (transparent, refractive) + sclera (white, protective)', 10),
              createMatch('bio-11-9-m6-l1-a2', 'Match eye structure with function', [
                {term: 'Cornea', definition: 'Transparent, light enters, major refraction'},
                {term: 'Lens', definition: 'Accommodation (focus), adjustable refraction'},
                {term: 'Retina', definition: 'Photoreceptors (rods/cones), image detection'},
                {term: 'Iris', definition: 'Colored, controls pupil size'},
                {term: 'Ciliary body', definition: 'Suspensory ligaments, aqueous humor'},
                {term: 'Aqueous humor', definition: 'Maintains pressure, anterior cavity'},
              ], 18),
              createFillBlank('bio-11-9-m6-l1-a3', 'Photoreceptors', 'Rods function in _____ vision and detect _____; cones function in _____ vision and color.', ['dim light', 'shades of gray', 'bright'], ['dim light', 'bright', 'shades of gray', 'color'], 10),
              createQuiz('bio-11-9-m6-l1-a4', 'The fovea centralis contains:', ['Only rods', 'Only cones (highest acuity)', 'Equal rods and cones', 'No photoreceptors'], 1, 'Fovea: pit in macula with only cones - sharpest vision', 10),
              createTrueFalse('bio-11-9-m6-l1-a5', 'True or False', 'Rhodopsin in rods contains retinal + opsin (scotopsin) and breaks down in light causing hyperpolarization', true, 'Light → retinal changes shape → opsin activates → transducin → phosphodiesterase → cGMP decrease → Na+ channels close → hyperpolarization', 8),
            ]
          },
          {
            id: 'bio-11-9-m6-l2',
            name: '6.2 Ear - Structure 🔥',
            order: 2,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-9-m6-l2-a1', 'The ear consists of:', ['Only outer and middle ear', 'Outer, middle, and inner ear', 'Only inner ear', 'Only cochlea'], 1, '3 parts: outer (pinna, ear canal), middle (tympanic membrane, ossicles), inner (cochlea, vestibular apparatus)', 10),
              createMatch('bio-11-9-m6-l2-a2', 'Match ear part with function', [
                {term: 'Pinna', definition: 'Collects and directs sound waves'},
                {term: 'Tympanic membrane', definition: 'Eardrum - vibrates with sound'},
                {term: 'Ear ossicles (malleus, incus, stapes)', definition: 'Amplify sound, transfer to oval window'},
                {term: 'Cochlea', definition: 'Hearing organ with organ of Corti'},
                {term: 'Semicircular canals', definition: 'Dynamic balance (angular acceleration)'},
                {term: 'Vestibule (utricle, saccule)', definition: 'Static balance (linear acceleration)'},
              ], 18),
              createFillBlank('bio-11-9-m6-l2-a3', 'Mechanism', 'Sound waves → tympanic membrane → _____ → _____ → _____ → oval window → cochlea.', ['malleus', 'incus', 'stapes'], ['malleus', 'incus', 'stapes', 'tympanum'], 10),
              createQuiz('bio-11-9-m6-l2-a4', 'The organ of Corti contains:', ['Only supporting cells', 'Hair cells (mechanoreceptors) on basilar membrane', 'Only nerve fibers', 'Cerumen glands'], 1, 'Hair cells detect bending of cilia by basilar membrane movement; rest on tectorial membrane', 10),
              createTrueFalse('bio-11-9-m6-l2-a5', 'True or False', 'Eustachian tube connects middle ear to pharynx and equalizes pressure on both sides of tympanic membrane', true, 'ET opens during yawning/swallowing to equalize pressure; blockage causes discomfort', 8),
            ]
          },
          {
            id: 'bio-11-9-m6-l3',
            name: '6.3 PYQ Master 🔥',
            order: 3,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-9-m6-l3-a1', 'PYQ: Where are Nissl granules found?', ['Axon only', 'Cell body and dendrites', 'Axon terminals only', 'All parts equally'], 1, 'Nissl bodies (RER + ribosomes) absent in axon and axon hillock', 10),
              createQuiz('bio-11-9-m6-l3-a2', 'PYQ: Nodes of Ranvier are found in:', ['Dendrites', 'Myelinated axons - gaps in myelin sheath', 'Cell body', 'Synaptic terminals'], 1, 'Nodes of Ranvier = gaps between Schwann cells where action potential regenerates', 10),
              createMatch('bio-11-9-m6-l3-a3', 'PYQ Quick Match', [
                {term: '-70 mV', definition: 'Resting potential'},
                {term: '+30 mV', definition: 'Peak action potential'},
                {term: 'Na+ influx', definition: 'Depolarization'},
                {term: 'K+ efflux', definition: 'Repolarization'},
                {term: 'Saltatory', definition: 'Jumping conduction'},
                {term: 'Myelin', definition: 'Schwann cells / oligodendrocytes'},
              ], 18),
              createQuiz('bio-11-9-m6-l3-a4', 'PYQ: Cerebellum damage causes:', ['Loss of sensation', 'Ataxia (loss of coordination)', 'Blindness', 'Loss of hearing'], 1, 'Cerebellum = coordination center; damage causes drunken gait, intention tremor', 10),
              createQuiz('bio-11-9-m6-l3-a5', 'PYQ: Brocas area is for:', ['Vision', 'Motor speech', 'Hearing', 'Touch'], 1, 'Broca\'s = motor speech (frontal); Wernicke\'s = comprehension (temporal-parietal)', 10),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-11-10',
    name: 'Chemical Coordination and Integration',
    description: 'Endocrine glands, hormones, mechanism of hormone action, disorders',
    moduleCount: 6,
    modules: [
      // ============ MODULE 1: Endocrine System Overview ============
      {
        id: 'bio-11-10-m1',
        name: 'Endocrine System 🔥🔥',
        description: 'Hormones, endocrine vs exocrine glands, hormone types and transport',
        totalTokens: 80,
        levels: [
          {
            id: 'bio-11-10-m1-l1',
            name: '1.1 Endocrine vs Exocrine 🔥',
            order: 1,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-10-m1-l1-a1', 'Endocrine glands are characterized by:', ['Ducts that carry secretions', 'Ductless glands secreting hormones into blood', 'Exocrine secretions', 'No secretions'], 1, 'Endocrine glands are ductless; hormones secreted directly into bloodstream', 10),
              createMatch('bio-11-10-m1-l1-a2', 'Match gland type with examples', [
                {term: 'Endocrine', definition: 'Pituitary, thyroid, adrenal, pancreas (islets)'},
                {term: 'Exocrine', definition: 'Salivary, sweat, sebaceous, pancreas (acini)'},
                {term: 'Mixed/Heterocrine', definition: 'Pancreas (endocrine + exocrine parts)'},
                {term: 'Pituitary', definition: 'Master endocrine gland'},
              ], 15),
              createFillBlank('bio-11-10-m1-l1-a3', 'Hormone definition', 'Hormones are non-nutrient chemicals that act as intercellular _____ in very low concentrations at _____ sites.', ['messengers', 'target'], ['messengers', 'signals', 'target', 'distant'], 10),
              createQuiz('bio-11-10-m1-l1-a4', 'The hypothalamus is connected to the pituitary by:', ['Duct', 'Hypophyseal portal system and neurons', 'Lymphatic vessels', 'No connection'], 1, 'Hypothalamus controls pituitary via portal blood vessels and neural connections', 10),
              createTrueFalse('bio-11-10-m1-l1-a5', 'True or False', 'The endocrine system and neural system together constitute the neuroendocrine system', true, 'Both systems coordinate and regulate physiological functions; often work together', 8),
            ]
          },
          {
            id: 'bio-11-10-m1-l2',
            name: '1.2 Hormone Chemistry & Transport 🔥',
            order: 2,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-10-m1-l2-a1', 'Steroid hormones are derived from:', ['Amino acids', 'Cholesterol', 'Fatty acids', 'Nucleic acids'], 1, 'Steroid hormones (cortisol, aldosterone, estrogen, testosterone) synthesized from cholesterol', 10),
              createMatch('bio-11-10-m1-l2-a2', 'Match hormone type with examples/characteristics', [
                {term: 'Peptide/protein hormones', definition: 'Insulin, glucagon, ACTH, GH, TSH (water soluble)'},
                {term: 'Steroid hormones', definition: 'Cortisol, aldosterone, estrogen, testosterone (lipid soluble)'},
                {term: 'Iodothyronines', definition: 'Thyroid hormones (T3, T4)'},
                {term: 'Catecholamines', definition: 'Adrenaline, noradrenaline, dopamine'},
                {term: 'Lipid soluble hormones', definition: 'Bind plasma proteins for transport'},
              ], 20),
              createFillBlank('bio-11-10-m1-l2-a3', 'Half-life', 'Water-soluble hormones have short half-lives (minutes) because they are degraded by _____, while lipid-soluble hormones circulate bound to _____ proteins.', ['enzymes', 'plasma'], ['enzymes', 'proteases', 'plasma', 'carrier'], 10),
              createQuiz('bio-11-10-m1-l2-a4', 'Hormones are transported in blood:', ['Only freely dissolved', 'Free or bound to plasma proteins', 'Only inside cells', 'Only in lymph'], 1, 'Steroid/thyroid hormones bind plasma proteins; peptide hormones usually circulate free', 10),
              createTrueFalse('bio-11-10-m1-l2-a5', 'True or False', 'Hormones can be amino acid derivatives, peptides, proteins, or steroid compounds', true, 'Four main classes: (1) amines (modified amino acids), (2) peptides, (3) proteins, (4) steroids', 8),
            ]
          },
          {
            id: 'bio-11-10-m1-l3',
            name: '1.3 Mechanism of Hormone Action 🔥',
            order: 3,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-10-m1-l3-a1', 'Peptide hormones bind to receptors on:', ['Cell membrane (surface receptors)', 'Cytoplasm', 'Nucleus', 'Mitochondria'], 0, 'Peptide hormones cannot cross membrane; bind cell surface receptors (second messenger systems)', 10),
              createMatch('bio-11-10-m1-l3-a2', 'Match hormone type with receptor location', [
                {term: 'Peptide hormones', definition: 'Cell surface receptors (GPCRs)'},
                {term: 'Steroid hormones', definition: 'Intracellular/cytoplasmic receptors'},
                {term: 'Thyroid hormones', definition: 'Nuclear receptors (DNA binding)'},
                {term: 'Second messenger cAMP', definition: 'Intracellular mediator for peptide hormones'},
              ], 15),
              createFillBlank('bio-11-10-m1-l3-a3', 'Second messenger', 'For peptide hormones, hormone acts as first messenger; _____ is a common second messenger activating _____ kinases.', ['cAMP', 'protein'], ['cAMP', 'ATP', 'protein', 'lipid'], 10),
              createQuiz('bio-11-10-m1-l3-a4', 'Steroid hormones regulate gene expression by:', ['Opening ion channels', 'Binding intracellular receptors that act as transcription factors', 'Activating G-proteins', 'Hydrolyzing ATP'], 1, 'Steroid-receptor complex enters nucleus, binds DNA, regulates gene transcription', 10),
              createTrueFalse('bio-11-10-m1-l3-a5', 'True or False', 'Hormone receptors show specificity, high affinity, and saturation kinetics similar to enzymes', true, 'Receptor-hormone binding is specific with affinity (Kd) and limited receptor numbers', 8),
            ]
          }
        ]
      },
      // ============ MODULE 2: Pituitary Gland ============
      {
        id: 'bio-11-10-m2',
        name: 'Pituitary Gland 🔥🔥',
        description: 'Master gland, anterior and posterior pituitary hormones',
        totalTokens: 90,
        levels: [
          {
            id: 'bio-11-10-m2-l1',
            name: '2.1 Pituitary Overview 🔥',
            order: 1,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-10-m2-l1-a1', 'The pituitary gland is located:', ['In the hypothalamus', 'In a bony cavity called sella turcica of sphenoid bone', 'In the brain cortex', 'In the neck'], 1, 'Pituitary sits in sella turcica, attached to hypothalamus by pituitary stalk (infundibulum)', 10),
              createMatch('bio-11-10-m2-l1-a2', 'Match pituitary lobe with origin', [
                {term: 'Anterior pituitary (adenohypophysis)', definition: 'Ectodermal origin - glandular'},
                {term: 'Posterior pituitary (neurohypophysis)', definition: 'Neural origin - extension of hypothalamus'},
                {term: 'Pars distalis', definition: 'Major part of anterior pituitary'},
                {term: 'Pars nervosa', definition: 'Posterior pituitary proper'},
              ], 15),
              createFillBlank('bio-11-10-m2-l1-a3', 'Parts of pituitary', 'Anterior pituitary = pars _____, pars _____; Posterior pituitary = pars _____ + _____ stalk.', ['distalis', 'intermedia', 'nervosa', 'infundibular'], ['distalis', 'intermedia', 'nervosa', 'infundibular'], 12),
              createQuiz('bio-11-10-m2-l1-a4', 'The pituitary is often called the:', ['Slave gland', 'Master endocrine gland', 'Mixed gland', 'Exocrine gland'], 1, 'Master gland: controls many other endocrine glands via tropic hormones', 10),
              createTrueFalse('bio-11-10-m2-l1-a5', 'True or False', 'The posterior pituitary does not synthesize hormones; it only stores and releases hormones made in hypothalamus', true, 'ADH and oxytocin are synthesized in hypothalamic neurons, transported to posterior pituitary', 8),
            ]
          },
          {
            id: 'bio-11-10-m2-l2',
            name: '2.2 Anterior Pituitary Hormones 🔥🔥',
            order: 2,
            totalTokens: 35,
            activities: [
              createQuiz('bio-11-10-m2-l2-a1', 'Which is NOT an anterior pituitary hormone?', ['GH', 'TSH', 'ACTH', 'ADH'], 3, 'ADH is posterior pituitary; anterior secretes GH, TSH, ACTH, FSH, LH, PRL, MSH', 10),
              createMatch('bio-11-10-m2-l2-a2', 'Match hormone with target/function', [
                {term: 'GH (Growth Hormone)', definition: 'Growth of body tissues, metabolic effects'},
                {term: 'TSH (Thyroid Stimulating)', definition: 'Thyroid gland growth and hormone release'},
                {term: 'ACTH (Adrenocorticotropic)', definition: 'Adrenal cortex growth and cortisol release'},
                {term: 'FSH (Follicle Stimulating)', definition: 'Gonads - follicle development, sperm production'},
                {term: 'LH (Luteinizing)', definition: 'Ovulation, testosterone production'},
                {term: 'Prolactin (PRL)', definition: 'Milk production in mammary glands'},
              ], 22),
              createFillBlank('bio-11-10-m2-l2-a3', 'Gonadotropins', 'FSH and LH are called _____ because they act on the _____ (testis/ovary).', ['gonadotropins', 'gonads'], ['gonadotropins', 'tropic', 'gonads', 'kidneys'], 10),
              createQuiz('bio-11-10-m2-l2-a4', 'Tropic hormones are those that:', ['Act directly on non-endocrine tissues', 'Stimulate other endocrine glands', 'Only act on pituitary', 'Are not protein hormones'], 1, 'Tropic hormones target other endocrine glands (TSH, ACTH, FSH, LH)', 10),
              createQuiz('bio-11-10-m2-l2-a5', 'Growth hormone excess in children causes:', ['Diabetes insipidus', 'Gigantism', 'Dwarfism', 'Cretinism'], 1, 'GH excess before epiphyseal closure → gigantism; after closure → acromegaly', 10),
              createTrueFalse('bio-11-10-m2-l2-a6', 'True or False', 'Prolactin stimulates milk production but inhibits ovulation during lactation (Lactational Amenorrhea)', true, 'High prolactin suppresses GnRH → no ovulation; natural contraceptive during breastfeeding', 8),
            ]
          },
          {
            id: 'bio-11-10-m2-l3',
            name: '2.3 Posterior Pituitary Hormones 🔥',
            order: 3,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-10-m2-l3-a1', 'The posterior pituitary releases:', ['GH and TSH', 'ADH (vasopressin) and oxytocin', 'ACTH and FSH', 'Insulin and glucagon'], 1, 'Only 2 hormones: ADH (antidiuretic) and oxytocin (childbirth, milk ejection)', 10),
              createMatch('bio-11-10-m2-l3-a2', 'Match posterior pituitary hormone with function', [
                {term: 'ADH (Vasopressin)', definition: 'Water reabsorption in kidneys, vasoconstriction'},
                {term: 'Oxytocin', definition: 'Uterine contractions, milk ejection reflex'},
                {term: 'Hypothalamic origin', definition: 'Both ADH and oxytocin made in hypothalamus'},
                {term: 'Neurophysins', definition: 'Carrier proteins for transport to posterior pituitary'},
              ], 15),
              createFillBlank('bio-11-10-m2-l3-a3', 'ADH function', 'ADH acts on the collecting ducts and distal tubules of the _____ to promote water _____.', ['kidney', 'reabsorption'], ['kidney', 'liver', 'reabsorption', 'secretion'], 10),
              createQuiz('bio-11-10-m2-l3-a4', 'Diabetes insipidus is caused by:', ['Excess insulin', 'ADH deficiency or insensitivity', 'Glucagon deficiency', 'GH excess'], 1, 'No ADH → cannot reabsorb water → 5-20 L/day dilute urine, extreme thirst', 10),
              createQuiz('bio-11-10-m2-l3-a5', 'Oxytocin causes:', ['Uterine relaxation', 'Uterine contraction and milk ejection', 'Water retention', 'Blood sugar decrease'], 1, 'Oxytocin = birth hormone; stimulates uterine contractions and milk let-down', 10),
            ]
          }
        ]
      },
      // ============ MODULE 3: Thyroid and Parathyroid ============
      {
        id: 'bio-11-10-m3',
        name: 'Thyroid & Parathyroid 🔥🔥',
        description: 'Thyroid hormones, calcitonin, PTH, iodine deficiency disorders',
        totalTokens: 85,
        levels: [
          {
            id: 'bio-11-10-m3-l1',
            name: '3.1 Thyroid Gland 🔥🔥',
            order: 1,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-10-m3-l1-a1', 'The thyroid gland is located:', ['In the brain', 'Over the trachea (butterfly-shaped)', 'In the abdomen', 'In the chest'], 1, 'Thyroid: butterfly-shaped, anterior neck over trachea, below larynx', 10),
              createMatch('bio-11-10-m3-l1-a2', 'Match thyroid structure/hormone with feature', [
                {term: 'Follicular cells', definition: 'Produce T3 and T4 (thyroid hormones)'},
                {term: 'Parafollicular/C-cells', definition: 'Produce calcitonin (calcium lowering)'},
                {term: 'Thyroxine (T4)', definition: 'Tetraiodothyronine, 4 iodine atoms'},
                {term: 'T3 (Triiodothyronine)', definition: 'Active form, 3 iodine atoms'},
                {term: 'Colloid', definition: 'Thyroglobulin - storage of thyroid hormones'},
              ], 20),
              createFillBlank('bio-11-10-m3-l1-a3', 'Iodine requirement', 'Iodine is essential for synthesis of _____ hormones; deficiency causes _____ and goiter.', ['thyroid', 'cretinism'], ['thyroid', 'adrenal', 'cretinism', 'acromegaly'], 10),
              createQuiz('bio-11-10-m3-l1-a4', 'T4 is converted to active T3 mainly in:', ['Thyroid gland only', 'Liver, kidneys, and target tissues', 'Pituitary only', 'Adrenal gland'], 1, 'T4 is prohormone; converted to T3 in peripheral tissues by deiodinases', 10),
              createQuiz('bio-11-10-m3-l1-a5', 'The colloid in thyroid follicles contains:', ['Already active T3 and T4', 'Thyroglobulin (precursor protein)', 'Calcitonin', 'PTH'], 1, 'Thyroglobulin is glycoprotein stored in colloid; iodinated to make hormones', 10),
              createTrueFalse('bio-11-10-m3-l1-a6', 'True or False', 'Thyroid hormones regulate basal metabolic rate (BMR), body temperature, and growth/development', true, 'T3/T4 increase BMR, protein synthesis, carbohydrate/fat metabolism; essential for brain development', 8),
            ]
          },
          {
            id: 'bio-11-10-m3-l2',
            name: '3.2 Thyroid Disorders 🔥',
            order: 2,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-10-m3-l2-a1', 'Goiter is caused by:', ['Excess iodine', 'Iodine deficiency causing compensatory enlargement', 'Excess calcium', 'GH deficiency'], 1, 'Low iodine → low T3/T4 → high TSH → thyroid enlargement (goiter)', 10),
              createMatch('bio-11-10-m3-l2-a2', 'Match thyroid disorder with cause/symptoms', [
                {term: 'Hypothyroidism (adult)', definition: 'Myxedema - low BMR, weight gain, cold intolerance'},
                {term: 'Hypothyroidism (infant)', definition: 'Cretinism - stunted growth, mental retardation'},
                {term: 'Hyperthyroidism', definition: 'Graves disease - exophthalmos, high BMR, weight loss'},
                {term: 'Hashimoto thyroiditis', definition: 'Autoimmune hypothyroidism'},
                {term: 'Simple goiter', definition: 'Iodine deficiency, compensatory enlargement'},
              ], 18),
              createFillBlank('bio-11-10-m3-l2-a3', 'Graves disease', 'Graves disease is an _____ disorder causing hyperthyroidism with bulging eyes called _____.', ['autoimmune', 'exophthalmos'], ['autoimmune', 'genetic', 'exophthalmos', 'strabismus'], 10),
              createQuiz('bio-11-10-m3-l2-l4', 'Cretinism can be prevented by:', ['Thyroid surgery', 'Iodized salt in diet', 'Removing parathyroid', 'GH injections'], 1, 'Iodine deficiency during pregnancy causes irreversible cretinism; use iodized salt', 10),
              createTrueFalse('bio-11-10-m3-l2-a5', 'True or False', 'Myxedema in adults is characterized by puffy face, dry skin, cold intolerance, and mental sluggishness', true, 'Hypothyroidism in adults: low metabolism, weight gain despite poor appetite', 8),
            ]
          },
          {
            id: 'bio-11-10-m3-l3',
            name: '3.3 Parathyroid and Calcium Regulation 🔥',
            order: 3,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-10-m3-l3-a1', 'Parathyroid glands are located:', ['Inside thyroid tissue', 'On the posterior surface of thyroid (4 glands)', 'In the brain', 'In the kidneys'], 1, '4 small parathyroid glands embedded in posterior thyroid capsule', 10),
              createMatch('bio-11-10-m3-l3-a2', 'Match calcium-regulating hormone with action', [
                {term: 'PTH (Parathyroid Hormone)', definition: 'Increases blood calcium (bone resorption, kidney reabsorption, vitamin D activation)'},
                {term: 'Calcitonin', definition: 'Decreases blood calcium (bone deposition)'},
                {term: 'PTH effect on bone', definition: 'Stimulates osteoclasts, bone resorption'},
                {term: 'PTH effect on kidney', definition: 'Increases Ca2+ reabsorption, PO4 excretion'},
                {term: 'Active vitamin D', definition: 'Increases intestinal Ca2+ absorption'},
              ], 20),
              createFillBlank('bio-11-10-m3-l3-a3', 'PTH action', 'PTH raises blood calcium by acting on _____, kidneys, and activating vitamin _____.', ['bones', 'D'], ['bones', 'muscles', 'D', 'K'], 10),
              createQuiz('bio-11-10-m3-l3-a4', 'Tetany (muscle spasms) can result from:', ['Excess PTH', 'Low PTH (hypoparathyroidism) causing low blood calcium', 'Excess calcitonin', 'High vitamin D'], 1, 'Low PTH → hypocalcemia → tetany (carpopedal spasm, laryngeal spasm)', 10),
              createQuiz('bio-11-10-m3-l3-a5', 'Osteoporosis can be caused by:', ['Excess calcitonin', 'Excess PTH (hyperparathyroidism) causing bone breakdown', 'Low GH', 'High thyroid'], 1, 'Hyperparathyroidism → chronic excess PTH → bone resorption → osteoporosis', 10),
            ]
          }
        ]
      },
      // ============ MODULE 4: Adrenal Gland ============
      {
        id: 'bio-11-10-m4',
        name: 'Adrenal Gland 🔥🔥',
        description: 'Adrenal cortex and medulla hormones, stress response',
        totalTokens: 85,
        levels: [
          {
            id: 'bio-11-10-m4-l1',
            name: '4.1 Adrenal Gland Structure 🔥',
            order: 1,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-10-m4-l1-a1', 'The adrenal glands are located:', ['Inside the brain', 'On top of the kidneys (suprarenal)', 'In the neck', 'In the abdomen near liver'], 1, 'Adrenal = suprarenal; one on each kidney; divided into cortex and medulla', 10),
              createMatch('bio-11-10-m4-l1-a2', 'Match adrenal region with origin and hormones', [
                {term: 'Adrenal cortex', definition: 'Mesodermal - steroid hormones (cortisol, aldosterone, androgens)'},
                {term: 'Adrenal medulla', definition: 'Ectodermal (neural crest) - catecholamines (adrenaline)'},
                {term: 'Zona glomerulosa', definition: 'Outer cortex - mineralocorticoids (aldosterone)'},
                {term: 'Zona fasciculata', definition: 'Middle cortex - glucocorticoids (cortisol)'},
                {term: 'Zona reticularis', definition: 'Inner cortex - androgens'},
              ], 18),
              createFillBlank('bio-11-10-m4-l1-a3', 'Adrenal zones', 'The adrenal cortex has 3 zones: zona _____, zona _____, and zona _____.', ['glomerulosa', 'fasciculata', 'reticularis'], ['glomerulosa', 'fasciculata', 'reticularis'], 12),
              createQuiz('bio-11-10-m4-l1-a4', 'Adrenal medulla develops from:', ['Mesoderm', 'Ectoderm (neural crest cells)', 'Endoderm', 'Notochord'], 1, 'Medulla = modified sympathetic ganglion; neural crest origin; secretes adrenaline', 10),
              createTrueFalse('bio-11-10-m4-l1-a5', 'True or False', 'The adrenal cortex is essential for life; complete removal causes death within days without hormone replacement', true, 'Cortisol and aldosterone are essential; medulla is not essential (sympathetic nerves compensate)', 8),
            ]
          },
          {
            id: 'bio-11-10-m4-l2',
            name: '4.2 Adrenal Cortex Hormones 🔥🔥',
            order: 2,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-10-m4-l2-a1', 'Aldosterone is a:', ['Glucocorticoid', 'Mineralocorticoid', 'Androgen', 'Catecholamine'], 1, 'Aldosterone = mineralocorticoid; regulates Na+/K+ balance; zona glomerulosa', 10),
              createMatch('bio-11-10-m4-l2-a2', 'Match cortical hormone with function', [
                {term: 'Aldosterone', definition: 'Na+ reabsorption, K+ excretion, water retention, BP regulation'},
                {term: 'Cortisol', definition: 'Gluconeogenesis, anti-inflammatory, stress response'},
                {term: 'Androgens (DHEA)', definition: 'Weak male hormones; source of estrogen in females'},
                {term: 'Cortisol deficiency', definition: 'Addisons disease - fatigue, low BP, skin pigmentation'},
                {term: 'Cortisol excess', definition: 'Cushings syndrome - moon face, buffalo hump, thin skin'},
              ], 20),
              createFillBlank('bio-11-10-m4-l2-a3', 'Cortisol effects', 'Cortisol increases blood glucose by stimulating _____ and has _____ effects on inflammation.', ['gluconeogenesis', 'anti-inflammatory'], ['gluconeogenesis', 'glycolysis', 'anti-inflammatory', 'pro-inflammatory'], 10),
              createQuiz('bio-11-10-m4-l2-a4', 'Addisons disease is caused by:', ['Cortisol excess', 'Cortisol/aldosterone deficiency (adrenal cortex destruction)', 'Adrenaline excess', 'Growth hormone deficiency'], 1, 'Addison: autoimmune destruction of cortex; low cortisol, low aldosterone; hyperpigmentation', 10),
              createQuiz('bio-11-10-m4-l2-a5', 'Primary hyperaldosteronism (Conn syndrome) causes:', ['Hypertension and low K+ (hypokalemia)', 'Low blood pressure', 'High calcium', 'Diabetes'], 0, 'Aldosterone excess → Na+ retention, K+ loss → hypertension, muscle weakness', 10),
              createTrueFalse('bio-11-10-m4-l2-a6', 'True or False', 'Cushings syndrome features include moon face, central obesity with thin limbs, buffalo hump, and striae', true, 'Excess cortisol causes fat redistribution, protein breakdown, skin thinning, immune suppression', 8),
            ]
          },
          {
            id: 'bio-11-10-m4-l3',
            name: '4.3 Adrenal Medulla 🔥',
            order: 3,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-10-m4-l3-a1', 'Adrenaline and noradrenaline are:', ['Steroids', 'Peptide hormones', 'Catecholamines derived from tyrosine', 'Iodinated compounds'], 2, 'Catecholamines: synthesized from tyrosine; water-soluble; bind membrane receptors', 10),
              createMatch('bio-11-10-m4-l3-a2', 'Match adrenal medulla hormone with effect', [
                {term: 'Adrenaline (epinephrine)', definition: '80% of medulla secretion; heart, vessels, metabolism'},
                {term: 'Noradrenaline (norepinephrine)', definition: '20% of medulla; mainly vasoconstriction'},
                {term: 'Fight or flight response', definition: 'Adrenaline increases heart rate, BP, glucose'},
                {term: 'Pheochromocytoma', definition: 'Adrenal medulla tumor - episodic hypertension'},
              ], 15),
              createFillBlank('bio-11-10-m4-l3-a3', 'Adrenaline effects', 'Adrenaline increases heart rate, dilates _____, dilates _____, and increases blood glucose.', ['bronchi', 'pupils'], ['bronchi', 'pupils', 'vessels', 'coronary'], 10),
              createQuiz('bio-11-10-m4-l3-a4', 'Adrenaline acts through:', ['Nuclear receptors', 'G-protein coupled receptors (alpha and beta adrenergic)', 'Intracellular receptors', 'Ion channels'], 1, 'Adrenergic receptors: α1, α2, β1, β2, β3; all GPCRs with second messengers', 10),
              createTrueFalse('bio-11-10-m4-l3-a5', 'True or False', 'The adrenal medulla is essentially a sympathetic ganglion that has been modified - it is stimulated by preganglionic sympathetic neurons', true, 'Preganglionic sympathetic fibers from splanchnic nerves directly stimulate chromaffin cells', 8),
            ]
          }
        ]
      },
      // ============ MODULE 5: Pancreas and Gonads ============
      {
        id: 'bio-11-10-m5',
        name: 'Pancreas & Gonads 🔥🔥',
        description: 'Islets of Langerhans, insulin, glucagon, sex hormones',
        totalTokens: 85,
        levels: [
          {
            id: 'bio-11-10-m5-l1',
            name: '5.1 Pancreas - Islets of Langerhans 🔥🔥',
            order: 1,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-10-m5-l1-a1', 'The endocrine part of pancreas consists of:', ['Acini', 'Islets of Langerhans', 'Ducts', 'No endocrine part'], 1, 'Islets of Langerhans = endocrine; acini = exocrine (digestive enzymes)', 10),
              createMatch('bio-11-10-m5-l1-a2', 'Match pancreatic cell type with hormone and function', [
                {term: 'Alpha (α) cells', definition: 'Glucagon (20%) - raises blood glucose'},
                {term: 'Beta (β) cells', definition: 'Insulin (70%) - lowers blood glucose'},
                {term: 'Delta (δ) cells', definition: 'Somatostatin (5-10%) - inhibits both'},
                {term: 'PP cells', definition: 'Pancreatic polypeptide - regulates pancreas secretion'},
              ], 18),
              createFillBlank('bio-11-10-m5-l1-a3', 'Insulin function', 'Insulin _____ blood glucose by promoting glucose _____ in muscle and adipose tissue.', ['lowers', 'uptake'], ['lowers', 'raises', 'uptake', 'release'], 10),
              createQuiz('bio-11-10-m5-l1-a4', 'Glucagon acts mainly on the:', ['Brain', 'Liver', 'Kidneys', 'Heart'], 1, 'Glucagon primarily targets liver: glycogenolysis, gluconeogenesis → raises blood glucose', 10),
              createQuiz('bio-11-10-m5-l1-a5', 'Diabetes mellitus type 1 is caused by:', ['Insulin resistance', 'Autoimmune destruction of beta cells (no insulin)', 'Excess glucagon', 'GH deficiency'], 1, 'Type 1: autoimmune, insulin-dependent; Type 2: insulin resistance', 10),
              createTrueFalse('bio-11-10-m5-l1-a6', 'True or False', 'Somatostatin from delta cells inhibits both insulin and glucagon secretion, preventing extreme fluctuations', true, 'Somatostatin = paracrine regulator; maintains stable glucose levels', 8),
            ]
          },
          {
            id: 'bio-11-10-m5-l2',
            name: '5.2 Testis - Male Sex Hormones 🔥',
            order: 2,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-10-m5-l2-a1', 'Testosterone is produced by:', ['Sertoli cells', 'Leydig cells (interstitial cells)', 'Seminiferous tubules', 'Epididymis'], 1, 'Leydig cells produce testosterone; Sertoli cells support spermatogenesis', 10),
              createMatch('bio-11-10-m5-l2-a2', 'Match male hormone with function', [
                {term: 'Testosterone', definition: 'Spermatogenesis, secondary sexual characteristics, muscle growth'},
                {term: 'Inhibin', definition: 'From Sertoli cells - inhibits FSH'},
                {term: 'LH (ICSH)', definition: 'Stimulates Leydig cells to make testosterone'},
                {term: 'FSH', definition: 'Stimulates Sertoli cells - sperm maturation'},
              ], 15),
              createFillBlank('bio-11-10-m5-l2-a3', 'LH function', 'LH stimulates _____ cells to produce testosterone; therefore LH is also called _____ in males.', ['Leydig', 'ICSH'], ['Leydig', 'Sertoli', 'ICSH', 'FSH'], 10),
              createQuiz('bio-11-10-m5-l2-a4', 'Androgens can be converted to estrogens in peripheral tissues by the enzyme:', ['5-alpha reductase', 'Aromatase', 'Hydroxylase', 'Dehydrogenase'], 1, 'Aromatase converts testosterone → estradiol; androstenedione → estrone (in fat, skin, brain)', 10),
              createTrueFalse('bio-11-10-m5-l2-a5', 'True or False', 'Testosterone promotes spermatogenesis, development of secondary sexual characteristics, and anabolic effects on muscle and bone', true, 'Testosterone is anabolic steroid; increases protein synthesis, red blood cell production', 8),
            ]
          },
          {
            id: 'bio-11-10-m5-l3',
            name: '5.3 Ovary - Female Sex Hormones 🔥',
            order: 3,
            totalTokens: 30,
            activities: [
              createQuiz('bio-11-10-m5-l3-a1', 'Estrogen is primarily produced by:', ['Corpus luteum only', 'Developing ovarian follicles (granulosa cells)', 'Pituitary', 'Uterus'], 1, 'Estrogen from developing follicles (preovulatory); corpus luteum produces progesterone + estrogen', 10),
              createMatch('bio-11-10-m5-l3-a2', 'Match female hormone with source and function', [
                {term: 'Estrogen (estradiol)', definition: 'Follicles - endometrial proliferation, secondary sexual characteristics'},
                {term: 'Progesterone', definition: 'Corpus luteum - maintains pregnancy, secretory endometrium'},
                {term: 'Relaxin', definition: 'Corpus luteum - softens pubic symphysis for childbirth'},
                {term: 'Inhibin', definition: 'Granulosa cells - inhibits FSH'},
                {term: 'hCG', definition: 'Placenta - maintains corpus luteum in early pregnancy'},
              ], 20),
              createFillBlank('bio-11-10-m5-l3-a3', 'Estrogen and progesterone', 'Estrogen causes endometrial _____, while progesterone causes endometrial _____ in preparation for pregnancy.', ['proliferation', 'secretory changes'], ['proliferation', 'secretory changes', 'breakdown', 'menstruation'], 10),
              createQuiz('bio-11-10-m5-l3-a4', 'The corpus luteum forms from:', ['Degenerating follicle after ovulation', 'Ovarian stroma', 'Fallopian tube', 'Uterus'], 0, 'After ovulation, remaining follicle cells become corpus luteum; secretes progesterone', 10),
              createQuiz('bio-11-10-m5-l3-a5', 'Hormone that maintains corpus luteum in early pregnancy is:', ['FSH', 'hCG (human chorionic gonadotropin)', 'LH', 'Prolactin'], 1, 'hCG from placenta rescues corpus luteum → continues progesterone production until placenta takes over', 10),
            ]
          }
        ]
      },
      // ============ MODULE 6: Other Hormones and PYQ ============
      {
        id: 'bio-11-10-m6',
        name: 'Other Hormones & PYQ 🔥🔥',
        description: 'Melatonin, thymosin, prostaglandins, atrial natriuretic factor, NEET PYQs',
        totalTokens: 75,
        levels: [
          {
            id: 'bio-11-10-m6-l1',
            name: '6.1 Other Endocrine Glands 🔥',
            order: 1,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-10-m6-l1-a1', 'Melatonin is secreted by:', ['Thyroid', 'Pineal gland (epiphysis)', 'Pituitary', 'Thymus'], 1, 'Pineal gland: melatonin regulates sleep-wake cycle (circadian rhythm), reproductive cycles', 10),
              createMatch('bio-11-10-m6-l1-a2', 'Match hormone/gland with function', [
                {term: 'Melatonin', definition: 'Sleep-wake cycle, seasonal breeding in animals'},
                {term: 'Thymosin', definition: 'Thymus - T-lymphocyte maturation, immunity'},
                {term: 'Prostaglandins', definition: 'Local hormones - inflammation, uterine contractions, gastric protection'},
                {term: 'ANF (Atrial Natriuretic Factor)', definition: 'Heart atria - Na+ excretion, vasodilation, lowers BP'},
                {term: 'Leptin', definition: 'Adipose tissue - satiety signal, inhibits hunger'},
              ], 18),
              createFillBlank('bio-11-10-m6-l1-a3', 'Pineal gland', 'The pineal gland is located on the _____ and secretes _____ to regulate biological rhythms.', ['dorsal diencephalon', 'melatonin'], ['dorsal diencephalon', 'ventricles', 'melatonin', 'serotonin'], 10),
              createQuiz('bio-11-10-m6-l1-a4', 'Prostaglandins are called local hormones because they:', ['Travel in blood to distant targets', 'Act locally near site of synthesis', 'Are produced by pituitary', 'Are steroid hormones'], 1, 'Autacoids/prostaglandins act locally (paracrine) on nearby cells; not true hormones', 10),
              createTrueFalse('bio-11-10-m6-l1-a5', 'True or False', 'ANF (atrial natriuretic factor) from heart atria causes vasodilation and sodium/water excretion, opposing aldosterone', true, 'ANF counters RAAS: dilates vessels, increases GFR, causes natriuresis and diuresis', 8),
            ]
          },
          {
            id: 'bio-11-10-m6-l2',
            name: '6.2 Hormone Feedback and Regulation 🔥',
            order: 2,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-10-m6-l2-a1', 'Most hormone secretion is regulated by:', ['Only positive feedback', 'Negative feedback (maintains homeostasis)', 'Only neural stimulation', 'Random release'], 1, 'Negative feedback is most common: product inhibits its own production (e.g., thyroid axis)', 10),
              createMatch('bio-11-10-m6-l2-a2', 'Match feedback type with example', [
                {term: 'Negative feedback', definition: 'Thyroid hormones inhibit TRH/TSH release'},
                {term: 'Positive feedback', definition: 'Oxytocin during childbirth (uterine contractions)'},
                {term: 'Hypothalamic-pituitary-target axis', definition: 'HPA axis, HPT axis, HPG axis'},
                {term: 'Long-loop feedback', definition: 'Target gland hormone inhibits hypothalamus'},
                {term: 'Short-loop feedback', definition: 'Pituitary hormone inhibits hypothalamus'},
              ], 18),
              createFillBlank('bio-11-10-m6-l2-a3', 'Feedback loops', 'In the hypothalamic-pituitary-thyroid axis: TRH → TSH → _____. High levels inhibit _____ and TSH release.', ['T3/T4', 'TRH'], ['T3/T4', 'TSH', 'TRH', 'GnRH'], 10),
              createQuiz('bio-11-10-m6-l2-a4', 'Positive feedback occurs during:', ['Maintenance of blood glucose', 'Childbirth (oxytocin release)', 'Temperature regulation', 'Blood pressure control'], 1, 'Positive feedback amplifies response; rare but important in childbirth and LH surge before ovulation', 10),
              createTrueFalse('bio-11-10-m6-l2-a5', 'True or False', 'The hypothalamic-pituitary-adrenal (HPA) axis involves CRH → ACTH → cortisol, with negative feedback at multiple levels', true, 'HPA axis stress response: hypothalamus releases CRH → pituitary ACTH → adrenal cortisol → feedback inhibition', 8),
            ]
          },
          {
            id: 'bio-11-10-m6-l3',
            name: '6.3 PYQ Master 🔥',
            order: 3,
            totalTokens: 25,
            activities: [
              createQuiz('bio-11-10-m6-l3-a1', 'PYQ: Insulin deficiency causes:', ['Hyperglycemia and glycosuria', 'Hypoglycemia', 'Cretinism', 'Goiter'], 0, 'No insulin → cannot use glucose → high blood glucose → spills into urine (diabetes mellitus)', 10),
              createQuiz('bio-11-10-m6-l3-a2', 'PYQ: Which hormone is NOT a steroid?', ['Cortisol', 'Aldosterone', 'Insulin', 'Testosterone'], 2, 'Insulin = peptide/protein hormone; others are steroid hormones from cholesterol', 10),
              createMatch('bio-11-10-m6-l3-a3', 'PYQ Quick Match', [
                {term: 'Beta cells', definition: 'Insulin'},
                {term: 'Alpha cells', definition: 'Glucagon'},
                {term: 'Leydig cells', definition: 'Testosterone'},
                {term: 'Thyroid follicular', definition: 'T3/T4'},
                {term: 'Parafollicular/C-cells', definition: 'Calcitonin'},
                {term: 'Adrenal cortex', definition: 'Cortisol'},
                {term: 'Adrenal medulla', definition: 'Adrenaline'},
                {term: 'Pineal', definition: 'Melatonin'},
              ], 20),
              createQuiz('bio-11-10-m6-l3-a4', 'PYQ: Acromegaly is caused by:', ['GH excess in children', 'GH excess in adults', 'GH deficiency', 'TSH excess'], 1, 'GH excess AFTER epiphyseal closure = acromegaly (enlarged hands, feet, jaw); BEFORE = gigantism', 10),
              createQuiz('bio-11-10-m6-l3-a5', 'PYQ: Graves disease affects the:', ['Pituitary', 'Thyroid (autoimmune hyperthyroidism)', 'Adrenal', 'Pancreas'], 1, 'Graves = autoimmune hyperthyroidism with exophthalmos; Hashimotos = autoimmune hypothyroidism', 10),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-11-11',
    name: 'Photosynthesis in Higher Plants',
    description: 'Light reaction, dark reaction, C3, C4, CAM plants',
    moduleCount: 5,
    modules: [
      {
        id: 'bio-11-11-m1',
        name: 'Photosynthesis',
        description: 'Light and dark reactions',
        totalTokens: 70,
        levels: [
          {
            id: 'bio-11-11-m1-l1',
            name: 'C3 Cycle',
            order: 1,
            totalTokens: 70,
            activities: [
              createQuiz('bio-11-11-m1-l1-a1', 'First stable product in C3:', ['PGA', 'OAA', 'RuBP', 'PEP'], 0, '3-phosphoglyceric acid (PGA) is first stable product', 10),
              createMatch('bio-11-11-m1-l1-a2', 'Match pigments', [
                {term: 'Chlorophyll a', definition: 'Primary pigment'},
                {term: 'Carotenoids', definition: 'Accessory pigments'},
                {term: 'PSI', definition: '700 nm wavelength'},
              ], 15),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-11-12',
    name: 'Respiration in Plants',
    description: 'Glycolysis, Krebs cycle, ETS, fermentation',
    moduleCount: 4,
    modules: [
      {
        id: 'bio-11-12-m1',
        name: 'Respiratory Pathways',
        description: 'Aerobic and anaerobic respiration',
        totalTokens: 60,
        levels: [
          {
            id: 'bio-11-12-m1-l1',
            name: 'Krebs Cycle',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('bio-11-12-m1-l1-a1', 'Krebs cycle occurs in:', ['Cytoplasm', 'Mitochondrial matrix', 'Cristae', 'Nucleus'], 1, 'Krebs cycle in mitochondrial matrix', 10),
              createFlashcard('bio-11-12-m1-l1-a2', 'Net ATP from glucose', '36-38 ATP', 'Glycolysis + Krebs + ETS', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-11-13',
    name: 'Plant Growth and Development',
    description: 'Plant hormones, photoperiodism, vernalization',
    moduleCount: 4,
    modules: [
      {
        id: 'bio-11-13-m1',
        name: 'Growth Regulators',
        description: 'Plant hormones and their functions',
        totalTokens: 55,
        levels: [
          {
            id: 'bio-11-13-m1-l1',
            name: 'Phytohormones',
            order: 1,
            totalTokens: 55,
            activities: [
              createQuiz('bio-11-13-m1-l1-a1', 'Auxin promotes:', ['Root growth', 'Stem elongation', 'Leaf fall', 'Seed dormancy'], 1, 'Auxin promotes cell elongation in stems', 10),
              createMatch('bio-11-13-m1-l1-a2', 'Match hormones', [
                {term: 'Gibberellins', definition: 'Stem elongation'},
                {term: 'Cytokinins', definition: 'Cell division'},
                {term: 'Ethylene', definition: 'Fruit ripening'},
              ], 15),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-11-14',
    name: 'Principles of Inheritance and Variation',
    description: 'Mendel laws, chromosomal theory, inheritance patterns',
    moduleCount: 6,
    modules: [
      {
        id: 'bio-11-14-m1',
        name: 'Mendelian Genetics',
        description: 'Laws of inheritance',
        totalTokens: 75,
        levels: [
          {
            id: 'bio-11-14-m1-l1',
            name: 'Mendels Laws',
            order: 1,
            totalTokens: 75,
            activities: [
              createQuiz('bio-11-14-m1-l1-a1', 'Phenotypic ratio in dihybrid cross:', ['9:3:3:1', '3:1', '1:2:1', '1:1:1:1'], 0, 'Classic Mendelian dihybrid ratio is 9:3:3:1', 10),
              createTrueFalse('bio-11-14-m1-l1-a2', 'True or False', 'Incomplete dominance produces 1:2:1 ratio', true, 'Intermediate phenotype in heterozygotes', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-11-15',
    name: 'Molecular Basis of Inheritance',
    description: 'DNA, RNA, replication, transcription, translation',
    moduleCount: 5,
    modules: [
      {
        id: 'bio-11-15-m1',
        name: 'Central Dogma',
        description: 'DNA to protein synthesis',
        totalTokens: 70,
        levels: [
          {
            id: 'bio-11-15-m1-l1',
            name: 'DNA Structure',
            order: 1,
            totalTokens: 70,
            activities: [
              createQuiz('bio-11-15-m1-l1-a1', 'DNA replication is:', ['Conservative', 'Semiconservative', 'Dispersive', 'Random'], 1, 'Each daughter DNA has one parental and one new strand', 10),
              createFlashcard('bio-11-15-m1-l1-a2', 'Codon', 'Triplet of nucleotides', 'Codes for one amino acid', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-11-16',
    name: 'Evolution',
    description: 'Origin of life, evidences, adaptive radiation, speciation',
    moduleCount: 5,
    modules: [
      {
        id: 'bio-11-16-m1',
        name: 'Evolutionary Theories',
        description: 'Darwin, Lamarck, modern synthesis',
        totalTokens: 65,
        levels: [
          {
            id: 'bio-11-16-m1-l1',
            name: 'Natural Selection',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('bio-11-16-m1-l1-a1', 'Industrial melanism is example of:', ['Natural selection', 'Artificial selection', 'Sexual selection', 'Genetic drift'], 0, 'Peppered moth example of natural selection', 10),
              createMatch('bio-11-16-m1-l1-a2', 'Match', [
                {term: 'Homologous organs', definition: 'Common ancestry'},
                {term: 'Analogous organs', definition: 'Convergent evolution'},
                {term: 'Vestigial organs', definition: 'Reduced function'},
              ], 15),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-11-17',
    name: 'Human Health and Disease',
    description: 'Common diseases, immunity, AIDS, cancer, drugs',
    moduleCount: 5,
    modules: [
      {
        id: 'bio-11-17-m1',
        name: 'Immunity',
        description: 'Immune system and disorders',
        totalTokens: 65,
        levels: [
          {
            id: 'bio-11-17-m1-l1',
            name: 'Types of Immunity',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('bio-11-17-m1-l1-a1', 'Antibodies are produced by:', ['T cells', 'B cells', 'Macrophages', 'Neutrophils'], 1, 'Plasma cells (differentiated B cells) produce antibodies', 10),
              createTrueFalse('bio-11-17-m1-l1-a2', 'True or False', 'Vaccines provide active immunity', true, 'Vaccines stimulate body to produce own antibodies', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-11-18',
    name: 'Body Fluids and Circulation',
    description: 'Blood, lymph, heart structure, circulation pathways',
    moduleCount: 5,
    modules: [
      {
        id: 'bio-11-18-m1',
        name: 'Blood Composition',
        description: 'Plasma, formed elements, blood groups',
        totalTokens: 65,
        levels: [
          {
            id: 'bio-11-18-m1-l1',
            name: 'Blood Components',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('bio-11-18-m1-l1-a1', 'Which blood component helps in clotting?', ['RBCs', 'WBCs', 'Platelets', 'Plasma'], 2, 'Platelets (thrombocytes) release clotting factors', 10),
              createMatch('bio-11-18-m1-l1-a2', 'Match blood cells with function', [
                {term: 'RBCs', definition: 'Oxygen transport'},
                {term: 'Neutrophils', definition: 'Phagocytosis'},
                {term: 'Lymphocytes', definition: 'Antibody production'},
                {term: 'Platelets', definition: 'Clotting'},
              ], 15),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-11-19',
    name: 'Excretory Products and their Elimination',
    description: 'Kidney structure, urine formation, osmoregulation',
    moduleCount: 4,
    modules: [
      {
        id: 'bio-11-19-m1',
        name: 'Human Excretory System',
        description: 'Kidney, ureter, urinary bladder, urethra',
        totalTokens: 60,
        levels: [
          {
            id: 'bio-11-19-m1-l1',
            name: 'Kidney Structure',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('bio-11-19-m1-l1-a1', 'Functional unit of kidney is:', ['Neuron', 'Nephron', 'Alveolus', 'Hepatocyte'], 1, 'Nephron is the structural and functional unit of kidney', 10),
              createTrueFalse('bio-11-19-m1-l1-a2', 'True or False', 'Urea is produced in liver from ammonia', true, 'Ornithine cycle converts toxic ammonia to urea in liver', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-11-20',
    name: 'Locomotion and Movement',
    description: 'Muscle types, skeletal system, joints, movement mechanisms',
    moduleCount: 4,
    modules: [
      {
        id: 'bio-11-20-m1',
        name: 'Muscle Types',
        description: 'Skeletal, smooth, cardiac muscle',
        totalTokens: 55,
        levels: [
          {
            id: 'bio-11-20-m1-l1',
            name: 'Muscle Tissue',
            order: 1,
            totalTokens: 55,
            activities: [
              createQuiz('bio-11-20-m1-l1-a1', 'Which muscle is striated and involuntary?', ['Skeletal', 'Smooth', 'Cardiac', 'Both A and C'], 2, 'Cardiac muscle is striated but involuntary', 10),
              createMatch('bio-11-20-m1-l1-a2', 'Match muscle type with feature', [
                {term: 'Skeletal', definition: 'Striated, voluntary, multinucleated'},
                {term: 'Smooth', definition: 'Non-striated, involuntary, uninucleated'},
                {term: 'Cardiac', definition: 'Striated, involuntary, uninucleated'},
              ], 15),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-11-21',
    name: 'Neural Control and Coordination',
    description: 'Nervous system, neuron structure, reflex action, sense organs',
    moduleCount: 5,
    modules: [
      {
        id: 'bio-11-21-m1',
        name: 'Neuron Structure',
        description: 'Cell body, dendrites, axon, synapse',
        totalTokens: 60,
        levels: [
          {
            id: 'bio-11-21-m1-l1',
            name: 'Nerve Cell',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('bio-11-21-m1-l1-a1', 'Myelin sheath is formed by:', ['Neurons', 'Schwann cells', 'Axons', 'Dendrites'], 1, 'Schwann cells produce myelin in PNS; oligodendrocytes in CNS', 10),
              createFlashcard('bio-11-21-m1-l1-a2', 'Synapse', 'Junction between neurons', 'Neurotransmitters cross synaptic cleft', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-11-22',
    name: 'Chemical Coordination and Integration',
    description: 'Endocrine system, hormones, feedback mechanisms',
    moduleCount: 5,
    modules: [
      {
        id: 'bio-11-22-m1',
        name: 'Endocrine Glands',
        description: 'Pituitary, thyroid, adrenal, pancreas',
        totalTokens: 65,
        levels: [
          {
            id: 'bio-11-22-m1-l1',
            name: 'Master Gland',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('bio-11-22-m1-l1-a1', 'Which gland is called the master gland?', ['Thyroid', 'Pituitary', 'Adrenal', 'Pancreas'], 1, 'Pituitary controls other endocrine glands via tropic hormones', 10),
              createMatch('bio-11-22-m1-l1-a2', 'Match gland with hormone', [
                {term: 'Thyroid', definition: 'Thyroxine'},
                {term: 'Adrenal', definition: 'Adrenaline'},
                {term: 'Pancreas', definition: 'Insulin'},
                {term: 'Pituitary', definition: 'Growth hormone'},
              ], 15),
            ]
          }
        ]
      }
    ]
  }
];

const biologyPlusTwoChapters: Chapter[] = [
  {
    id: 'bio-12-1',
    name: 'Reproduction in Organisms',
    description: 'Asexual and sexual reproduction strategies',
    moduleCount: 3,
    modules: [
      {
        id: 'bio-12-1-m1',
        name: 'Asexual Reproduction',
        description: 'Binary fission, budding, fragmentation',
        totalTokens: 55,
        levels: [
          {
            id: 'bio-12-1-m1-l1',
            name: 'Types of Asexual Reproduction',
            order: 1,
            totalTokens: 55,
            activities: [
              createQuiz('bio-12-1-m1-l1-a1', 'Which organism reproduces by binary fission?', ['Amoeba', 'Hydra', 'Spirogyra', 'Yeast'], 0, 'Amoeba divides into two equal halves by binary fission', 10),
              createMatch('bio-12-1-m1-l1-a2', 'Match organisms with their reproduction', [
                {term: 'Hydra', definition: 'Budding'},
                {term: 'Planaria', definition: 'Regeneration'},
                {term: 'Spirogyra', definition: 'Fragmentation'},
                {term: 'Amoeba', definition: 'Binary fission'},
              ], 15),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-12-2',
    name: 'Sexual Reproduction in Flowering Plants',
    description: 'Flower structure, pollination, fertilization',
    moduleCount: 4,
    modules: [
      {
        id: 'bio-12-2-m1',
        name: 'Flower Structure',
        description: 'Parts of a flower and their functions',
        totalTokens: 60,
        levels: [
          {
            id: 'bio-12-2-m1-l1',
            name: 'Flower Parts',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('bio-12-2-m1-l1-a1', 'Which part of flower develops into fruit?', ['Ovary', 'Stigma', 'Style', 'Anther'], 0, 'After fertilization, ovary develops into fruit and ovules into seeds', 10),
              createFillBlank('bio-12-2-m1-l1-a2', 'Fill in', 'The male reproductive part of flower is called _____.', ['stamen'], ['stamen', 'pistil', 'carpel', 'ovary'], 10),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-12-3',
    name: 'Human Reproduction',
    description: 'Male and female reproductive systems, gametogenesis, menstrual cycle',
    moduleCount: 5,
    modules: [
      {
        id: 'bio-12-3-m1',
        name: 'Male Reproductive System',
        description: 'Testes, accessory ducts, glands',
        totalTokens: 65,
        levels: [
          {
            id: 'bio-12-3-m1-l1',
            name: 'Male Reproductive Organs',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('bio-12-3-m1-l1-a1', 'Where does spermatogenesis occur?', ['Vas deferens', 'Seminiferous tubules', 'Epididymis', 'Prostate gland'], 1, 'Sperm production occurs in seminiferous tubules of testes', 10),
              createMatch('bio-12-3-m1-l1-a2', 'Match part with function', [
                {term: 'Epididymis', definition: 'Sperm maturation and storage'},
                {term: 'Vas deferens', definition: 'Transport sperm to urethra'},
                {term: 'Seminal vesicle', definition: 'Produces fructose-rich fluid'},
              ], 15),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-12-4',
    name: 'Reproductive Health',
    description: 'Family planning, contraception, STDs, infertility',
    moduleCount: 4,
    modules: [
      {
        id: 'bio-12-4-m1',
        name: 'Contraception Methods',
        description: 'Natural, barrier, IUDs, hormonal, surgical',
        totalTokens: 60,
        levels: [
          {
            id: 'bio-12-4-m1-l1',
            name: 'Birth Control',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('bio-12-4-m1-l1-a1', 'Which is a permanent contraceptive method?', ['IUD', 'Condom', 'Vasectomy', 'Pill'], 2, 'Vasectomy and tubectomy are surgical permanent methods', 10),
              createTrueFalse('bio-12-4-m1-l1-a2', 'True or False', 'Condoms provide protection against STDs', true, 'Condoms are barrier methods that prevent both pregnancy and STDs', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-12-5',
    name: 'Principles of Inheritance and Variation',
    description: 'Mendelian genetics, chromosomal theory, mutations, pedigree',
    moduleCount: 6,
    modules: [
      {
        id: 'bio-12-5-m1',
        name: 'Mendelian Genetics',
        description: 'Laws of inheritance, dominance, segregation',
        totalTokens: 70,
        levels: [
          {
            id: 'bio-12-5-m1-l1',
            name: 'Laws of Inheritance',
            order: 1,
            totalTokens: 70,
            activities: [
              createQuiz('bio-12-5-m1-l1-a1', 'Genotypic ratio in monohybrid cross is:', ['3:1', '1:2:1', '9:3:3:1', '1:1'], 1, 'Genotypic ratio is 1(AA):2(Aa):1(aa)', 10),
              createMatch('bio-12-5-m1-l1-a2', 'Match cross type with ratio', [
                {term: 'Monohybrid phenotypic', definition: '3:1'},
                {term: 'Monohybrid genotypic', definition: '1:2:1'},
                {term: 'Dihybrid phenotypic', definition: '9:3:3:1'},
              ], 15),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-12-6',
    name: 'Molecular Basis of Inheritance',
    description: 'DNA structure, replication, transcription, translation, gene regulation',
    moduleCount: 6,
    modules: [
      {
        id: 'bio-12-6-m1',
        name: 'DNA Structure and Replication',
        description: 'Double helix, semiconservative replication',
        totalTokens: 70,
        levels: [
          {
            id: 'bio-12-6-m1-l1',
            name: 'DNA Structure',
            order: 1,
            totalTokens: 70,
            activities: [
              createQuiz('bio-12-6-m1-l1-a1', 'DNA replication in eukaryotes occurs during:', ['G1 phase', 'S phase', 'G2 phase', 'M phase'], 1, 'S (synthesis) phase is when DNA replicates', 10),
              createTrueFalse('bio-12-6-m1-l1-a2', 'True or False', 'DNA polymerase synthesizes DNA in 5 to 3 direction', true, 'DNA is always synthesized 5→3 direction', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-12-7',
    name: 'Evolution',
    description: 'Origin of life, biological evolution, evidences, adaptive radiation',
    moduleCount: 5,
    modules: [
      {
        id: 'bio-12-7-m1',
        name: 'Theories of Evolution',
        description: 'Darwin, Lamarck, Hardy-Weinberg, speciation',
        totalTokens: 65,
        levels: [
          {
            id: 'bio-12-7-m1-l1',
            name: 'Evolutionary Mechanisms',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('bio-12-7-m1-l1-a1', 'Natural selection acts on:', ['Genotype', 'Phenotype', 'Gene pool', 'Chromosomes'], 1, 'Selection acts on expressed traits (phenotype)', 10),
              createFlashcard('bio-12-7-m1-l1-a2', 'Speciation', 'Formation of new species', 'Occurs due to reproductive isolation', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-12-8',
    name: 'Human Health and Disease',
    description: 'Pathogens, immunity, AIDS, cancer, drug abuse',
    moduleCount: 5,
    modules: [
      {
        id: 'bio-12-8-m1',
        name: 'Disease Types',
        description: 'Infectious, non-infectious, autoimmune',
        totalTokens: 65,
        levels: [
          {
            id: 'bio-12-8-m1-l1',
            name: 'Communicable Diseases',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('bio-12-8-m1-l1-a1', 'Malaria is caused by:', ['Bacteria', 'Virus', 'Plasmodium', 'Fungus'], 2, 'Plasmodium is a protozoan parasite transmitted by Anopheles mosquito', 10),
              createMatch('bio-12-8-m1-l1-a2', 'Match disease with pathogen', [
                {term: 'Typhoid', definition: 'Salmonella typhi'},
                {term: 'Tuberculosis', definition: 'Mycobacterium tuberculosis'},
                {term: 'AIDS', definition: 'HIV virus'},
              ], 15),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-12-9',
    name: 'Strategies for Enhancement in Food Production',
    description: 'Animal husbandry, plant breeding, biofortification, tissue culture',
    moduleCount: 5,
    modules: [
      {
        id: 'bio-12-9-m1',
        name: 'Plant Breeding',
        description: 'Hybridization, mutation breeding, GMOs',
        totalTokens: 60,
        levels: [
          {
            id: 'bio-12-9-m1-l1',
            name: 'Crop Improvement',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('bio-12-9-m1-l1-a1', 'Green Revolution in India was led by:', ['Wheat and Rice', 'Maize and Sorghum', 'Cotton and Jute', 'Pulses'], 0, 'High-yielding wheat and rice varieties increased food production', 10),
              createTrueFalse('bio-12-9-m1-l1-a2', 'True or False', 'Mutation breeding uses radiation to create genetic variations', true, 'Radiation induces mutations for desirable traits', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-12-10',
    name: 'Microbes in Human Welfare',
    description: 'Microbes in food, antibiotics, sewage treatment, biogas',
    moduleCount: 5,
    modules: [
      {
        id: 'bio-12-10-m1',
        name: 'Microbes in Food',
        description: 'Fermentation, dairy products, probiotics',
        totalTokens: 55,
        levels: [
          {
            id: 'bio-12-10-m1-l1',
            name: 'Fermentation',
            order: 1,
            totalTokens: 55,
            activities: [
              createQuiz('bio-12-10-m1-l1-a1', 'Which microbe produces Swiss cheese holes?', ['Lactobacillus', 'Propionibacterium', 'Streptococcus', 'Acetobacter'], 1, 'Propionibacterium shermanii releases CO2 creating holes', 10),
              createMatch('bio-12-10-m1-l1-a2', 'Match microbe with product', [
                {term: 'Saccharomyces', definition: 'Bread, beer'},
                {term: 'Lactobacillus', definition: 'Curd, yogurt'},
                {term: 'Acetobacter', definition: 'Vinegar'},
              ], 15),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-12-11',
    name: 'Biotechnology: Principles and Processes',
    description: 'Genetic engineering, tools of rDNA, bioreactors, downstream processing',
    moduleCount: 5,
    modules: [
      {
        id: 'bio-12-11-m1',
        name: 'Genetic Engineering Tools',
        description: 'Restriction enzymes, vectors, competent host',
        totalTokens: 65,
        levels: [
          {
            id: 'bio-12-11-m1-l1',
            name: 'Molecular Tools',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('bio-12-11-m1-l1-a1', 'EcoRI recognizes and cuts at:', ['5-GAATTC-3', '5-GGATCC-3', '5-AAGCTT-3', '5-GTCGAC-3'], 0, 'EcoRI recognizes 5-GAATTC-3 sequence', 10),
              createFlashcard('bio-12-11-m1-l1-a2', 'Plasmid', 'Extrachromosomal DNA', 'Used as cloning vector in bacteria', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-12-12',
    name: 'Biotechnology and its Applications',
    description: 'GMOs, agriculture, medicine, diagnostics, ethical issues',
    moduleCount: 5,
    modules: [
      {
        id: 'bio-12-12-m1',
        name: 'Bt Crops',
        description: 'Pest-resistant genetically modified crops',
        totalTokens: 60,
        levels: [
          {
            id: 'bio-12-12-m1-l1',
            name: 'GM Agriculture',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('bio-12-12-m1-l1-a1', 'Bt toxin is obtained from:', ['Bacillus subtilis', 'Bacillus thuringiensis', 'Bacillus megaterium', 'Bacillus cereus'], 1, 'Bt cotton contains toxin gene from Bacillus thuringiensis', 10),
              createTrueFalse('bio-12-12-m1-l1-a2', 'True or False', 'Golden Rice is biofortified with Vitamin A', true, 'Golden Rice produces beta-carotene (pro-vitamin A)', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-12-13',
    name: 'Organisms and Populations',
    description: 'Ecology levels, population attributes, growth models, interactions',
    moduleCount: 5,
    modules: [
      {
        id: 'bio-12-13-m1',
        name: 'Population Ecology',
        description: 'Population attributes, growth curves',
        totalTokens: 60,
        levels: [
          {
            id: 'bio-12-13-m1-l1',
            name: 'Population Growth',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('bio-12-13-m1-l1-a1', 'Exponential growth is represented by:', ['S-shaped curve', 'J-shaped curve', 'Bell curve', 'Straight line'], 1, 'J-shaped curve shows unlimited exponential growth', 10),
              createMatch('bio-12-13-m1-l1-a2', 'Match interaction with effect', [
                {term: 'Predation', definition: 'One organism kills another'},
                {term: 'Competition', definition: 'Both organisms harmed'},
                {term: 'Mutualism', definition: 'Both organisms benefit'},
                {term: 'Parasitism', definition: 'One benefits, one harmed'},
              ], 15),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-12-14',
    name: 'Ecosystem',
    description: 'Structure, productivity, decomposition, energy flow, pyramids',
    moduleCount: 5,
    modules: [
      {
        id: 'bio-12-14-m1',
        name: 'Ecosystem Structure',
        description: 'Biotic and abiotic components, trophic levels',
        totalTokens: 60,
        levels: [
          {
            id: 'bio-12-14-m1-l1',
            name: 'Energy Flow',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('bio-12-14-m1-l1-a1', 'Primary producers in ecosystem are:', ['Carnivores', 'Herbivores', 'Green plants', 'Decomposers'], 2, 'Green plants and photosynthetic bacteria are primary producers', 10),
              createTrueFalse('bio-12-14-m1-l1-a2', 'True or False', 'Energy flow in ecosystem is unidirectional', true, 'Energy flows from sun → producers → consumers, cannot return', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-12-15',
    name: 'Biodiversity and Conservation',
    description: 'Genetic, species, ecosystem diversity, patterns, conservation strategies',
    moduleCount: 5,
    modules: [
      {
        id: 'bio-12-15-m1',
        name: 'Biodiversity Types',
        description: 'Genetic, species, and ecosystem diversity',
        totalTokens: 60,
        levels: [
          {
            id: 'bio-12-15-m1-l1',
            name: 'Levels of Biodiversity',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('bio-12-15-m1-l1-a1', 'India accounts for what percentage of global species?', ['2-3%', '8-10%', '15-20%', '25-30%'], 1, 'India has 8.1% of global species diversity', 10),
              createMatch('bio-12-15-m1-l1-a2', 'Match biodiversity type with example', [
                {term: 'Genetic diversity', definition: 'Different varieties of rice'},
                {term: 'Species diversity', definition: 'Different species in a forest'},
                {term: 'Ecosystem diversity', definition: 'Desert, forest, wetland'},
              ], 15),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-12-16',
    name: 'Environmental Issues',
    description: 'Pollution, climate change, ozone depletion, deforestation, solutions',
    moduleCount: 5,
    modules: [
      {
        id: 'bio-12-16-m1',
        name: 'Air and Water Pollution',
        description: 'Sources, effects, control measures',
        totalTokens: 60,
        levels: [
          {
            id: 'bio-12-16-m1-l1',
            name: 'Pollution Control',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('bio-12-16-m1-l1-a1', 'Main cause of ozone depletion is:', ['CO2', 'CFCs', 'SO2', 'NO2'], 1, 'Chlorofluorocarbons (CFCs) break down ozone in stratosphere', 10),
              createMatch('bio-12-16-m1-l1-a2', 'Match pollutant with source', [
                {term: 'SO2', definition: 'Burning fossil fuels'},
                {term: 'NOx', definition: 'Vehicle exhaust'},
                {term: 'CO', definition: 'Incomplete combustion'},
              ], 15),
            ]
          }
        ]
      }
    ]
  }
];

// ============ EXPORT SUBJECTS ============
export const subjects: Subject[] = [
  {
    id: 'physics',
    name: 'Physics',
    color: '#1cb0f6',
    icon: 'atom',
    grades: {
      plus_one: physicsPlusOneChapters,
      plus_two: physicsPlusTwoChapters,
    }
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    color: '#ce82ff',
    icon: 'flask-conical',
    grades: {
      plus_one: chemistryPlusOneChapters,
      plus_two: chemistryPlusTwoChapters,
    }
  },
  {
    id: 'biology',
    name: 'Biology',
    color: '#58cc02',
    icon: 'leaf',
    grades: {
      plus_one: biologyPlusOneChapters,
      plus_two: biologyPlusTwoChapters,
    }
  },
];

export const getSubject = (id: string) => subjects.find(s => s.id === id);
export const getChapter = (subjectId: string, grade: Grade, chapterId: string) => {
  const subject = getSubject(subjectId);
  return subject?.grades[grade]?.find(c => c.id === chapterId);
};
export const getModule = (subjectId: string, grade: Grade, chapterId: string, moduleId: string) => {
  const chapter = getChapter(subjectId, grade, chapterId);
  return chapter?.modules.find(m => m.id === moduleId);
};
export const getLevel = (subjectId: string, grade: Grade, chapterId: string, moduleId: string, levelId: string) => {
  const module = getModule(subjectId, grade, chapterId, moduleId);
  return module?.levels.find(l => l.id === levelId);
};
