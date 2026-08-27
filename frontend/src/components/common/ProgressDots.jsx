function ProgressDots({ currentStep, totalSteps = 4 }) {
  return (
    <div className="progress-dots">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <span
          key={index}
          className={`progress-dot ${
            index < currentStep ? "active" : ""
          }`}
        />
      ))}
    </div>
  );
}

export default ProgressDots;