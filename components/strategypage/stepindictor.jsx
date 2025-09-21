export function StepIndicator({ currentStep, totalSteps, stepTitles }) {
  return (
    <div className="flex items-center justify-center mb-12">
      <div className="flex items-center space-x-4">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep
          const isUpcoming = stepNumber > currentStep

          return (
            <div key={stepNumber} className="flex items-center">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg scale-110"
                        : isCompleted
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-muted-foreground"
                    }
                  `}
                >
                  {stepNumber}
                </div>
                {/* Step Title */}
                <div
                  className={`
                    mt-2 text-xs font-medium text-center max-w-20 transition-colors duration-300
                    ${isActive ? "text-primary" : isCompleted ? "text-accent" : "text-muted-foreground"}
                  `}
                >
                  {stepTitles[index]}
                </div>
              </div>

              {/* Connector Line */}
              {stepNumber < totalSteps && (
                <div
                  className={`
                    w-16 h-0.5 mx-4 transition-colors duration-300
                    ${isCompleted ? "bg-accent" : "bg-muted"}
                  `}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
