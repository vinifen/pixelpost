import { Link } from 'react-router-dom';

export default function Home(){
  return ( 
    <>
    <header>
      <nav>
        <Link to="/"><img src="../images/archive-icon.png" alt="Logo 1" className='h-10 w-10 p-1'/></Link>
        <Link to="/login"><img src="../images/profile-icon.png" alt="Logo 2" className='h-10 w-10 p-1'/></Link>
      </nav>
    </header>
    <main>
      <section>
        <div>
          <img src="" alt="" />
          <h1>Pixel Post</h1>
        </div>
        <Link to="/canvas">START CREATE</Link>
      </section>
      <section>
        <div>
          {/*images*/}
        </div>
      </section>
    </main>
    <footer>
      <p>
        <cite>vinifen</cite>
        <img src="" alt="" />
      </p>
    </footer>
    </>
  ); 
}


