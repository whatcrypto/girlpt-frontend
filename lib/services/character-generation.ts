import { CharacterPromptTemplate, CompanionFormData } from '@/lib/types/companion';

// Predefined character generation templates
export const CHARACTER_TEMPLATES: Record<string, CharacterPromptTemplate> = {
  anime_detailed: {
    basePrompt: `Create a detailed anime character with the following specifications. Use coin flip randomization for charm points and personality traits.`,
    sections: {
      appearance: `Describe the character's appearance including:
- Height and body type
- Hair color, length, and style
- Eye color and unique features
- Clothing style and accessories
- Any distinctive physical traits`,

      personality: `Detail the character's personality including:
- Core personality traits (3-5 main traits)
- Behavioral patterns and quirks
- Communication style and mannerisms
- Emotional tendencies and reactions
- Social interaction preferences`,

      backstory: `Create a compelling backstory covering:
- Origin and upbringing
- Formative life experiences
- Key relationships and losses
- Personal growth and challenges
- Current life situation`,

      hobbies: `List hobbies and interests including:
- Creative pursuits and artistic talents
- Entertainment preferences
- Skills and abilities
- Passions and obsessions
- Daily activities and routines`,

      relationships: `Describe relationship patterns:
- Past romantic experiences
- Approach to new relationships
- Trust and vulnerability patterns
- Relationship goals and fears
- Compatibility factors`,

      charmPoints: `Use coin flip results to determine charm points:
- Physical attraction factors
- Personality-based appeal
- Unique quirks that draw people in
- Potential relationship strengths
- Areas that might be challenging`
    },
    modifiers: {
      coinFlips: true,
      detailLevel: 'comprehensive',
      style: 'anime'
    }
  },

  realistic_romantic: {
    basePrompt: `Create a realistic romantic companion character with depth and authenticity.`,
    sections: {
      appearance: `Describe realistic appearance features:
- Age range and maturity level
- Ethnicity and cultural background
- Hair and eye colors (natural tones)
- Body type and fitness level
- Fashion sense and style preferences`,

      personality: `Develop a nuanced personality:
- Core values and beliefs
- Emotional intelligence level
- Communication preferences
- Conflict resolution style
- Sense of humor and playfulness`,

      backstory: `Create a believable life history:
- Educational background
- Career path and ambitions
- Family relationships and dynamics
- Life challenges and growth
- Current goals and aspirations`,

      hobbies: `Realistic interests and activities:
- Professional interests
- Fitness and wellness activities
- Cultural and artistic pursuits
- Social activities and community involvement
- Personal growth and learning`,

      relationships: `Relationship approach and history:
- Dating experience and preferences
- Long-term relationship goals
- Communication in relationships
- Intimacy and emotional connection
- Deal-breakers and compatibility needs`,

      charmPoints: `Authentic charm factors:
- Natural charisma and appeal
- Intellectual and emotional attractions
- Shared values compatibility
- Physical chemistry factors
- Unique personality magnetism`
    },
    modifiers: {
      coinFlips: false,
      detailLevel: 'detailed',
      style: 'realistic'
    }
  },

  fantasy_mysterious: {
    basePrompt: `Create a fantasy character with mysterious and magical elements.`,
    sections: {
      appearance: `Describe fantastical appearance:
- Supernatural or magical features
- Eye color and special properties
- Hair with unusual characteristics
- Clothing with magical elements
- Mystical accessories or markings`,

      personality: `Develop mysterious personality traits:
- Hidden depths and secrets
- Magical abilities and their impact
- Ancient wisdom or knowledge
- Emotional complexity and layers
- Moral alignment and motivations`,

      backstory: `Create a magical history:
- Supernatural origins
- Magical training or awakening
- Ancient conflicts or purposes
- Lost memories or hidden past
- Connection to magical realms`,

      hobbies: `Magical interests and abilities:
- Spell casting and magical studies
- Ancient arts and knowledge
- Mystical creature interactions
- Dimensional travel or exploration
- Magical item crafting or collecting`,

      relationships: `Supernatural relationship dynamics:
- Immortal or long-lived perspective
- Magical bonds and connections
- Cross-species or dimensional relationships
- Protective instincts and loyalty
- Forbidden or complicated attractions`,

      charmPoints: `Mystical appeal factors:
- Supernatural allure and presence
- Ancient wisdom and knowledge
- Magical abilities and powers
- Mysterious past and secrets
- Otherworldly beauty and grace`
    },
    modifiers: {
      coinFlips: true,
      detailLevel: 'comprehensive',
      style: 'fantasy'
    }
  }
};

// Generate character using template
export async function generateCharacterWithTemplate(
  templateId: string,
  baseInputs: Partial<CompanionFormData>,
  customizations?: Partial<CharacterPromptTemplate>
): Promise<CompanionFormData> {
  const template = CHARACTER_TEMPLATES[templateId];
  if (!template) {
    throw new Error(`Template ${templateId} not found`);
  }

  // Merge template with customizations
  const finalTemplate = customizations
    ? { ...template, ...customizations }
    : template;

  // Build comprehensive prompt
  const prompt = buildCharacterPrompt(finalTemplate, baseInputs);

    // Generate character data
  const characterData = generateFromPrompt(prompt, finalTemplate, baseInputs);

  // Avatar generation will be handled by the backend automatically
  // when the companion is created, so we don't set avatarUrl here

  return characterData;
}

function buildCharacterPrompt(
  template: CharacterPromptTemplate,
  inputs: Partial<CompanionFormData>
): string {
  let prompt = template.basePrompt + '\n\n';

  // Add name if provided
  if (inputs.name) {
    prompt += `Character Name: ${inputs.name}\n\n`;
  }

  // Add each section
  Object.entries(template.sections).forEach(([section, description]) => {
    prompt += `${section.toUpperCase()}:\n${description}\n\n`;
  });

  // Add modifiers
  if (template.modifiers.coinFlips) {
    prompt += 'Use coin flip randomization to determine varying traits and appeal factors.\n';
  }

  prompt += `Detail Level: ${template.modifiers.detailLevel}\n`;
  prompt += `Style: ${template.modifiers.style}\n`;

  return prompt;
}

// Mock generation function (replace with actual AI service call)
function generateFromPrompt(
  prompt: string,
  template: CharacterPromptTemplate,
  inputs: Partial<CompanionFormData>
): CompanionFormData {
  // This would normally call an AI service like OpenAI, Claude, etc.
  // For now, return a structured example based on inputs

  return {
    name: inputs.name || 'Generated Character',
    personality: inputs.personality ||
      'A complex character with depth and authenticity, featuring a blend of confidence and vulnerability that creates natural appeal.',
    backstory: inputs.backstory ||
      'Born with unique circumstances that shaped their worldview, they have experienced both triumph and loss, creating a rich emotional landscape.',
    avatarUrl: undefined, // Will be auto-generated by backend
    greetingMessage: inputs.greetingMessage ||
      'Hello! I\'m excited to meet you and share some wonderful conversations together.',
    interests: inputs.interests || ['conversation', 'creativity', 'personal growth'],
    conversationStyle: inputs.conversationStyle || 'casual',
    appearance: inputs.appearance || {
      ethnicity: 'Mixed',
      eyeColor: 'Brown',
      age: '25',
      hairColor: 'Dark Brown',
      hairLength: 'Medium',
      hairStyle: 'Wavy'
    },
    occupation: inputs.occupation || 'Creative Professional',
    hobbies: inputs.hobbies || ['art', 'music', 'reading'],
    traits: inputs.traits || ['empathetic', 'creative', 'intelligent']
  };
}

// Helper function to get available templates
export function getAvailableTemplates() {
  return Object.entries(CHARACTER_TEMPLATES).map(([id, template]) => ({
    id,
    name: id.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: template.basePrompt,
    style: template.modifiers.style,
    detailLevel: template.modifiers.detailLevel
  }));
}

// Parse generated content back to form fields
export function parseGeneratedContent(content: string): Partial<CompanionFormData> {
  // This would parse the AI-generated content and extract structured data
  // Implementation would depend on the AI service response format

  const sections = content.split('\n\n');
  const parsed: Partial<CompanionFormData> = {};

  // Simple parsing logic (would be more sophisticated in practice)
  sections.forEach(section => {
    if (section.toLowerCase().includes('personality:')) {
      parsed.personality = section.replace(/personality:/i, '').trim();
    }
    if (section.toLowerCase().includes('backstory:')) {
      parsed.backstory = section.replace(/backstory:/i, '').trim();
    }
    // Add more parsing rules as needed
  });

  return parsed;
}
