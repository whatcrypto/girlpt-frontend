/**
 * Frontend content moderation utilities for immediate user feedback
 * Provides client-side validation before submitting to backend
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  severity: 'low' | 'medium' | 'high';
}

export interface ContentModerationConfig {
  allowMildProfanity: boolean;
  maxLength: number;
  minLength?: number;
  checkSpelling?: boolean;
}

export class ContentValidator {
  // Basic profanity lists for frontend validation
  private static readonly MILD_PROFANITY = new Set([
    'damn', 'hell', 'crap', 'darn', 'frick'
  ]);

  private static readonly MODERATE_PROFANITY = new Set([
    'shit', 'bitch', 'ass', 'bastard'
  ]);

  private static readonly SEVERE_PROFANITY = new Set([
    'fuck', 'fucking', 'fucked', 'fucker'
  ]);

  private static readonly INAPPROPRIATE_PATTERNS = [
    // Violence indicators
    /\b(kill|murder|suicide|die|death|harm|hurt|violence|blood|gore)\b/i,

    // Illegal content indicators
    /\b(child|minor|underage|kid|teen)\b.*\b(sex|nude|naked)\b/i,
    /\b(drugs|cocaine|heroin|meth|illegal)\b/i,

    // Spam patterns
    /\b(buy now|click here|free money|get rich|urgent|limited time)\b/i,

    // Excessive caps (more than 70% uppercase)
    /^[A-Z\s!@#$%^&*()]{20,}$/,

    // Repeated characters (5+ in a row)
    /(.)\1{4,}/,
  ];

  /**
   * Normalize text for analysis by removing special characters and converting to lowercase
   */
  private static normalizeText(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Check for profanity with severity levels
   */
  private static checkProfanity(text: string): {
    hasProfanity: boolean;
    severity: 'mild' | 'moderate' | 'severe' | 'none';
    words: string[];
  } {
    const normalized = this.normalizeText(text);
    const words = normalized.split(' ');
    const detectedWords: string[] = [];
    let maxSeverity: 'mild' | 'moderate' | 'severe' | 'none' = 'none';

    // Check each word against profanity lists
    for (const word of words) {
      if (this.SEVERE_PROFANITY.has(word)) {
        detectedWords.push(word);
        maxSeverity = 'severe';
      } else if (this.MODERATE_PROFANITY.has(word) && maxSeverity !== 'severe') {
        detectedWords.push(word);
        maxSeverity = 'moderate';
      } else if (this.MILD_PROFANITY.has(word) && !['severe', 'moderate'].includes(maxSeverity)) {
        detectedWords.push(word);
        maxSeverity = 'mild';
      }
    }

    return {
      hasProfanity: detectedWords.length > 0,
      severity: maxSeverity,
      words: detectedWords
    };
  }

  /**
   * Check for inappropriate content patterns
   */
  private static checkInappropriateContent(text: string): string[] {
    const issues: string[] = [];

    for (const pattern of this.INAPPROPRIATE_PATTERNS) {
      if (pattern.test(text)) {
        if (pattern.source.includes('child|minor|underage')) {
          issues.push('Content involving minors is not allowed');
        } else if (pattern.source.includes('kill|murder|suicide')) {
          issues.push('Violent content detected');
        } else if (pattern.source.includes('drugs|cocaine|heroin')) {
          issues.push('Illegal content references detected');
        } else if (pattern.source.includes('buy now|click here')) {
          issues.push('Spam-like content detected');
        } else if (pattern.source.includes('^[A-Z\\s!@#$%^&*()]{20,}$')) {
          issues.push('Excessive capitalization detected');
        } else if (pattern.source.includes('(.)\\1{4,}')) {
          issues.push('Excessive repeated characters detected');
        }
      }
    }

    return issues;
  }

  /**
   * Validate content quality (length, coherence, etc.)
   */
  private static validateQuality(text: string, config: ContentModerationConfig): string[] {
    const issues: string[] = [];
    const wordCount = text.trim().split(/\s+/).length;

    // Check length requirements
    if (text.length > config.maxLength) {
      issues.push(`Content is too long (${text.length}/${config.maxLength} characters)`);
    }

    if (config.minLength && text.length < config.minLength) {
      issues.push(`Content is too short (${text.length}/${config.minLength} characters minimum)`);
    }

    // Check for meaningful content
    if (wordCount < 3 && config.minLength && config.minLength > 20) {
      issues.push('Content appears to be too brief or meaningless');
    }

    // Check for excessive repetition
    const words = text.toLowerCase().split(/\s+/);
    const uniqueWords = new Set(words);
    if (words.length > 10 && uniqueWords.size / words.length < 0.3) {
      issues.push('Content contains excessive repetition');
    }

    return issues;
  }

  /**
   * Main validation function
   */
  public static validate(text: string, config: ContentModerationConfig): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    let severity: 'low' | 'medium' | 'high' = 'low';

    if (!text || typeof text !== 'string') {
      return {
        isValid: false,
        errors: ['Content is required'],
        warnings: [],
        severity: 'low'
      };
    }

    // Check profanity
    const profanityCheck = this.checkProfanity(text);
    if (profanityCheck.hasProfanity) {
      if (profanityCheck.severity === 'severe') {
        errors.push('Severe profanity is not allowed');
        severity = 'high';
      } else if (profanityCheck.severity === 'moderate') {
        if (config.allowMildProfanity) {
          warnings.push('Moderate profanity detected - please consider more appropriate language');
        } else {
          errors.push('Profanity is not allowed');
          severity = 'medium';
        }
      } else if (profanityCheck.severity === 'mild') {
        if (!config.allowMildProfanity) {
          warnings.push('Mild profanity detected');
        }
      }
    }

    // Check inappropriate content
    const inappropriateIssues = this.checkInappropriateContent(text);
    if (inappropriateIssues.length > 0) {
      errors.push(...inappropriateIssues);
      severity = 'high';
    }

    // Check content quality
    const qualityIssues = this.validateQuality(text, config);
    if (qualityIssues.length > 0) {
      // Quality issues are usually warnings unless they're length violations
      const lengthIssues = qualityIssues.filter(issue =>
        issue.includes('too long') || issue.includes('too short')
      );

      if (lengthIssues.length > 0) {
        errors.push(...lengthIssues);
        if (severity === 'low') severity = 'medium';
      }

      const otherIssues = qualityIssues.filter(issue =>
        !issue.includes('too long') && !issue.includes('too short')
      );
      warnings.push(...otherIssues);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      severity
    };
  }

  /**
   * Get suggestions for improving content
   */
  public static getSuggestions(text: string): string[] {
    const suggestions: string[] = [];

    if (!text || text.trim().length === 0) {
      return ['Please provide some content to get started'];
    }

    const wordCount = text.trim().split(/\s+/).length;

    if (wordCount < 5) {
      suggestions.push('Try adding more details to make your content more engaging');
    }

    if (text === text.toUpperCase() && text.length > 10) {
      suggestions.push('Consider using normal capitalization for better readability');
    }

    const profanityCheck = this.checkProfanity(text);
    if (profanityCheck.hasProfanity && profanityCheck.severity !== 'mild') {
      suggestions.push('Consider using more appropriate language to ensure your content is accepted');
    }

    if (this.checkInappropriateContent(text).length > 0) {
      suggestions.push('Please review our community guidelines and adjust your content accordingly');
    }

    return suggestions;
  }

  /**
   * Check if content is likely to be rejected by backend
   */
  public static wouldBeRejected(text: string, fieldName: string): boolean {
    const config: ContentModerationConfig = {
      allowMildProfanity: fieldName !== 'name', // Names should be stricter
      maxLength: this.getMaxLengthForField(fieldName),
      minLength: this.getMinLengthForField(fieldName)
    };

    const result = this.validate(text, config);

    // Content would be rejected if there are any errors or high-severity issues
    return !result.isValid || result.severity === 'high';
  }

  /**
   * Get appropriate validation config for different form fields
   */
  public static getConfigForField(fieldName: string): ContentModerationConfig {
    const configs: Record<string, ContentModerationConfig> = {
      name: {
        allowMildProfanity: false,
        maxLength: 50,
        minLength: 3
      },
      personality: {
        allowMildProfanity: true,
        maxLength: 500,
        minLength: 50
      },
      backstory: {
        allowMildProfanity: true,
        maxLength: 1000,
        minLength: 100
      },
      greetingMessage: {
        allowMildProfanity: true,
        maxLength: 200,
        minLength: 10
      },
      occupation: {
        allowMildProfanity: false,
        maxLength: 50,
        minLength: 2
      },
      interest: {
        allowMildProfanity: false,
        maxLength: 30,
        minLength: 2
      },
      hobby: {
        allowMildProfanity: false,
        maxLength: 30,
        minLength: 2
      },
      trait: {
        allowMildProfanity: false,
        maxLength: 30,
        minLength: 2
      }
    };

    return configs[fieldName] || {
      allowMildProfanity: true,
      maxLength: 100,
      minLength: 1
    };
  }

  private static getMaxLengthForField(fieldName: string): number {
    const lengths: Record<string, number> = {
      name: 50,
      personality: 500,
      backstory: 1000,
      greetingMessage: 200,
      occupation: 50
    };
    return lengths[fieldName] || 100;
  }

  private static getMinLengthForField(fieldName: string): number {
    const lengths: Record<string, number> = {
      name: 3,
      personality: 50,
      backstory: 100,
      greetingMessage: 10,
      occupation: 2
    };
    return lengths[fieldName] || 1;
  }
}

/**
 * React hook for real-time content validation
 */
export function useContentValidation(fieldName: string) {
  const config = ContentValidator.getConfigForField(fieldName);

  const validateContent = (text: string): ValidationResult => {
    return ContentValidator.validate(text, config);
  };

  const getSuggestions = (text: string): string[] => {
    return ContentValidator.getSuggestions(text);
  };

  const wouldBeRejected = (text: string): boolean => {
    return ContentValidator.wouldBeRejected(text, fieldName);
  };

  return {
    validateContent,
    getSuggestions,
    wouldBeRejected,
    config
  };
}
