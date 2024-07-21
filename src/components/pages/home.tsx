/**
 * Renders the Home component.
 *
 * @return {JSX.Element} The rendered Home component.
 */
const Home = () => {
  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>
        Welcome to our tictactoe game!
        <br />
        Feel free to create a new game or join an existing one.
      </h1>
    </div>
  );
};

export default Home;
