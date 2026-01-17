export default function Home() {
  return (
    <div className="text-white font-[Space_Grotesk]">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(26,11,11,0.8),rgba(26,11,11,0.95)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAovvLQw3EGfJDYpOuEbC4LFzxC-Zhp0z64v4m3Q2z5crmxSu74MIGr-2zRfDq3vbmQdg-pRNMsrLy8v7QjxdgnjpGwAToiLp59LOar4oJvoyHNmVKTCNs7UYT66YA_vvHIRUe_Sh84QOquMpXts1uzWRPZ2AqaroXPh3_W-dpzmOYXWNcgc8hA5Ks79t7aAg_6lT0EOsF1FG1eC5LGZvDPLqDlfw_AxGWTO7WfoNQIkRT2xVb69CkdNFj8Pf4qzQIR00DEZW3Lpyp3')"
          }}
        />

        <div className="relative z-10 text-center max-w-4xl p-6">
          <p className="uppercase tracking-[0.3em] text-red-500 mb-6">
            Department of AI & DS
          </p>

          <h1 className="text-7xl md:text-9xl font-black text-red-600 drop-shadow-[0_0_20px_red]">
            INTELLINA
          </h1>

          <p className="mt-6 text-lg text-gray-300">
            Where Data Science meets the Unknown.<br />
            Enter the Upside Down of Artificial Intelligence.
          </p>

          <div className="mt-10 flex justify-center gap-6">
            <div className="border border-red-600 px-6 py-2 bg-black/50">
              OCT 27–29
            </div>
            <div className="border border-red-600 px-6 py-2 bg-black/50">
              HAWKINS HALL
            </div>
          </div>

          <button className="mt-12 px-10 py-4 bg-red-600 hover:bg-red-700 shadow-neon uppercase tracking-widest">
            Enter The Portal
          </button>
        </div>
      </section>

    </div>
  );
}
