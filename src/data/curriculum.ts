import type { Subject, Grade, Chapter, Module, Level, Activity } from '../types';

// Helper to create activities
const createQuiz = (id: string, question: string, options: string[], correct: number, explanation: string, xp = 10): Activity => ({
  id, type: 'quiz', question, xpReward: xp,
  data: { options, correctAnswer: correct, explanation }
});

const createFlashcard = (id: string, question: string, front: string, back: string, xp = 5): Activity => ({
  id, type: 'flashcard', question, xpReward: xp,
  data: { front, back }
});

const createMatch = (id: string, question: string, pairs: {term: string, definition: string}[], xp = 15): Activity => ({
  id, type: 'match', question, xpReward: xp,
  data: { pairs }
});

const createTrueFalse = (id: string, question: string, statement: string, isTrue: boolean, explanation: string, xp = 8): Activity => ({
  id, type: 'true_false', question, xpReward: xp,
  data: { statement, isTrue, explanation }
});

const createFillBlank = (id: string, question: string, sentence: string, blanks: string[], options: string[], xp = 12): Activity => ({
  id, type: 'fill_blank', question, xpReward: xp,
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
        totalXP: 50,
        levels: [
          {
            id: 'phy-11-1-m1-l1',
            name: 'Start',
            order: 1,
            totalXP: 50,
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
            totalXP: 60,
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
        totalXP: 70,
        levels: [
          {
            id: 'phy-11-1-m2-l1',
            name: 'Forces Overview',
            order: 1,
            totalXP: 70,
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
        totalXP: 60,
        levels: [
          {
            id: 'phy-11-2-m1-l1',
            name: 'Base Units',
            order: 1,
            totalXP: 60,
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
        totalXP: 70,
        levels: [
          {
            id: 'phy-11-2-m2-l1',
            name: 'Error Types',
            order: 1,
            totalXP: 70,
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
        totalXP: 55,
        levels: [
          {
            id: 'phy-11-3-m1-l1',
            name: 'Position & Path',
            order: 1,
            totalXP: 55,
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
        totalXP: 65,
        levels: [
          {
            id: 'phy-11-3-m2-l1',
            name: 'Rate of Change',
            order: 1,
            totalXP: 65,
            activities: [
              createQuiz('phy-11-3-m2-l1-a1', 'What is the unit of acceleration in SI?', ['m/s', 'm/s²', 'm²/s', 's/m'], 1, 'Acceleration = change in velocity / time, so unit is m/s²', 10),
              createFlashcard('phy-11-3-m2-l1-a2', 'Key Formula', 'v = u + at', 'Final velocity = initial velocity + acceleration × time', 5),
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
        totalXP: 60,
        levels: [
          {
            id: 'phy-12-1-m1-l1',
            name: 'Charge Basics',
            order: 1,
            totalXP: 60,
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
        totalXP: 65,
        levels: [
          {
            id: 'phy-12-2-m1-l1',
            name: 'Potential Energy',
            order: 1,
            totalXP: 65,
            activities: [
              createQuiz('phy-12-2-m1-l1-a1', 'What is the unit of electric potential?', ['Volt', 'Ampere', 'Coulomb', 'Joule'], 0, 'Volt (V) is the SI unit of electric potential', 10),
              createFlashcard('phy-12-2-m1-l1-a2', 'Key Relationship', 'V = kQ/r', 'Electric potential at distance r from point charge Q', 5),
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
        totalXP: 55,
        levels: [
          {
            id: 'chem-11-1-m1-l1',
            name: 'Properties of Matter',
            order: 1,
            totalXP: 55,
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
        totalXP: 70,
        levels: [
          {
            id: 'chem-11-1-m2-l1',
            name: 'The Mole',
            order: 1,
            totalXP: 70,
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
        totalXP: 60,
        levels: [
          {
            id: 'chem-11-2-m1-l1',
            name: 'Early Models',
            order: 1,
            totalXP: 60,
            activities: [
              createQuiz('chem-11-2-m1-l1-a1', 'Who proposed the nuclear model of atom?', ['Thomson', 'Rutherford', 'Bohr', 'Dalton'], 1, 'Rutherford\'s gold foil experiment led to nuclear model', 10),
              createTrueFalse('chem-11-2-m1-l1-a2', 'True or False', 'Bohr\'s model could explain hydrogen spectrum', true, 'Bohr\'s model successfully explained hydrogen spectrum', 8),
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
        totalXP: 65,
        levels: [
          {
            id: 'chem-12-1-m1-l1',
            name: 'Unit Cells',
            order: 1,
            totalXP: 65,
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
        totalXP: 60,
        levels: [
          {
            id: 'chem-12-2-m1-l1',
            name: 'Molarity',
            order: 1,
            totalXP: 60,
            activities: [
              createQuiz('chem-12-2-m1-l1-a1', 'What is molarity?', ['mol/kg', 'mol/L', 'g/L', 'kg/mol'], 1, 'Molarity = moles of solute / liters of solution', 10),
              createFlashcard('chem-12-2-m1-l1-a2', 'Formula', 'M = n/V', 'Molarity equals moles divided by volume in liters', 5),
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
    description: 'Characteristics of life, taxonomy, nomenclature',
    moduleCount: 3,
    modules: [
      {
        id: 'bio-11-1-m1',
        name: 'Life Characteristics',
        description: 'What makes something alive',
        totalXP: 50,
        levels: [
          {
            id: 'bio-11-1-m1-l1',
            name: 'Is it Alive?',
            order: 1,
            totalXP: 50,
            activities: [
              createQuiz('bio-11-1-m1-l1-a1', 'Which is NOT a characteristic of living organisms?', ['Metabolism', 'Reproduction', 'Growth', 'Crystallization'], 3, 'Crystallization is a physical process, not a life characteristic', 10),
              createMatch('bio-11-1-m1-l1-a2', 'Match terms with definitions', [
                {term: 'Metabolism', definition: 'Sum of all chemical reactions'},
                {term: 'Homeostasis', definition: 'Maintaining stable internal environment'},
                {term: 'Growth', definition: 'Increase in mass and number of cells'},
                {term: 'Reproduction', definition: 'Production of offspring'},
              ], 15),
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
        totalXP: 65,
        levels: [
          {
            id: 'bio-11-2-m1-l1',
            name: 'Kingdoms Overview',
            order: 1,
            totalXP: 65,
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
        totalXP: 55,
        levels: [
          {
            id: 'bio-11-3-m1-l1',
            name: 'Green Algae',
            order: 1,
            totalXP: 55,
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
        totalXP: 135,
        levels: [
          {
            id: 'bio-11-4-m1-l1',
            name: '1.1 Definition & Need',
            order: 1,
            totalXP: 20,
            activities: [
              createQuiz('bio-m1-l1-a1', 'What is the primary purpose of digestion?', ['To absorb water', 'To convert complex food into absorbable nutrients', 'To produce enzymes', 'To eliminate waste'], 1, 'Digestion breaks down complex food molecules into simple absorbable nutrients', 10),
              createTrueFalse('bio-m1-l1-a2', 'True or False', 'Digestion is necessary because large food molecules cannot cross cell membranes', true, 'Cell membranes allow only small molecules to pass through', 10),
            ]
          },
          {
            id: 'bio-11-4-m1-l2',
            name: '1.2 Mechanical vs Chemical',
            order: 2,
            totalXP: 25,
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
            totalXP: 25,
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
            totalXP: 30,
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
            totalXP: 35,
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
        totalXP: 135,
        levels: [
          {
            id: 'bio-11-4-m2-l1',
            name: '2.1 Alimentary Canal',
            order: 1,
            totalXP: 30,
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
            totalXP: 25,
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
            totalXP: 25,
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
            totalXP: 30,
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
            totalXP: 25,
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
        totalXP: 170,
        levels: [
          {
            id: 'bio-11-4-m3-l1',
            name: '3.1 Teeth & Dental Formula 🔥',
            order: 1,
            totalXP: 30,
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
            totalXP: 30,
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
            totalXP: 15,
            activities: [
              createQuiz('bio-m3-l3-a1', 'What does salivary amylase convert?', ['Glucose to starch', 'Starch to maltose', 'Protein to peptides', 'Fats to fatty acids'], 1, 'Ptyalin (salivary amylase) converts starch → maltose', 10),
              createTrueFalse('bio-m3-l3-a2', 'True or False', 'Carbohydrate digestion begins in the mouth', true, 'Salivary amylase starts starch digestion in the buccal cavity', 5),
            ]
          },
          {
            id: 'bio-11-4-m3-l4',
            name: '3.4 Tongue Functions',
            order: 4,
            totalXP: 15,
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
            totalXP: 25,
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
            totalXP: 30,
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
            totalXP: 25,
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
        totalXP: 105,
        levels: [
          {
            id: 'bio-11-4-m4-l1',
            name: '4.1 Deglutition Phases',
            order: 1,
            totalXP: 30,
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
            totalXP: 30,
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
            totalXP: 25,
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
            totalXP: 20,
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
        totalXP: 180,
        levels: [
            {
            id: 'bio-11-4-m5-l1',
            name: '5.1 Stomach Structure',
            order: 1,
            totalXP: 20,
            activities: [
              createFillBlank('bio-m5-l1-a1', '🎮 Label stomach regions', 'Stomach regions: _____ (upper), _____ (middle), _____ (lower), and pyloric _____.', ['Fundus', 'Body', 'Antrum', 'Canal'], ['Fundus', 'Body', 'Antrum', 'Canal', 'Cardiac'], 10),
              createQuiz('bio-m5-l1-a2', 'The cardiac region of stomach is near:', ['Pylorus', 'Esophagus opening', 'Duodenum', 'Spleen'], 1, 'Cardiac region surrounds the esophageal opening', 10),
            ]
          },
          {
            id: 'bio-11-4-m5-l2',
            name: '5.2 Gastric Glands 🔥',
            order: 2,
            totalXP: 30,
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
            totalXP: 15,
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
            totalXP: 25,
            activities: [
              createFillBlank('bio-m5-l4-a1', '🎮 Protein → peptides flow', 'In stomach: _____ breaks proteins into _____. In infants: _____ curdles milk.', ['Pepsin', 'peptones/proteoses', 'Rennin'], ['Pepsin', 'peptones', 'Rennin', 'Trypsin', 'amino acids'], 15),
              createQuiz('bio-m5-l4-a2', 'Rennin is active in:', ['Adults', 'Infants only', 'Elderly', 'All ages'], 1, 'Rennin (chymosin) is active only in infants to curdle milk', 10),
            ]
          },
          {
            id: 'bio-11-4-m5-l5',
            name: '5.5 Mucus Protection',
            order: 5,
            totalXP: 10,
            activities: [
              createQuiz('bio-m5-l5-a1', 'Mucus in stomach protects by:', ['Speeding digestion', 'Preventing HCl from damaging stomach wall', 'Activating enzymes', 'Killing bacteria'], 1, 'Mucus layer prevents auto-digestion by HCl', 5),
              createTrueFalse('bio-m5-l5-a2', 'True or False', 'The stomach has a mucus-bicarbonate barrier', true, 'This barrier neutralizes acid near the epithelium', 5),
            ]
          },
          {
            id: 'bio-11-4-m5-l6',
            name: '5.6 Gastric Secretion Phases',
            order: 6,
            totalXP: 25,
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
            totalXP: 25,
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
            totalXP: 30,
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
        totalXP: 195,
        levels: [
          {
            id: 'bio-11-4-m6-l1',
            name: '6.1 Parts of Small Intestine',
            order: 1,
            totalXP: 15,
            activities: [
              createFillBlank('bio-m6-l1-a1', '🎮 Arrange sections', 'Small intestine parts in order: _____ → _____ → _____.', ['Duodenum', 'Jejunum', 'Ileum'], ['Duodenum', 'Jejunum', 'Ileum', 'Caecum'], 10),
              createQuiz('bio-m6-l1-a2', 'Which part receives bile and pancreatic juice?', ['Jejunum', 'Duodenum', 'Ileum', 'Caecum'], 1, 'Duodenum (C-shaped) receives secretions from liver and pancreas', 5),
            ]
          },
          {
            id: 'bio-11-4-m6-l2',
            name: '6.2 Bile (NO enzymes!) 🔥',
            order: 2,
            totalXP: 25,
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
            totalXP: 30,
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
            totalXP: 20,
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
            totalXP: 15,
            activities: [
              createFillBlank('bio-m6-l5-a1', '🎮 Path: starch → glucose', 'Starch → _____ (by amylase) → _____ (by maltase) → Glucose', ['Maltose', 'Glucose'], ['Maltose', 'Glucose', 'Fructose'], 10),
              createQuiz('bio-m6-l5-a2', 'Final carbohydrate digestion products:', ['Maltose', 'Glucose, fructose, galactose', 'Starch', 'Sucrose'], 1, 'Carbohydrates are ultimately digested into monosaccharides', 5),
            ]
          },
          {
            id: 'bio-11-4-m6-l6',
            name: '6.6 Protein Digestion 🔥',
            order: 6,
            totalXP: 15,
            activities: [
              createFillBlank('bio-m6-l6-a1', '🎮 Chain breakdown simulation', 'Protein → _____ (by pepsin) → _____ (by trypsin) → _____ (by dipeptidase) → Amino acids', ['Peptones', 'Peptides', 'Dipeptides'], ['Peptones', 'Peptides', 'Dipeptides', 'Polypeptides'], 10),
              createQuiz('bio-m6-l6-a2', 'Protein digestion ends with:', ['Peptides', 'Amino acids', 'Polypeptides', 'Proteoses'], 1, 'Final products are amino acids absorbed into blood', 5),
            ]
          },
          {
            id: 'bio-11-4-m6-l7',
            name: '6.7 Fat Digestion 🔥',
            order: 7,
            totalXP: 15,
            activities: [
              createFillBlank('bio-m6-l7-a1', '🎮 Fat → fatty acids + glycerol', 'Fats (triglycerides) → Emulsification by _____ → _____ (by lipase) → Fatty acids + Glycerol', ['Bile', 'Monoglycerides'], ['Bile', 'Monoglycerides', 'Micelles', 'Chylomicrons'], 10),
              createQuiz('bio-m6-l7-a2', 'Fat digestion products are absorbed into:', ['Blood directly', 'Lacteals (lymph)', 'Stomach wall', 'Colon'], 1, 'Fatty acids and glycerol enter lymphatic lacteals first', 5),
            ]
          },
          {
            id: 'bio-11-4-m6-l8',
            name: '6.8 Microvilli & Brush Border',
            order: 8,
            totalXP: 20,
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
            totalXP: 25,
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
            totalXP: 30,
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
        totalXP: 90,
        levels: [
          {
            id: 'bio-11-4-m7-l1',
            name: '7.1 Villi Structure',
            order: 1,
            totalXP: 25,
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
            totalXP: 25,
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
            totalXP: 20,
            activities: [
              createQuiz('bio-m7-l3-a1', 'Carbs and proteins enter:', ['Lacteals', 'Blood capillaries', 'Lymph', 'Bile duct'], 1, 'Monosaccharides and amino acids enter blood circulation', 10),
              createTrueFalse('bio-m7-l3-a2', 'True or False', 'Amino acids are absorbed by active transport', true, 'Amino acids require energy-dependent active transport', 10),
            ]
          },
          {
            id: 'bio-11-4-m7-l4',
            name: '7.4 Fat Absorption (Lacteals) 🔥',
            order: 4,
            totalXP: 20,
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
        totalXP: 60,
        levels: [
          {
            id: 'bio-11-4-m8-l1',
            name: '8.1 Structure & Function',
            order: 1,
            totalXP: 20,
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
            totalXP: 20,
            activities: [
              createQuiz('bio-m8-l2-a1', 'How much water is absorbed daily by the large intestine?', ['~0.5 L', '~1.5 L', '~5 L', '~0.1 L'], 1, 'Large intestine absorbs ~1.5 L of water daily', 10),
              createTrueFalse('bio-m8-l2-a2', 'True or False', 'The large intestine has villi for absorption', false, 'Large intestine lacks villi; has flat mucosa', 10),
            ]
          },
          {
            id: 'bio-11-4-m8-l3',
            name: '8.3 Gut Bacteria',
            order: 3,
            totalXP: 20,
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
        totalXP: 80,
        levels: [
          {
            id: 'bio-11-4-m9-l1',
            name: '9.1 Carbohydrate Enzymes',
            order: 1,
            totalXP: 25,
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
            totalXP: 25,
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
            totalXP: 15,
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
            totalXP: 15,
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
        totalXP: 100,
        levels: [
          {
            id: 'bio-11-4-m10-l1',
            name: '10.1 Full Digestion Pathway',
            order: 1,
            totalXP: 15,
            activities: [
              createFillBlank('bio-m10-l1-a1', '🎮 Drag food across organs simulation', 'Complete pathway: Mouth → _____ → Stomach → _____ → _____ → Large intestine → _____.', ['Esophagus', 'Small intestine', 'Caecum/Colon', 'Rectum/Anus'], ['Esophagus', 'Small intestine', 'Caecum', 'Rectum', 'Pharynx'], 10),
              createQuiz('bio-m10-l1-a2', 'Food stays in stomach for about:', ['1-2 hours', '2-4 hours', '6-8 hours', '30 minutes'], 1, 'Gastric emptying takes 2-4 hours depending on food type', 5),
            ]
          },
          {
            id: 'bio-11-4-m10-l2',
            name: '10.2 Mixed MCQ Battle',
            order: 2,
            totalXP: 25,
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
            totalXP: 25,
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
            totalXP: 35,
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
        totalXP: 50,
        levels: [
          {
            id: 'bio-11-5-m1-l1',
            name: 'Mechanism of Breathing',
            order: 1,
            totalXP: 50,
            activities: [
              createQuiz('bio-11-5-m1-l1-a1', 'What is the primary muscle for breathing?', ['Intercostal', 'Diaphragm', 'Abdominal', 'Pectoral'], 1, 'Diaphragm is the primary breathing muscle', 10),
              createTrueFalse('bio-11-5-m1-l1-a2', 'True or False', 'During inspiration, diaphragm contracts and flattens', true, 'Contraction increases thoracic volume', 8),
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
        totalXP: 55,
        levels: [
          {
            id: 'bio-12-1-m1-l1',
            name: 'Types of Asexual Reproduction',
            order: 1,
            totalXP: 55,
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
        totalXP: 60,
        levels: [
          {
            id: 'bio-12-2-m1-l1',
            name: 'Flower Parts',
            order: 1,
            totalXP: 60,
            activities: [
              createQuiz('bio-12-2-m1-l1-a1', 'Which part of flower develops into fruit?', ['Ovary', 'Stigma', 'Style', 'Anther'], 0, 'After fertilization, ovary develops into fruit and ovules into seeds', 10),
              createFillBlank('bio-12-2-m1-l1-a2', 'Fill in', 'The male reproductive part of flower is called _____.', ['stamen'], ['stamen', 'pistil', 'carpel', 'ovary'], 10),
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
