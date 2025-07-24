'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ContentValidator, type ValidationResult } from '@/lib/validation/content-moderation';

interface ContentValidatorProps {
  content: string;
  fieldName: string;
  onChange?: (isValid: boolean, result: ValidationResult) => void;
  showSuggestions?: boolean;
  showProgress?: boolean;
  className?: string;
}

export function ContentValidatorDisplay({
  content,
  fieldName,
  onChange,
  showSuggestions = true,
  showProgress = true,
  className = ''
}: ContentValidatorProps) {
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    isValid: true,
    errors: [],
    warnings: [],
    severity: 'low'
  });
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Debounced validation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (content) {
        const config = ContentValidator.getConfigForField(fieldName);
        const result = ContentValidator.validate(content, config);
        const contentSuggestions = ContentValidator.getSuggestions(content);

        setValidationResult(result);
        setSuggestions(contentSuggestions);

        if (onChange) {
          onChange(result.isValid, result);
        }
      } else {
        const emptyResult = {
          isValid: fieldName === 'appearance', // Appearance is optional
          errors: fieldName === 'appearance' ? [] : ['Content is required'],
          warnings: [],
          severity: 'low' as const
        };
        setValidationResult(emptyResult);
        setSuggestions([]);

        if (onChange) {
          onChange(emptyResult.isValid, emptyResult);
        }
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [content, fieldName, onChange]);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getProgressColor = () => {
    if (!validationResult.isValid) return 'bg-red-500';
    if (validationResult.warnings.length > 0) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getProgressValue = () => {
    const config = ContentValidator.getConfigForField(fieldName);
    if (!config.maxLength) return 100;

    const progress = Math.min((content.length / config.maxLength) * 100, 100);
    return progress;
  };

  const hasIssues = validationResult.errors.length > 0 || validationResult.warnings.length > 0;

  if (!content && fieldName === 'appearance') {
    return null; // Don't show validation for optional empty fields
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Progress Bar */}
      {showProgress && content && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Character count</span>
            <span>
              {content.length}
              {ContentValidator.getConfigForField(fieldName).maxLength &&
                ` / ${ContentValidator.getConfigForField(fieldName).maxLength}`
              }
            </span>
          </div>
          <Progress
            value={getProgressValue()}
            className={`h-2 ${getProgressColor()}`}
          />
        </div>
      )}

      {/* Validation Status */}
      {content && (
        <div className="flex items-center space-x-2">
          {getSeverityIcon(validationResult.isValid ? 'clean' : validationResult.severity)}
          <Badge variant={getSeverityColor(validationResult.severity)}>
            {validationResult.isValid ? 'Valid' : 'Issues detected'}
          </Badge>
          {validationResult.warnings.length > 0 && validationResult.isValid && (
            <Badge variant="secondary">
              {validationResult.warnings.length} warning{validationResult.warnings.length > 1 ? 's' : ''}
            </Badge>
          )}
        </div>
      )}

      {/* Errors */}
      {validationResult.errors.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1">
              {validationResult.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Warnings */}
      {validationResult.warnings.length > 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1">
              {validationResult.warnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Suggestions */}
      {showSuggestions && suggestions.length > 0 && !hasIssues && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-1">
              <p className="font-medium">Suggestions:</p>
              <ul className="list-disc list-inside space-y-1">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="text-sm">{suggestion}</li>
                ))}
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

// Hook for easy integration with form fields
export function useFieldValidation(fieldName: string, content: string) {
  const [isValid, setIsValid] = useState(true);
  const [result, setResult] = useState<ValidationResult>({
    isValid: true,
    errors: [],
    warnings: [],
    severity: 'low'
  });

  const handleValidationChange = (valid: boolean, validationResult: ValidationResult) => {
    setIsValid(valid);
    setResult(validationResult);
  };

  return {
    isValid,
    result,
    handleValidationChange,
    ContentValidator: (props: Omit<ContentValidatorProps, 'content' | 'fieldName' | 'onChange'>) => (
      <ContentValidatorDisplay
        content={content}
        fieldName={fieldName}
        onChange={handleValidationChange}
        {...props}
      />
    )
  };
}
