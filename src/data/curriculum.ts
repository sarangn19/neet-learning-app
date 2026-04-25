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
    description: 'Five kingdom system, taxonomy hierarchy',
    moduleCount: 4,
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
      }
    ]
  },
  {
    id: 'bio-11-3',
    name: 'Plant Kingdom',
    description: 'Algae, Bryophytes, Pteridophytes, Gymnosperms, Angiosperms',
    moduleCount: 5,
    modules: [
      {
        id: 'bio-11-3-m1',
        name: 'Algae',
        description: 'Chlorophyceae, Phaeophyceae, Rhodophyceae',
        totalTokens: 55,
        levels: [
          {
            id: 'bio-11-3-m1-l1',
            name: 'Green Algae',
            order: 1,
            totalTokens: 55,
            activities: [
              createQuiz('bio-11-3-m1-l1-a1', 'What pigment gives green algae their color?', ['Chlorophyll a & b', 'Fucoxanthin', 'Phycoerythrin', 'Carotenoids'], 0, 'Chlorophyceae contain chlorophyll a and b', 10),
              createTrueFalse('bio-11-3-m1-l1-a2', 'True or False', 'Brown algae contain fucoxanthin pigment', true, 'Phaeophyceae (brown algae) have fucoxanthin', 8),
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
    description: 'Respiratory system, breathing mechanisms, gas exchange',
    moduleCount: 3,
    modules: [
      {
        id: 'bio-11-5-m1',
        name: 'Respiratory System',
        description: 'Organs and breathing mechanism',
        totalTokens: 50,
        levels: [
          {
            id: 'bio-11-5-m1-l1',
            name: 'Mechanism of Breathing',
            order: 1,
            totalTokens: 50,
            activities: [
              createQuiz('bio-11-5-m1-l1-a1', 'What is the primary muscle for breathing?', ['Intercostal', 'Diaphragm', 'Abdominal', 'Pectoral'], 1, 'Diaphragm is the primary breathing muscle', 10),
              createTrueFalse('bio-11-5-m1-l1-a2', 'True or False', 'During inspiration, diaphragm contracts and flattens', true, 'Contraction increases thoracic volume', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-11-6',
    name: 'Body Fluids and Circulation',
    description: 'Blood, heart, blood vessels, lymphatic system',
    moduleCount: 4,
    modules: [
      {
        id: 'bio-11-6-m1',
        name: 'Circulatory System',
        description: 'Blood composition and circulation',
        totalTokens: 65,
        levels: [
          {
            id: 'bio-11-6-m1-l1',
            name: 'Blood Components',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('bio-11-6-m1-l1-a1', 'Which blood cell lacks nucleus?', ['Neutrophil', 'Monocyte', 'Erythrocyte', 'Lymphocyte'], 2, 'RBCs lose nucleus during maturation', 10),
              createMatch('bio-11-6-m1-l1-a2', 'Match components', [
                {term: 'RBC', definition: 'Oxygen transport'},
                {term: 'WBC', definition: 'Immunity'},
                {term: 'Platelets', definition: 'Clotting'},
              ], 15),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-11-7',
    name: 'Excretory Products and Their Elimination',
    description: 'Kidney, urine formation, osmoregulation',
    moduleCount: 4,
    modules: [
      {
        id: 'bio-11-7-m1',
        name: 'Excretory System',
        description: 'Human kidney and nephron',
        totalTokens: 60,
        levels: [
          {
            id: 'bio-11-7-m1-l1',
            name: 'Nephrons',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('bio-11-7-m1-l1-a1', 'Filtration occurs in:', ['PCT', 'DCT', 'Bowmans capsule', 'Loop of Henle'], 2, 'Glomerular filtration in Bowmans capsule', 10),
              createTrueFalse('bio-11-7-m1-l1-a2', 'True or False', 'ADH increases water reabsorption', true, 'ADH makes DCT and collecting duct permeable to water', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-11-8',
    name: 'Locomotion and Movement',
    description: 'Muscles, bones, joints, disorders',
    moduleCount: 4,
    modules: [
      {
        id: 'bio-11-8-m1',
        name: 'Muscular System',
        description: 'Muscle types and contraction',
        totalTokens: 60,
        levels: [
          {
            id: 'bio-11-8-m1-l1',
            name: 'Muscle Types',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('bio-11-8-m1-l1-a1', 'Striated muscles are:', ['Smooth', 'Cardiac and skeletal', 'Only cardiac', 'Only skeletal'], 1, 'Both cardiac and skeletal muscles are striated', 10),
              createFlashcard('bio-11-8-m1-l1-a2', 'Sarcomere', 'Contractile unit', 'Between two Z-lines', 8),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-11-9',
    name: 'Neural Control and Coordination',
    description: 'Neuron, synapse, CNS, PNS, reflex action',
    moduleCount: 5,
    modules: [
      {
        id: 'bio-11-9-m1',
        name: 'Nervous System',
        description: 'Neuron structure and function',
        totalTokens: 65,
        levels: [
          {
            id: 'bio-11-9-m1-l1',
            name: 'Neurons',
            order: 1,
            totalTokens: 65,
            activities: [
              createQuiz('bio-11-9-m1-l1-a1', 'Resting membrane potential is:', ['-70mV', '0mV', '+70mV', '-90mV'], 0, 'Resting potential is negative at -70mV', 10),
              createMatch('bio-11-9-m1-l1-a2', 'Match parts', [
                {term: 'Dendrite', definition: 'Receives signals'},
                {term: 'Axon', definition: 'Transmits signals'},
                {term: 'Synapse', definition: 'Neuron junction'},
              ], 15),
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bio-11-10',
    name: 'Chemical Coordination and Integration',
    description: 'Endocrine glands, hormones, disorders',
    moduleCount: 4,
    modules: [
      {
        id: 'bio-11-10-m1',
        name: 'Endocrine System',
        description: 'Hormones and their functions',
        totalTokens: 60,
        levels: [
          {
            id: 'bio-11-10-m1-l1',
            name: 'Hormones',
            order: 1,
            totalTokens: 60,
            activities: [
              createQuiz('bio-11-10-m1-l1-a1', 'Insulin is secreted by:', ['Alpha cells', 'Beta cells', 'Delta cells', 'Gamma cells'], 1, 'Beta cells of islets of Langerhans secrete insulin', 10),
              createTrueFalse('bio-11-10-m1-l1-a2', 'True or False', 'Adrenaline is fight or flight hormone', true, 'Adrenaline prepares body for emergency', 8),
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
