function InfoCard({ icon, title, subtitle, onClick }) {
  return (
    <button
      className="card info-card"
      onClick={onClick}
      type="button"
    >
      <div className="info-card-top">
        <div className="info-card-title">
          {icon && (
            <span className="info-icon">
              {icon}
            </span>
          )}

          <h3>{title}</h3>
        </div>

        <span className="arrow">→</span>
      </div>

      <p>{subtitle}</p>
    </button>
  );
}

export default InfoCard;