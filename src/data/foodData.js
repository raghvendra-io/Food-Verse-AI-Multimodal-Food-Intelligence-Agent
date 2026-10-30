// Food Verse AI - Multimodal Knowledge Base & Sensor Presets

export const FOOD_PRESETS = [
  {
    id: 'salmon',
    name: 'Pan-Seared Atlantic Salmon with Charred Asparagus',
    category: 'Gourmet Meal & High Protein',
    image: '/assets/salmon_dish.jpg',
    sourceType: 'Plate Recognition',
    timestamp: '2026-10-30 13:42:10 UTC',
    overallConfidence: 98.4,
    bboxes: [
      {
        id: 'box-1',
        label: 'Atlantic Salmon Fillet (Pan-Seared)',
        confidence: 99.1,
        color: '#10b981',
        x: 34,
        y: 36,
        w: 44,
        h: 34,
        portionGrams: 210,
        volumeCm3: 195,
        notes: 'Crispy skin side up, Maillard reaction browning score 89/100, rich in EPA/DHA'
      },
      {
        id: 'box-2',
        label: 'Asparagus Spears (Charred)',
        confidence: 97.5,
        color: '#06b6d4',
        x: 12,
        y: 34,
        w: 40,
        h: 30,
        portionGrams: 110,
        volumeCm3: 130,
        notes: 'Tender-crisp, chlorophyll retention high, rich in folate and prebiotic fiber'
      },
      {
        id: 'box-3',
        label: 'Lemon Wedge (Fresh Citrus)',
        confidence: 96.8,
        color: '#f59e0b',
        x: 12,
        y: 35,
        w: 18,
        h: 16,
        portionGrams: 35,
        volumeCm3: 40,
        notes: 'High citric acid content, enhances non-heme iron absorption'
      },
      {
        id: 'box-4',
        label: 'Microgreens & Herb Garnish',
        confidence: 93.2,
        color: '#8b5cf6',
        x: 52,
        y: 33,
        w: 22,
        h: 22,
        portionGrams: 15,
        volumeCm3: 25,
        notes: 'High sulforaphane and polyphenol antioxidant index'
      }
    ],
    nutrition: {
      calories: 520,
      protein: 46.2,
      carbs: 6.8,
      netCarbs: 3.6,
      fat: 34.5,
      fiber: 3.2,
      sodiumMg: 380,
      potassiumMg: 890,
      omega3G: 3.4,
      glycemicIndex: 12,
      glycemicLoad: 1,
      glycemicStatus: 'Very Low (Optimal Glycemic Stability)',
      micros: [
        { name: 'Vitamin D', amount: '820 IU', rdaPct: 102, status: 'Exceptional' },
        { name: 'Vitamin B12', amount: '4.8 mcg', rdaPct: 200, status: 'Exceptional' },
        { name: 'Selenium', amount: '48 mcg', rdaPct: 87, status: 'High' },
        { name: 'Omega-3 EPA/DHA', amount: '3400 mg', rdaPct: 340, status: 'Superfood' },
        { name: 'Potassium', amount: '890 mg', rdaPct: 26, status: 'Good' },
        { name: 'Iron', amount: '1.9 mg', rdaPct: 15, status: 'Moderate' }
      ]
    },
    allergens: [
      { name: 'Fin Fish (Salmon)', severity: 'High Alert', isPresent: true },
      { name: 'Dairy / Lactose', severity: 'None Detected', isPresent: false },
      { name: 'Gluten / Wheat', severity: 'None Detected', isPresent: false },
      { name: 'Nuts & Peanuts', severity: 'None Detected', isPresent: false }
    ],
    dietarySuitability: ['Keto / Low-Carb', 'Mediterranean Diet', 'Pescetarian', 'Gluten-Free', 'Diabetic-Friendly'],
    freshness: {
      index: 94,
      status: 'Peak Freshness',
      shelfLifeHoursRemaining: 36,
      biochemicalMarkers: {
        chlorophyllRetention: '95%',
        ethyleneEmission: '0.02 ppm (Negligible)',
        surfaceMoisture: '88% (Hydrated)',
        spoilageProbability: '3.2%',
        tmaAmineIndex: '0.4 mg N/100g (Well below 5.0 threshold)'
      },
      storageAdvice: 'Store at 0°C to 2°C under clean perforated parchment; consume within 24-36 hours for optimal lipid stability.'
    },
    haccp: {
      internalTempC: 56.5,
      panSurfaceTempC: 198,
      isDangerZone: false,
      safetyStatus: 'Fully Compliant - Cooked to Safe Internal Temp (Core 56°C rest)',
      ccpRule: 'CCP-2: Thermal destruction of foodborne pathogens achieved'
    },
    cookingAssistance: {
      dishTitle: 'Pan-Seared Salmon with Herb Butter Glaze',
      activeStepIndex: 2,
      steps: [
        { title: 'Pat Salmon Skin Dry', duration: 120, done: true, tip: 'Moisture is the enemy of crispy skin; dry thoroughly with paper towel' },
        { title: 'Preheat Skillet to 200°C', duration: 180, done: true, tip: 'Wait for oil to shimmer before laying fillet away from you' },
        { title: 'Sear Skin-Side Down (Current Step)', duration: 240, done: false, tip: 'Press gently for 20 seconds. Do not move for 3.5 minutes until 80% opaque' },
        { title: 'Flip & Baste with Garlic Herb Butter', duration: 90, done: false, tip: 'Tilt pan, spoon hot butter continuously over flesh' },
        { title: 'Rest Fillet & Plate with Asparagus', duration: 180, done: false, tip: 'Rest for 3 minutes to allow juices to redistribute evenly' }
      ],
      panThermalHeatmap: {
        currentTemp: 196,
        targetTemp: 200,
        browningIndex: 88,
        flipReadiness: 91
      }
    },
    aiReasoning: {
      visionEncoder: 'FoodVerse-ViT-B16 (Multimodal Patch Size 16x16)',
      depthModel: 'Depth-Anything-FoodNet v2.1',
      knowledgeAlignment: 'USDA FoodData Central #175167 & EFSA Guidelines',
      confidenceChain: [
        'Identified seared salmoniform fillet with 99.1% confidence via distinctive myotome striation and Maillard-crusted epidermis.',
        'Estimated volumetric displacement at 195 cm³ using multi-angle shadow depth regression, yielding 210g ± 8g mass.',
        'Extracted secondary bounding boxes for asparagus officinalis (110g) and citrus limon wedge (35g).',
        'Computed macronutrient density based on wild Atlantic salmo salar reference profiles; omega-3 concentration validated.'
      ]
    }
  },
  {
    id: 'avocado',
    name: 'Artisan Sourdough with Smashed Avocado & Soft Poached Egg',
    category: 'Breakfast / Brunch & Healthy Fats',
    image: '/assets/avocado_toast.jpg',
    sourceType: 'Macro & Bio-Marker Scan',
    timestamp: '2026-10-30 13:42:15 UTC',
    overallConfidence: 97.9,
    bboxes: [
      {
        id: 'box-av-1',
        label: 'Soft Runny Poached Egg',
        confidence: 99.4,
        color: '#f59e0b',
        x: 37,
        y: 33,
        w: 28,
        h: 24,
        portionGrams: 62,
        volumeCm3: 58,
        notes: 'Choline rich, intact bio-available lutein and zeaxanthin in runny yolk'
      },
      {
        id: 'box-av-2',
        label: 'Smashed Hass Avocado Layer',
        confidence: 98.7,
        color: '#10b981',
        x: 26,
        y: 38,
        w: 48,
        h: 25,
        portionGrams: 85,
        volumeCm3: 80,
        notes: 'Monounsaturated oleic acid, high potassium and folate'
      },
      {
        id: 'box-av-3',
        label: 'Rustic Whole Wheat Sourdough Slice',
        confidence: 97.2,
        color: '#8b5cf6',
        x: 22,
        y: 42,
        w: 56,
        h: 30,
        portionGrams: 75,
        volumeCm3: 110,
        notes: 'Fermented crumb structure, lowered glycemic peak via lactobacillus fermentation'
      },
      {
        id: 'box-av-4',
        label: 'Microgreens & Spiced Chili Flake Garnish',
        confidence: 94.1,
        color: '#06b6d4',
        x: 32,
        y: 28,
        w: 36,
        h: 18,
        portionGrams: 8,
        volumeCm3: 14,
        notes: 'Capsaicin thermogenic kick and micro-phytonutrients'
      }
    ],
    nutrition: {
      calories: 435,
      protein: 16.4,
      carbs: 34.2,
      netCarbs: 26.8,
      fat: 27.5,
      fiber: 7.4,
      sodiumMg: 410,
      potassiumMg: 620,
      omega3G: 0.4,
      glycemicIndex: 44,
      glycemicLoad: 12,
      glycemicStatus: 'Moderate Low (Slow release complex energy)',
      micros: [
        { name: 'Choline', amount: '154 mg', rdaPct: 36, status: 'High' },
        { name: 'Vitamin K1', amount: '28 mcg', rdaPct: 31, status: 'Good' },
        { name: 'Folate (B9)', amount: '122 mcg', rdaPct: 30, status: 'Good' },
        { name: 'Vitamin E', amount: '3.1 mg', rdaPct: 21, status: 'Moderate' },
        { name: 'Potassium', amount: '620 mg', rdaPct: 18, status: 'Moderate' },
        { name: 'Lutein & Zeaxanthin', amount: '320 mcg', rdaPct: 53, status: 'High' }
      ]
    },
    allergens: [
      { name: 'Egg (Avian Albumin)', severity: 'High Alert', isPresent: true },
      { name: 'Gluten / Wheat (Sourdough)', severity: 'Present (Fermented)', isPresent: true },
      { name: 'Dairy / Lactose', severity: 'None Detected', isPresent: false },
      { name: 'Tree Nuts & Sesame', severity: 'Negligible trace', isPresent: false }
    ],
    dietarySuitability: ['Vegetarian', 'Mediterranean', 'Heart-Healthy Fats', 'High-Fiber Sustained Energy'],
    freshness: {
      index: 92,
      status: 'Optimal Consumption Window',
      shelfLifeHoursRemaining: 4,
      biochemicalMarkers: {
        chlorophyllRetention: '91%',
        ethyleneEmission: '0.04 ppm',
        surfaceMoisture: '84%',
        spoilageProbability: '2.5%',
        polyphenolOxidase: 'Active - browning begins in ~35 mins if exposed to O2 without ascorbic acid'
      },
      storageAdvice: 'Consume immediately; exposed avocado surface rapidly oxidizes via polyphenol oxidase enzyme activity unless chilled with lime juice.'
    },
    haccp: {
      internalTempC: 63.0,
      panSurfaceTempC: 98,
      isDangerZone: false,
      safetyStatus: 'Safe - Soft Poached Pasteurized Shell Egg',
      ccpRule: 'CCP-1: Egg yolk coagulation curve maintained safe pathogen reduction'
    },
    cookingAssistance: {
      dishTitle: 'Perfect Whirlpool Poached Egg & Avocado Toast',
      activeStepIndex: 3,
      steps: [
        { title: 'Toast Sourdough to Golden Crisp', duration: 150, done: true, tip: 'Needs sturdy crunch to support rich avocado mash' },
        { title: 'Coarsely Mash Avocado with Lime & Sea Salt', duration: 60, done: true, tip: 'Keep small chunks for textural mouthfeel' },
        { title: 'Simmer Water & Create Gentle Vortex', duration: 180, done: true, tip: '82°C bare simmer with 1 tsp white vinegar helps white coagulate' },
        { title: 'Poach Egg for Exactly 3 Minutes (Current)', duration: 180, done: false, tip: 'Timer at 01:15 remaining. Whites firm, yolk completely molten' },
        { title: 'Assemble & Garnish with Flaky Salt & Chili', duration: 45, done: false, tip: 'Drain egg on paper towel before gently placing on avocado' }
      ],
      panThermalHeatmap: {
        currentTemp: 84,
        targetTemp: 82,
        browningIndex: 10,
        flipReadiness: 80
      }
    },
    aiReasoning: {
      visionEncoder: 'FoodVerse-ViT-B16 (Sub-region Segmenter)',
      depthModel: 'Depth-Anything-FoodNet v2.1',
      knowledgeAlignment: 'USDA FoodData Central #1100552 (Avocado) & #171587 (Egg)',
      confidenceChain: [
        'Detected distinct golden poached egg yolk with 99.4% bounding match, indicating liquid core profile.',
        'Segmented avocado mash layer showing vibrant green chlorophyll and low oxidation pigment spots.',
        'Determined artisanal open-crumb sourdough base with 75g volumetric weight estimation.',
        'Calculated low glycemic impact due to fiber buffering from whole wheat and avocado lipids.'
      ]
    }
  },
  {
    id: 'produce',
    name: 'Ripening Cavendish Bananas & Crisp Orchard Fruit',
    category: 'Fresh Produce & Senescence Tracking',
    image: '/assets/produce_freshness.jpg',
    sourceType: 'Biochemical Freshness Scan',
    timestamp: '2026-10-30 13:42:25 UTC',
    overallConfidence: 98.9,
    bboxes: [
      {
        id: 'box-p-1',
        label: 'Cavendish Bananas (Ripening Stage 6)',
        confidence: 99.3,
        color: '#f59e0b',
        x: 35,
        y: 22,
        w: 58,
        h: 68,
        portionGrams: 360,
        volumeCm3: 390,
        notes: 'Stage 6 sugar speckling, peak amylase starch-to-sugar conversion, maximum antioxidant activity'
      },
      {
        id: 'box-p-2',
        label: 'Granny Smith Green Apples (Firm)',
        confidence: 98.1,
        color: '#10b981',
        x: 25,
        y: 10,
        w: 32,
        h: 36,
        portionGrams: 180,
        volumeCm3: 210,
        notes: 'Pectin dense, malic acid crispness, high cuticle wax integrity'
      },
      {
        id: 'box-p-3',
        label: 'Fresh Ripe Field Strawberries',
        confidence: 97.4,
        color: '#f43f5e',
        x: 9,
        y: 35,
        w: 38,
        h: 42,
        portionGrams: 140,
        volumeCm3: 160,
        notes: 'Anthocyanin rich, calyx green and turgid, low botrytis mold risk'
      }
    ],
    nutrition: {
      calories: 385,
      protein: 4.8,
      carbs: 94.2,
      netCarbs: 81.6,
      fat: 1.2,
      fiber: 12.6,
      sodiumMg: 6,
      potassiumMg: 1250,
      omega3G: 0.1,
      glycemicIndex: 51,
      glycemicLoad: 14,
      glycemicStatus: 'Medium (Natural Fruit Sugars + High Pectin Buffer)',
      micros: [
        { name: 'Vitamin C', amount: '92 mg', rdaPct: 102, status: 'Superfood' },
        { name: 'Potassium', amount: '1250 mg', rdaPct: 37, status: 'High' },
        { name: 'Vitamin B6', amount: '0.62 mg', rdaPct: 36, status: 'High' },
        { name: 'Manganese', amount: '0.7 mg', rdaPct: 30, status: 'Good' },
        { name: 'Dietary Pectin', amount: '4.8 g', rdaPct: 40, status: 'Prebiotic' }
      ]
    },
    allergens: [
      { name: 'Latex-Fruit Cross-Reactivity (Banana)', severity: 'Low Precaution', isPresent: false },
      { name: 'Common Allergens (Nuts/Dairy/Gluten)', severity: 'Free', isPresent: false }
    ],
    dietarySuitability: ['100% Whole Food Plant-Based', 'Vegan', 'Anti-Inflammatory', 'High Potassium'],
    freshness: {
      index: 84,
      status: 'Optimal Ripeness (Sweet & Aromatic)',
      shelfLifeHoursRemaining: 68,
      biochemicalMarkers: {
        chlorophyllRetention: '42% (Degraded as expected into yellow carotenoids)',
        ethyleneEmission: '2.1 ppm (Climacteric fruit active emission)',
        surfaceMoisture: '78%',
        spoilageProbability: '8.4%',
        sugarStarchRatio: '78:22 (Peak sweetness and soft texture)'
      },
      storageAdvice: 'Bananas are emitting ethylene gas. Keep apples separated if you wish to retard apple softening. Refrigerate strawberries below 4°C immediately.'
    },
    haccp: {
      internalTempC: 19.2,
      panSurfaceTempC: 19.2,
      isDangerZone: false,
      safetyStatus: 'Raw Produce - Surface intact, wash under cold potable water before consumption',
      ccpRule: 'Produce handling guideline: Inspect for micro-punctures or mold'
    },
    cookingAssistance: {
      dishTitle: 'Culinary Produce Applications',
      activeStepIndex: 1,
      steps: [
        { title: 'Fresh Consumption Window', duration: 0, done: true, tip: 'Consume bananas directly or slice over yogurt in the next 48 hours' },
        { title: 'Freezing for Smoothies (Suggested)', duration: 300, done: false, tip: 'Peel bananas, break into chunks, store in airtight silicone bag in freezer' },
        { title: 'Banana Bread Baking Conversion', duration: 3600, done: false, tip: 'If bananas develop extensive brown freckling in 3 days, perfect for banana bread' }
      ],
      panThermalHeatmap: {
        currentTemp: 21,
        targetTemp: 21,
        browningIndex: 72,
        flipReadiness: 0
      }
    },
    aiReasoning: {
      visionEncoder: 'FoodVerse-ViT-B16 (Spectral Ripeness Classifier)',
      depthModel: 'Depth-Anything-FoodNet v2.1',
      knowledgeAlignment: 'USDA Pomology Database & FAO Post-Harvest Manual',
      confidenceChain: [
        'Analyzed Cavendish epidermis peel tone: 72% yellow, 21% sugar spotting (CIE L*a*b* color space).',
        'Model categorized ripeness at Stage 6 (ideal eating ripeness with highest antioxidant bioavailability).',
        'Identified accompanying Fragaria ananassa (strawberries) with intact green calyx and high gloss luster.',
        'Calculated high potassium balance (1250mg) beneficial for sodium-potassium ATPase pump regulation.'
      ]
    }
  },
  {
    id: 'kitchen',
    name: 'Commercial Kitchen Line Prep Station (Station A)',
    category: 'Commercial Restaurant Hygiene & HACCP Stream',
    image: '/assets/kitchen_station.jpg',
    sourceType: 'Surveillance Video Stream Cam-01',
    timestamp: '2026-10-30 13:42:30 UTC',
    overallConfidence: 99.2,
    bboxes: [
      {
        id: 'box-k-1',
        label: 'Chef Lead: PPE Compliant (Gloves + Cap)',
        confidence: 99.5,
        color: '#10b981',
        x: 60,
        y: 12,
        w: 24,
        h: 70,
        portionGrams: 0,
        volumeCm3: 0,
        notes: 'Blue powder-free nitrile food gloves verified, hair restraint verified, clean apron'
      },
      {
        id: 'box-k-2',
        label: 'Color-Coded Cutting Board (Green = Produce)',
        confidence: 98.8,
        color: '#10b981',
        x: 48,
        y: 62,
        w: 32,
        h: 18,
        portionGrams: 0,
        volumeCm3: 0,
        notes: 'HACCP board matching produce prep (onions & tomatoes); clean surface separation'
      },
      {
        id: 'box-k-3',
        label: 'Hand Sanitizer & Quat Surface Spray Dispenser',
        confidence: 99.1,
        color: '#06b6d4',
        x: 80,
        y: 58,
        w: 8,
        h: 24,
        portionGrams: 0,
        volumeCm3: 0,
        notes: 'Sanitizer ppm concentration active, 200ppm test strip verified within 4 hours'
      },
      {
        id: 'box-k-4',
        label: 'Secondary Line Cook: Cross-Contamination Check',
        confidence: 97.6,
        color: '#10b981',
        x: 48,
        y: 26,
        w: 12,
        h: 36,
        portionGrams: 0,
        volumeCm3: 0,
        notes: 'Working on dedicated secondary station, no raw-to-cooked surface contact'
      }
    ],
    nutrition: {
      calories: 0,
      protein: 0,
      carbs: 0,
      netCarbs: 0,
      fat: 0,
      fiber: 0,
      sodiumMg: 0,
      potassiumMg: 0,
      omega3G: 0,
      glycemicIndex: 0,
      glycemicLoad: 0,
      glycemicStatus: 'Facility Inspection Mode',
      micros: []
    },
    allergens: [],
    dietarySuitability: ['Commercial Food Safety Certified', 'FDA Food Code 2024 Compliant', 'HACCP Audited'],
    freshness: {
      index: 98,
      status: 'Environment Sanitized & Safe',
      shelfLifeHoursRemaining: 720,
      biochemicalMarkers: {
        chlorophyllRetention: 'N/A',
        ethyleneEmission: 'N/A',
        surfaceMoisture: 'N/A',
        spoilageProbability: '0.1%',
        bacterialLoadEstimate: '<10 CFU/cm² (Hospitality Grade Sanitization)'
      },
      storageAdvice: 'Walk-in refrigeration currently holding at 2.8°C; clean stainless steel contact surfaces.'
    },
    haccp: {
      internalTempC: 4.1,
      panSurfaceTempC: 22,
      isDangerZone: false,
      safetyStatus: 'Grade A - 98.4/100 HACCP Inspection Score',
      ccpRule: 'CCP-All: Temperature Danger Zone (<4°C or >60°C) strictly monitored; PPE compliance verified',
      violations: 0,
      gloveCompliancePct: 98.6,
      hairnetCompliancePct: 100.0,
      crossContaminationRiskPct: 1.2,
      holdingTimesSafePct: 99.4
    },
    cookingAssistance: {
      dishTitle: 'Commercial Line Prep Protocol',
      activeStepIndex: 1,
      steps: [
        { title: 'Sanitize Prep Station Surface with 200ppm Solution', duration: 300, done: true, tip: 'Wipe from clean area toward drain edge; let air dry 60 seconds' },
        { title: 'Inspect Produce Wash Basin & Drain', duration: 180, done: true, tip: 'Verify 0 organic residue in drainage trap' },
        { title: 'Prep Aromatics on Dedicated Green HACCP Board', duration: 600, done: false, tip: 'Maintain uniform dice for consistent pan heat absorption' }
      ],
      panThermalHeatmap: {
        currentTemp: 22,
        targetTemp: 22,
        browningIndex: 0,
        flipReadiness: 0
      }
    },
    aiReasoning: {
      visionEncoder: 'FoodVerse-Vision-Surveillance-v3 (Temporal Action & Object Detection)',
      depthModel: 'Spatial-Zone-Safety-Net v4',
      knowledgeAlignment: 'FDA Food Code 2024 & ServSafe International Protocol',
      confidenceChain: [
        'Live video stream ingested at 30 FPS with zero dropped inference frames.',
        'Continuous YOLO-Pose tracker confirms blue nitrile barrier on both hands of primary culinary technician.',
        'Color segmentation verified green cutting board used solely for allium cepa (red onions) and solanum lycopersicum (tomatoes).',
        'Zero cross-contact vectors identified with raw protein holding line located 3.2 meters away.'
      ]
    }
  },
  {
    id: 'pan_cooking',
    name: 'Cast Iron Seared Ribeye & Aromatics',
    category: 'Smart Cooking Assistance & Thermal Vision',
    image: '/assets/pan_cooking.jpg',
    sourceType: 'Chef Assistant Video Cam',
    timestamp: '2026-10-30 13:42:35 UTC',
    overallConfidence: 99.4,
    bboxes: [
      {
        id: 'box-c-1',
        label: 'Prime Bone-In Ribeye (Searing Crust)',
        confidence: 99.6,
        color: '#f59e0b',
        x: 40,
        y: 60,
        w: 22,
        h: 22,
        portionGrams: 340,
        volumeCm3: 310,
        notes: 'Internal temp 48°C (Medium-Rare target 54°C). Maillard browning 92% complete.'
      },
      {
        id: 'box-c-2',
        label: 'Aromatic Herb Baste (Thyme, Garlic, Butter)',
        confidence: 98.4,
        color: '#10b981',
        x: 26,
        y: 68,
        w: 24,
        h: 18,
        portionGrams: 45,
        volumeCm3: 50,
        notes: 'Foaming butter basting emulsion at 145°C. Imparting fat-soluble thymol flavor molecules.'
      },
      {
        id: 'box-c-3',
        label: 'Culinary Master Chef (Active Technique)',
        confidence: 99.1,
        color: '#06b6d4',
        x: 35,
        y: 5,
        w: 60,
        h: 88,
        portionGrams: 0,
        volumeCm3: 0,
        notes: 'Continuous basting motion detected. Tongs supporting steak orientation for even edge searing.'
      }
    ],
    nutrition: {
      calories: 680,
      protein: 58.4,
      carbs: 4.2,
      netCarbs: 2.8,
      fat: 48.0,
      fiber: 1.4,
      sodiumMg: 520,
      potassiumMg: 710,
      omega3G: 0.8,
      glycemicIndex: 0,
      glycemicLoad: 0,
      glycemicStatus: 'Zero Glycemic Impact (Pure Protein & Lipids)',
      micros: [
        { name: 'Heme Iron', amount: '4.8 mg', rdaPct: 40, status: 'High' },
        { name: 'Zinc', amount: '9.2 mg', rdaPct: 84, status: 'Superfood' },
        { name: 'Vitamin B12', amount: '3.6 mcg', rdaPct: 150, status: 'Exceptional' },
        { name: 'Niacin (B3)', amount: '8.4 mg', rdaPct: 52, status: 'High' },
        { name: 'Creatine', amount: '1.4 g', rdaPct: 70, status: 'High' }
      ]
    },
    allergens: [
      { name: 'Dairy / Butter', severity: 'Basting Component', isPresent: true },
      { name: 'Gluten / Wheat', severity: 'None Detected', isPresent: false },
      { name: 'Soy / Peanuts', severity: 'None Detected', isPresent: false }
    ],
    dietarySuitability: ['Keto / Carnivore', 'High Protein Athletic', 'Paleo Compatible', 'Zero Sugar'],
    freshness: {
      index: 96,
      status: 'Prime Cooked Freshness',
      shelfLifeHoursRemaining: 72,
      biochemicalMarkers: {
        chlorophyllRetention: 'N/A',
        ethyleneEmission: 'N/A',
        surfaceMoisture: '72% (Juicy Core)',
        spoilageProbability: '0.4%',
        proteinDenaturation: '85% Actin/Myosin transition'
      },
      storageAdvice: 'Serve immediately after 5-minute rest on warm cutting board to stabilize intracellular moisture.'
    },
    haccp: {
      internalTempC: 51.5,
      panSurfaceTempC: 215,
      isDangerZone: false,
      safetyStatus: 'Pathogen Surface Sterilization Complete (>200°C cast iron contact)',
      ccpRule: 'CCP-2: Beef intact muscle surface pathogen destruction verified'
    },
    cookingAssistance: {
      dishTitle: 'Pan-Seared Cast Iron Ribeye with Butter Baste',
      activeStepIndex: 3,
      steps: [
        { title: 'Dry Brine & Room Temperature Tempering', duration: 1800, done: true, tip: 'Salting 45 mins prior draws moisture and reabsorbs it, seasoning deeply' },
        { title: 'Screaming Hot Cast Iron Sear (Side 1)', duration: 150, done: true, tip: 'Create deep mahogany Maillard crust without boiling meat' },
        { title: 'Flip & Sear Side 2', duration: 120, done: true, tip: 'Sear second side for 2 minutes to seal outer crust' },
        { title: 'Add Butter, Thyme & Baste Continuously (Current)', duration: 90, done: false, tip: 'Tilt pan toward you, rapidly spoon foaming nutty butter over steak for 90 seconds' },
        { title: 'Remove & Rest for 5 Minutes Before Slicing', duration: 300, done: false, tip: 'Carryover cooking will bring core temp to perfect 54°C medium-rare' }
      ],
      panThermalHeatmap: {
        currentTemp: 214,
        targetTemp: 215,
        browningIndex: 94,
        flipReadiness: 100
      }
    },
    aiReasoning: {
      visionEncoder: 'FoodVerse-Thermal-ActionNet (Video Step Recognition)',
      depthModel: 'Depth-Anything-FoodNet v2.1',
      knowledgeAlignment: 'Modernist Cuisine & USDA Meat Safety Guidelines',
      confidenceChain: [
        'Detected rapid spoon baste kinematics: 1.8 basting strokes per second maintaining thermal convective transfer.',
        'Infrared surface thermal estimate registers 214°C at iron contact perimeter and 145°C in bubbling butter pool.',
        'Maillard spectrum analysis confirms optimal melanoidin synthesis without carbonization (charring < 2%).',
        'Carryover heat prediction model calculates 3.2°C temperature rise during 5-minute rest phase.'
      ]
    }
  }
];

// Biometric User Profiles for Personalized Nutrition
export const BIOMETRIC_PROFILES = [
  {
    id: 'athlete',
    name: 'Athletic Muscle Hypertrophy',
    gender: 'Male, 28 yrs',
    dailyCaloriesTarget: 2600,
    dailyProteinGramsTarget: 175,
    dailyCarbsGramsTarget: 280,
    dailyFatGramsTarget: 75,
    focus: 'Max protein synthesis, high electrolyte replenishment, fast recovery'
  },
  {
    id: 'diabetic',
    name: 'Metabolic & Glycemic Balance',
    gender: 'Female, 45 yrs',
    dailyCaloriesTarget: 1900,
    dailyProteinGramsTarget: 110,
    dailyCarbsGramsTarget: 130,
    dailyFatGramsTarget: 80,
    focus: 'Strict Low-GI foods (<45), high soluble fiber, post-prandial insulin spike suppression'
  },
  {
    id: 'longevity',
    name: 'Mediterranean & Longevity Diet',
    gender: 'Female, 38 yrs',
    dailyCaloriesTarget: 2100,
    dailyProteinGramsTarget: 120,
    dailyCarbsGramsTarget: 220,
    dailyFatGramsTarget: 85,
    focus: 'High polyphenol density, Omega-3 fatty acids, cardiovascular lipid balance'
  }
];

// Smart Meal Plan with Adaptive Pantry Substitution
export const MEAL_PLAN_DATA = [
  {
    meal: 'Breakfast',
    title: 'Artisan Avocado & Poached Egg Toast',
    calories: 435,
    protein: 16.4,
    carbs: 34.2,
    fat: 27.5,
    gi: 'Low-Med',
    image: '/assets/avocado_toast.jpg',
    pantryStatus: '100% in stock (Avocado, Eggs, Sourdough, Chili)',
    alternativeSwap: {
      original: 'Sourdough Bread',
      replacement: 'Sprouted Keto Flax Bread',
      carbSavings: '-22g Net Carbs',
      proteinDelta: '+4g Protein'
    }
  },
  {
    meal: 'Lunch',
    title: 'Pan-Seared Atlantic Salmon with Charred Asparagus',
    calories: 520,
    protein: 46.2,
    carbs: 6.8,
    fat: 34.5,
    gi: 'Very Low',
    image: '/assets/salmon_dish.jpg',
    pantryStatus: '100% in stock (Salmon Fillet, Asparagus, Lemon)',
    alternativeSwap: {
      original: 'Charred Asparagus',
      replacement: 'Broccolini with Toasted Garlic',
      carbSavings: '+0.5g Fiber',
      proteinDelta: '+2g Protein'
    }
  },
  {
    meal: 'Dinner',
    title: 'Cast Iron Basted Grass-Fed Ribeye with Herb Butter',
    calories: 680,
    protein: 58.4,
    carbs: 4.2,
    fat: 48.0,
    gi: 'Zero GI',
    image: '/assets/pan_cooking.jpg',
    pantryStatus: '100% in stock (Ribeye, Thyme, Garlic, Butter)',
    alternativeSwap: {
      original: 'Butter Baste',
      replacement: 'Cold-Pressed Avocado Oil & Rosemary',
      carbSavings: 'Saturated fat reduced by 60%',
      proteinDelta: 'Identical'
    }
  },
  {
    meal: 'Snack / Pre-Workout',
    title: 'Ripening Cavendish Banana & Strawberry Bowl',
    calories: 210,
    protein: 2.8,
    carbs: 48.0,
    fat: 0.6,
    gi: 'Moderate',
    image: '/assets/produce_freshness.jpg',
    pantryStatus: 'In pantry (Consume today for peak freshness)',
    alternativeSwap: {
      original: 'Ripe Banana',
      replacement: 'Wild Blueberries & Almonds',
      carbSavings: '-18g Carbs',
      proteinDelta: '+3g Protein'
    }
  }
];

// Interactive HACCP Audit Checklist
export const HACCP_CHECKLIST = [
  { id: 'haccp-1', title: 'PPE Compliance: Blue food-grade gloves & hair restraints', status: 'PASS', score: '100%' },
  { id: 'haccp-2', title: 'Color-Coded Cutting Board Separation (Red/Green/Yellow/Blue)', status: 'PASS', score: '98.5%' },
  { id: 'haccp-3', title: 'Critical Control Point: Chiller Cold Storage (< 4°C)', status: 'PASS', score: '2.8°C' },
  { id: 'haccp-4', title: 'Temperature Danger Zone Time Limit (< 20 mins between 4-60°C)', status: 'PASS', score: '0 Violations' },
  { id: 'haccp-5', title: 'Quaternary Ammonium Sanitizer Concentration (200-400 ppm)', status: 'PASS', score: '220 ppm' },
  { id: 'haccp-6', title: 'Cross-Contamination Zero-Tolerance Buffer (Raw to RTE)', status: 'PASS', score: 'Safe 3.2m Buffer' }
];
