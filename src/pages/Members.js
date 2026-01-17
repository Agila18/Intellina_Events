import "./members.css";

const team = [
  { name: "Lenin", role: "Chief Architect", img: "/images/Lenin.jpg" },
  { name: "Dhivyabharathy", role: "Portal Designer", img: "/images/Dhivyabharathy.jpg" },
  { name: "Shahila", role: "Operations", img: "/images/shahila.jpg" },
  { name: "sanjay Kumar", role: "Tech Lead", img: "/images/sanjayKumar.jpg" },
  { name: "Deepitha", role: "Communications", img: "/images/Deepitha.jpg" }
];

export default function Members() {
  const tilt = (e, card) => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    const rx = -(y - r.height / 2) / 15;
    const ry = (x - r.width / 2) / 15;

    card.querySelector(".agent-inner").style.transform =
      `rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const reset = (card) => {
    card.querySelector(".agent-inner").style.transform =
      "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div className="min-h-screen bg-[#0a0203] px-10 py-20 text-white">
      <h1 className="text-5xl text-center mb-20 text-[var(--neon-red)] drop-shadow-[0_0_20px_red]">
        HAWKINS OPERATIVES
      </h1>

      <div className="card-grid max-w-7xl mx-auto">
        {team.map((m, i) => (
          <div
            key={i}
            className="agent-card"
            onMouseMove={(e) => tilt(e, e.currentTarget)}
            onMouseLeave={(e) => reset(e.currentTarget)}
          >
            <div className="agent-inner">
              <img
                src={m.img}
                alt={m.name}
                className="agent-photo"
              />

              <div className="agent-info">
                <div className="agent-name">{m.name}</div>
                <div className="agent-role">{m.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center text-red-400 tracking-widest text-sm">
        SYSTEM STATUS: ALL OPERATIVES ACTIVE
      </div>
    </div>
  );
}
