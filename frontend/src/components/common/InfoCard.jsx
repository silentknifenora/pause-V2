function InfoCard({ icon, title }) {
  return (
    <div className="card">
      <h3>
        {icon} {title}
      </h3>
    </div>
  );
}

export default InfoCard;