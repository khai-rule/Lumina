'use client';

import Icon from '@/components/ui/AppIcon';

interface SetupStep {
  id: string;
  label: string;
  description: string;
  icon: string;
}

interface SetupWizardProgressProps {
  currentStep: number;
  steps: SetupStep[];
}

const SetupWizardProgress = ({ currentStep, steps }: SetupWizardProgressProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isPending = index > currentStep;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className="relative flex items-center w-full">
                  {index > 0 && (
                    <div className="flex-1 h-0.5 bg-border">
                      <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: isCompleted ? '100%' : '0%' }}
                      ></div>
                    </div>
                  )}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-medium text-sm transition-default shadow-subtle ${
                      isCompleted
                        ? 'bg-success text-success-foreground'
                        : isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {isCompleted ? (
                      <Icon name="CheckIcon" size={20} />
                    ) : (
                      <Icon name={step.icon as any} size={20} />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-0.5 bg-border">
                      <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: isCompleted ? '100%' : '0%' }}
                      ></div>
                    </div>
                  )}
                </div>
                <div className="mt-3 text-center max-w-[120px]">
                  <p
                    className={`text-sm font-medium ${
                      isActive ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 hidden lg:block">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SetupWizardProgress;