const Home = () => {
  return (
    <section className="home image" id="home">
      <video width="100%" height="100%" autoPlay
  muted
  loop
  playsInline
>
        <source src="videos/webFeliciaWalkThrough.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      {/* CALL TO ACTION STARTS */}
      <span className="animated-layer animated-btn cta" id="cta">
        <span></span>
      </span>
      {/* CALL TO ACTION ENDS */}
    </section>
  );
};
export default Home;
