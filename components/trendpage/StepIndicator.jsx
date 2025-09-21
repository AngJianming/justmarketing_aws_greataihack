import { Check } from "lucide-react"



export function StepIndicator({ currentStep }) {
  const steps = [
    { number: 1, title: "Search Trends", description: "Find trending videos" },
    { number: 2, title: "Upload & Customize", description: "Add your content" },
    { number: 3, title: "Download Result", description: "Get your video" },
  ]

  return (
    <div className="flex items-center justify-center space-x-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                step.number < currentStep
                  ? "bg-primary border-primary text-primary-foreground"
                  : step.number === currentStep
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-background border-border text-muted-foreground"
              }`}
            >
              {step.number < currentStep ? (
                <Check className="w-6 h-6" />
              ) : (
                <span className="font-semibold">{step.number}</span>
              )}
            </div>
            <div className="mt-2 text-center">
              <p className="text-sm font-medium text-foreground">{step.title}</p>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-16 h-0.5 mx-4 transition-colors ${step.number < currentStep ? "bg-primary" : "bg-border"}`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
